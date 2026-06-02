# Don't Use Karpathy's Second Brain (I BUILT SOMETHING BETTER)

- **URL:** [https://youtu.be/z02Y-1OvWSM](https://youtu.be/z02Y-1OvWSM)
- **Channel:** AI Impact
- **Duration:** 12:43
- **Captured:** 2026-05-07
- **Hassan flagged:** "Connecting / supports / contradicts — watch that section, the bridging from this video"

---

## Light synthesis (3-5 bullets)

- Thesis: PARA / "Building a Second Brain" produces big linked documents that are bad fuel for AI; instead, build an **"infinite brain"** of small atomic nodes with **typed edges** between them. Andrej Karpathy is publicly shifting the same direction — knowledge graphs over long docs.
- The 10 typed edges are the load-bearing idea — links carry semantic meaning, not just adjacency:
  - **supports** — argument A backs argument B
  - **contradicts** — A disagrees with B
  - **depends_on** — A only true if B is true
  - **derived_from** — A was created out of B
  - **related_to** — loose catch-all
  - **part_of** — A is a sub-component of B (e.g. tactic part_of strategy)
  - **preceded_by** / **followed_by** — sequence (great for SOPs)
  - **authored** — who/what produced this (human, Claude, ChatGPT, human+AI)
  - **tagging** — generic fallback
- Why typed: with plain links, AI must read the full body of every neighbor to figure out *why* it's linked. With typed edges the AI can route — "I'm answering a pricing question, I should walk `supports` and `derived_from` edges, ignore `preceded_by` (operational)." Cuts tokens hard.
- Each node carries a **one-sentence summary** ("the idea in one sentence"). The AI spends ~50 tokens on the summary, then *decides* whether to spend more reading the full node. Token-aware retrieval is built into the data model, not just the prompt.
- Pitch wraps with: this outlives the team — institutional knowledge survives turnover, new hires + AI can answer "why was this priced this way" without being on the original calls.

## Relates to

- **Knowcap memory model** — Knowcap already extracts memories with categories (task / risk / decision / fact / general / people). The video's "typed edges" is the next layer above that: relationships *between* memories, not just classification of single memories.
- **MD-per-user / org / project idea (also captured today)** — these MD files are nodes; typed edges between them are exactly what this video advocates.
- **Cross-source bridging** — Hassan explicitly called this out as the section he wants Knowcap to learn from. See `transcripts/_bridging-supports-contradicts.md` for the cross-source synthesis.

## Key timestamp Hassan flagged

- **07:33–09:09** — the typed-edge taxonomy walk-through. Worth re-watching when designing the Knowcap relationship schema.

## Raw transcript (07:00–11:00 — the section Hassan called out)

```
[07:33] An edge basically means like connecting from one to the other. Like, what is
       the connection? Instead of just saying "Hey, they link." it's like, "What is
       the nature of that link?"
[07:43] So, I have supports — basically like this argument supports another argument.
[07:47] Or contradicts. Those are two very different ways you want to link something.
[07:55] depends on — for this to be true, this other thing must be true.
[07:59] derived from — this was created based on this other idea.
[08:03] Related to — a little catch-all if it's unclear what it's related with.
[08:09] part of — like, I have my infinite brain system, I may have these tactics
       inside it, those are all part of my infinite brain strategy.
[08:20] preceded by — something that happens beforehand. Step three is preceded by
       step two. Followed by — kind of the opposite.
[08:31] Authored — Who made this? Was this Claude? Was it a human? Was it a human
       plus Claude? Was it ChatGPT?
[08:37] And then also just tagging — generic fallback if it doesn't fit one of those.
[08:46] Why I love this: otherwise AI would just see "Hey, this is linked together"
       — but it would have to read everything about it to know why. With typed
       edges it can decide where to walk without burning tokens on irrelevant
       content.
[09:07] These 10 edge types give the AI the ability when it's looking at one node
       to decide where else it wants to go.
[10:58] Each node has a quick summary — "the idea in one sentence." The AI spends
       50 tokens reading the sentence, then decides whether to go deeper.
```
