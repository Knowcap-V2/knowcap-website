# Product Marketing Context — Knowcap

*Last updated: 2026-06-10. Built from VISION.md + POSITIONING.md + MOAT.md + commitment-thesis.md. Feeds copywriting / cro / copy-editing / competitors / pricing skills.*

## Product Overview
**One-liner:** Knowcap is the trust layer for AI agents — every fact they act on is confirmed by a named human, with a full audit trail.
**What it does:** Captures meetings, calls, chats, and docs; AI extracts every decision, task, risk, commitment, and person mentioned; a named human confirms each one with one tap; AI agents then act only on the confirmed facts — drafting emails, opening PRs, creating Odoo tasks — with full provenance.
**Product category:** Verified institutional memory / trust layer for AI agents. (NOT a meeting notetaker, NOT a knowledge graph, NOT AI memory infra.)
**Product DNA:** Otter + Loom + NotebookLM, verified.
**Product type:** B2B/B2C SaaS + MCP server (works inside Claude, Codex, Gemini).
**Business model:** Self-serve free → paid seats (B2C, MCP power-users); team/org tier (B2B). Target $50–200/seat/mo partners, $100–500/seat/mo regulated.

## Lead Narrative (locked 2026-06-04)
**An organization is a web of commitments** — internal (employee↔manager) and external (client, partner, supplier). Every commitment carries risk. Risk is mitigated by decisions and tasks. Tasks fulfil commitments. Commitments live in conversations — and die there, because no system watches them. Knowcap captures every commitment spoken aloud, flags every risk against it, tracks the mitigation, and lets agents act only after a named human confirms.

## The 3 locked positioning sentences (use verbatim — never invent new ones)
| Surface | Sentence |
|---|---|
| Formal / investor | "Knowcap is the trust layer for AI agents — every fact they act on is confirmed by a named human, with a full audit trail." |
| **Landing hero / demo opener** | "Most AI agents act on what the AI thinks is true. Knowcap agents act only on what a human said is true." |
| Footer / 12-word brand line | "Knowcap is verified knowledge for AI agents. Humans confirm. Agents act." |

## Target Audience
**Primary (homepage):** AI power-users + agency/consultancy operators (10–200 employees) already running Claude/agents who fear acting on wrong info; multi-company founders losing decisions across orgs.
**Channel:** Odoo partners (MENA: ~470 across Egypt/Saudi/UAE) — distribution, not the headline persona.
**Phase 2:** Regulated verticals (finance/legal/health) — compliance-mandated human attestation.
**Jobs to be done:**
- "Stop my agents from acting on hallucinated or stale info"
- "Catch scope creep before it eats my margin" (agencies)
- "Remember what was decided across all my companies" (founders)
- "Give my regulator a named human signature on every AI action" (regulated)

## Anti-persona (do NOT write for)
Productivity buyers wanting "better meeting summaries" — sales reps, PMs seeking notes. Refer them to Granola/Fathom. Verification is friction they don't value. Never pitch "we catch hallucinations."

## Problems & Pain Points
**Core problem:** Companies run on promises made in conversations. Nothing structured watches them. Deadlines slip silently; scope creeps; agents act on unverified data.
**Cost:** Agencies lose $1–5K/mo to scope creep (52% of projects). 70% of decisions forgotten in 24h. Compliance fines ($63M SEC, Jan 2025).
**Why alternatives fail:** RAID logs / action trackers / CLM all required manual upkeep — discipline collapsed under real work. Notetakers summarize but don't verify; agents act on noise.
**Emotional tension:** "When it breaks, nobody saw it coming." Fear of the agent sending the wrong thing to a client.

## Competitive Landscape
**Direct-ish:** Glean (graph, no verification primitive), Tana (spiritual sibling, no attestation), Zep/Graphiti (plumbing, no UX).
**Commodity (don't fight):** Otter, Read.ai, Fireflies, Fathom, Granola — notetakers.
**Market fact:** 15 competitors researched — ZERO ship human verification of AI-extracted facts, zero mandatory approval on agent actions, zero cross-org confirmation, zero per-fact audit trails.

## Differentiation
1. Named-human confirmation gate before agents act (the moat — survives 100% AI accuracy: math/compounding errors, prompt injection, law requiring human signatory).
2. Commitment capture across meetings + chats + calls — the web of commitments made visible.
3. MCP-native: agents in Claude/Codex/Gemini query `search_memories(verification_strictness='human_only')`.
4. Audit trail satisfying Saudi PDPL (in force) + GDPR Art 22; EU AI Act Art 14 tailwind (Dec 2027).
5. Cross-org confirmation (partner + client both attest) — nobody else has it.

## Shipped vs vapor (copy MUST respect)
SHIPPED: capture (Meet/recordings/uploads/URL/text/Telegram), 5-category extraction, confirm gate, MCP w/ verification_strictness, speaker ID.
NOT SHIPPED (never promise): typed edges, Odoo SH auto-PR, agents marketplace, mobile app, commitment-as-5th-category (proposed schema, ADR pending).
→ Homepage may say "captures every commitment" (commitments ARE extracted today inside decisions/tasks); may NOT show a "Commitment" product category as if shipped.

## Customer Language
**Use:** promise, commitment, "who promised what to whom by when", verified, confirmed by a named human, audit trail, scope creep, "before the meeting ends", claim → evidence.
**Avoid:** "we catch hallucinations", "AI-powered insights", "supercharge", "revolutionize", "unlock", "seamless", "Playbooks" (retired term), "Party" (use Person), bulk "confirm all" implications.

## Brand Voice
Direct, concrete, founder-to-operator. Short declaratives. Evidence over adjectives. Slightly contrarian ("Organizations aren't hierarchies"). No exclamation marks. No PM-jargon.

## Proof Points
- 52% of agency projects hit scope creep (council research, May 2026)
- 70% of decisions forgotten within 24h
- 15 competitors, 0 with human verification (structural gap)
- Built by an Odoo partner (SMEtools) — founder eats the dogfood across 3 companies
- 80 seconds: meeting → confirmed scope change → Odoo task (lighthouse demo)

## Goals
**Business goal:** Launch end-July 2026 w/ StratDev paid traffic (MENA-first GTM).
**Conversion action:** Primary = Get Started Free (app.knowcap.ai/register). Secondary = Book a Demo (/book).
**Page job:** Make an AI-power-user or agency operator feel the "broken commitment nobody saw coming" pain in 5 seconds, then show the confirm-then-act loop as the cure.
