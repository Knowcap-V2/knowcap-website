---
title: Memory state transitions — superseded / mitigated / completed / reassigned / weighted as first-class
captured: 2026-05-07
resolved: 2026-05-12
type: feature-idea + memory-schema-design
status: design reference for future memory-schema PR (no dedicated ticket; feeds Instructions Hierarchy follow-up)
source_audio: "Hassan voice memo, ~3:50, Pictures/Screenshots/Ideas and tasks important level 97%.m4a"
source_raw: "[[raw/research/2026-05-07_ideas-and-tasks-important-97pct]]"
related: ["[[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]]", "[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]"]
---

# Memory state transitions

## TL;DR

Hassan's 2026-05-07 voice memo ("important level 97%") added the missing piece to Knowcap's memory model: today memories accumulate additively (more risks, more decisions, more tasks); the model needs **state transitions between memories** as first-class. Decisions get **superseded**. Tasks get **completed** or **reassigned**. Risks get **mitigated**. Topics get **weighted by re-occurrence**. This is what unlocks **RAG accuracy at org scale** — without state transitions, a thousand-meeting database accumulates contradictions and stale signal.

## The five state-transition primitives

| Memory category | Transitions |
|---|---|
| **Decision** | `superseded_by` |
| **Task** | `completed`, `reassigned_to`, `ignored_due_to_prior_meeting` |
| **Risk** | `mitigated_by` |
| **Party** | cross-meeting reference count (`mentioned_in_count`) |
| **Topic** | re-occurrence weight (decay-applied, ~30-day half-life — resolved 2026-05-12) |

## Live transcription with context

Bundled with the state-transitions idea but architecturally separate: Hassan wants **Read.ai (or Knowcap's own recorder)** embedded inside Google Meet for live transcription, loaded with **context from the last 10 meetings of the same kind / same speakers**. Two wins:

1. Better transcription (the model knows the team's vocabulary).
2. Summaries that are "adjacent to" prior meetings — not standalone.

**Resolved 2026-05-12:** Knowcap recorder first, not Read.ai. Live transcription with last-10-meetings context is Knowcap's own roadmap, not a Read.ai integration. Read.ai stays competitive intel.

## Cross-meeting RAG at org scale

Hassan's claim: with importance + history confirmed for every memory item, a RAG database scales from hundreds to thousands of meetings without quality decay. This is the **moat** vs Claude/ChatGPT chat-memory:

| Chat-memory (Claude/ChatGPT) | Knowcap memory |
|---|---|
| Per-user, text-only | Per-org, meeting visuals + audio + text |
| Additive only | State transitions across meetings |
| Solo coder use case | Team / org use case at scale |
| Memories drift, contradict, age | Memories get superseded / mitigated / completed — drift is *visible*, not silent |

> Self-quote from the memo: *"This is truly artificial intelligence — not the lame-ass coding memory systems Claude and ChatGPT invented."*

## Connection to typed-edge graph

The state transitions ARE typed edges. See [[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]] for the full edge taxonomy. Adopting Hassan's vocabulary:

- `superseded_by`, `mitigated_by`, `completed_by`, `reassigned_to` join the 9 edges adopted from the AI Impact video.
- Cross-meeting RAG with importance + history = graph traversal that walks `superseded_by` chains backward to find "decisions still in effect."

## Concrete features to extract (when this becomes a ticket)

| Feature | Where it lives |
|---|---|
| Read.ai-equivalent live in Google Meet (Knowcap recorder, not post-meeting) | Meeting capture layer |
| Context-loaded transcription (last 10 same-kind meetings) | Whisper / RAG pre-prompt |
| `decisions.superseded_by` relation | Memory schema |
| `tasks.completed_by_prior_meeting`, `tasks.reassigned_to` relations | Memory schema |
| `risks.mitigated_by` relation | Memory schema |
| `parties.mention_count` aggregate | Memory schema (or materialized view) |
| Topics: decay-weighted re-occurrence score | Memory schema (or computed on read) |
| Cross-meeting RAG with importance + history | RAG retrieval layer |

## Why this is parked, not built

The state-transition primitives don't gate Instructions Hierarchy (the [[wiki/Knowcap/content-and-features/instructions-hierarchy]] ship). They feed the **memory-schema PR that comes after** Instructions Hierarchy lands. Premature schema work risks colliding with the Instructions Hierarchy migration.

## Hassan's closing line, verbatim

> "Oh my god, I'm on to something big. I feel it. I feel like I'm on to something very very big. Let me know."

## History

- 2026-05-07 voice memo captured.
- 2026-05-12: state-transition vocabulary locked, decay-weighted topic algorithm locked, Read.ai-vs-Knowcap-recorder resolved (Knowcap first).
