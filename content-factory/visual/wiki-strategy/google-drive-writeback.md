---
title: Google Drive write-back — agents update SOPs from meetings
captured: 2026-05-07
resolved: 2026-05-12
type: feature-idea
status: ABSORBED into agents-research-complete-ui worktree (no separate ticket)
supersedes: "[[wiki/Knowcap/content-and-features/google-drive-ingest]]"
related: ["[[wiki/Knowcap/content-and-features/instructions-hierarchy]]", "[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]"]
---

# Google Drive write-back

## TL;DR

Knowcap doesn't ingest Drive — Knowcap **writes back to Drive.** A meeting happens. A user-configured Knowcap agent listens for facts about a specific topic in a specific project. When the trigger fires, the agent updates the **specific Drive doc that owns that SOP**. Drive is the *output* surface; meetings are the *input*; the agent is the bridge that keeps written SOPs in sync with how the team actually operates.

## What the user configures

User-written rule, not autonomous behaviour. Shape: *"When a fact about topic X is mentioned in project Y, connect to Drive and perform action Z on file F."* The agent doesn't decide on its own; it executes the rule.

- **Trigger:** project + topic match (detection mechanism resolved inside the agents-research-complete-ui worktree)
- **Integration:** Google Drive (one of the wired integrations in the agent UI)
- **Action:** specified by the user (append to a section, replace a section, add a row to a table)
- **Auth surface:** OAuth as the user who set up the agent (creator-bound, not service-account)

## What we are NOT building separately

Three earlier framings were rejected on 2026-05-12:

| Framing | Verdict |
|---|---|
| Drive *ingestion* (Drive → Knowcap memory) | NOT the idea. Drive is output, not input. |
| Autonomous agent that decides which doc to update | NOT the idea. Users configure rules; agents execute. |
| Standalone Drive-sync product | NOT the idea. It's one integration on the agents framework. |

## Where the work happens

[agents-research-complete-ui worktree](C:\Users\Eng.Hassan\Github\knowcap\worktrees\agents-research-complete-ui) — Drive is one of the integrations being wired alongside GitHub and other services. **No standalone ticket.** Trigger language, auto-fire-vs-queue, and approval-gate decisions are all resolved inside that worktree's design.

## Open design questions (live inside the worktree, not here)

- Trigger language UX: free-text intent vs tag/category match vs hybrid?
- Auto-fire on rule match, or queue as approve/reject card in user's inbox first?
- Drift detection when humans edit the SOP in Drive between agent runs?
- Conflict resolution when two agents target the same doc?

## Cross-references

- **Same product, different framing:** [[wiki/Knowcap/content-and-features/ai-first-framework-hasan-toor]] — the "business brain" with live data flowing back to artefacts.
- **State-transition semantics:** [[wiki/Knowcap/content-and-features/memory-state-transitions]] — *what* the agent writes (a `superseded_by` decision, a `mitigated_by` risk) maps to Hassan's memory state-transition vocabulary.
- **Typed edges as content:** [[wiki/Knowcap/content-and-features/typed-edge-knowledge-graph]] — the agent's update can be expressed as a typed edge between the meeting memory and the Drive doc.

## History

- 2026-05-07 raw idea: "knowcap ingests google drive organizes it and keeps it updated" (misleading wording)
- 2026-05-12 grilling session clarified: not ingest — write-back, agent-driven, user-configured
