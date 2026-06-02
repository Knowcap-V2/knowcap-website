---
title: Self-Running AI Company — the 4-layer architecture
source: https://youtube.com/watch?v=Baa71rPgxvA
author: Silicon Valley Girl (Marina Mogilko)
duration: ~16m
watched: 2026-05-21
tags: [architecture, claude-cowork, knowledge-layer, scheduled-agents]
applies_to: Knowcap content ops — gives the org-chart this whole stack should sit in
---

# Self-Running AI Company — the 4-layer architecture

## The big idea
She frames the whole AI-content stack as **4 layers**. This is the right architecture to organize all the other learnings into. Without layer 1, layers 2-4 just add chaos.

## The 4 layers

### Layer 1 — Queryable knowledge base
- Single source of truth, **agent-portable** (so you can swap LLMs without re-uploading everything)
- Organized by social channel: views, performance, transcripts, tone of voice, brand
- Personal docs: personal constitution (decisions you make / don't make), business strategy, **anti-AI file** ("content shouldn't sound like AI")
- Simplest implementation: organized Google Drive folders
- Hassan equivalent already exists: `llm-wiki/` + `~/.claude/projects/.../memory/`

### Layer 2 — AI on top of knowledge
- Not just "Claude project" (browser, read-only)
- Use **Claude Cowork / Claude Code desktop app** — can open files, edit docs, run scripts, take actions
- Layered instructions: master folder has overall context (voice, audience, goals), subfolder has task-specific SOP
- Pattern: every agent reads master CLAUDE.md → reads task-layer instructions → executes
- Hassan equivalent already exists at the wiki + workspace CLAUDE.md level

### Layer 3 — Scheduled agents
- Monday 9 AM: trending-content scan, drops 10 video ideas in a doc
- Twice-daily: CRM autopilot
- Hassan equivalent already exists: master-brain routine + `mb-*` skills

### Layer 4 — Full closed-loop (her current frontier)
- AI not just produces content but reviews, measures performance, adjusts strategy
- Connects to platform analytics, post-publish data, A/B winners
- Feeds back into Layer 1 → strategy refines automatically

## The Higgsfield demo she shows (relevant to the marketing plan)
She tested:
- Gave Claude links to her last 5 newsletter posts
- One prompt: *"Turn the strongest hook into three video acts"*
- Claude read all 5 posts, picked the best hook, wrote 3 scripts, generated 3×15s videos via Higgsfield MCP, saved to output folder
- **4 minutes end-to-end while she was on a call**
- Confirms Higgsfield works with **Claude Code + OpenClaw + agents + Hermes** (Hassan runs Hermes ✓)

## The "anti-AI file" idea (worth stealing)
She keeps a file listing patterns content should NOT exhibit: AI cadence, em-dash overuse, hedge phrases, "in today's fast-paced world" intros, etc. Every agent reads this on every generation. Knowcap content should have this.

## What applies to Knowcap — concrete

### Map Hassan's existing infrastructure to her 4 layers

| Her layer | Hassan equivalent | Status |
|---|---|---|
| L1 knowledge base | `llm-wiki/`, auto-memory, team-contacts.json, brand tokens | ✅ already strong |
| L2 AI on top | Claude Code + CLAUDE.md hierarchy + skills (`abdelaziz-scorecard`, `Claude-Knowcap-work`, etc.) | ✅ already strong |
| L3 scheduled agents | Master brain routine, mb-* chain | ✅ already strong |
| L4 closed loop | NOT YET — would need: Knowcap channel analytics → feedback CSV → strategy refinement | 🟡 Greenfield |

**Implication:** Hassan's L1-L3 are already mature. The marginal gain isn't building infrastructure — it's plugging the **content generation tools** ([[01-higgsfield-cli-rogue-keith]], [[03-hyperframes-and-claude-design]]) into the existing layers, and starting to build L4 specifically for Knowcap content performance.

## Add to Knowcap content factory
Create `brand/anti-ai-rules.md` before any generation runs. List Knowcap's banned patterns (e.g., no "revolutionary AI-powered", no em-dash chains, no "in today's fast-paced world", etc.).

## See also
- [[01-higgsfield-cli-rogue-keith]] — slots into her L2-L3
- [[03-hyperframes-and-claude-design]] — also L2-L3
- [[../wiki-strategy/knowcap-content-strategy-vision]] — Hassan's own strategy doc (the L1-overlap)
