---
title: Typed-edge knowledge graph — relationships between memories, not just classification
captured: 2026-05-07
resolved: 2026-05-12
type: feature-idea + design-reference
status: design reference for memory schema work (no dedicated ticket; folds into Instructions Hierarchy + future memory-schema PR)
source_video: "AI Impact — Don't Use Karpathy's Second Brain (I BUILT SOMETHING BETTER), https://youtu.be/z02Y-1OvWSM"
source_raw: "[[raw/bookmarks/youtube/2026-05-07_AI-Impact_Karpathy-second-brain-typed-edges]]"
related: ["[[wiki/Knowcap/content-and-features/memory-state-transitions]]", "[[wiki/Knowcap/content-and-features/instructions-hierarchy]]", "[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]"]
---

# Typed-edge knowledge graph

## TL;DR

A 12:43 YouTube video from "AI Impact" (riffing on a Karpathy direction shift) proposed building knowledge as **small atomic nodes with typed edges** between them — not big linked documents. The load-bearing idea: **edges carry semantic meaning**, so AI can route through the graph without reading every neighbor's body. Knowcap already has the data shape (categorized memories + party links); this video supplies the abstract framing and edge-type vocabulary.

## The 10 typed edges from the video

| Edge | Meaning |
|---|---|
| `supports` | Argument A backs argument B |
| `contradicts` | A disagrees with B |
| `depends_on` | A only true if B is true |
| `derived_from` | A was created out of B |
| `related_to` | Loose catch-all |
| `part_of` | A is a sub-component of B (e.g. tactic part_of strategy) |
| `preceded_by` / `followed_by` | Sequence (great for SOPs) |
| `authored` | Who/what produced this (human, Claude, ChatGPT, human+AI) |
| `tagging` | Generic fallback |

## Knowcap's adopted subset (resolved 2026-05-12)

Use **9 of the 10**. Drop `tagging` as redundant with `related_to`. Add 4 Knowcap-specific edge types from [[wiki/Knowcap/content-and-features/memory-state-transitions]]:

| Edge | Source | Why |
|---|---|---|
| `supports` | AI Impact | Direct adoption |
| `contradicts` | AI Impact | Direct adoption |
| `depends_on` | AI Impact | Direct adoption |
| `derived_from` | AI Impact | Direct adoption |
| `related_to` | AI Impact | Direct adoption |
| `part_of` | AI Impact | Direct adoption |
| `preceded_by` / `followed_by` | AI Impact | SOP sequencing |
| `authored` | AI Impact | Maps to Knowcap speaker / party model |
| `superseded_by` | Hassan memo | Decisions get overridden by later decisions |
| `mitigated_by` | Hassan memo | Risks get killed by tasks |
| `completed_by` | Hassan memo | Tasks finish |
| `reassigned_to` | Hassan memo | Ownership shifts |

## Per-node 1-sentence summary

Each node carries a **forced 1-sentence summary**. The AI spends ~50 tokens reading the summary, then *decides* whether to read the full body. Token-aware retrieval is built into the data model, not just the prompt.

**Knowcap implementation (resolved 2026-05-12):**
- Use the **existing `summary` column** on the memory table.
- Enforce a 200-char hard bound at write time.
- Update the agent's read pattern to read `summary` first, then expand to body only when needed.
- **No new schema** — this is a discipline change, not a migration.

## Where Knowcap diverges from the video

| Video position | Knowcap position |
|---|---|
| Obsidian + manual graph curation | Auto-extracted from meetings; humans only approve, never type |
| Graph as second brain for one person | Graph as team/org memory for hundreds of people |
| Flat node weights | **Decay-weighted topic re-occurrence** (30-day half-life) — see [[wiki/Knowcap/content-and-features/memory-state-transitions]] |

Resolve by **keeping the video's taxonomy and dropping its workflow.** Knowcap auto-suggests edges during extraction; the existing human-approval step becomes the edge-type confirmation step.

## Why it matters for Knowcap

- Today Knowcap stores memories with categories (task / risk / decision / fact / general / people). **Typed edges are the next layer** above that — relationships *between* memories, not just classification of single memories.
- The video's framing gives Knowcap a vocabulary to describe what its memory system already does, in language the market (Karpathy-followers, AI-builders) already understands.
- Pairs naturally with [[wiki/Knowcap/content-and-features/instructions-hierarchy]] — instructions become nodes; their `authored` / `derived_from` / `supports` edges back into meeting memories become an implicit audit trail.

## Hassan's flagged timestamp

**07:33–09:09** — the typed-edge taxonomy walk-through. Worth re-watching when designing the relationship schema.

## Open follow-ups (not blocking)

- Decide the storage shape of edges: separate `memory_edges` table, or JSONB on each memory? Postgres can do both; the answer depends on traversal patterns we haven't measured yet.
- Topic-weighting algorithm: currently resolved as decay-weighted re-occurrence with ~30-day half-life. Validate the half-life with real Knowcap data after Instructions Hierarchy ships.

## History

- 2026-05-07: video watched, captured in [[arslan-ventures/content-and-features/youtube/2026-05-07_AI-Impact_Karpathy-second-brain-typed-edges]] and bridged into [[arslan-ventures/content-and-features/_bridging-supports-contradicts]].
- 2026-05-12: edge subset locked, summary column reuse locked, weighting algorithm locked, schema-shape question parked.
