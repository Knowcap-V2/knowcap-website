# Knowcap Landing Page

## What This Is
Marketing landing page for Knowcap (knowcap.ai). Deployed on Vercel, auto-deploys from `main`.

- **Repo:** Knowcap-V2/knowcap-landing
- **Stack:** Next.js 14, Tailwind, deployed via Vercel
- **Vercel project:** `app` on team `hsa-smetoolsios-projects`
- **Root directory on Vercel:** `app/` (the Next.js subfolder, not repo root)
- **Domain:** knowcap.ai (Cloudflare → Vercel)

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Branch Rules
Same as all Knowcap-V2 repos: never push to main. Branch + PR only.

## Key Files
- `app/app/page.tsx` — main landing page (client component, manages theme state)
- `app/components/theme-switcher.tsx` — 4-theme system matching the app
- `app/components/navbar.tsx` — sticky nav with logo, links, theme dots
- `app/components/hero-section-general.tsx` — dark hero section
- `app/next.config.js` — has `ignoreBuildErrors: true` (legacy API routes have TS errors)

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Visual polish → invoke /design-review
- QA/testing site behavior → invoke /qa or /qa-only
- Ship/deploy/PR → invoke /ship or /land-and-deploy
