---
title: Self-improving SaaS plugin with Amplitude-style onboarding + approve/reject buttons
captured: 2026-05-06
resolved: 2026-05-12
type: feature-idea
status: SUPERSEDED — actual intent was a self-evolve agent for Hassan, not an end-user onboarding plugin. See [[wiki/Knowcap/content-and-features/self-evolve-knowcap-agent]]
---

# Self-improving SaaS plugin (SUPERSEDED 2026-05-12)

> ⚠️ This capture misread Hassan's original intent. The "approve / reject" buttons aren't for end users walking a guided tour — they're Hassan reviewing PRs from a cloud agent that **self-develops Knowcap** based on research. "Self-improving" means the *codebase* improves, not the user-facing product flow. Resolved 2026-05-12. See [[wiki/Knowcap/content-and-features/self-evolve-knowcap-agent]] for the authoritative version and the Sunday 2026-05-17 experiment playbook.
>
> Original 2026-05-06 capture preserved below for history.

---

# Self-improving SaaS plugin — Amplitude-style onboarding for new features

## Idea (Hassan, 2026-05-06, this session)

> Self-improving SaaS plugin with Amplitude-style onboarding for new features, with approve or reject button.

## Plain-English read

When Knowcap (or any SaaS shipping with this plugin) rolls out a new feature, the plugin runs an **in-app guided tour** in the Amplitude / Pendo / Userpilot style — tooltips, spotlights, step-through. At the end of the flow the user sees an **Approve** or **Reject** button. Approval keeps the feature live; rejection disables it for that user (or org) AND the feedback signal feeds back into the learning loop, so the system improves which features it ships, how it explains them, and which onboarding paths convert.

## Why it fits Knowcap's thesis

- The whole content-strategy-vision doc (`knowcap-content-strategy-vision.md`) is built on **human-in-the-loop on every ingest + every outbound, AI learns from approvals**. This idea applies the same pattern to **product changes themselves**: every new feature is an "outbound" the user approves or rejects.
- Closes a real loop most SaaS products don't close: today, feature flags ship features; analytics measures usage; PMs guess. Here, the user explicitly votes per-feature → instant signal, no guessing.
- Pairs naturally with the AI-First framing in `ai-first-framework-hasan-toor.md` — "test harnesses for product itself."

## Open questions (to fill before filing the Odoo ticket)

- **Outcome (Q1 of /idea flow):** what does "done" look like in one line? Best guess to confirm with Hassan: *"When Knowcap (and any SaaS using the plugin) ships a new feature, every active user gets an Amplitude-style guided onboarding overlay ending in Approve / Reject. Approve keeps it live; Reject disables it for that user + feedback feeds back into the learning loop that shapes future feature rollouts and onboarding flows."*
- **Impact (Q2 of /idea flow):** 1–5 stars
- **Scope:** Knowcap-only feature, or **standalone SaaS plugin** sold separately (the wording "SaaS plugin" suggests the latter — a product Knowcap could ship that other SaaS companies install)?
- **Distribution:** npm package? Browser extension? Drop-in script tag?
- **Backend:** does it need its own analytics store, or piggyback on Amplitude / PostHog?
- **Self-improving on what dimension** — onboarding copy? Step ordering? Whether the feature ships at all?

## Status

**/idea flow paused** mid-Q1 because Hassan asked for the folder audit. Resume by answering Q1 outcome → Q2 impact → file in Odoo project 141 stage 340 Planning.
