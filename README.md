# Knowcap Marketing

> This repo is the public website + brand + content + marketing intelligence for [Knowcap](https://knowcap.ai).
> Engineers reading code → see [Knowcap-V2/knowcap](https://github.com/Knowcap-V2/knowcap) instead.

Renamed from `knowcap-landing` on 2026-06-01 as part of the brand/code split. Layout matches the main `knowcap` repo for consistency: `app/` runs the website, `docs/` holds everything humans read.

## What's in here

| Top-level | What |
|---|---|
| `app/` | The live Next.js website (Vercel auto-deploys from `main`) |
| `app/content/blog/` | Shipped blog posts (Markdown — rendered by Next.js) |
| `docs/` | Everything brand, marketing, and content — see breakdown below |

## docs/ breakdown

| Folder | What |
|---|---|
| `docs/brand/` | DNA: VISION, POSITIONING, MOAT, STRATEGY, PRODUCT, personas, design explorations, decisions |
| `docs/research/` | Audits (SEO/GEO), competitor positioning, raw data (CSVs) |
| `docs/campaigns/` | StratDev agency briefs, paid-ad copy, landing-page experiments |
| `docs/content-pipeline/` | Blog drafts pre-publish, ideas, video briefs, strategy docs |
| `docs/strategy/` | GTM plans (June 2026 GTM game lives here) |
| `docs/DESIGN.md`, `docs/DESIGN-E.md` | Website design systems — read before changing layout, color, or type |

## Workflow

- **Adding a blog post:** draft in `docs/content-pipeline/drafts/` → review → publish by moving to `app/content/blog/`
- **Updating VISION/POSITIONING/MOAT/STRATEGY:** edit in `docs/brand/` directly — PR-reviewed. These are the canonical source of truth.
- **Adding marketing intel:** drop in `docs/research/` (audits/, data/, or competitors/<name>/)

## Branch rules

Same as all `Knowcap-V2` repos: never push to `main` directly. Branch + PR only.

## Why this layout

Both Knowcap repos use the same `app/`-or-`code/` + `docs/` split. In `knowcap` (main), `client/` + `server/` + `extension/` is the code and `docs/` is everything else. Here, `app/` is the code (the website) and `docs/` is everything else (brand, research, campaigns). One mental model, two repos.
