# Competitor Analysis

Sales-facing competitive positioning. One folder per competitor. Each contains:

- `architecture.md` — how the product actually works under the hood
- `positioning.md` — the angle Knowcap leads with vs them, grounded in `docs/VISION.md`
- `index.md` — folder index + source recording pointers

## Real threat envelope (per [knowcap/docs/POSITIONING.md](https://github.com/Knowcap-V2/knowcap-marketing/blob/main/brand/POSITIONING.md))

After the 2026-05-19 trust-layer reframe, our competitive picture is sharper. **Read.ai is not the Tier-1 threat** — Glean, Zep, and Tana are. Read.ai is the most-encountered alternative in conversations and we still need the angle for it, but our build priority on additional competitor docs should match the actual threat hierarchy.

| Competitor | Tier | Why it matters |
|---|---|---|
| **Glean** | 1 — closest threat | $7.2B valuation; Fellow meeting integration shipped Jan 2026; one quarter away from a "verified" pill |
| **Zep / Graphiti** | 1 — architectural twin | Open-source typed-edge memory with contradiction detection; anyone could wrap it in a meeting UX |
| **Tana** | 1 — spiritual sibling | New Tana launched March 2026: meetings + collaborative graph + agents |
| **Otter.ai** | 2 — pivoted in April 2026 | "Conversational Knowledge Engine" reframe pushed them into Glean's category |
| **Read.ai** | 2 — the noisy one | Notetaker with MCP + agents; loud but not architecturally close to our thesis |
| **Mem0 / Letta** | 3 — infra layer | Sold to developers, not end users; integration target, not competitor |
| **Fathom / Granola / Fireflies / Tactiq** | 3 — productivity tier | Pure notetakers; commodity category; we don't fight here |

## Folders

| Competitor | Status | Last refreshed |
|---|---|---|
| [`read.ai/`](read.ai/) | ✅ Built (rewritten 2026-05-19 with trust-layer framing) | 2026-05-19 |
| `glean/` | Queued — **highest priority** (Tier 1) | — |
| `zep-graphiti/` | Queued — Tier 1 architectural twin | — |
| `tana/` | Queued — Tier 1 spiritual sibling | — |
| `otter.ai/` | Queued — Tier 2 pivoter | — |
| `recall.ai/` | Queued — Tier 3 | — |
| `fathom.video/` | Queued — Tier 3 | — |
| `granola.ai/` | Queued — Tier 3 | — |
| `tactiq.io/` | Queued — Tier 3 | — |

## Source material

Raw research lives in `~/Github/knowledge/llm-wiki/wiki/Knowcap/competitors/` — Apify scrapes, transcripts of competitor onboarding walkthroughs, video downloads. This folder copies only the synthesized analysis. Don't bloat marketing with research artifacts.

## How to use these

Before any client conversation where the prospect names a competitor:

1. Open the matching `<competitor>/positioning.md`
2. Read the "When this angle WINS / LOSES" section
3. Note "What's true today vs aspirational" — never promise vision-only surfaces in a sales call

If the buyer hasn't named a competitor yet but is asking about category, default to the read.ai positioning — it's our most-encountered alternative and the angle generalizes.
