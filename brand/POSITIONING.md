# Knowcap Positioning

Hassan-owned. The outward-facing answer to "what is Knowcap and who is it for." Sales, marketing, landing pages, cold outreach, and partner conversations all pull from this doc.

**Updated:** 2026-05-19.

---

## The three sentences (use the right one in the right place)

| Surface | Sentence |
|---|---|
| **VISION.md, internal docs, investor decks, formal sales conversations** | *"Knowcap is the trust layer for AI agents — every fact they act on is confirmed by a named human, with a full audit trail."* |
| **Landing page hero, cold email subject, demo opener, ProductHunt** | *"Most AI agents act on what the AI thinks is true. Knowcap agents act only on what a human said is true."* |
| **Footer, X bio, conference badge, 12-word brand line** | *"Knowcap is verified knowledge for AI agents. Humans confirm. Agents act."* |

Same thesis, three voices, three audiences. **Do not invent new sentences for the same surface.** If you find yourself rewriting these, propose the change in a PR against this doc first.

---

## What Knowcap IS — affirmative

> **Knowcap is the verified-fact + instructions substrate Anthropic-compatible Skills run on. Skills are the procedure; Knowcap is the truth.**

We are NOT a competitor to Anthropic Skills — **we are a consumer + superset of their spec.** Every Knowcap `agents/{slug}.md` Playbook is exportable to a standalone Anthropic Skill folder. What Anthropic doesn't ship — and what we own:

- The Instructions Hierarchy (`organization.md → projects/{slug}.md → users/{slug}.md`) that composes ABOVE the Skill body
- The verified-fact substrate the Skill queries at runtime (Knowcap MCP with `verification_strictness`)
- The audit log binding every Skill execution back to the named human confirmer
- The cross-org confirmation gate that controls which Skills can fire
- The deterministic **Rules** (routing/filing) layer running alongside LLM-mode **Skills** (vocabulary updated 2026-05-29 — "Playbooks" retired; see [`decisions/2026-05-29-agent-skills-routines-architecture.md`](./decisions/2026-05-29-agent-skills-routines-architecture.md))

See [INSTRUCTIONS-HIERARCHY.md](./INSTRUCTIONS-HIERARCHY.md) for the architecture.

---

## Categories we explicitly stay out of

| Category | Who owns it | Why we don't fight |
|---|---|---|
| Meeting notetakers | Read.ai, Otter, Fathom, Granola, Fireflies, Tactiq, Jamie | Commodity. Top complaint is summary accuracy (model upgrades solve it). Bot fatigue is the #1 buyer pain. Distribution + velocity war we lose. |
| Enterprise knowledge graph | Glean ($7.2B), Microsoft Graph, Notion AI Q&A | $300+/user/mo price points, 3-year SSO/ACL/SOC2 head start, Glean's Fellow-meeting ingest shipped Jan 2026. We layer on top, not against. |
| AI memory infrastructure | Mem0, Zep/Graphiti, Letta, Cognee, Cloudflare Agent Memory | They're plumbing, we're a product. Their typed-edge models are architecturally close, but they have no UX and no end-user buyer. |
| Skills runtime | Anthropic, OpenAI (quietly), Cursor, Goose, Atlassian | Platform-owned standard since Dec 2025. We consume it, ship Skills FOR it, do NOT compete with the runtime. |
| Pure summary accuracy | Every AI lab | Solved by model upgrades. *"We catch hallucinations"* is a feature that ages out. |

---

## The stack — where Knowcap sits

```
Layer 5: AGENT RUNTIME            Anthropic Skills, Claude Desktop, Cursor, Goose, OpenAI Agents
              ↑ invokes
Layer 4: SKILL / PLAYBOOK         agents/{slug}.md (Anthropic-Skill-compatible)
              ↑ composed from
Layer 3: INSTRUCTIONS HIERARCHY   organization.md / projects/*.md / users/*.md   ← KNOWCAP OWNS
              ↑ grounded in
Layer 2: VERIFIED FACTS           human-confirmed, audit-trailed, MCP-served      ← KNOWCAP OWNS
              ↑ extracted from
Layer 1: AI MEMORY + RAG          vectors, embeddings, retrieval (Mem0/Zep below)
              ↑ produced from
Layer 0: CAPTURE + INGEST         recordings, docs, emails, Telegram, WhatsApp
```

Layer 5 (runtime) is Anthropic + the runtime ecosystem. Layer 4 (file format) is Anthropic's spec, with our extension fields. **Layers 2-3 are Knowcap's territory** and nobody else ships them as a composable unit. Layers 0-1 are downstream concerns we don't compete on.

The buyer pitch: *"Anthropic gives agents skills. We give those skills an org, a project, a user, and verified facts. Without us, your skills hallucinate the company context. With us, they run on confirmed truth."*

---

## Real competition — who to actually watch

### Tier 1 — closest threats (active monitoring)

**Glean** ($7.2B valuation, $150M Series F May 2026)
- Shipped Fellow meeting integration Jan 2026 — meeting transcripts now ingest as docs in their Enterprise Graph
- Their May 2026 launch added "agents that proactively manage tasks"
- **What they don't have yet:** human-verification primitive, `review_status` schema, cross-org confirmation network
- **How they could attack us:** ship a "verified" pill on summaries + an EU AI Act compliance checkbox. ~1 quarter of work for them.
- **Our defense:** ship the verification gate end-to-end + own the regulated-vertical buyer language before they reframe.

**Zep / Graphiti** (open-source, well-funded)
- Their typed-edge model with explicit contradiction detection (`t_invalid`) and temporal validity is architecturally our closest twin
- **What they don't have:** a meeting-capture UX, end users, vertical positioning. They're plumbing.
- **How they could attack us:** someone wraps Graphiti in a meeting-recorder UX and sells it. Could happen in a quarter.
- **Our defense:** the verticalized agent-action layer (Odoo SH PR, financial advisor compliance log, legal redline) is what end-buyers pay for. Plumbing alone doesn't compete with a product.

**Tana** (Current launched March 2026)
- Meetings + collaborative knowledge graph + agents + bug/decision/action-item capture during the conversation
- Closest *spiritual* sibling — they think about the world the way we do
- **What they don't have:** the human-attestation primitive as a first-class entity; enterprise compliance positioning; org-scoped ACL story
- **How they could attack us:** add a "verified" badge + an enterprise tier. Possible but they have PKM brand inertia (perceived as a personal tool).

### NON-competitors (we layer on these, NOT against them)

**Anthropic Skills** (open standard since Dec 2025, adopted by Microsoft, Cursor, Goose, Stripe, etc.)
- They own the `SKILL.md` file format and the Skills runtime
- We are a strict superset of their spec — every Knowcap `agents/{slug}.md` is exportable to a standalone Skill folder
- Our position: *"Knowcap-authored Skills are the only ones that come with verified-fact provenance and an Instructions Hierarchy. Anthropic ships the rails; we ship the trust."*
- Stripe-Visa analog: Stripe didn't compete with Visa, they built the developer-grade layer above the rails

### Tier 2 — distraction zone (don't waste cycles)

**Read.ai** — the company Hassan was worried about 2026-05-19. Reality: they ship a notetaker with MCP, Ask Read, an agentic suite (Ada), and CRM writes. **They are good at being a notetaker.** They are not architecturally close to the verification thesis. Their disclaimer "outputs may require human review" is a disclaimer, not a primitive. We don't fight them; we fight Glean.

**Otter.ai** — pivoted in April 2026 to "Conversational Knowledge Engine" (cross-meeting search via MCP). Same category as Glean now. Same defense applies.

**Mem0 / Letta** — infra plays, sold to developers, not end users. We integrate with them or compete on the application layer, not the infra layer.

---

## Buyer profile

### Buyer 1 — Odoo partners (Phase 1, now → 12 months)

**Who they are:** boutique-to-mid-market consulting firms (10–200 employees) that implement and customize Odoo for clients. SMEtools is one. Hassan has insider distribution.

**Their pain:**
- Every implementation hinges on what was agreed in client meetings (SOW scope, change requests, go-live decisions)
- Litigation risk when client disputes "but you said this was in scope"
- Implementation devs spend hours translating meeting decisions into Odoo modules / Studio configs
- Audit trail for client billing is informal (email threads, partner WhatsApp groups)

**What we sell them:**
- Meeting → human-confirmed scope decision (client confirms too, via cross-org bridge — Loop 2)
- Confirmed scope decision → auto-generated Odoo SH PR draft for the partner's dev team to review
- Cross-org confirmation rail = bulletproof audit trail for billing disputes

**Pricing implication:** $50-200/seat/month range. Cross-org confirmation can be charged on both sides (partner + client get value).

**Why this is the right beachhead:** Hassan's distribution + clear lighthouse demo + code-shaped work product + adjacent path to next vertical (accounting, then full regulated).

### Buyer 2 — Regulated knowledge work (Phase 2, month 6 → year 2)

**Who they are:** financial advisors (RIA firms, IFA practices, wealth managers), boutique-to-mid-market law firms, healthcare admin teams (not clinical), SEC-registered investment firms, compliance officers at mid-size companies.

**Their pain:**
- Their regulator REQUIRES human attestation on AI-assisted decisions (FINRA Rule 3110, ESMA MiFID II, ABA Op. 512, CMS MA Final Rule)
- They already pay $30–100/user/month for compliance-grade tooling
- AI is creeping into their workflows but they have no audit-defensible way to use it
- Saudi PDPL (enforced Sep 2024) + GDPR Article 22 are the in-force forcing functions today; EU AI Act Article 14 is deferred to Dec 2 2027 (a 2027 tailwind, not a 2026 deadline)

**What we sell them:**
- Every fact AI acts on is confirmed by a named human, signed, timestamped to source, audit-trailed
- "Compliance-attested AI" tier of agents — only confirmed facts as inputs, full lineage on every action
- Document the audit-defense story explicitly (EU AI Act Article 14, GDPR Article 22, etc. — see [MOAT.md](./MOAT.md))

**Pricing implication:** $100–500/seat/month range. Compliance buyers pay 5-10x what productivity buyers pay.

**TAM context:** ~55-65% of enterprise AI spending sits in industries where the human signature is the regulated artifact. This is the bulk of the addressable market for Knowcap.

### Anti-buyer — pure productivity workflows

**Who they are:** founders, PMs, sales reps, marketing teams looking for "better meeting summaries."

**Why we do NOT sell to them:**
- The verification UX is friction they don't value
- Their #1 want is accurate summaries + CRM sync — that's a Read.ai / Granola / Otter sale
- Lifetime value is low ($15-40/seat); churn is high
- They are the segment most exposed to "AI gets better → moat erodes" — exactly the customers we don't want

**If a productivity buyer approaches us:** politely refer them to Granola or Fathom. Tell them we'll be ready when their compliance officer is.

---

## What's shipped today vs aspirational tomorrow

Sales must not promise vapor. The matrix below is the source of truth for what to demo and what to caveat.

| Feature | Status (2026-05-19) | What sales can say |
|---|---|---|
| Meeting capture (Meet, recordings) | Shipped | "We capture every meeting" |
| Visual transcription + OCR + speaker ID | Shipped | "We extract from visuals + audio + speakers" |
| Claim extraction (5 categories) | Shipped | "We classify every memory into 5 actionable categories" |
| Pending → Evidence confirmation gate | Shipped | "Humans confirm each claim before it's used" |
| `review_status` enforced in chat-context loader + LLM prompt tagging + MCP filtering | **Shipped 2026-05-12** (PR #305) | "Your agents only see human-confirmed facts via MCP; the chat sorts evidence ahead of unverified claims" |
| RAG transcript-chunk retrieval respects `review_status` | **Intentionally not wired** | RAG operates on source chunks, not memories. Memories flow through the verification-respecting loader. Not a gap. |
| `confirmation_source` schema split (human vs rule-auto) | **Not shipped** | Roadmap. Required before sales can promise "auto-confirmed rules with audit trail." 30-day target. |
| MCP `verification_strictness` convenience parameter | **Shipped 2026-05-19** (knowcap-mcp PR #7) | "Your agents query `search_memories(verification_strictness='human_only')` and we guarantee they only see human-confirmed facts." |
| Typed edges (`mitigated_by`, `superseded_by`, etc.) | **Not shipped** | DO NOT PROMISE. Aspirational; target Sprint 3. |
| Instructions Hierarchy (org / project / user) | In progress | "Coming May 23" |
| Knowcap MCP for external agents | Shipped | "Your agents query our verified facts via MCP" |
| Cross-org confirmation (Parties) | Partial UI | "Pilot soon" — not for general sales |
| Odoo SH PR lighthouse demo | **Not built** | DO NOT DEMO yet. Target: 2026-07-31. |
| Agents marketplace | **Not built** | "Year 2 direction" — see [STRATEGY.md](./STRATEGY.md) loop 3 |
| Mobile app | **Not built** | "Post-launch direction" |

**Rule:** if a feature is not in the "Shipped" column, sales DOES NOT lead with it. We can mention aspirational features in roadmap context, but a buyer must never see a demo of vaporware.

---

## The compliance window (revised 2026-05-29)

EU AI Act Article 14 enforcement was **deferred from Aug 2 2026 to Dec 2 2027** (Digital Omnibus, ~May 2026), so it is a 2027 tailwind, not a 2026 deadline. The in-force forcing functions to sell on **now** are **Saudi PDPL** (enforced Sep 2024 — explicit right to human intervention) and **GDPR Article 22 / CJEU SCHUFA** (a rubber-stamp human is legally insufficient — sharper than Art 14 ever was).

**Our positioning move:**
- Publish a "human-in-the-loop attestation under Saudi PDPL + GDPR Article 22" technical brief on [knowcap-marketing](https://github.com/Knowcap-V2/knowcap-marketing) by 2026-06-15
- Add "human attestation, audit-ready" copy to the landing page hero by 2026-06-30
- Outbound to MENA Odoo-partner + regulated networks first; EU RIA / law firm / fractional CFO outreach as a parallel track

**The headline:** while Read.ai and Glean sell "summaries" and "search," Knowcap sells "audit-ready human confirmation infrastructure" — *attestation infrastructure for regulated AI agents*, never "we catch hallucinations."

See [the 2026-05-29 re-adjudication](./decisions/2026-05-29-mena-council-readjudication.md).

---

## What to do with this doc

- **Sales:** memorize the three sentences, the anti-positioning, the buyer profiles. Refer to the shipped-vs-aspirational matrix every time you describe a feature.
- **Marketing:** every landing page, email, and content piece must use one of the three sentences verbatim. Anti-positioning shows up in the "what we don't do" section of any long-form piece.
- **Devs:** if your PR introduces a feature, check it against the buyer profile — which buyer is this for? If neither, raise it with Hassan before shipping. If you can't fit it under one of the three sentences, the feature is in the wrong product.
- **Hassan:** edit this doc when positioning shifts. Edits propagate downstream — sales and marketing read here first.
