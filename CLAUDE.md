<!-- github-project-provenance-2026-09-27 -->
## GitHub report identity (Hassan, 27 September 2026)

This rule supersedes older GitHub issue provenance/title/label instructions below or elsewhere. Applies to every organization's GitHub projects and every reporting person, including Hassan, Shady, Sara and customers.
- Every project item carries two TEXT fields: **Source chat** = the actual originating chat title, including its date/run when present; **Reported by** = the actual reporting person. A shared GitHub account, assignee, department abbreviation or filing agent is not evidence of the person's identity. For an autonomous report, record the actual agent/routine; never invent a human or chat title. Unknown values stay blank and are disclosed.
- Issue title: `[<actual source chat title>][<reporting person>][<type>][P<n>][<area>] <specific title>`, keeping only applicable type/priority/area brackets. Example: `[AV Techstack-Watch 9/27 #32][Hassan][bug][P2][security] Email reservation function permits anonymous execution without checking user ownership`.
- Store these identities in the project fields, **not identity labels** (`found-by:`, `reported-by:`, or source-chat labels). Preserve the actual discovery/verification history in the body; the reporting person and discovering agent can differ. Other type, priority, area and method labels remain valid. Existing Odoo requirements are unchanged.
- Discover/reuse each project's field IDs; create missing fields as TEXT. After adding the issue to each destination project, set both fields and read the item back. A title/body or label alone is not completion. New projects get the same fields. Do not guess IDs or silently claim success when permissions prevent setting them.
- Historical backfill uses evidence only; never substitute today's chat/person for an old report. Remove an identity label from an item only after its information is preserved in fields or the body; do not delete repository-wide labels as a shortcut.
<!-- /github-project-provenance-2026-09-27 -->

# Knowcap Website

## What This Is
Brand + marketing + website for Knowcap (knowcap.ai). Renamed `knowcap-landing` → `knowcap-marketing` (2026-06-01) → `knowcap-website` (2026-06-11; GitHub auto-redirects old URLs). Layout mirrors the main `knowcap` repo: `app/` runs, `docs/` reads.

- **Repo:** Knowcap-V2/knowcap-website
- **Stack:** Next.js 14, Tailwind, deployed via Vercel
- **Vercel project:** `knowcap-website` (ex `knowcap-landing`) on team `knowcap` (info@smetools.io account; hsa = DEVELOPER role, preview deploys only)
- **Root directory on Vercel:** `app/` (the Next.js subfolder; CLI deploys run from repo root where `.vercel/` lives)
- **Domain:** knowcap.ai + www (Cloudflare → Vercel)

## Where things live

| What | Where |
|---|---|
| Website code | `app/` (Next.js) |
| Shipped blog posts | `app/content/blog/*.md` |
| Brand DNA | `docs/brand/` (VISION, POSITIONING, MOAT, STRATEGY, PRODUCT, personas, decisions, design-explorations, legacy) |
| Marketing research | `docs/research/` (audits/, data/, competitors/) |
| Campaigns | `docs/campaigns/` (stratdev/, landing-pages/, linkedin-outbound, meta-paid-sprint) |
| Content & features docs | `docs/content-and-features/` (incl. **utm-links.html** — canonical UTM link set) |
| Content drafts | `docs/content-pipeline/` (strategy/, drafts/, ideas/, video/) |
| Strategy | `docs/strategy/` (gtm-strategy.md, june-2026-gtm-game.md) |
| Design system | `docs/DESIGN.md` + `docs/DESIGN-E.md` |
| Routines (autonomous work) | `routines/` (blogger, nightly-seo-audit, persona-refresh, content-curator) — see `routines/README.md` for the Routine→Skill→Run→Inbox pattern |

## Design System
Always read `docs/DESIGN.md` (or `docs/DESIGN-E.md` for the /e variant) before making any visual or UI decisions. Font choices, colors, spacing, and aesthetic direction are defined there.

## Vision / brand DNA
`docs/brand/VISION.md` is the source of truth for everything Knowcap means. Cited by every feat() PR body in the main `knowcap` repo via full GitHub URL.

## Sharing links — UTM rule (LOAD-BEARING, locked 2026-07-06)
When Hassan asks for a knowcap.ai link, or any knowcap.ai URL is going somewhere external (post, DM, email, bio, video description), NEVER hand over a bare URL. Pull the matching tagged link from **`docs/content-and-features/utm-links.html`** (per-channel set for `/` and `/beta`, plus the formula for any path: `?utm_source=<where>&utm_medium=<how>&utm_campaign=<push>`). Born from the Jun 2026 lost-leads incident — both lost /beta submitters were untraceable "direct". Internal knowcap.ai→knowcap.ai links NEVER get UTMs.

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
