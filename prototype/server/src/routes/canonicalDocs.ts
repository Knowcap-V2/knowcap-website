/**
 * Canonical-document edit endpoints — the named-human confirm + write-back gate.
 *
 * This is a near-verbatim clone of routes/docProposals.ts (the shipped trust
 * contract: AI proposes → named human confirms → the doc changes; staleness-
 * guarded; org owner/admin only). The ONE difference is the apply step: instead
 * of upserting an internal hierarchy_docs row, /confirm writes the approved block
 * back into the real Google Doc via googleDocsService.writeBackSection.
 *
 * Mounted at /api/hierarchy alongside docProposals (index.ts:340) so the surface
 * lives next to the internal-doc loop it generalises:
 *   GET  /api/hierarchy/canonical-docs/:docId/proposals     → pending edits (members)
 *   POST /api/hierarchy/canonical-docs/:id/confirm          → owner/admin + staleness + WRITE-BACK
 *   POST /api/hierarchy/canonical-docs/:id/(reject|snooze)  → owner/admin
 *
 * NOTE: linking a doc + the re-sync worker live elsewhere (integrations.ts
 * extension + a cron). This file is the human-control + write-back surface.
 */

import { Router } from 'express'
import { supabaseAdmin } from '../lib/supabase.js'
import { asyncHandler, AppError } from '../middleware/errorHandler.js'
import { requireAuth, AuthRequest } from '../middleware/auth.js'
import { isProposalStale } from '../services/docProposalService.js'
import { writeBackSection, extractDocWithSections } from '../services/integrations/googleDocs/googleDocsService.js'

const router = Router()

async function isOrgAdmin(userId: string, orgId: string): Promise<boolean> {
  if (!supabaseAdmin) return false
  const { data } = await supabaseAdmin.from('organization_members').select('role')
    .eq('user_id', userId).eq('organization_id', orgId).maybeSingle()
  return !!data && ['owner', 'admin'].includes(data.role)
}
async function isOrgMember(userId: string, orgId: string): Promise<boolean> {
  if (!supabaseAdmin) return false
  const { data } = await supabaseAdmin.from('organization_members').select('organization_id')
    .eq('user_id', userId).eq('organization_id', orgId).maybeSingle()
  return !!data
}

// GET /api/hierarchy/canonical-docs/:docId/proposals → pending edits (members).
router.get(
  '/canonical-docs/:docId/proposals',
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: any) => {
    if (!supabaseAdmin) throw new AppError('Database not configured', 503)
    const { data: doc } = await supabaseAdmin
      .from('canonical_documents').select('id, organization_id').eq('id', req.params.docId).maybeSingle()
    if (!doc) throw new AppError('Document not found', 404)
    if (!(await isOrgMember(req.user!.id, doc.organization_id))) {
      throw new AppError('Not authorized to view these proposals', 403)
    }
    const { data } = await supabaseAdmin
      .from('canonical_doc_edit_proposals')
      .select('id, document_id, target_anchor, before_block_md, proposed_block_md, diff_summary, rationale, source_evidence, proposed_by_agent, status, created_at')
      .eq('document_id', doc.id).eq('status', 'pending')
      .order('created_at', { ascending: false })
    res.json({ proposals: data ?? [] })
  }),
)

// POST /api/hierarchy/canonical-docs/:id/confirm → owner/admin + staleness + WRITE-BACK.
router.post(
  '/canonical-docs/:id/confirm',
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: any) => {
    if (!supabaseAdmin) throw new AppError('Database not configured', 503)

    const { data: p } = await supabaseAdmin
      .from('canonical_doc_edit_proposals').select('*').eq('id', req.params.id).maybeSingle()
    if (!p) throw new AppError('Proposal not found', 404)
    if (p.status !== 'pending') throw new AppError(`Proposal already ${p.status}`, 400)
    if (!(await isOrgAdmin(req.user!.id, p.organization_id))) {
      throw new AppError('Only org owners/admins can confirm document edits', 403)
    }

    const { data: doc } = await supabaseAdmin
      .from('canonical_documents').select('*').eq('id', p.document_id).maybeSingle()
    if (!doc) throw new AppError('Linked document not found', 404)

    // Staleness guard #1 — the internal mirror moved (re-synced) since draft.
    if (isProposalStale(p.base_doc_updated_at, doc.updated_at)) {
      await markStale(p.id)
      throw new AppError('The document was re-synced since this edit was proposed. Re-generate it.', 409)
    }
    // Staleness guard #2 — the REAL Google Doc moved since draft. Cheap pre-check
    // before the write; the write itself also passes requiredRevisionId so this
    // is belt-and-suspenders, never a TOCTOU window.
    if (p.base_external_revision && doc.external_revision && p.base_external_revision !== doc.external_revision) {
      await markStale(p.id)
      throw new AppError('The Google Doc changed since this edit was proposed. Re-sync and re-generate.', 409)
    }

    // Resolve the target section's NamedRange from the doc's section map.
    const section = (doc.sections as Array<{ anchor: string; namedRangeId: string }>)
      .find((s) => s.anchor === p.target_anchor)
    if (!section) {
      await markStale(p.id)
      throw new AppError('Target section no longer exists in the document. Re-sync and re-generate.', 409)
    }

    // We need a live revisionId for WriteControl(requiredRevisionId). Re-extract
    // the doc (also refreshes the mirror) and use its current revision.
    const fresh = await extractDocWithSections(req.user!.id, doc.external_id)
    const liveSection = fresh.sections.find((s) => s.anchor === p.target_anchor)
    if (!liveSection) {
      await markStale(p.id)
      throw new AppError('Target section disappeared on re-read. Re-generate the proposal.', 409)
    }

    // APPLY — the named human has confirmed; write the approved block back to the
    // real Google Doc. This is the ONLY place writeBackSection is ever called.
    let writeResult: { newRevisionId: string; requestCount: number }
    try {
      writeResult = await writeBackSection(
        req.user!.id,
        doc.external_id,
        liveSection.namedRangeId,
        p.proposed_block_md,
        fresh.revisionId, // requiredRevisionId — rejects if the doc moved mid-flight
      )
    } catch (e: any) {
      await supabaseAdmin.from('canonical_doc_edit_proposals')
        .update({ status: 'write_failed', writeback_error: String(e?.message || e) })
        .eq('id', p.id)
      throw e instanceof AppError ? e : new AppError(`Write-back failed: ${e?.message || e}`, 502)
    }

    // Sync the internal mirror to match what we just pushed, and record the receipt.
    await supabaseAdmin.from('canonical_documents').update({
      body_md: replaceSection(doc.body_md, p.before_block_md, p.proposed_block_md),
      external_revision: writeResult.newRevisionId,
      updated_at: new Date().toISOString(),
    }).eq('id', doc.id)

    await supabaseAdmin.from('canonical_doc_edit_proposals').update({
      status: 'confirmed',
      confirmed_by: req.user!.id,
      confirmed_at: new Date().toISOString(),
      writeback_external_revision: writeResult.newRevisionId,
      writeback_request_count: writeResult.requestCount,
    }).eq('id', p.id)

    res.json({ ok: true, newRevisionId: writeResult.newRevisionId })
  }),
)

// POST /api/hierarchy/canonical-docs/:id/(reject|snooze)
router.post(
  '/canonical-docs/:id/:action(reject|snooze)',
  requireAuth,
  asyncHandler(async (req: AuthRequest, res: any) => {
    if (!supabaseAdmin) throw new AppError('Database not configured', 503)
    const { data: p } = await supabaseAdmin
      .from('canonical_doc_edit_proposals').select('organization_id, status').eq('id', req.params.id).maybeSingle()
    if (!p) throw new AppError('Proposal not found', 404)
    if (!(await isOrgAdmin(req.user!.id, p.organization_id))) {
      throw new AppError('Only org owners/admins can review document edits', 403)
    }
    const patch: any = { status: req.params.action === 'snooze' ? 'snoozed' : 'rejected' }
    if (req.params.action === 'snooze') patch.snooze_until = new Date(Date.now() + 7 * 86400_000).toISOString()
    await supabaseAdmin.from('canonical_doc_edit_proposals').update(patch).eq('id', req.params.id)
    res.json({ ok: true })
  }),
)

async function markStale(id: string): Promise<void> {
  if (!supabaseAdmin) return
  await supabaseAdmin.from('canonical_doc_edit_proposals').update({ status: 'stale' }).eq('id', id)
}

/** Replace the first occurrence of the old block with the new block in the mirror. */
function replaceSection(body: string, beforeBlock: string, afterBlock: string): string {
  const idx = body.indexOf(beforeBlock)
  if (idx === -1) return body
  return body.slice(0, idx) + afterBlock + body.slice(idx + beforeBlock.length)
}

export default router
