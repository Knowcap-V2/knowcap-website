# Knowcap Strategy — the three-loop flywheel

Hassan-owned. Lives next to [VISION.md](./VISION.md). Read this when you're about to build something and want to know **why** it gets built before **what** gets built.

**Updated:** 2026-05-19.

---

## TL;DR

Knowcap runs three flywheels on one substrate. Each spins at a different speed. The first ships now. The second turns the product into a network. The third makes it a platform.

> The substrate is the **org's verified-knowledge graph + named human confirmations over time.** Same data asset, three compounding monetization patterns.

Comparable companies that ran this play: Salesforce (CRM record → AppExchange), Stripe (payment record → Radar + Treasury + Atlas), Shopify (commerce record → Apps + Capital + Payments). They didn't win with a single advantage — they won by stacking three flywheels on one asset.

---

## Loop 1 — Within-org capture deepening

**Spins from customer #1. Lowest ceiling. Fastest to start.**

```
employee captures a meeting
        ↓
agents act on confirmed claims (PR generated, email drafted, audit logged)
        ↓
employee sees ROI → invites another employee → captures more meeting types
        ↓
more confirmed facts → agents become smarter on this org's vocabulary, decisions, rules
        ↓
rule promotion: more confirmations → more auto-rules → less manual review → more capture
        ↓
       LOOP
```

This is the **Slack-style intra-org viral.** One customer becomes 5 seats, becomes 50 seats. The compounding asset within the org: every confirmed fact makes the next agent run smarter on that org's specific vocabulary, decisions, and rules.

**When this loop is healthy:** seat count per org grows month-over-month without targeted upsell motion.

**Failure mode:** if employees can't get through their daily verification queue, capture slows and the loop breaks. See [VERIFICATION-UX.md](./VERIFICATION-UX.md) for why we must NOT solve this with a "confirm all" button (that breaks the moat instead of the loop).

---

## Loop 2 — Cross-org confirmation network

**Spins around customer #50–100 once supply-chain density emerges. Network-effect ceiling.**

```
Odoo partner uses Knowcap
        ↓
they want their CLIENT to confirm shared memories (e.g. SOW scope decision)
        ↓
they invite the client to confirm from their side
        ↓
client is now on Knowcap with a single shared memory
        ↓
client's NEXT supplier also wants confirmation → second org bridges in
        ↓
each new bridge increases value of being on Knowcap for everyone already on it
        ↓
       LOOP
```

This is the **LinkedIn / DocuSign network effect.** Single-tenant tools cannot enter this loop. Knowcap enters because verified facts have *counterparties* — clients, suppliers, regulators, auditors — and each of them benefits from being on the same confirmation rail.

**Concrete first instantiation (Odoo partners):**
- Hassan's SMEtools confirms a scope decision from a client meeting
- The client receives a single invitation: "confirm this SOW change from your side"
- Client clicks, signs in, confirms — now there's a two-sided verified fact
- Three months later the client uses Knowcap with their accountant for the year-end audit
- Now the accountant is on Knowcap. And so on.

**When this loop is healthy:** % of confirmed memories that are *two-sided* (counterparty also confirmed) grows month-over-month. Cross-org bridges per active org grows.

**Why this is the existential bet:**
- Loop 1 alone makes Knowcap a really good tool. Loop 2 makes it uncopyable. Glean, Read.ai, Otter are all single-tenant by design — they can't add this without rewriting their data model.
- The first 100 paying orgs are Loop 1 customers. Orgs 101-1,000 are pulled in by Loop 2.
- The product spec for Loop 2 is *already in the mockup* (Persons as cross-org confirmation surface — renamed from "Parties" 2026-05-20) — we just have to ship and instrument the viral mechanic.

**Target:** Loop 2 instrumented and visible in metrics by month 12.

---

## Loop 3 — Vertical Packs marketplace (reframed 2026-05-20)

**Spins around customer #500–1,000 when developer audience reaches critical mass. Highest revenue ceiling.**

The unit of distribution is a **Vertical Pack** — a bundle of:
- `organization.md.template` — the vertical's vocabulary, category semantics, tone
- `projects/.template` — the per-project glossary template for engagements in this vertical
- `users/.template` — role-based user-tier templates (`delivery_lead`, `compliance_officer`, `partner_dev`, etc.)
- 5-10 `agents/*.md` Playbooks — pre-built procedures specific to this vertical
- Optional `scripts/` — bundled deterministic helpers a Playbook can shell out to

**Example packs (sequenced per the beachhead plan below):**

| Pack | Anchor Playbooks |
|---|---|
| **Odoo Partner Pack** | `odoo-scope-to-pr`, `client-status-update`, `sow-confirmation-followup`, `module-changelog-from-meeting`, `support-ticket-triage` |
| **Financial Advisor Pack** | `client-meeting-compliance-log`, `mifid-suitability-record`, `quarterly-review-prep`, `escalation-to-supervisor`, `rmd-reminder-draft` |
| **Legal Practice Pack** | `matter-memo-draft`, `contract-redline-triage`, `privilege-flag-on-confirmation`, `client-update-letter`, `time-entry-from-meeting` |
| **Healthcare Admin Pack** | `prior-auth-packet`, `denial-appeal-draft`, `cms-compliance-log`, `patient-callback-prep`, `incident-report-intake` |

```
Knowcap has N orgs × verified-fact graphs accessible via MCP
        ↓
Knowcap (Year 1-2) ships first-party Vertical Packs — Odoo Partner first
        ↓
Year 2-3: third-party developers ship vertical Packs (Spellbook → Knowcap Legal Pack,
specialized firms → niche packs); Knowcap takes 15-30% revenue share
        ↓
Each Pack also exports as standalone Anthropic Skill folders — usable in
Claude Desktop / Cursor / Goose WITHOUT a Knowcap subscription, BUT the
exported Skills can only reach verified facts if the user also has Knowcap MCP wired in
        ↓
The verified-fact gate is what gives a Knowcap Pack the "audit-certified" tier
that a vanilla Anthropic Skill folder cannot claim
        ↓
each new Pack pulls more vertical buyers; each new buyer makes Pack-building attractive
        ↓
       LOOP (Salesforce AppExchange / Shopify Apps / Stripe Apps model)
```

This is the **platform flywheel.** Highest revenue ceiling — Shopify Apps does ~$1B/year on top of Shopify itself; Salesforce AppExchange does similar. Knowcap's twist: every Pack is BOTH a Knowcap-internal install AND a portable Anthropic Skill folder. Buyers can deploy in either runtime.

**The Knowcap-specific advantage:** because we have the verification primitive AND the Instructions Hierarchy above the Skill body, a Knowcap-authored Pack delivers something a vanilla Anthropic Skill cannot — **provenance-bound execution.** Regulated buyers (the EU AI Act Article 14 segment) will pay a 5-10x premium for that tier.

**What we build now (pre-Loop 3):**
- Knowcap MCP is shipped + stable (post-2026-05-19 with `verification_strictness`)
- First-party Vertical Pack: Odoo Partner Pack (with Odoo SH lighthouse demo as anchor)
- Document the Pack format — `pack.json` manifest, file layout, export-to-Anthropic-Skill flow

**What we do NOT build now:**
- Marketplace UI, payment infrastructure, revenue share, developer portal — all premature before there's organic developer demand.

**Target:** First-party Odoo Partner Pack live by 2026-07-31. Observe organic third-party MCP usage by year 2. Formalize the Vertical Pack marketplace once 5+ external orgs are shipping packs.

---

## Why three loops on one substrate = a billion-dollar idea

The three loops share the same data asset AND reinforce each other across time:

| Year | Spinning loops | Revenue character |
|---|---|---|
| 1 (now) | Loop 1 only | Seat licenses on Odoo partners |
| 2 | Loop 1 + Loop 2 begins | Seats + cross-org "bridge" pricing (charge the second side too) |
| 3 | All three loops | Seats + bridges + marketplace take rate (15–30% on third-party agents) |
| 5 | Loops compound | Seats + bridges + marketplace + COMPLIANCE-CERTIFIED-AGENT marketplace ("only Knowcap-attested agents pass EU AI Act audit") |

**The compounding moat:** by year 3, leaving Knowcap means losing (a) your historical audit trail, (b) all your cross-org bridges with clients/suppliers, (c) all your installed agents. Each loop adds switching cost the next loop can monetize.

---

## Why nobody else can run all three loops

| Competitor | Loop 1 ready? | Loop 2 ready? | Loop 3 ready? |
|---|---|---|---|
| Glean | Yes (Enterprise Graph) | **No** — single-tenant by design | Partial (no verification primitive) |
| Read.ai | Yes (meeting capture + MCP) | **No** — single-tenant | Partial (no verification primitive) |
| Mem0 / Zep | Partial (no UX, no buyers) | **No** — infra layer, no two-sided graph | **No** — no marketplace, no end users |
| Salesforce / Notion | Yes | **Partial** — only inside ACL boundary | Yes (AppExchange / etc.) |
| DocuSign | **No** — only documents, not facts | Yes for documents | **No** for AI agents |

**Knowcap is the only stack where the same substrate supports all three loops.** This is what a billion-dollar moat looks like — not one big advantage, but three smaller advantages that compound on top of each other and would each require a *different competitor* to attack.

---

## Beachhead → vertical expansion sequence

The flywheel works per-vertical the same way. We start with Odoo partners (where Hassan has insider distribution + a clear lighthouse demo target — meeting → Odoo SH PR) and expand into vertical-adjacent regulated buyers.

| Order | Vertical | Lighthouse agent action | Why this comes next |
|---|---|---|---|
| 1 | **Odoo partners** | Meeting → Odoo SH PR for client module | Hassan's distribution + SOW-attestation pain + code-shaped work product (easiest agent action) |
| 2 | **Boutique accounting / fractional CFOs** | Meeting → Odoo journal entry / reconciliation memo | Adjacent to Odoo partners; same regulated buyer profile; SMEtools intro path |
| 3 | **Financial advisors** | Meeting → compliance log / client review note | Largest TAM in regulated AI spending; FINRA / MiFID II forced human-attestation |
| 4 | **Legal — boutique / mid-market** | Meeting → matter memo / contract redline triage | ABA Op. 512 + privilege; high $/seat |
| 5 | **Healthcare admin (not clinical)** | Meeting → prior-auth packet / appeal letter | CMS MA Final Rule mandates human review on denials |

**Do NOT** chase horizontal positioning before Vertical 2 is profitable. Crossing The Chasm — own one tribe, then bridge.

---

## Operational implications for the dev team

Every feature decision should be evaluated against which loop it accelerates:

| Question | Loop 1 | Loop 2 | Loop 3 |
|---|---|---|---|
| Does it deepen capture within an existing org? | ✓ | | |
| Does it bring a counterparty (client/supplier/auditor) onto Knowcap? | | ✓ | |
| Does it expose the verified-fact substrate to a third-party developer? | | | ✓ |
| Does it make agents more capable of taking real actions on confirmed facts? | ✓ | | ✓ |

**Examples in current backlog:**
- ~~Inbox confirm gate fix (the 3 `review_status` ignore-sites)~~ — **DONE 2026-05-12 via PR #305.** Core verification gate is live; memoryService filters + sorts by importance, LLM prompt tags claim/evidence, MCP exposes status filter.
- `confirmation_source` schema split (human-confirmed vs rule-auto-confirmed) — **Loop 1 + Loop 3** (required before rule-promotion UI can ship honestly; see [VERIFICATION-UX.md](./VERIFICATION-UX.md) Mechanism 2)
- Instructions Hierarchy — **Loop 1** (org configurability deepens single-org value)
- Typed edge layer — **Loop 1 + Loop 3** (deepens agent reasoning AND makes the MCP more powerful)
- Cross-org bridges + Parties confirmation surface — **Loop 2** (the network effect mechanism)
- Odoo SH lighthouse demo — **Loop 1 sales proof**; pattern reused in Loop 3 as a reference agent
- MCP `verification_strictness` parameter — **Loop 3** (compliance-gated agent tier)
- "Compliance-attested agent" certification framework — **Loop 3** (regulated-vertical premium)

**Decision principle:** ship Loop-1 work that proves single-org ROI **before** ship Loop-2 viral mechanics **before** ship Loop-3 marketplace. Do not invert this — a marketplace without proven single-org ROI is empty.

---

## What this strategy is NOT

- **Not a product roadmap.** Loop sequencing is not a Gantt chart. Specific features ship when their value to the current loop is clear; the strategy doc tells you which loop the feature serves.
- **Not a pitch deck narrative.** External-facing storytelling lives in [POSITIONING.md](./POSITIONING.md). This doc is internal — devs and Hassan use it to align build priorities.
- **Not a substitute for VISION.md.** VISION says *what we are.* STRATEGY says *how the business compounds.*
