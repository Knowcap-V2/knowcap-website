# Knowcap Marketing

> This repo is the public website + brand + content + marketing intelligence for [Knowcap](https://knowcap.ai).
> Engineers reading code → see [Knowcap-V2/knowcap](https://github.com/Knowcap-V2/knowcap) instead.

Renamed from `knowcap-landing` on 2026-06-01 as part of the brand/code split.

## What's in here

| Folder | What |
|---|---|
| `app/` | The live Next.js website (Vercel auto-deploys from `main`) |
| `app/content/blog/` | Shipped blog posts (Markdown — rendered by Next.js) |
| `brand/` | DNA: VISION, POSITIONING, MOAT, STRATEGY, PRODUCT, personas, design explorations, decisions |
| `research/` | Audits (SEO/GEO), competitor positioning, raw data (CSVs) |
| `campaigns/` | StratDev agency briefs, paid-ad copy, landing-page experiments |
| `content-pipeline/` | Blog drafts pre-publish, ideas, video briefs, strategy docs |
| `strategy/` | GTM plans (June 2026 GTM game lives here) |

## Workflow

- **Adding a blog post:** draft in `content-pipeline/drafts/` → review → publish by moving to `app/content/blog/`
- **Updating VISION/POSITIONING/MOAT/STRATEGY:** edit in `brand/` directly — PR-reviewed. These are the canonical source of truth.
- **Adding marketing intel:** drop in `research/` (audits/, data/, or competitors/<name>/)

## Branch rules

Same as all `Knowcap-V2` repos: never push to `main` directly. Branch + PR only.

## Design system

`DESIGN.md` and `DESIGN-E.md` at the repo root govern visual decisions across the website. Always read before changing layout, color, or type.
