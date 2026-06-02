# persona-refresh

Re-validates the MENA SME persona segmentation against fresh signal (Google Trends, LinkedIn counts, YouTube comments). Opens a PR to `docs/brand/personas/` if the signal has shifted enough to change a persona's pain/reachability/WTP score.

## Status: stub
Runtime not wired yet.

## Trigger

See [`triggers.yml`](./triggers.yml) — cron `0 6 1 * *` (first of each month 06:00 UTC).

## Skill

Calls [`_skills/refresh-persona/SKILL.md`](../_skills/refresh-persona/SKILL.md).

## Inputs

- `docs/brand/personas/PRODUCT-PERSONAS.md` — current canonical segmentation
- `docs/brand/personas/PRODUCT-PERSONAS-UPDATE-*.md` — last update with signal validation
- Google Trends API (5-year window, MENA-only)
- LinkedIn free company search counts (UAE / KSA / Egypt SMB filter)
- YouTube Data API — comment mining on MENA-business channels for pain language
- Apollo.io (if rate-limit allows) — refresh per-country SMB counts

## Outputs

- New `docs/brand/personas/PRODUCT-PERSONAS-UPDATE-<YYYY-MM-DD>.md` if any segment's score shifts by ≥1 tier (painkiller ↔ vitamin, or reachability shift)
- One PR titled `[persona-refresh] <YYYY-MM-DD> — <N> segments shifted`
- Updates rolling baseline CSVs in `docs/research/data/` only via the PR

## Human confirms

- Merge PR = canonical segmentation updated
- Close PR = signal didn't justify a strategy change

## Constraints

- Never delete `PRODUCT-PERSONAS.md` — it's the locked canonical Phase-1. Only ADD update files.
- Never automate the verdict — write the data + the proposed re-rating, but the actual "VERDICT: pivot beachhead" line stays manual (Hassan-only).
- Flag rising-search shifts > 100% YoY explicitly in the PR body — those usually indicate a new ICP candidate, not a refinement.

## Run log

`runs/` (gitignored).
