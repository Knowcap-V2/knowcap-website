/**
 * Google Docs read + write client — the close-the-loop write-back primitive.
 *
 * This is the ONE genuinely-new piece of infrastructure. It is modelled exactly
 * on the shipped write-on-behalf precedent (gmailDraftService.ts): take a valid
 * access token from the existing OAuth/token plumbing, build a googleapis client,
 * call the API, surface scope problems as a 401 reconnect hint rather than a 500.
 *
 * The googleapis SDK already in package.json (used by driveClient.ts + gmail)
 * bundles the Docs API — NO new dependency. The only thing that's net-new is the
 * `documents` write SCOPE, which is added to the OAuth grant and requires one
 * user re-consent (same rollout story as gmail.compose — see types.ts).
 *
 * SAFE-WRITE CONTRACT (non-negotiable, mirrors Knowcap's "no silent mutation"):
 *   - We NEVER write without a named human having confirmed the proposal first
 *     (enforced in the route, not here — this service is the dumb actuator).
 *   - We target a NamedRange we created at link time, so we replace exactly the
 *     block the human approved, never the whole doc.
 *   - We pass a requiredRevisionId (WriteControl) so the write is REJECTED if the
 *     doc changed since the proposal was drafted — optimistic concurrency, never
 *     clobber a human's in-flight edit.
 *   - Google Docs keeps full version history, so every write-back is reversible
 *     by the user in the native UI (our reversibility story until the Docs API
 *     supports creating suggestions, which today it does not — READ-ONLY).
 */

import { google, type docs_v1 } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { getValidAccessToken } from '../googleMeet/oauthService.js'
import { AppError } from '../../../middleware/errorHandler.js'

async function buildDocs(userId: string): Promise<docs_v1.Docs> {
  let accessToken: string
  try {
    accessToken = await getValidAccessToken(userId)
  } catch {
    throw new AppError(
      'Google Docs not connected for this user. Reconnect Google to grant the documents scope.',
      401,
    )
  }
  const auth = new OAuth2Client()
  auth.setCredentials({ access_token: accessToken })
  return google.docs({ version: 'v1', auth })
}

export interface DocSection {
  anchor: string            // our stable slug
  heading: string           // the heading text we matched on
  namedRangeId: string      // Google Docs NamedRange id (re-locatable after edits)
}

export interface ExtractedDoc {
  documentId: string
  title: string
  revisionId: string        // for WriteControl / staleness
  bodyText: string          // flattened plain text (feeds the local mirror + RAG)
  sections: DocSection[]
}

/**
 * Read a Google Doc, flatten its body to text, and (re)create one NamedRange per
 * top-level heading so each section is independently re-locatable for write-back.
 * Returns the section map we persist into canonical_documents.sections.
 */
export async function extractDocWithSections(userId: string, documentId: string): Promise<ExtractedDoc> {
  const docs = await buildDocs(userId)

  // 1. Read the structured document.
  let doc: docs_v1.Schema$Document
  try {
    const res = await docs.documents.get({ documentId, includeTabsContent: true })
    doc = res.data
  } catch (e: any) {
    throw scopeOr502(e, 'read')
  }

  const content = doc.body?.content ?? []
  const sections: Array<{ heading: string; startIndex: number; endIndex: number; anchor: string }> = []

  // 2. Walk paragraphs; each HEADING_* paragraph opens a section that runs until
  //    the next heading (or end of doc).
  let current: { heading: string; startIndex: number; anchor: string } | null = null
  let bodyText = ''
  for (const el of content) {
    const p = el.paragraph
    const start = el.startIndex ?? 0
    const end = el.endIndex ?? start
    const text = (p?.elements ?? []).map((r) => r.textRun?.content ?? '').join('')
    bodyText += text
    const styleType = p?.paragraphStyle?.namedStyleType ?? ''
    const isHeading = /^HEADING_\d$/.test(styleType)
    if (isHeading) {
      if (current) sections.push({ ...current, endIndex: start })
      const heading = text.trim()
      current = { heading, startIndex: start, anchor: slugify(heading) }
    }
  }
  if (current) {
    const docEnd = content.length ? (content[content.length - 1].endIndex ?? 1) : 1
    sections.push({ ...current, endIndex: docEnd })
  }

  // 3. Create a NamedRange over each section body so we can re-find it later even
  //    after the user edits the doc (Docs auto-maintains named-range indexes).
  const requests: docs_v1.Schema$Request[] = []
  const named: DocSection[] = []
  for (const s of sections) {
    const rangeName = `kc_section_${s.anchor}`.slice(0, 256)
    // A doc can already have this NamedRange from a prior link — recreate idempotently.
    requests.push({ deleteNamedRange: { name: rangeName } })
    requests.push({
      createNamedRange: {
        name: rangeName,
        range: { startIndex: s.startIndex, endIndex: Math.max(s.startIndex + 1, s.endIndex) },
      },
    })
  }

  let revisionId = doc.revisionId ?? ''
  if (requests.length) {
    try {
      const res = await docs.documents.batchUpdate({
        documentId,
        requestBody: { requests, writeControl: { targetRevisionId: revisionId || undefined } },
      })
      // Re-read to capture the assigned namedRangeIds + the new revision.
      const after = await docs.documents.get({ documentId })
      revisionId = after.data.revisionId ?? revisionId
      const ranges = after.data.namedRanges ?? {}
      for (const s of sections) {
        const rangeName = `kc_section_${s.anchor}`.slice(0, 256)
        const nr = ranges[rangeName]?.namedRanges?.[0]
        if (nr?.namedRangeId) named.push({ anchor: s.anchor, heading: s.heading, namedRangeId: nr.namedRangeId })
      }
    } catch (e: any) {
      throw scopeOr502(e, 'index')
    }
  }

  return { documentId, title: doc.title ?? 'Untitled', revisionId, bodyText, sections: named }
}

export interface WriteBackResult {
  newRevisionId: string
  requestCount: number
}

/**
 * Replace the text of a single named-range-anchored block with the approved
 * rewrite. WriteControl(requiredRevisionId) makes the write fail-safe: a 400 is
 * thrown if the doc moved since the proposal was drafted, so we never overwrite
 * a concurrent human edit.
 *
 * Replace recipe (the documented Docs safe-update pattern): find the range,
 * delete its content, insert the new text at the range start, all in ONE atomic
 * batchUpdate.
 */
export async function writeBackSection(
  userId: string,
  documentId: string,
  namedRangeId: string,
  newText: string,
  requiredRevisionId: string,
): Promise<WriteBackResult> {
  const docs = await buildDocs(userId)

  // Resolve the current range bounds for the named range.
  const before = await docs.documents.get({ documentId }).catch((e) => { throw scopeOr502(e, 'read') })
  const range = findNamedRange(before.data, namedRangeId)
  if (!range) {
    throw new AppError(
      `Section anchor no longer present in the document (named range ${namedRangeId} was deleted). Re-sync the document and re-generate the proposal.`,
      409,
    )
  }

  const requests: docs_v1.Schema$Request[] = [
    { deleteContentRange: { range: { startIndex: range.startIndex, endIndex: range.endIndex } } },
    { insertText: { location: { index: range.startIndex }, text: ensureTrailingNewline(newText) } },
  ]

  try {
    const res = await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests,
        // requiredRevisionId → optimistic concurrency: reject if the doc changed.
        writeControl: { requiredRevisionId },
      },
    })
    const after = await docs.documents.get({ documentId })
    return {
      newRevisionId: after.data.revisionId ?? '',
      requestCount: res.data.replies?.length ?? requests.length,
    }
  } catch (e: any) {
    const msg = String(e?.message || e)
    // requiredRevisionId mismatch surfaces as 400 — translate to a 409 the
    // route can map onto "the doc changed, re-generate" (staleness contract).
    if (/revision|writeControl|FAILED_PRECONDITION/i.test(msg)) {
      throw new AppError('The Google Doc changed since this edit was proposed. Re-sync and re-generate.', 409)
    }
    throw scopeOr502(e, 'write')
  }
}

// ── helpers ───────────────────────────────────────────────────────────────────

function findNamedRange(
  doc: docs_v1.Schema$Document,
  namedRangeId: string,
): { startIndex: number; endIndex: number } | null {
  for (const group of Object.values(doc.namedRanges ?? {})) {
    for (const nr of group.namedRanges ?? []) {
      if (nr.namedRangeId !== namedRangeId) continue
      const ranges = nr.ranges ?? []
      if (!ranges.length) return null
      // A named range can be split by user edits; replace into the first range
      // (the documented recipe) — the staleness guard above is the safety net.
      const first = ranges[0]
      return { startIndex: first.startIndex ?? 0, endIndex: first.endIndex ?? 0 }
    }
  }
  return null
}

function scopeOr502(e: any, op: string): AppError {
  const msg = String(e?.message || e)
  if (/insufficient.*scope|invalid.*scope|forbidden|PERMISSION_DENIED/i.test(msg)) {
    return new AppError(
      `Google Docs ${op} denied: tokens lack the documents scope. Disconnect + reconnect Google to grant it.`,
      401,
    )
  }
  return new AppError(`Google Docs ${op} failed: ${msg}`, 502)
}

export function slugify(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || 'section'
}

function ensureTrailingNewline(s: string): string {
  return s.endsWith('\n') ? s : `${s}\n`
}
