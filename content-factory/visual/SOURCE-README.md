---
title: Knowcap Content Factory
created: 2026-05-21
owner: Hassan
status: scaffold (assets not yet generated)
---

# Knowcap Content Factory

Self-improving content generation pipeline for Knowcap (the SaaS). Combines Higgsfield (photorealistic), Hyperframes/Remotion (motion graphics), and Claude Design (no-code branded edits) into one feedback-looped factory.

## Folder map

```
knowcap-content/
├── brand/                  ← generation libraries (one per tool)
│   ├── higgsfield/         ← Rogue Keith blueprint: environments, models, products, outputs
│   │   ├── environments/   (empty — drop moodboard refs)
│   │   ├── models/         (empty — drop character sheets)
│   │   ├── products/       (empty — drop product sheets)
│   │   └── outputs/        (empty — Claude saves generations here)
│   ├── remotion/           ← React-based motion graphics
│   │   └── compositions/   (Claude writes React components here)
│   ├── hyperframes/        ← HTML-based motion graphics (preferred over Remotion for Knowcap)
│   └── claude-design/      ← exported HTML from claude.design (front-end for Hyperframes)
│
├── campaigns/              ← per-campaign work (launch-may/, product-hunt/, feature-{slug}/)
│
├── learnings/              ← distilled knowledge from 5 source videos (start here)
│   ├── 01-higgsfield-cli-rogue-keith.md
│   ├── 02-remotion-aiden-stannic.md
│   ├── 03-hyperframes-and-claude-design.md
│   ├── 04-higgsfield-mcp-chase.md
│   ├── 05-self-running-ai-company.md
│   └── 06-pinterest-api-moodboard-ingestion.md
│
├── wiki-strategy/          ← copied from wiki/Knowcap/content-and-features/
│   └── (12 files: knowcap-content-strategy-vision, content-production-plan, etc.)
│
└── inbox-ideas/            ← copied from arslan-ventures/content-and-features/
    ├── transcripts/        (Hassan's 2026-05-07 strategy + ideas-and-tasks transcripts)
    ├── ideas/              (knowcap-features.md)
    └── youtube/            (Karpathy + BoSar video notes)
```

## Tool selection (decided 2026-05-21)

| Need | Tool | Why |
|---|---|---|
| Photorealistic editorial, hero shots, ad creative, social lifestyle | **Higgsfield CLI** | Reference-grounded via UUIDs. Can ingest Knowcap brand photos. |
| Animated UI demos, dashboard reveals, "meeting→action items" loops | **Hyperframes** (front-ended by Claude Design) | Catalog of pre-built UI animations, transcript-sync, HTML→MP4. |
| Quick branded social clips, animated landing-page mockups | **Claude Design** alone | No-code, fast, Hassan already pays for it. |
| Source-of-truth for fallback | **Remotion** | Use only if Hyperframes localhost preview is broken. |

## Self-improvement loop (the moat)
- Every output logged to `feedback_tracker.csv` (Google Sheets)
- Approve / Reject / Pending + notes column
- Claude reads tracker on every new generation run → learns your taste
- Run on a 6 AM Cairo, Sun–Thu routine (respects your workweek rule)

## What is NOT in scope (deferred)
- Pinterest integration (no MCP; B2B SaaS doesn't convert there well — revisit post-launch)
- Layer-4 closed analytics loop (per [[learnings/05-self-running-ai-company]] — Knowcap channel data isn't connected yet)
- Visual regression tooling (per existing memory `project_no_visual_regression_prelaunch.md`)

## Next session
1. Read [[learnings/03-hyperframes-and-claude-design]] in full
2. Install Hyperframes via Claude Code (clone repo, ask Claude Code to set it up)
3. Build a 30-sec "Knowcap v3 is here" animated launch video using Claude Design → Hyperframes pipeline
4. If quality passes → install Higgsfield CLI, scaffold the reference library (10-15 moodboard refs)
5. Run a 10-image Higgsfield smoke test on "founder using Knowcap at desk"

## Source originals
- Wiki strategy folder was **copied** from `~/Github/knowledge/llm-wiki/wiki/Knowcap/content-and-features/` (originals intact, can be removed once you confirm this folder is the new source of truth)
- Inbox folder was **copied** from `~/Github/arslan-ventures/content-and-features/` (originals intact, same caveat)
