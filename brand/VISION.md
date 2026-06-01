# Knowcap Vision

Hassan-owned. Edited when direction changes. The mockup in the `agents-research-complete-ui` worktree (branch `hassan-knowcap-v2`) is the canonical visual spec — this file is the *narrative* that points to it.

**How devs use this:** read the relevant section before opening a `feat(...)` PR. Link the section from your PR description. Hassan reviews your preview URL against this doc and the mockup frame it points to.

**Updated:** 2026-05-29 — re-adjudication council ([decision record](./decisions/2026-05-29-mena-council-readjudication.md)): launch re-pegged off the deferred EU AI Act onto Saudi PDPL + GDPR Art 22, MENA stats corrected, lighthouse demo revised, full vision is the plan. Prior 2026-05-25: Adds council research findings: product DNA positioning (Otter + Loom + NotebookLM, verified), market evidence across 15 competitors (Force 4), painkiller analysis by buyer persona, MENA-first go-to-market ruling, platform AI anti-positioning row. Prior update 2026-05-20: Playbooks unification, Instructions Hierarchy, `Party → Person` rename, Anthropic Skills layer. See companion docs [STRATEGY.md](./STRATEGY.md), [POSITIONING.md](./POSITIONING.md), [MOAT.md](./MOAT.md), [VERIFICATION-UX.md](./VERIFICATION-UX.md), [FEATURES-FROM-VISION.md](./FEATURES-FROM-VISION.md), [INSTRUCTIONS-HIERARCHY.md](./INSTRUCTIONS-HIERARCHY.md).

---

## North star

> **Knowcap turns your meetings into institutional memory your whole team can trust — every fact verified by a named human, every decision traceable to the source.**

Knowcap is not a meeting notetaker (Read.ai, Otter, Fathom, Granola already own that). Knowcap is not a knowledge-graph platform (Glean already owns that). Knowcap is not AI memory infrastructure (Mem0, Zep, Letta already own that). Knowcap sits **on top of those primitives** and adds the one thing none of them deliver: a record of which facts a named human has confirmed against named evidence — and a contract that AI agents only act on confirmed facts.

**Product DNA: Otter + Loom + NotebookLM, verified.** Knowcap combines transcription + cross-meeting knowledge (Otter's domain), video recording + sharing (Loom's domain), and multi-source synthesis with timestamped citations (NotebookLM's domain). What none of them deliver: human verification of every extracted fact, cross-org confirmation where both sides attest, and an audit trail that satisfies EU AI Act Article 14.

Meetings are the highest-density capture channel, but not the only one. Documents, emails, Telegram, WhatsApp, URLs all feed in. The substrate that matters is the verified-fact graph the org accumulates over time, not the input pipe.

The product experience is: **capture → classify → verify → connect → act.** By the time a meeting ends, every meaningful statement has been extracted, routed to the right project, timestamped to the exact second, and is waiting for one-tap human review. Once confirmed, the statement becomes a verified node in the graph — usable by any human or AI agent with the right scope.

The AI never acts on unverified information. Every approval is simultaneously a verification and a training signal.

---

## Why this thesis survives even at 100% AI accuracy

The verification moat is not "we catch hallucinations." It is **provenance + authority + audit trail for any fact an AI agent will act on.** Three forces keep that moat alive regardless of how good the underlying model gets:

1. **Math.** Multi-step agent workflows compound errors — 20 chained steps at 95% per-step accuracy = 36% end-to-end success. Checkpoints are not optional.
2. **Security.** Prompt injection is "unlikely to ever be fully solved" (OpenAI CISO Dane Stuckey, Dec 2025). An agent reading untrusted content needs a trusted-fact substrate it can fall back on.
3. **Law.** EU AI Act Article 14 (enforcement deferred to Dec 2 2027 via the Digital Omnibus), GDPR Article 22, ESMA's 2024 MiFID II statement, CMS Medicare Advantage 2024 Final Rule, ABA Formal Opinion 512, and the Moffatt v. Air Canada precedent all require human attestation as a non-delegable legal artifact — not because the AI is wrong, but because a *natural person* must be accountable. A 100%-accurate AI still cannot be the legal signatory.
4. **Market evidence.** Research across 15 competitor products (Fireflies, tl;dv, Otter, Sembly, Circleback, Read.ai, Glean, Microsoft Copilot/Work IQ, Mem0, Zep/Graphiti, Letta, Cognee, Google NotebookLM/Workspace Intelligence, Granola) found **zero** with human verification of AI-extracted facts, **zero** with mandatory outgoing approval on agent actions, **zero** with cross-org confirmation, and **zero** with per-fact regulatory audit trails. The gap is unanimous and structural — not a missing feature but a missing architectural primitive.

Full reasoning + citations in [MOAT.md](./MOAT.md).

---

## Anti-positioning — what Knowcap is NOT

| Category | Who owns it | Why we don't fight there |
|---|---|---|
| Meeting notetakers | Read.ai, Otter, Fathom, Granola, Fireflies | Commodity. Distribution + feature war. We lose. |
| Enterprise knowledge graph | Glean ($7.2B), Microsoft Graph, Notion AI | Capital + enterprise sales war. We lose. |
| AI memory infrastructure | Mem0, Zep / Graphiti, Letta, Cognee | Developer-mindshare war. We lose. |
| Pure summary accuracy | Every AI lab | Solved by model upgrades. Moat erodes quarter-by-quarter. |
| Platform AI (Google Workspace, Microsoft Copilot) | Google ($2T), Microsoft ($3T) | Platform bundling war. Free at zero marginal cost. We lose on price. |

Knowcap consumes those primitives and sells the layer **above** them: human-confirmed verified facts that agents can be trusted to act on, with audit trail, in regulated and semi-regulated contexts where a human signature is required.

Knowcap's product positioning: **Otter + Loom + NotebookLM, verified.** We acknowledge that Otter already claimed 'Conversational Knowledge Engine' (April 28, 2026, BusinessWire). We do not compete on that phrase. Our positioning is 'institutional memory' — adjacent but distinct, encoding the verification layer that Otter's graph lacks.

Full competitor positioning + buyer profile in [POSITIONING.md](./POSITIONING.md).

---

## Beachhead: Odoo partners → regulated verticals → horizontal

**Phase 1 (now → +12 months) — Odoo partners.**
Hassan owns SMEtools (an Odoo partner) and has insider distribution to the segment. Odoo partners run client implementation projects where SOW commitments, scope changes, and go-live decisions are litigated in client meetings and lost the moment the meeting ends. The killer feature: **meeting → human-confirmed scope decision → auto-generated Odoo SH PR with attestation trail.** Lighthouse demo target.

**MENA-first go-to-market (council ruling, May 2026; re-confirmed 2026-05-29).** ~470 Odoo partners across Egypt (~181), Saudi Arabia (~182), UAE (~104) per Odoo's official directory (counts drift — verify before public use). WhatsApp dominates messaging — ~86% of internet users in Saudi Arabia, ~72% in Egypt ([DataReportal 2025](https://datareportal.com/reports/digital-2025-saudi-arabia)) — and phone calls remain heavy; Western tools miss both channels. Arabic ASR is improving but not solved: vendors like Speechmatics advertise *up to* 96% word accuracy with dialect coverage but publish no per-dialect breakdown, and independent 2025 benchmarks (NADI) still show ~38% word-error rates on spontaneous dialect speech — treat Arabic transcription as a buyable input, never a superiority claim. Competition: Arabic-first meeting/STT tools exist (Mudawin, Notah, Munsit, all 2025) — but **none verify facts with a named human**; the literal "0 MENA competitors" claim is false, the true and stronger claim is "0 doing human-verification." Conservative MENA TAM: $100-175M (2025), growing to $300-500M by 2030. Strategy: MENA-first go-to-market, global product. Own the region, expand from revenue, not desperation.

**Phase 2 (month 6 → year 2) — regulated knowledge work.**
Financial advisors (FINRA Rule 3110, ESMA MiFID II), legal practices (ABA Formal Opinion 512, attorney-client privilege), healthcare (CMS Medicare Advantage Final Rule, HHS OCR Section 1557). These buyers already pay $30–100/user/mo for compliance-grade tools and *want* the verification layer because their regulator mandates it. ~55–65% of enterprise AI spending sits in industries where the human signature is the regulated artifact.

**Phase 3 (year 2 → year 5) — horizontal expansion via agent marketplace.**
The verified-fact substrate is industry-agnostic. The differentiation per vertical is the *agent action plugin* — Odoo SH PR for partners, contract redline for lawyers, compliance log for advisors. See [STRATEGY.md](./STRATEGY.md) for the three-loop flywheel.

---

## What makes a fact verified

Verification is two-layered, not one:

1. **Provenance** — every memory is anchored to a timestamp (recordings), page/paragraph (documents), or message ID (chat). You always know exactly where it came from. Citations are first-class.
2. **Human confirmation** — a named human has promoted the claim to evidence. The graph only contains what a human has confirmed.

Together these two layers make Knowcap's knowledge trustworthy for AI agents to reason over. Other tools give agents documents or transcripts. Knowcap gives agents facts a human has confirmed are true, with the receipts.

**Hard rule:** the UX must never allow a bulk "confirm all" action that bypasses individual review. That deletes the moat. See [VERIFICATION-UX.md](./VERIFICATION-UX.md) for what to build instead (bulk-review surface, confidence-thresholded auto-confirm with honest labels, rule promotion, tier-gated agent actions).

---

## The 5 memory categories

Every paragraph of every ingested source is classified as one or a combination of:

1. **Risks** — threats, delays, blockers, objections
2. **Decisions** — choices made, directions locked, commitments given
3. **Tasks** — work assigned, actions required, deadlines set
4. **Topics** — important concepts, domain knowledge, recurring themes
5. **Persons** — people, companies, suppliers, customers referenced (internal id `people`; displayed as "Person/Persons" — renamed from "Party/Parties" 2026-05-20)

**These labels are org-configurable via the Instructions Hierarchy.** A sales org defines Risks as sales objections. An ERP team defines Risks as integration failures. A law firm defines Risks as case-law adverse precedent. The 5 categories are the taxonomy; the Instructions Hierarchy defines what they mean for each org.

**Honest note:** the 5 categories themselves are not a moat — Read.ai, Otter, and Fellow all extract similar artifacts under different labels. The differentiation is that ours are *org-tunable through the Instructions Hierarchy* AND only flow downstream after human verification.

---

## The living graph — memories connect across meetings

The graph is the data shape. The verification is the trigger. The agent action is the product.

Memories don't die when a meeting ends. They evolve:

- A Risk flagged in meeting 1 → stays open → gets mitigated in meeting 4 → `mitigated_by` edge connects them
- A Decision made in meeting 2 → revisited in meeting 6 → `superseded_by` connects old to new
- A Task assigned in week 1 → completed in a standup 2 weeks later → `completed_by` closes the loop
- A Person builds a sentiment arc across 20 meetings — not a snapshot opinion, a traceable history

The AI suggests typed edges between memories using semantic similarity + category + Person matching. A human confirms each edge with one tap. Every edge in the graph is verified. No unverified connections pollute the reasoning substrate.

**Typed edge vocabulary:**
`supports` · `contradicts` · `depends_on` · `derived_from` · `superseded_by` · `mitigated_by` · `completed_by` · `reassigned_to` · `part_of` · `preceded_by` · `followed_by`

**Honest note (status as of 2026-05-19):** the typed-edge layer is not yet shipped. Target: Sprint 3 (post-2026-05-26). Until then, "queries across meetings" run via RAG over verified-only memories, not via edge traversal. Sales positioning must reflect what's shipped vs what's aspirational — see [POSITIONING.md](./POSITIONING.md) for the "shipped today / aspirational tomorrow" matrix.

---

## The trust ladder — how humans control agent autonomy

### Per-memory escalation (L1 / L2 / L3)

When a memory is verified, the user can escalate the response:

- **L1** — notify the right person before the meeting ends
- **L2** — spin up a research agent: finds how others handled similar situations, returns a formatted report (PDF, email, Telegram post, Slack) for human approval before delivery
- **L3** — research + execute: contacts suppliers, drafts PRDs, opens GitHub branches and PRs, builds mini-applications — all before human approval, then waits for the merge/send signal

### Per-agent autonomy (T0 / T1 / T2)

Agent routines earn autonomy through track record:

- **T0** — every output requires explicit approval before anything happens
- **T1** — auto-approved; human can override within a window
- **T2** — fully autonomous; pings only

Agents graduate T0 → T1 → T2 based on approved run count, weighted by output impact. A digest agent graduates at 20 approved runs. A code-autopilot graduates at 50+. Trust is earned, not granted.

Default for all new orgs: **T0 across the board.** The AI never acts beyond what the org has explicitly authorized.

### Verification strictness scales with action blast radius

A draft-internal-note agent may run on auto-confirmed facts. An open-Odoo-SH-PR agent or a send-WhatsApp-to-client agent must run only on human-confirmed facts with secondary review. The MCP query layer enforces this per agent tier. See [VERIFICATION-UX.md](./VERIFICATION-UX.md).

---

## The Rules layer — deterministic guardrails

Four rule families, each with confidence thresholds and AI-suggested promotions:

- **Routing** — where incoming sources land (`speaker is Khaled AND mentions "PO" → Ariika Default +50`)
- **Extraction** — how the classifier scores statements per org/project/speaker
- **Claim → Evidence** — auto-promote and auto-reject conditions with rollback windows
- **Noise** — what gets dropped before extraction reaches the inbox

Every human approval pattern that repeats gets suggested back as a rule: *"you've confirmed this 12× — promote to +40?"* The rules layer is the human-readable output of what the AI has learned from approvals. **Crucially:** rule-promoted auto-confirms are stored with a different `source` label than human confirms (`auto_confirmed_rule_v1` vs `human_confirmed`) so the audit trail remains honest and queryable.

---

## The Instructions Hierarchy — 4-tier file-based composition

Every Knowcap agent run composes its system prompt from four markdown layers, in this order from most general to most specific:

```
[ organization.md ]            ← org-level identity, vocabulary, tone, category semantics
        ↓
[ projects/{slug}.md ]         ← project-specific glossary, scope, special persons / clients
        ↓
[ users/{slug}.md ]            ← who's running this — role, escalation defaults, style
        ↓
[ agents/{slug}.md ]           ← the Playbook itself — procedure + tools + tier + trigger
        ↓
[ verified facts from MCP ]    ← runtime data layer — search_memories(verification_strictness=...)
        ↓
       AGENT EXECUTES
        ↓
[ run log with provenance ]    ← every verified-fact ID consumed is logged
```

Each layer can refine — never silently overwrite — the layer above. A later layer can add or constrain; conflicts surface in the run log so an auditor can reconstruct what the agent saw.

**Files are canonical, Postgres is a metadata cache.** All four files live in object storage (per-org-scoped). Postgres caches parsed frontmatter for fast UI queries. Optional git-mirror per org allows power users to `git push` edits. Every `agents/{slug}.md` is **Anthropic-Skill-compatible** — it can be exported as a standalone `SKILL.md` for use in Claude Desktop / Cursor / Goose, with the Knowcap-extra frontmatter fields ignored by stock runtimes.

Full spec: [INSTRUCTIONS-HIERARCHY.md](./INSTRUCTIONS-HIERARCHY.md).

This is what enables a sales org to say "Risks = sales objections, not integration blockers" at the org layer and have every agent in every project in that org classify accordingly — without anyone having to edit every Playbook.

---

## The API — agents query verified knowledge

Every org gets an API key scoped to that org. External AI agents query the graph via the Knowcap MCP:

- `search_memories(query, verification_strictness='human_only' | 'rule_auto_ok' | 'all')` — returns facts at the strictness level the calling agent's tier requires
- `get_decisions(project, date_range)` — decision tree for a project
- `get_parties(name)` — sentiment arc + open items for a customer or supplier
- `get_open_risks(project)` — Risk nodes with no `mitigated_by` edge

The MCP enforces the org boundary. No agent sees outside its API key scope. Project-level scoping is an optional query parameter. **Verification strictness is a required parameter** — an agent cannot accidentally read auto-confirmed claims if it was configured for human-only.

---

## The surfaces

| Surface | What it does |
|---|---|
| **Inbox** | 5-tab command center: Routing → Agent actions → Claims → Evidence today → Noise |
| **MockPlayer** | Claim-by-claim review within a recording — navigate memory by memory |
| **InboxPreview** | Single-meeting sectioned review: 5 categories + cross-source bridges (SUPPORTS / CONTRADICTS) |
| **Atlas** | Visual knowledge graph — org = galaxy/book, project = star/page, memories = nodes, edges = typed connections |
| **Claims** | Cross-org, cross-project list of all memories: Evidence · Pending · Superseded · Auto-rejected |
| **Agents** | Definition library + Routine bindings (scope × schedule × tier) + Run history → trust ladder |
| **Rules** | Routing / Extraction / Claim-Evidence / Noise rule families with threshold sliders |
| **Sources** | All ingested sources with dedup detection, broadcast ingest, re-extract actions |
| **Projects** | Directory grouped by org with trust tier, pending count, agent draft count |
| **Home** | TrustStrip (6 org health stats) + Timeline + Network + Tiles views |
| **Share page** | Public meeting recap — opt-in thread view traces the full arc across meetings |

---

## Persons — the embedded CRM substrate

Every Person extracted from meetings builds a profile automatically:
- Role, org, lane, sentiment arc
- Every meeting they appeared in with timestamps
- Open items assigned to or involving them
- Cross-source bridges: what they said that SUPPORTS or CONTRADICTS prior statements
- **Cross-org confirmation surface** — when a Person is also a Knowcap user, they can confirm a shared memory from their side, creating a two-sided verified fact (e.g. Odoo partner + their client both confirm the SOW scope change)

Knowcap does not replace Salesforce or HubSpot. The graph is the *verified-context substrate*; existing CRM tools receive write-backs from Knowcap agents acting on verified facts.

---

## Painkiller vs vitamin — where Knowcap is urgent

Research across 5 buyer personas (May 2026 council):

| Persona | Verdict | The pain |
|---|---|---|
| **Agencies/consultancies** | **Painkiller** | 52% of projects hit scope creep. Agencies lose $1-5K/month. Cross-org confirmation = the feature nobody else has |
| **Multi-company founders/CEOs** | **Painkiller** | 70% of decisions forgotten in 24h. Cross-company contradictions are existential. Knowcap replaces a brain function |
| **Regulated verticals (finance/legal/health)** | **Painkiller** | $63M SEC fines Jan 2025. Saudi PDPL enforcing (since Sep 2024). GDPR Art 22 in force. EU AI Act Art 14 deferred to Dec 2027. Existing compliance budgets |
| **Odoo partners** | **Vitamin → painkiller if repositioned** | The tool is a vitamin; the problem is a painkiller. Sell scope-creep insurance + billable-hour recovery, not meeting intelligence |
| **Sales teams** | **Vitamin — do not target** | Gong owns this ($7B+). Verification is friction for sales reps. Red ocean |

**Go-to-market sequence:** Agencies/consultancies (highest pain, cross-org is unique) → Multi-company founders (Hassan is the case study) → Regulated verticals (Phase 2, longer sales cycles). Odoo partners are the distribution CHANNEL, not the primary pain persona.

---

## Pre-launch focus (now → 2026-05-31)

### 1. Inbox confirm gate — SHIPPED (closed 2026-05-12 via PR #305)
Closes the trust ladder UX — a project cannot absorb unreviewed claims. **Status: shipped end-to-end** as of 2026-05-12 (PR #305). The `memoryService` chat-context loader filters `review_status` and sorts by `importance DESC` (confirm = +1.0 boost). The LLM prompt tags every memory with claim/evidence via `tagFor()`. The Knowcap MCP `search_memories` tool accepts a `status` array filter defaulting to `pending+confirmed+edited`. RAG transcript-chunk retrieval is intentionally unaffected (it operates on source chunks, not memories — see `project_knowcap_evidence_gap_in_prod`).

**Remaining trust-layer work (forward-looking, not a "close-the-gap" task):**
- Add `confirmation_source` column distinguishing `human_confirmed` from `auto_confirmed_rule_v1` (see [VERIFICATION-UX.md](./VERIFICATION-UX.md) Mechanism 2). Schema migration + server + UI. Multi-PR.
- ~~Add `verification_strictness` convenience parameter to MCP~~ **DONE 2026-05-19 via knowcap-mcp PR #7.** Agents call `search_memories(verification_strictness='human_only')` and the MCP enforces the trust tier server-side.

### 2. Instructions Hierarchy + Playbooks (`hassan-instructions-hierarchy`)
4-tier file-based system prompt composer (`organization.md` → `projects/{slug}.md` → `users/{slug}.md` → `agents/{slug}.md` → verified facts from MCP). Markdown files canonical, Postgres metadata cache. Anthropic-Skill-compatible at the agent layer. See [INSTRUCTIONS-HIERARCHY.md](./INSTRUCTIONS-HIERARCHY.md). **Target: 2026-05-23.**

### 2b. Agents marketplace (renamed Type 1 → Vertical Packs)
Knowcap ships **Vertical Packs** — bundles of `organization.md.template` + `projects/.template` + `users/.template` + 5-10 ready-made `agents/*.md` Playbooks per vertical (Odoo partners, financial advisors, legal practices, healthcare admin). Each pack is also exportable to standalone Anthropic Skill folders for use outside Knowcap. See [STRATEGY.md](./STRATEGY.md) Loop 3.

### 3. Typed edge layer (post-instructions)
Connect memories across meetings with the 11-edge vocabulary. AI suggests edges on ingest; human confirms. **Target: Sprint 3 (post-2026-05-26).**

### 4. Reliability hardening (Shady, ongoing)
Every recording transcribes. Every recap generates. Every share page loads. No silent failures. Error monitoring, retry budgets, alerting on production failures.

### 5. The Odoo SH lighthouse demo
A single end-to-end recorded flow. **Revised 2026-05-29** (see [decision record](./decisions/2026-05-29-mena-council-readjudication.md)): the auto-generated Odoo SH **PR** version is killed (≈0% built, contradicted by the product's own code). The shippable, on-thesis demo is **meeting → human-confirmed memory → Odoo task** (≈75-80% built today). This is the demo every Odoo-partner sales conversation should open with. **Target: pick the date on demo readiness, not a regulatory deadline (EU AI Act Art 14 deferred to Dec 2027).**

---

## Post-launch direction (Q3 2026 onward)

These are NOT in scope before 2026-05-31. All of them are **agent-action surfaces sitting on top of the verified-fact substrate**, not separate products.

### VoIP / phone-call ingestion
Phone calls are the second-biggest information channel — especially in markets where everything isn't on Google Meet. VoIP integration brings unstructured phone conversations into the same extraction pipeline as meetings.

### Mobile app
React Native + Expo. iOS + Android. Read-only view first (meetings, recaps, open items, verification queue). Phase 2: capture on phone, push to Knowcap.

### Agents marketplace
Orgs install or build agents that act on their verified graph. Triggered by claim confirmation, by time, or by event. Third parties build vertical-specific agents (Odoo SH PR generator, contract redline, compliance log, ecommerce ops) on top of the Knowcap MCP. Revenue share. **This is the year-2-3 flywheel — see [STRATEGY.md](./STRATEGY.md) loop 3.**

### Cross-org bridges
Founders who run multiple orgs can create explicit read-only bridges between org graphs. A Risk in Ariika linked to a Decision in SMEtools — visible only to people with access to both. Default: hard wall. **The cross-org confirmation network is the year-2 flywheel — see [STRATEGY.md](./STRATEGY.md) loop 2.**

### Knowcap absorbs daily ops
Email, tasks, bookmarks, morning brief — currently external tools. Post-launch 4-week sprint to make these native Knowcap modules. The graph becomes the user's daily home, not just a meeting layer.

---

## Locked design rules

1. **Vocabulary lock (updated 2026-05-20).** Pending = "claim". Confirmed = "evidence". Internal id `'people'` displays as **"Person" / "Persons"** (renamed from "Party/Parties" 2026-05-20 — buyer-natural language; "Party" sounded like an event). Speakers ⊂ Persons. Topics are crosscut tags, never a peer category. **Vocabulary updated 2026-05-29: "Playbooks" is RETIRED.** The umbrella only existed to fuse Skills + routing Rules; that fusion is dropped. Canonical = **Skill** (the WHAT — a procedure, `deterministic` or `llm` mode) · **Routine** (the WHEN — trigger + scope + the Skill it fires) · **Run** (a tracked execution) · **Rules** (the deterministic filing/routing layer) · **Connectors** (MCP). "Agent" = the runtime (a Project; + an org-scope inbox agent), not a page. See [`decisions/2026-05-29-agent-skills-routines-architecture.md`](./decisions/2026-05-29-agent-skills-routines-architecture.md), [INSTRUCTIONS-HIERARCHY.md](./INSTRUCTIONS-HIERARCHY.md), and [FEATURES-FROM-VISION.md](./FEATURES-FROM-VISION.md).
2. **Palette + font lock.** Background `#FBFAF8`. Borders `#E7E4DD`. Ink `#18181B`. Org colors: Knowcap `#1F6B3A`, Ariika `#4A2FA8`, SMEtools `#B5731A`. Titles in `Space_Grotesk`, mono in `JetBrains_Mono`.
3. **No shortcuts.** No fake pickers, no unwired chips, no hardcoded lists, no claiming UI works without `npx tsc --noEmit` clean + a real screenshot.
4. **Mockup-data only in `agents-research-complete-ui` worktree.** The mockup IS the spec — wiring happens on `hassan` / `shady` branches.
5. **Every `feat(...)` PR links a section of this document.** If the feature isn't in this doc, the PR is closed and work goes back to Hassan to update the vision first.
6. **No "Confirm All" button.** Ever. See [VERIFICATION-UX.md](./VERIFICATION-UX.md) for what to build instead when employees complain about per-memory review time.
7. **Anthropic Skills compatibility (locked 2026-05-20).** Every `agents/{slug}.md` Playbook is a strict superset of the Anthropic SKILL.md format. Knowcap is NOT competing with Anthropic Skills — we layer the Instructions Hierarchy, verified facts, and audit trail above their format. Exports trivially to standalone Skill folders for any Skills-aware runtime.

Full design system: `~/Github/knowledge/llm-wiki/wiki/Knowcap/knowcap-mockup-design-system.md`

---

## What lives outside this doc

- **Three-loop flywheel + sequencing:** [STRATEGY.md](./STRATEGY.md)
- **Anti-positioning + buyer profile + competition:** [POSITIONING.md](./POSITIONING.md)
- **Why verification survives at 100% AI accuracy:** [MOAT.md](./MOAT.md)
- **How verification UX should and should not work:** [VERIFICATION-UX.md](./VERIFICATION-UX.md)
- **4-tier Instructions Hierarchy spec (org/project/user/agent):** [INSTRUCTIONS-HIERARCHY.md](./INSTRUCTIONS-HIERARCHY.md)
- **Playbooks UX + product behaviors derived from the vision:** [FEATURES-FROM-VISION.md](./FEATURES-FROM-VISION.md)
- **Inbox-zero contract that enforces the verification thesis:** [INBOX-FIRST.md](./INBOX-FIRST.md)
- **Tactical bug list:** Odoo project 141 (customer-reported bugs only)
- **Code ownership:** [OWNERSHIP.md](./OWNERSHIP.md)
- **Approval rules:** [APPROVALS.md](./APPROVALS.md)
- **Lane snapshot:** `.claude/rules/team-operating-model.md`
