# Knowcap Marketing Page

## What This Is
Brand + marketing + website for Knowcap (knowcap.ai). Renamed from `knowcap-landing` on 2026-06-01. Layout mirrors the main `knowcap` repo: `app/` runs, `docs/` reads.

- **Repo:** Knowcap-V2/knowcap-marketing
- **Stack:** Next.js 14, Tailwind, deployed via Vercel
- **Vercel project:** `app` on team `hsa-smetoolsios-projects`
- **Root directory on Vercel:** `app/` (the Next.js subfolder, not repo root)
- **Domain:** knowcap.ai (Cloudflare → Vercel)

## Where things live

| What | Where |
|---|---|
| Website code | `app/` (Next.js) |
| Shipped blog posts | `app/content/blog/*.md` |
| Brand DNA | `docs/brand/` (VISION, POSITIONING, MOAT, STRATEGY, PRODUCT, personas, decisions, design-explorations, legacy) |
| Marketing research | `docs/research/` (audits/, data/, competitors/) |
| Campaigns | `docs/campaigns/` (stratdev/, landing-pages/, linkedin-outbound, meta-paid-sprint) |
| Content drafts | `docs/content-pipeline/` (strategy/, drafts/, ideas/, video/) |
| Strategy | `docs/strategy/` (gtm-strategy.md, june-2026-gtm-game.md) |
| Design system | `docs/DESIGN.md` + `docs/DESIGN-E.md` |

## Design System
Always read `docs/DESIGN.md` (or `docs/DESIGN-E.md` for the /e variant) before making any visual or UI decisions. Font choices, colors, spacing, and aesthetic direction are defined there.

## Vision / brand DNA
`docs/brand/VISION.md` is the source of truth for everything Knowcap means. Cited by every feat() PR body in the main `knowcap` repo via full GitHub URL.

## Branch Rules
Same as all Knowcap-V2 repos: never push to main. Branch + PR only.

## Key Files
- `app/app/page.tsx` — main landing page (client component, manages theme state)
- `app/components/theme-switcher.tsx` — 4-theme system matching the app
- `app/components/navbar.tsx` — sticky nav with logo, links, theme dots
- `app/components/hero-section-general.tsx` — dark hero section
- `app/next.config.js` — has `ignoreBuildErrors: true` (legacy API routes have TS errors)
- `app/app/robots.ts` — origin robots.txt overrides Cloudflare's managed AI-bot block
- `app/app/sitemap.ts` — sitemap incl. /for/* and /compare/* sub-pages

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Visual polish → invoke /design-review
- QA/testing site behavior → invoke /qa or /qa-only
- Ship/deploy/PR → invoke /ship or /land-and-deploy
