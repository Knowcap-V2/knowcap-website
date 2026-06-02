# Cross-source bridging — what these 4 sources say to each other

> Hassan's ask: "Connecting / supports / contradicts — watch that section, the bridging from this video." Below is a single map of the four 2026-05-07 inputs in those terms — supports / extends / contradicts. Light synthesis only; the underlying source files keep the full content.

## The four inputs

1. **[YouTube — AI Impact, "Don't Use Karpathy's Second Brain"](youtube/2026-05-07_AI-Impact_Karpathy-second-brain-typed-edges.md)** — knowledge graph with 10 typed edges (supports, contradicts, depends_on, derived_from, related_to, part_of, preceded_by, followed_by, authored, tagging) + 1-sentence summaries per node for token-cheap routing.
2. **[YouTube — Bo Sar, "AI-First Business Framework YC Just Revealed"](youtube/2026-05-07_BoSar_AI-First-Business-Framework-YC-playbook.md)** — Learn → Wire → Automate → Scale framework. Wire = build a queryable "business brain" of CLAUDE.md + Obsidian + live data. Automate = skills as SOPs with test harnesses.
3. **[Hassan voice memo — Knowcap content strategy 100%](transcripts/2026-05-07_knowcap-content-strategy-100pct.md)** — 5 memory categories (risk/decision/task/topic/party) × 3 autonomy levels (notify / research+propose / mitigate autonomously) + decision-tree-to-SOP + human-in-the-loop teaches the AI through every approval.
4. **[Hassan voice memo — Ideas and tasks important 97%](transcripts/2026-05-07_ideas-and-tasks-important-97pct.md)** — state-transitions between memories (decisions superseded, tasks completed/reassigned, risks mitigated, topics weighted by re-occurrence) + Read.ai live in Google Meet with last-10-meetings context.

## Bridging matrix

### A. The "typed-edge memory graph" core idea is converged from 3 sources

| Source | What it says | Edge type vocabulary |
|---|---|---|
| AI Impact video | Generic typed-edge taxonomy: 10 edges | supports / contradicts / depends_on / derived_from / part_of / preceded_by / followed_by / authored / related_to / tagging |
| Knowcap content-strategy memo | Decision tree references speakers + parties: "Decision X taken by Sam referencing Sarah" | implicit `authored`, `derived_from`, `referenced_by` |
| Ideas-and-tasks memo | Memories transform: superseded / mitigated / completed / reassigned / weighted | `superseded_by` / `mitigated_by` / `completed_by` / `reassigned_to` |

**These three SUPPORT each other strongly.** Knowcap already has the data shape (categorized memories + party links); the bridging-video supplies the abstract framing (typed edges); Hassan's ideas-memo supplies the *Knowcap-specific* edge names. Treat the AI Impact video as the design reference and Hassan's memo as the implementation vocabulary.

### B. "Business brain" (Bo Sar) and "Knowcap memory layer" (Hassan) are the same product, different framing

| Bo Sar's "Wire" step | Hassan's Knowcap |
|---|---|
| CLAUDE.md per company / project | MD-per-user / org / project (also captured today as a separate idea) |
| Obsidian knowledge base (links between docs) | Knowcap memory graph (links between meetings/decisions/risks) |
| Live data: sales transcripts, Slack, CRM, Stripe | Live data: meetings, phone calls (planned), Drive (planned, idea captured today) |
| Test harnesses + AI self-checks against your standards | Human-in-the-loop approval rules that teach the AI |

**SUPPORTS.** Bo Sar describes the surface (markdown + wiki + connectors); Hassan describes the operational model underneath (memory categories + autonomy levels + approval-driven learning). Same product, different layer.

### C. Where the sources EXTEND each other (not just repeat)

- **AI Impact's "1-sentence summary per node for cheap routing"** ➜ extends Knowcap's current memory pipeline. Knowcap stores full memory text; adding a forced 1-sentence summary on every memory item gives the agent the same token-aware retrieval the video describes.
- **Bo Sar's "test harness per skill"** ➜ extends Hassan's "human-in-the-loop approval teaches the AI." Today every approval edits behaviour implicitly. Bo Sar's framing says: also encode an explicit standard that the AI checks itself against. Together: define-the-standard + human-confirms-or-overrides = closed loop.
- **Hassan's "topic weighting by re-occurrence"** ➜ extends the AI Impact graph. The video has typed edges but flat node weights; Hassan's weighted topics are the next layer (importance-aware traversal across the graph).

### D. Where the sources CONTRADICT (or sit in tension)

- **AI Impact: Obsidian + manual graph curation** ⟷ **Hassan: extracted automatically from meetings, human only approves.** The video pitches a hand-built infinite brain; Hassan's whole bet is that the *extraction* must be automatic — humans only approve, never type. **Resolve:** keep AI Impact's *taxonomy* (the 10 edge types), drop its *workflow* (manual linking). Knowcap auto-suggests the edge type during extraction; the human approval that already exists in Hassan's design becomes the edge-type confirmation step.
- **Bo Sar: Claude Co-work for teams (plugin-sandboxed UI)** ⟷ **Hassan: meeting capture → automatic PRD → Claude Code opens a PR.** Bo Sar's positioning is "Co-work for non-technical teams"; Hassan's flagship demo is a 2-hour meeting that ends with a Claude Code PR already open. **Not a contradiction so much as a market-tier split:** Co-work is the front door for SMB customers, the meeting→PRD→PR pipeline is the founder/eng tier (or the back-office for SMB customers — they don't see the PR, they see the artifact).
- **AI Impact: graph as second brain for one person** ⟷ **Hassan: graph as team / org memory for hundreds of people in 6 countries.** The video's example is one founder thinking through pricing decisions; Hassan's claim is the architecture *only* shines at the org scale because importance + history confirms RAG accuracy across thousands of meetings. **Resolve:** Hassan's framing wins. The video author hasn't pressure-tested at org scale.

### E. The single sentence that ties all four together

> Knowcap is a typed-edge org memory graph (typed edges from AI Impact) auto-extracted from meetings (Hassan's content-strategy 5-category model), where every node carries a 1-sentence summary for token-cheap routing (AI Impact), every edge is approved by humans whose corrections train the AI (Hassan's HITL loop = Bo Sar's test harness), state transitions between memories are first-class (Hassan's superseded/mitigated/completed/reassigned), and the surface for the team is structured markdown per user / org / project (Bo Sar's Wire step + Hassan's MD-per-X idea captured today).

## Open questions Hassan should resolve

- **Edge taxonomy:** adopt all 10 from AI Impact, or just the subset Knowcap needs (supports, contradicts, depends_on, derived_from, authored, superseded_by, mitigated_by, completed_by, related_to)?
- **Where do per-node 1-sentence summaries live?** Existing memory `summary` column already handles it — just need to enforce a length bound and use it as the agent's first read instead of the full body.
- **Topic weighting algorithm:** simple re-occurrence count, or decay-weighted (recent re-occurrence > old)?
- **Read.ai vs Knowcap recorder:** is Read.ai still on the roadmap, or does Knowcap's own recorder ship live transcription with last-10-meetings context first?
- **CLAUDE.md per org / project:** is this a Knowcap export feature, or a native Knowcap surface that *replaces* CLAUDE.md (because Knowcap is the source of truth)?
