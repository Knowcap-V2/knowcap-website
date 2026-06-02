# docs/ — Knowcap marketing content

Everything humans read in this repo. Mirrors the `docs/` pattern from the main `knowcap` repo, but here the content is brand + research + campaigns instead of architecture + governance + ops.

## Layout

| Folder | What |
|---|---|
| [`brand/`](./brand/) | DNA — VISION, POSITIONING, MOAT, STRATEGY, PRODUCT, personas, decisions, design explorations, legacy positioning |
| [`research/`](./research/) | Audits (SEO + GEO), competitor breakdowns, raw data CSVs |
| [`campaigns/`](./campaigns/) | StratDev agency briefs, paid-ad copy, landing-page experiments |
| [`content-pipeline/`](./content-pipeline/) | Blog drafts pre-publish, ideas, video briefs, marketing content plan |
| [`strategy/`](./strategy/) | GTM strategy + June 2026 GTM game plan |
| [`DESIGN.md`](./DESIGN.md) | Primary design system (cream + Space Grotesk) |
| [`DESIGN-E.md`](./DESIGN-E.md) | /e variant design system (brass + midnight forensic dossier) |

## What's NOT here

- The live Next.js website code → `../app/`
- Shipped blog posts (Markdown rendered by Next.js) → `../app/content/blog/`
- Engineer docs (architecture, ops, governance, proposals) → [`Knowcap-V2/knowcap/docs/`](https://github.com/Knowcap-V2/knowcap/tree/main/docs)

## Cross-links

- `feat()` PRs in the main `knowcap` repo cite `docs/brand/VISION.md` via the full GitHub URL pattern: `https://github.com/Knowcap-V2/knowcap-marketing/blob/main/docs/brand/VISION.md`
- `docs/research/competitors/read.ai/positioning.md` cites Knowcap's brand DNA via full URLs above
- `docs/campaigns/meta-paid-sprint.md` cites `docs/brand/legacy/` and `docs/content-pipeline/video/` via relative paths
