---
title: Google Drive ingest — Knowcap absorbs + organizes + keeps Drive in sync
captured: 2026-05-06
resolved: 2026-05-12
type: feature-idea
status: SUPERSEDED — actual intent was Drive write-back, not ingest. See [[wiki/Knowcap/content-and-features/google-drive-writeback]]
supersedes: this 2026-05-06 capture
---

# Google Drive ingest (SUPERSEDED 2026-05-12)

> ⚠️ This capture misread Hassan's original intent. The actual idea is **write-back**: Knowcap agents update specific Drive docs (SOPs, etc.) when they detect operational changes in meetings. Drive is the output, meetings are the input. Resolved on 2026-05-12 and absorbed into the [[wiki/Knowcap/content-and-features/agents-research-complete-ui]] worktree work. See [[wiki/Knowcap/content-and-features/google-drive-writeback]] for the authoritative version.
>
> Original 2026-05-06 capture preserved below for history.

---

## Idea (Hassan, 2026-05-06, this session)

> Knowcap ingests Google Drive, organizes it, and keeps it updated.

## Why this fits

- Hassan's content-strategy vision already names meetings as the **biggest information contract** in any business. But meetings are #1, not #only — Google Drive is where the surviving artefacts (docs, sheets, slides, PDFs) actually live for most companies.
- The Hasan Toor / YC "company brain" pitch (see `ai-first-framework-hasan-toor.md`) explicitly calls out *"buried in old email threads or Slack accounts or support tickets or even databases"* as the blocker. Drive is on that list of fragmented places.
- Knowcap already does this loop for **meetings**. Extending to Drive = same product shape (ingest → tag → organize → keep updated → query), bigger surface area.

## Open questions (to fill before filing the Odoo ticket)

- **Outcome (Q1 of /idea flow):** what does "done" look like in one line? Best guess to confirm with Hassan: *"User connects Drive once → Knowcap ingests every doc/sheet/slide, classifies by the same 5 categories (Risks/Decisions/Tasks/Topics/Parties), keeps re-syncing on change, surfaces them as searchable sources alongside meetings."*
- **Impact (Q2 of /idea flow):** 1–5 stars
- **Scope:** read-only, or also write back (e.g. auto-update a doc when a meeting decision changes it)?
- **Granularity:** whole-file ingest, or per-paragraph memory layers like meetings?
- **Sync model:** webhook on change, periodic poll, or push-on-demand?

## Status

**/idea flow paused** mid-Q1 because Hassan pivoted to filing this folder. Resume by answering Q1 outcome → Q2 impact → file in Odoo project 141 stage 340 Planning.

## Related Knowcap features (cross-link when they exist)

- VoIP / phone-call ingest (mentioned in the content-strategy-vision doc as roadmap)
- Buffer / Higgsfield / Claude / GitHub MCPs (already integrated per Hassan's framing)
