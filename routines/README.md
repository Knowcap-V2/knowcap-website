# Routines — knowcap-marketing

Scheduled / triggered work that operates on this repo. Each routine fires on a trigger (cron, file event, manual), runs one or more skills, and produces output (usually a PR for human review).

## Pattern

```
Routine (WHEN) → fires Skill(s) (WHAT) → produces Run (TRACKED) → drafts to Inbox (HUMAN CONFIRMS)
```

Borrowed from the [Knowcap product's own architecture](https://github.com/Knowcap-V2/knowcap/blob/main/docs/decisions/2026-05-29-agent-skills-routines-architecture.md). Inbox here = a PR you merge to confirm, close to reject.

## Layout

```
routines/
├── README.md                    ← this file
├── _skills/                     ← reusable skill definitions (the WHAT)
│   ├── write-blog-draft/SKILL.md
│   ├── audit-seo/SKILL.md
│   └── refresh-persona/SKILL.md
└── <routine-slug>/              ← one folder per routine
    ├── ROUTINE.md               ← human-readable: what it does, what it reads, what it produces
    ├── triggers.yml             ← cron / event triggers
    ├── inputs.md                ← exact paths read
    ├── outputs.md               ← exact paths written / PRs opened
    └── runs/                    ← run log (gitignored — see .gitignore)
```

## Routines in this repo

| Routine | Trigger | Skill | Output | Status |
|---|---|---|---|---|
| [`weekly-blog/`](./weekly-blog/) | Cron: Mon 06:00 UTC | `write-blog-draft` | PR to `docs/content-pipeline/drafts/` | stub |
| [`nightly-seo-audit/`](./nightly-seo-audit/) | Cron: daily 03:00 UTC | `audit-seo` | PR to `docs/research/audits/` if regression | stub |
| [`persona-refresh/`](./persona-refresh/) | Cron: monthly | `refresh-persona` | PR to `docs/brand/personas/` if signal shifts | stub |
| [`content-curator/`](./content-curator/) | Event: new file in `docs/research/` | (chain: read research → suggest blog topics) | Comment on the PR that added the research | stub |

## Status

All routines are **stubs**. The definitions (`ROUTINE.md`, `SKILL.md`) describe intended behavior but no runtime executes them autonomously yet. To run a routine manually today: open Claude Code in this repo, point it at the routine folder, ask it to follow the instructions.

## Phasing

| Phase | What |
|---|---|
| **P0 (now)** | Structure + stub definitions |
| **P1 (this week)** | Flesh out 1–2 `SKILL.md` files with real instructions, run manually via Claude Code |
| **P2 (next 2 weeks)** | Wire one routine to Hermes or GitHub Actions cron so it runs autonomously |
| **P3 (later)** | Multi-routine orchestration, eval suite, run-log dashboard |

## Why "routines" not "agents"

A routine is **trigger + skill chain + output contract**. It's procedural — not an autonomous LLM loop.

The word "agent" is overloaded:
- **Claude Code subagents** — short-lived helpers Claude Code spawns (lives in `.claude/agents/`)
- **Shipped product agents** — agents Knowcap customers run (lives in `Knowcap-V2/knowcap-agents`)
- **Autonomous LLM agents** — multi-step planners with tool use and decision loops

What lives here is none of those. It's scheduled work that runs a skill — a routine. Same name the Knowcap product uses for the same pattern. Same name Hassan uses for his 9 cloud routines in `av-claude-workspace/`.
