/**
 * docSync — the decision-driven proposal generator (the genuinely-new logic).
 *
 * Prior art (Notion, Glean, Guru, ReadMe…) ships every PART of this loop EXCEPT
 * this composition: a CONFIRMED CONVERSATION DECISION → "which canonical doc
 * section did this just make stale?" → a surgical block rewrite the human
 * approves → write-back to the real Google Doc.
 *
 * This service is that missing middle. Everything it stands on is reused:
 *   - the trigger:        fireOnClaimConfirmed already fires on every named-human
 *                         confirm (memories.ts). We add a hook there that calls
 *                         proposeDocEditsForDecision(memory).
 *   - relevance/retrieval: searchRag (embeddingService) over the canonical doc's
 *                         own source — the doc is already RAG-indexed at ingest.
 *   - drafting:           generateAIResponse (the Gemini wrapper docProposalService
 *                         already uses).
 *   - the trust contract: we ONLY ever INSERT a pending row into
 *                         canonical_doc_edit_proposals. We NEVER touch the doc.
 *                         A named human confirms in the approve route, which is
 *                         the only place writeBackSection is ever called.
 *
 * It is the exact shape of docProposalService.generateDocProposals, re-pointed
 * from internal hierarchy_docs + term-frequency to external canonical docs +
 * confirmed decisions.
 */

import { supabaseAdmin } from '../../lib/supabase.js'
import { searchRag } from '../chat/embeddingService.js'
import { generateAIResponse } from '../chat/aiService.js'

// Mirror of the routineEvaluator MemoryShape — the confirmed decision we react to.
export interface ConfirmedDecision {
  id: string
  project_id: string | null
  category?: string | null
  importance?: number | null
  summary?: string | null
  metadata?: Record<string, any> | null
}

interface CanonicalDocRow {
  id: string
  organization_id: string
  source_id: string | null
  external_id: string
  title: string
  body_md: string
  updated_at: string
  external_revision: string | null
  sections: Array<{ anchor: string; heading: string; namedRangeId: string }>
}

export interface ProposeStats {
  decisionId: string
  docsConsidered: number
  proposalsCreated: number
}

/**
 * Given a just-confirmed decision, find the canonical docs in its org whose
 * relevant section the decision makes stale, and draft a pending block-edit
 * proposal for each. Fire-and-forget friendly: never throws past its own catch,
 * so it can hang off fireOnClaimConfirmed the same way playbooks do.
 */
export async function proposeDocEditsForDecision(decision: ConfirmedDecision): Promise<ProposeStats> {
  const stats: ProposeStats = { decisionId: decision.id, docsConsidered: 0, proposalsCreated: 0 }
  if (!supabaseAdmin) return stats
  // Only decisions drive canonical-doc edits (facts/tasks/risks don't restate
  // strategy). The caller's claim_filter normally enforces this; double-check.
  if ((decision.category ?? '') !== 'decision') return stats
  if (!decision.project_id) return stats

  const decisionText = (decision.summary ?? '').trim()
  if (!decisionText) return stats

  // Resolve the org for this decision's project.
  const { data: project } = await supabaseAdmin
    .from('projects').select('organization_id').eq('id', decision.project_id).maybeSingle()
  const orgId: string | undefined = project?.organization_id
  if (!orgId) return stats

  // Candidate canonical docs = every linked doc in the org.
  const { data: docs } = await supabaseAdmin
    .from('canonical_documents')
    .select('id, organization_id, source_id, external_id, title, body_md, updated_at, external_revision, sections')
    .eq('organization_id', orgId)
  const candidates = (docs ?? []) as CanonicalDocRow[]
  stats.docsConsidered = candidates.length
  if (!candidates.length) return stats

  for (const doc of candidates) {
    try {
      const created = await proposeForOneDoc(decision, decisionText, doc)
      if (created) stats.proposalsCreated++
    } catch (e: any) {
      console.warn(`[docSync] propose failed for doc ${doc.id}: ${e?.message || e}`)
    }
  }
  return stats
}

async function proposeForOneDoc(
  decision: ConfirmedDecision,
  decisionText: string,
  doc: CanonicalDocRow,
): Promise<boolean> {
  if (!supabaseAdmin) return false
  if (!doc.sections?.length || !doc.source_id) return false

  // 1. RELEVANCE — RAG-retrieve the chunk of THIS doc most related to the
  //    decision. The doc's source is already indexed (indexSourceForRag at
  //    ingest), so this is the same primitive that grounds artifact generation.
  const hits = await searchRag(decisionText, [doc.source_id], 3)
  if (!hits.length) return false
  const topChunk = hits[0].content

  // 2. TARGET SECTION — map the retrieved chunk to one of the doc's heading
  //    sections (the unit we can write back via its NamedRange). Pick the
  //    section whose body has the strongest overlap with the retrieved chunk.
  const target = pickSection(doc, topChunk)
  if (!target) return false
  const beforeBlock = sliceSection(doc.body_md, target.heading)
  if (!beforeBlock.trim()) return false

  // 3. STALENESS + INVALIDATION JUDGEMENT — ask the model two things at once:
  //    does this decision actually invalidate this section, and if so, what is
  //    the minimal rewrite? Refusing on "no change needed" is the guardrail
  //    against noisy proposals.
  const draft = await draftSectionEdit({
    decision: decisionText,
    docTitle: doc.title,
    sectionHeading: target.heading,
    currentBlock: beforeBlock,
    orgId: doc.organization_id,
  })
  if (!draft || draft.noChange) return false

  // 4. PROPOSE — insert a PENDING row. NEVER write the doc here. The unique
  //    partial index (doc, anchor, trigger_memory_id) makes a re-fire idempotent.
  const { error } = await supabaseAdmin.from('canonical_doc_edit_proposals').insert({
    document_id: doc.id,
    organization_id: doc.organization_id,
    trigger_memory_id: decision.id,
    target_anchor: target.anchor,
    base_doc_updated_at: doc.updated_at,
    base_external_revision: doc.external_revision,
    before_block_md: beforeBlock,
    proposed_block_md: draft.proposedBlock,
    diff_summary: draft.summary,
    rationale: `Confirmed decision "${truncate(decisionText, 80)}" updates this section.`,
    source_evidence: {
      memory_id: decision.id,
      decision_summary: decisionText,
      rag_similarity: hits[0].similarity,
    },
    proposed_by_agent: draft.agent,
    status: 'pending',
  })
  // Unique-violation = a pending proposal already exists for this trio → fine.
  if (error && !/duplicate key|unique/i.test(error.message)) throw error
  return !error
}

// ── drafting ────────────────────────────────────────────────────────────────

interface DraftInput {
  decision: string
  docTitle: string
  sectionHeading: string
  currentBlock: string
  orgId: string
}
interface DraftOutput { noChange: boolean; proposedBlock: string; summary: string; agent: string }

async function draftSectionEdit(input: DraftInput): Promise<DraftOutput | null> {
  const system =
    'You maintain a company canonical document. Given a confirmed business DECISION and the CURRENT TEXT of one document section, decide whether the decision makes the section stale. ' +
    'If it does NOT, reply with exactly the token NO_CHANGE. ' +
    'If it does, output ONLY the minimally-rewritten section text — preserve voice, headings, and markdown; change only what the decision requires. No preamble, no fences.'
  const user =
    `DOCUMENT: ${input.docTitle}\n` +
    `SECTION: ${input.sectionHeading}\n\n` +
    `CONFIRMED DECISION:\n${input.decision}\n\n` +
    `CURRENT SECTION TEXT:\n${input.currentBlock}`

  try {
    const out = await generateAIResponse(system, user, [], 'gemini-2.5-pro', 0.2, {
      organizationId: input.orgId,
      action: 'canonical_doc_edit',
    })
    const text = (out || '').trim()
    if (!text || /^NO_CHANGE$/i.test(text)) return { noChange: true, proposedBlock: '', summary: '', agent: 'gemini-2.5-pro' }
    return {
      noChange: false,
      proposedBlock: text,
      summary: summarizeChange(input.sectionHeading, input.currentBlock, text),
      agent: 'gemini-2.5-pro',
    }
  } catch (e: any) {
    console.warn(`[docSync] Gemini draft failed: ${e?.message || e}`)
    return null
  }
}

// ── pure helpers (unit-testable, no I/O) ──────────────────────────────────────

export function pickSection(
  doc: { sections: Array<{ anchor: string; heading: string; namedRangeId: string }>; body_md: string },
  chunk: string,
): { anchor: string; heading: string; namedRangeId: string } | null {
  if (!doc.sections.length) return null
  const chunkTokens = tokenSet(chunk)
  let best: { section: (typeof doc.sections)[number]; score: number } | null = null
  for (const s of doc.sections) {
    const body = sliceSection(doc.body_md, s.heading)
    const score = overlap(chunkTokens, tokenSet(`${s.heading} ${body}`))
    if (!best || score > best.score) best = { section: s, score }
  }
  return best && best.score > 0 ? best.section : doc.sections[0]
}

/** Extract a heading's block (heading line through the line before the next heading). */
export function sliceSection(bodyMd: string, heading: string): string {
  const lines = (bodyMd || '').split('\n')
  const headIdx = lines.findIndex((l) => l.replace(/^#+\s*/, '').trim() === heading.trim())
  if (headIdx === -1) return ''
  let end = lines.length
  for (let i = headIdx + 1; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i])) { end = i; break }
  }
  return lines.slice(headIdx, end).join('\n').trim()
}

function summarizeChange(heading: string, before: string, after: string): string {
  const verb = after.length > before.length ? 'Expand' : after.length < before.length ? 'Tighten' : 'Revise'
  return `${verb} "${heading}" to reflect the confirmed decision`
}

function tokenSet(s: string): Set<string> {
  return new Set((s || '').toLowerCase().match(/[a-z][a-z0-9'-]{3,}/g) ?? [])
}
function overlap(a: Set<string>, b: Set<string>): number {
  let n = 0
  for (const t of a) if (b.has(t)) n++
  return n
}
function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s
}
