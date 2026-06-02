---
title: 3-level Instructions Hierarchy — Claude.ai parity for Knowcap (org / project / user)
captured: 2026-05-07
resolved: 2026-05-12
type: feature-idea
status: HEADLINE NEXT FEATURE on `hassan-instructions-hierarchy` worktree (all 5 design tensions resolved)
related: ["[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]", "[[wiki/Knowcap/content-and-features/ai-first-framework-hasan-toor]]", "[[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]]"]
worktree: "agents-research-complete-ui (work spawns hassan-instructions-hierarchy)"
---

# 3-level Instructions Hierarchy

## TL;DR

Claude.ai parity: every Knowcap org / project / user gets an **instructions** field that flows into the system-prompt composer. Three tiers. Each tier has a char limit. The system prompt is composed in a fixed precedence order. This is what Hassan meant in his 2026-05-07 raw note "MD file per user / org / project" — same content, **stored as text columns in Postgres, served as markdown over the API**, not as `.md` files in Storage.

## What gets built

- `organizations.instructions` — text column, **3000 char limit**, admin-only edit (matches Anthropic's hard cap).
- `projects.instructions` — text column, **8000 char limit**.
- `users.instructions` — text column, **8000 char limit**, plus `users.style_preset`.
- System-prompt composer that injects all three in a fixed precedence order (see below).
- 3 settings UI pages (one per tier).

## Composer precedence (top is highest)

```
safety → org → project → memory tiles (evidence-first) → RAG chunks → user → style → conversation
```

Last writer in the composed prompt wins per layer. No separate conflict resolver — precedence is the resolver.

## The 5 design tensions, resolved 2026-05-12

| # | Tension | Resolution |
|---|---|---|
| 1 | **MD-files-in-storage vs text-columns** | **Text columns.** Char limits free, RLS free (matches existing org/project ACLs), trivial diffing for history, single-query composer. The MD-on-disk feel is for [[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph#Context-Cards]] later, not this. |
| 2 | Free-text vs structured slots | **Free-text** for v1. Claude.ai parity. Add slots later if patterns emerge. |
| 3 | Conflict resolution org-vs-project | **Composer precedence wins; both still injected.** No resolver service needed. |
| 4 | Category-change-history | **Single `history` JSONB column per table.** Ordered array of `{at, by, prev, next}`. No audit table for v1. |
| 5 | Front-matter format | **None in v1.** Plain MD body. Front-matter is for the file-on-disk path not being taken. |

## Where the work happens

- Worktree: `hassan-instructions-hierarchy` (spawning from work already done in [agents-research-complete-ui](C:\Users\Eng.Hassan\Github\knowcap\worktrees\agents-research-complete-ui))
- Ready to spin up after the other agent finishes claims-and-evidence housekeeping (cleanup of two merged worktrees + merged remote branches).

## Fast-follow polish (separate, can ship anytime)

- **Assigner extractor prompt** — schema + UI are in but the Gemini prompt in the Supabase `prompts` table doesn't populate `assigner`. Patch the prompt row.
- **Graph + OrgMemoryStrip filter chips** — backend already excludes rejected memories; just needs a toggle UI.
- **`[EVIDENCE]` / `[claim — unverified]` tagging** in LLM prompts so the model can quote evidence preferentially. Sort order already prioritizes evidence; explicit tags let the model reason about it.

## Deferred until after this ships

- **Context Cards** — the prose-MD surface for richer instructions; if it happens, MD-on-disk in Supabase Storage becomes worth revisiting (this hierarchy stays text-columns regardless).
- **Dynamic memory categories** — sales orgs want "objections / strategies" not "tasks / risks." Context Cards handle this without schema change.
- **Structured chat output by category** ("Decisions: …, Risks: …, Tasks: …") — comes free from Context Cards via prose instruction.
- **RAG memory indexing** (memories → pgvector) — only if Context Cards don't cover the use case.
- **4th tier (team / workspace)** between org and project — flagged as potential edge over Claude if clients ask; not blocking v1.

## Why this fits Hassan's wiki pattern (and why text-columns still win)

Hassan's entire `llm-wiki/` lives as `.md` files on disk because he reads/edits them in Obsidian. The instinct "Knowcap should mirror that" is real. But:

- The wiki is **outside the app** (a git repo Hassan maintains). The instructions hierarchy is **inside the app** (multi-tenant SaaS with RLS).
- For multi-tenant data with permissions, char limits, and a system-prompt composer that runs on every chat turn, **rows beat files**.
- The API can still return `text/markdown` and the UI can still render an MD editor. The storage shape doesn't constrain the surface shape.

If users want to edit org instructions in Obsidian, they can — round-trip via a `GET/PUT /org/{id}/instructions.md` endpoint that maps to the column.

## History

- 2026-05-07 raw note: *"Md file for each user on knowcap and md file for organziation and md file for projects."*
- 2026-05-07 first synthesis: framed as MD-on-disk (mirroring Hassan's wiki pattern).
- 2026-05-12 grilling clarified it's the same surface as Claude.ai's instructions feature → text columns is the right shape. 5 design tensions resolved in one pass.
