---
title: Cross-source bridging — what the 4 May-7 inputs say to each other (supports / extends / contradicts)
captured: 2026-05-07
resolved: 2026-05-12
type: synthesis
status: bridging map across 4 May-7 inputs; all 5 open questions resolved 2026-05-12
related: ["[[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]]", "[[wiki/Knowcap/content-and-features/memory-state-transitions]]", "[[wiki/Knowcap/content-and-features/instructions-hierarchy]]", "[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]", "[[wiki/Knowcap/content-and-features/ai-first-framework-hasan-toor]]"]
---

# Cross-source bridging — supports / extends / contradicts

> Hassan flagged this bridging exercise himself: *"Connecting / supports / contradicts — watch that section."* Below is a single map of the four 2026-05-07 inputs in those terms. The underlying source files (in `raw/`) keep the full content.

## The four inputs

1. **[[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]]** — AI Impact video on Karpathy's second-brain shift toward typed-edge knowledge graphs.
2. **[[wiki/Knowcap/content-and-features/ai-first-framework-hasan-toor]]** — Bo Sar / "Hasan Toor" video on the AI-First Learn→Wire→Automate→Scale framework.
3. **[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]** — Hassan's voice memo on the 5-category × 3-autonomy-level model.
4. **[[wiki/Knowcap/content-and-features/memory-state-transitions]]** — Hassan's voice memo on memory state transitions + Read.ai-equivalent live transcription.

## Bridging matrix

### A. The typed-edge memory graph converged from 3 sources (SUPPORTS)

| Source | What it says | Edge vocabulary |
|---|---|---|
| AI Impact video | Generic typed-edge taxonomy: 10 edges | `supports / contradicts / depends_on / derived_from / part_of / preceded_by / followed_by / authored / related_to / tagging` |
| Knowcap content-strategy memo | Decision tree references speakers + parties | implicit `authored`, `derived_from`, `referenced_by` |
| Memory-state-transitions memo | Memories transform | `superseded_by / mitigated_by / completed_by / reassigned_to` |

These three sources **strongly support** each other. Knowcap has the data shape; the video supplies the abstract framing; Hassan's memo supplies the Knowcap-specific edge names. **Treat the video as the design reference and Hassan's memo as the implementation vocabulary.**

### B. "Business brain" (Bo Sar) and "Knowcap memory layer" (Hassan) are the same product (SUPPORTS)

| Bo Sar's "Wire" step | Hassan's Knowcap |
|---|---|
| CLAUDE.md per company / project | [[wiki/Knowcap/content-and-features/instructions-hierarchy]] (text columns, served as MD) |
| Obsidian knowledge base | Knowcap memory graph (links between meetings/decisions/risks) |
| Live data: sales transcripts, Slack, CRM, Stripe | Live data: meetings + planned phone calls + [[wiki/Knowcap/content-and-features/google-drive-writeback]] |
| Test harnesses + AI self-checks against your standards | Human-in-the-loop approval rules that teach the AI |

Same product, different framing. Bo Sar describes the surface; Hassan describes the operational model.

### C. Where the sources EXTEND each other

- **AI Impact's "1-sentence summary per node for cheap routing"** ➜ extends Knowcap's current memory pipeline. Hassan's existing `summary` column already handles this — just need to enforce a length bound (200 char) and use it as the agent's first read. **Resolved 2026-05-12.**
- **Bo Sar's "test harness per skill"** ➜ extends Hassan's "human-in-the-loop approval teaches the AI." Today every approval edits behaviour implicitly. Bo Sar's framing says: also encode an explicit standard that the AI checks itself against. Together: define-the-standard + human-confirms-or-overrides = closed loop. Pattern lives inside [[wiki/Knowcap/content-and-features/self-evolve-knowcap-agent]]'s quality bar.
- **Hassan's "topic weighting by re-occurrence"** ➜ extends the AI Impact graph. The video has typed edges but flat node weights; Hassan's weighted topics are the next layer (importance-aware traversal). **Resolved 2026-05-12: decay-weighted with ~30-day half-life.**

### D. Where the sources sit in TENSION

- **AI Impact: Obsidian + manual graph curation** ⟷ **Hassan: extracted automatically from meetings, humans only approve.** Resolved: keep the *taxonomy* (the 10 edge types), drop the *workflow* (manual linking). Knowcap auto-suggests edges during extraction; the existing human-approval step becomes the edge-type confirmation step.
- **Bo Sar: Claude Co-work for teams (plugin-sandboxed UI)** ⟷ **Hassan: meeting → PRD → Claude Code PR in real time.** Not a contradiction — a market-tier split: Co-work is the front door for SMB; the meeting→PRD→PR pipeline is the founder/eng tier (or the back-office for SMB customers).
- **AI Impact: graph for one person** ⟷ **Hassan: graph for hundreds of people in 6 countries.** Hassan's framing wins. The architecture only shines at org scale because importance + history confirms RAG accuracy across thousands of meetings.

### E. The single sentence that ties all four together

> **Knowcap is a typed-edge org memory graph (typed edges from AI Impact) auto-extracted from meetings (Hassan's 5-category model), where every node carries a 1-sentence summary for token-cheap routing (AI Impact), every edge is approved by humans whose corrections train the AI (Hassan's HITL = Bo Sar's test harness), state transitions between memories are first-class (Hassan's superseded/mitigated/completed/reassigned), and the surface for the team is structured markdown per user / org / project (Bo Sar's Wire step + Hassan's MD-per-X = [[wiki/Knowcap/content-and-features/instructions-hierarchy]]).**

## The 5 open questions — RESOLVED 2026-05-12

| # | Question | Resolution |
|---|---|---|
| 1 | Edge taxonomy: all 10 from AI Impact, or subset? | **Subset.** Drop `tagging` (redundant with `related_to`). Adopt the other 9 + 4 Knowcap-specific (`superseded_by`, `mitigated_by`, `completed_by`, `reassigned_to`). See [[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]]. |
| 2 | Where do per-node 1-sentence summaries live? | **Existing `summary` column** with a 200-char hard bound enforced at write time. Use it as the agent's first read. No new schema. |
| 3 | Topic weighting algorithm: simple count or decay-weighted? | **Decay-weighted re-occurrence** with ~30-day half-life. Flat counts overweight ancient topics. Validate half-life with real data after Instructions Hierarchy ships. |
| 4 | Read.ai vs Knowcap recorder? | **Knowcap recorder first.** Read.ai stays competitive intel, not roadmap. Live transcription with last-10-meetings context is Knowcap's own roadmap. |
| 5 | CLAUDE.md per org / project: Knowcap export feature or native surface? | **Native surface.** Built as [[wiki/Knowcap/content-and-features/instructions-hierarchy]]: text columns on `organizations`/`projects`/`users`, served as markdown over the API. Knowcap is the source of truth; CLAUDE.md becomes a downstream export if anyone asks. |

## History

- 2026-05-07: original bridging file written at [[arslan-ventures/content-and-features/_bridging-supports-contradicts]] with 5 open questions.
- 2026-05-12: grilling session resolved all 5 + locked the 4 input syntheses + promoted to wiki.
