# audit-seo

Audit knowcap.ai for SEO health regressions.

## Status: stub

## Inputs

- Live crawl seed: routes from `app/sitemap.ts`
- Yesterday's baseline (stored in `runs/baselines/` outside the repo, fetched at run time)
- Current scoring rubric from the most recent `docs/research/audits/SEO-AUDIT-*.md`

## Checks (TBD — fill in P1)

- Title presence + uniqueness per route
- Meta description presence + length
- Canonical tag presence + correctness
- JSON-LD schema presence (Organization, WebSite, SoftwareApplication minimum)
- robots.txt content (must NOT block GPTBot, ClaudeBot, etc.)
- Sitemap completeness — every route in `app/app/**` must have a sitemap entry
- Core Web Vitals — LCP, FID, CLS via web-vitals or Lighthouse CI
- Per-page H1 presence + uniqueness

## Outputs

- New `docs/research/audits/SEO-AUDIT-<YYYY-MM-DD>.md` if regression detected
- Default: silent success, no PR

## TBD

- Crawler implementation (puppeteer? curl + cheerio? Playwright?)
- Baseline storage location
- Severity rubric — what's a regression vs. an intentional change?
