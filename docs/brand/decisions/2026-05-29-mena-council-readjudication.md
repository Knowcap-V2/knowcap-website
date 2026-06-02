# Re-Adjudication Council — Strategic Correction

**Date:** 2026-05-29
**Supersedes:** [`decisions/2026-05-25-strategic-council.md`](./2026-05-25-strategic-council.md) (corrects, does not delete)
**Status:** Locked by Hassan, 2026-05-29

## Context

The 2026-05-25 strategic council ran on two false premises:

1. **It read the stale `main` branch.** The real work is on the `hassan` branch: **+33,760 / −6,286 lines, 176 files, 391 commits, May 18–29**. The council reasoned about a codebase that no longer reflects reality.
2. **It assumed human-team build velocity.** Premise: features take quarters. Reality: the remaining vision is a ~3-week build.

Both premises are wrong, so the 2026-05-25 conclusions that depended on them (the "kill list", the velocity-driven GTM, the launch-timing peg) are re-adjudicated here.

**Team shape for the math below:** Hassan does not code. Shady builds everything — including `knowcap-mcp` — from June 2026 onward. Hassan writes detailed PR specs. Velocity figures are Shady-with-Claude figures, not a team-of-engineers estimate.

## The Decision (rulings)

### 1. Market: MENA-first, Egypt beachhead, then US

Unanimous **3/3 across both councils.** Build speed fixes the **product**, not the **go-to-market**. The US is blocked by factors no amount of faster code can move:

- ~**$1,461 fintech CAC**
- **SOC2 Type 2** — 6–12 month *calendar* clock (observation window, not a build)
- **6–18 month** regulated-industry sales cycles
- **$281M** competitor funding

None of these are fixable by shipping code faster. MENA-first stands.

### 2. Build the full vision — don't strip it

Honest velocity is **~2,000 logic-lines/day** — **NOT 10k**. The 10k figure was one burst plus a UI-port commit, not a sustainable rate. At ~2,000 logic-lines/day, the **full remaining vision is ~3 weeks of build.**

Therefore the 2026-05-25 **kill list is REVERSED.** The items it proposed cutting —

- Skills runtime
- the `confirmation_source` / cross-org / typed-graph moat
- "dead" Odoo code

— are either **already built** or a **2–3 week build**, not the 12–18 month build the prior council assumed. Nothing on the kill list gets cut.

### 3. Honesty gap is the #1 priority fix — and it INVERTS the prior advice

The 2026-05-25 council said: water down the copy to match what the code does. **Reversed.** Build the code to make the claim TRUE instead:

> "agents act only on human-verified facts"

This is a **2–4 day `confirmation_source` build**, not a copy edit. Do **not** weaken the positioning. Spec: [honesty-fix-confirmation-source.md](https://github.com/Knowcap-V2/knowcap/blob/main/docs/proposals/honesty-fix-confirmation-source.md).

### 4. New bottleneck = founder SELLING hours + calendar-bound items — not building

With building no longer the constraint, the critical path is:

- founder **selling** hours
- the **SOC2** calendar clock
- the **Odoo lighthouse design-partner sign-off** — **overdue since May 26**
- **3 paying pilots**
- **demand signal**

Building is not on the critical path. Founder time and calendar-bound external clocks are.

### 5. Re-peg launch timing — off the (now-deferred) regulatory deadline

**EU AI Act Article 14 was deferred** from **Aug 2 2026 → Dec 2 2027** (Digital Omnibus, announced ~May 7 2026). The old "why now" hard deadline is gone.

Re-anchor the "why now" to instruments that are actually in force:

- **Saudi PDPL** — enforced since **Sep 2024**
- **GDPR Article 22 / CJEU SCHUFA**

**Pick the launch date on Odoo-demo readiness, not on a regulatory deadline.**

### 6. Lighthouse demo — kill the unbuildable version, ship the buildable one

- **KILLED:** the "meeting → auto-generated Odoo SH PR" demo. It is **~0% built** and is **contradicted by the product's own code** — we'd be demoing something the codebase doesn't do.
- **REPLACES IT:** "meeting → human-confirmed memory → Odoo task." This is **~75–80% built** and is on-thesis (it routes through human confirmation, which is the whole point of the product).

### 7. Stats to correct everywhere

The docs currently assert these. They are wrong — fix on contact (verified via live sources 2026-05-29):

| Claim in docs | Reality |
|---|---|
| "Speechmatics 96% on dialects" | **Misleading** — 96% is an *up to* / peak MSA number; no per-dialect breakdown is published. Independent 2025 NADI benchmarks show ~38% WER on spontaneous dialect speech. |
| "WhatsApp 77% Saudi" | **Understated** — ~86% of internet users in Saudi; ~72% in Egypt (DataReportal 2025). |
| Odoo partner split "187/181/105" | **Off** — Odoo's directory shows ~181 Egypt / ~182 Saudi / ~104 UAE (~470 total); counts drift, verify before public use. |
| "0 MENA competitors" | **False for notetakers** — Mudawin, Notah, Munsit exist. **True only for verified-memory** ("0 doing human-verification"). |

## Why (corrected assumptions + evidence)

| Prior assumption (2026-05-25) | Corrected assumption (2026-05-29) | Evidence |
|---|---|---|
| The codebase is what's on `main` | The real work is on `hassan` | **+33,760 / −6,286, 176 files, 391 commits, May 18–29** |
| Build velocity is human-team (features = quarters) | ~2,000 logic-lines/day; full vision ≈ 3 weeks | 10k was one burst + a UI-port commit, not a rate |
| Moat/Skills/Odoo code is a 12–18mo build → cut it | Already built or a 2–3 week build → keep it | corrected velocity applied to the actual `hassan` diff |
| Copy over-claims → soften the copy | Code under-delivers → build the code, keep the copy | `confirmation_source` is a 2–4 day build |
| Building is the bottleneck → optimize for build speed | Founder selling + calendar clocks are the bottleneck | SOC2 6–12mo, Odoo sign-off overdue since May 26, pilots/demand still open |
| Launch is pegged to EU AI Act Art. 14 (Aug 2 2026) | Art. 14 deferred to Dec 2 2027; peg to PDPL + GDPR Art. 22 instead | Digital Omnibus, announced ~May 7 2026; PDPL enforced Sep 2024 |
| Lighthouse = meeting → auto-generated Odoo SH PR | meeting → human-confirmed memory → Odoo task | SH-PR demo ~0% built and contradicted by product code; replacement ~75–80% built |

## What changed from the 2026-05-25 council

| 2026-05-25 ruling | 2026-05-29 ruling | Direction |
|---|---|---|
| Strip the vision; ship a kill list | Build the full vision; kill list REVERSED | Reversed |
| Soften the honesty copy to match code | Build the code to make the copy true | Reversed |
| Build speed is the lever; optimize for it | Build is no longer the bottleneck; founder selling + calendar are | Reversed |
| Peg launch to EU AI Act Art. 14 (Aug 2 2026) | Art. 14 deferred to Dec 2 2027; peg to PDPL + GDPR Art. 22; launch on demo-readiness | Re-pegged |
| Lighthouse = meeting → Odoo SH PR | Lighthouse = meeting → human-confirmed memory → Odoo task | Replaced |
| MENA-first, Egypt → US | MENA-first, Egypt → US | **Unchanged (3/3 both councils)** |

## Locked calls (Hassan, 2026-05-29)

1. `confirmation_source` legacy bulk rows = **`'human'`**.
2. Fix `buildProjectContext` `system_seed` handling **now**.
3. **Shady owns all coding**, including `knowcap-mcp`.

## Docs synced with this record (2026-05-29)

- [x] [`VISION.md`](../VISION.md) — date re-pegged, MENA stats corrected, lighthouse demo revised, header updated
- [x] [`MOAT.md`](../MOAT.md) — Art 14 date corrected, window re-pegged to PDPL + GDPR Art 22, lighthouse line revised
- [x] [`POSITIONING.md`](../POSITIONING.md) — stats corrected, compliance-window section re-pegged
- [x] `marketing-content-plan.md` — launch peg, content piece #15, regulatory brief re-pegged; moat-in-content note added
- [x] `june-2026-gtm-game.md` — XP/no-XP contradiction in anti-cheat removed
- [x] [`decisions/2026-05-25-strategic-council.md`](./2026-05-25-strategic-council.md) — superseded-by banner + stat corrections
- [x] [odoo-sh-lighthouse.md](https://github.com/Knowcap-V2/knowcap/blob/main/docs/proposals/odoo-sh-lighthouse.md) — superseded banner (SH-PR demo killed)
- [ ] `STRATEGY.md` — no hard factual error (Art 14 used as a segment label); revisit launch-timing language on next edit
