# Knowcap vs. Claude — division of labor for B2B custom automations

Hassan-owned. The forward strategy for how Knowcap and Claude/Claw split the work when we automate a B2B team's operations. Read this before scoping any "implant Knowcap, then automate the org" engagement.

**Created:** 2026-06-08. Companion to [`../brand/STRATEGY.md`](../brand/STRATEGY.md) (the three-loop product flywheel) and [`../brand/VISION.md`](../brand/VISION.md).

---

## The one line

> **Knowcap is the data plane. Claude is the build plane. Knowcap captures, verifies, and serves the org's truth; Claude builds the bespoke automations on top of that truth. Knowcap does not need its own general-purpose AI brain — the brain for custom work is Claude.**

A repeatable automation graduates *down* into Knowcap as a native feature. A bespoke one stays *up* in Claude. The boundary test below decides which.

---

## Two planes

| | **Knowcap — the data plane** | **Claude / Claw — the build plane** |
|---|---|---|
| **Job** | Capture every channel, classify into the commitment ontology, get a named human to verify, store as the verified graph, serve it via MCP | Build the bespoke thing the client actually needs: a website, an app, an integration, a multi-step automation |
| **Always on?** | Yes — runs continuously, ingesting and serving | No — invoked per build, episodic |
| **Owns the intelligence?** | No general-purpose brain. It runs *small, bounded* automations (notify, draft, create-task, log) and the verification gate | Yes. The reasoning, the code, the bespoke logic lives here |
| **What it is to the client** | The trusted memory + the small-automation runtime | The muscle that builds whatever is too custom to be a product feature |
| **Unit** | A verified memory; a native Skill / Vertical Pack | A delivered build (repo, deployed app, wired integration) |

The mistake to avoid: trying to make Knowcap a do-anything agent platform that reasons its way through any custom request. That's Claude's job. Knowcap's edge is **trusted data + a tight set of native automations**, not open-ended intelligence.

---

## "Knowcap doesn't need its own AI brain" — what that means precisely

It does **not** mean Knowcap has no AI. It runs extraction, classification, edge-suggestion, and Ask-Knowcap (read-only answers). Those are **bounded** AI jobs scoped to the data plane.

It **does** mean: when a client wants ten things automated, we do **not** try to express all ten as Knowcap-internal agents reasoning over the graph. We point Claude at the verified graph (via MCP) and Claude builds the ten things — as code, as integrations, as deployed automations. Knowcap is the source of trusted context Claude reads from and writes confirmed results back to. The heavy, bespoke reasoning is Claude's, not a feature we build into Knowcap.

This keeps Knowcap's surface small and trustworthy and puts the open-ended work where open-ended work belongs.

---

## The boundary test

For any automation a client asks for, ask one question:

> **"Would ten other clients want this *identical* thing?"**

- **Yes → it's a product.** Build it once as a native Knowcap Skill or fold it into a Vertical Pack. It graduates into the data plane and every client gets it.
- **No → it's bespoke.** Claude builds it for this client on top of their verified graph. It stays in the build plane.
- **Sort-of (the shape repeats, the specifics differ) → hybrid.** Knowcap provides the native capture/verify/serve half; Claude builds the client-specific action half against the MCP.

Three buckets, one question. Run every requested automation through it before deciding who builds it.

---

## The bespoke → product flywheel

```
Client needs automation X
        ↓
Boundary test: bespoke → Claude builds it on the verified graph
        ↓
A 2nd, 3rd client needs the same shape
        ↓
It crosses the "10 clients want it" line → productize into a native Knowcap Skill / Vertical Pack
        ↓
Every future client gets X out of the box → services time shrinks → margin rises
        ↓
       LOOP
```

Services revenue (Claude builds) funds the product and *discovers* which features are worth building. The product (Knowcap native) makes the next engagement faster and cheaper. This is the same shape as the Loop-3 Vertical Packs flywheel in [STRATEGY.md](../brand/STRATEGY.md) — the difference is that the *input* to the marketplace is real paid bespoke work, not guesses.

**Rule:** don't productize on the first request. Let the boundary test fail twice (bespoke for client 1 and 2) before you spend product time. Premature productizing builds features one client wanted and nine don't.

---

## The B2B engagement motion

The repeatable shape for an org-wide engagement (the Ariika archetype):

1. **Implant (≈30 days).** Knowcap becomes the ingestion layer across the org — meetings, recordings, uploads, URLs, text, and Telegram (the channels that capture today). Every employee's real work flows in and gets classified + verified.
2. **Capture → strategy.** From the verified graph, produce an **AI strategy** the client signs off on: here are your commitments, risks, bottlenecks, and the automations that would actually move the needle — each tagged native / hybrid / bespoke via the boundary test.
3. **Claw builds.** Claude builds the signed-off automations — bespoke ones as code/integrations, native-shaped ones as Knowcap Skills.
4. **Graduate repeatables.** Anything that recurs across clients crosses the boundary line and becomes a product feature.

Knowcap is the always-on layer in steps 1–2 and the home for graduated features in step 4. Claude is the muscle in step 3.

---

## What this means for the Knowcap roadmap

- **Build into Knowcap (native):** capture across more channels, the verification gate, the commitment ontology, edge suggestion, Ask-Knowcap (read-only), small bounded automations (notify / draft / create-task / log), the MCP that serves verified facts, and Vertical Packs for proven repeatable workflows.
- **Do NOT build into Knowcap:** open-ended "automate anything" agents, bespoke client integrations, one-off websites/apps. Those are Claude builds against the MCP. If one recurs, *then* it earns a native feature via the boundary test.
- **The MCP is the seam.** Everything Claude builds reads verified facts (and writes confirmed results back) through the Knowcap MCP with `verification_strictness`. Keeping that seam clean is what lets the two planes stay separate and the flywheel turn.

---

## Worked example

The design-crew automation analysis for Ariika applies this exact test — 13 candidate automations sorted into native / hybrid / bespoke, with the flywheel candidates (spec-checker, call-QA) called out. See `~/Github/ariika/ai-program/boundary-test-design-crew.html` and the program overview at `~/Github/ariika/ai-program/knowcap-vs-claude-architecture.html`.
