/**
 * Trigger wiring — how a confirmed decision reaches docSync. NO new event bus.
 *
 * The existing flow (unchanged):
 *   PATCH /api/memories/:id/review  (memories.ts, named-human confirm)
 *     └─> fireOnClaimConfirmed(memory)  (routineEvaluator.ts) — already fires on
 *         every confirm/edit and runs project routines bound to 'claim.confirmed'.
 *
 * We attach to that exact moment. Two integration options; option A is the
 * zero-server-change path, option B is the explicit hook shown below.
 *
 * ── OPTION A (config-only, preferred): a project ROUTINE ──────────────────────
 *   Create one routine row per project that wants this:
 *     trigger      = 'claim.confirmed'
 *     claim_filter = 'category = decision AND importance >= 1.0'   (DSL already parsed)
 *     skill        = a built-in "canonical-doc-sync" skill whose worker calls
 *                    proposeDocEditsForDecision(memory).
 *   fireOnClaimConfirmed already inserts a skill_runs row for this; the agent-run
 *   worker drains it. ZERO change to memories.ts or routineEvaluator.ts — this is
 *   the same path playbooks/research runs already use.
 *
 * ── OPTION B (one-line explicit hook): call alongside fireOnClaimConfirmed ────
 *   For a built-in (not user-configured) behavior, add ONE fire-and-forget call
 *   in memories.ts right next to the existing fireOnClaimConfirmed(...) block
 *   (memories.ts:414). The helper below is what you call — it filters to
 *   confirmed decisions and hands off to docSync, swallowing all errors so it can
 *   never affect the review PATCH (same discipline as every other trigger there).
 */

import { proposeDocEditsForDecision, type ConfirmedDecision } from './docSyncService.js'

/**
 * Fire canonical-doc edit proposals for a just-confirmed memory. Drop-in next to
 * fireOnClaimConfirmed in routes/memories.ts:
 *
 *     // existing:
 *     fireOnClaimConfirmed({ id, project_id, category, importance, metadata, summary })
 *       .then(...).catch(...)
 *
 *     // add (Option B):
 *     void onClaimConfirmedSyncDocs({
 *       id: updated.id,
 *       project_id: updated.project_id,
 *       category: updated.category,
 *       importance: updated.importance,
 *       summary: updated.summary,
 *       metadata: updated.metadata,
 *     })
 *
 * Fire-and-forget, never throws — a failure here must never break the confirm.
 */
export async function onClaimConfirmedSyncDocs(memory: ConfirmedDecision): Promise<void> {
  try {
    // Gate: only high-signal confirmed decisions touch canonical docs. (Mirrors
    // the claim_filter 'category = decision AND importance >= 1.0' from Option A,
    // so A and B behave identically.)
    if ((memory.category ?? '') !== 'decision') return
    if ((memory.importance ?? 0) < 1.0) return // confirm bumps importance +1.0 → ≥1.0 means human-confirmed

    const stats = await proposeDocEditsForDecision(memory)
    if (stats.proposalsCreated > 0) {
      console.log(
        `[docSync] decision ${memory.id} → ${stats.proposalsCreated} pending canonical-doc edit(s) ` +
          `across ${stats.docsConsidered} doc(s)`,
      )
    }
  } catch (err) {
    // Strictly fire-and-forget — log and move on.
    console.error('[docSync] onClaimConfirmedSyncDocs failed', err)
  }
}
