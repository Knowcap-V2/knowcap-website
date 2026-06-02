# Knowcap Feature Ideas

> Captured 2026-05-07 from Hassan voice/chat dump. Raw + light synthesis. Hassan to review.

---

## 1. Knowcap ingests Google Drive, organizes it, keeps it updated
**Date:** 2026-05-07
**Raw:** "knowcap ingests google drive organizes it and keeps it updated"

**Light synthesis:**
- Drive becomes a first-class Knowcap source (alongside meetings, chat, recordings).
- "Organizes it" implies Knowcap auto-categorizes Drive files into projects/orgs (probably via the same memory/category pipeline used today for chat + recordings).
- "Keeps it updated" implies a watcher/sync, not a one-shot import — re-index on Drive change events.

**Relates to:** Knowcap absorbs daily ops (post-launch sprint) — Drive ingestion is a natural sibling to the Email/Tasks/Bookmarks modules already on the roadmap.

---

## 2. Self-improving SaaS plugin — Amplitude-style onboarding for new features w/ approve-reject button
**Date:** 2026-05-07
**Raw:** "self improving saas plugin with amplitude style on boarding for new features with approve or reject button"

**Light synthesis:**
- A reusable plugin/SDK that any SaaS can drop in.
- When the host SaaS ships a new feature, the plugin surfaces an Amplitude-style guided tour to the user.
- Each step has an explicit Approve / Reject button — user feedback is captured in-line, feeds back into the product (hence "self-improving").
- Distinct from passive analytics: this is opt-in, per-feature, structured user signal.

**Relates to:** Could be the surface for Knowcap's own feature rollout (the existing "approve/reject queue" in Master Brain is conceptually similar).

---

## 3. Markdown file per user, per organization, per project on Knowcap
**Date:** 2026-05-07
**Raw:** "Md file for each user on knowcap and md file for organziation and md file for projects."

**Light synthesis:**
- Three new entity types in Knowcap, each materialized as an MD doc:
  - **user.md** — profile, prefs, roles, history.
  - **org.md** — company-level facts, strategy, OKRs.
  - **project.md** — scoped to a single project, evolves over time.
- Mirrors Hassan's existing wiki pattern (`Knowcap/people/*.md`, `Knowcap/wiki/*.md`).
- Probably auto-maintained by Knowcap memory pipeline + manually editable.
- Logical home for the "MD-per-X" surface: same place the project digest lives today.
