# nightly-seo-audit

Audits knowcap.ai's live SEO health nightly, opens a PR with a fresh `SEO-AUDIT-<date>.md` report only if regression > 5% from yesterday's baseline.

## Status: stub
Runtime not wired yet.

## Trigger

See [`triggers.yml`](./triggers.yml) — cron `0 3 * * *` (daily 03:00 UTC = 05:00 Cairo).

## Skill

Calls [`_skills/audit-seo/SKILL.md`](../_skills/audit-seo/SKILL.md).

## Inputs

- Live crawl of all routes in `app/sitemap.ts`
- Yesterday's audit baseline in `runs/baselines/` (gitignored — lives outside repo, fetched at run time)
- `docs/research/audits/SEO-AUDIT-2026-06-01.md` — current scoring rubric (38/100 baseline)

## Outputs

- New `docs/research/audits/SEO-AUDIT-<YYYY-MM-DD>.md` IF any of:
  - Overall score drops > 5 points vs yesterday
  - Any page loses canonical, title, or meta-description (HIGH severity)
  - Any new page is missing schema/sitemap entry
- No PR opened if audit is clean — silent success
- If a PR is opened, title: `[seo-audit-regression] <YYYY-MM-DD> — score dropped X→Y`

## Human confirms

- Merge PR = acknowledge + the audit file becomes part of the docs trail
- Close PR = ignore (audit was a false positive)

## Constraints

- Never block on transient 5xx — retry 3 times before flagging
- Distinguish "regression" from "intentional change" — read the last 3 PR titles to main; if any touched `app/app/*.tsx` it's likely intentional, downgrade severity
- Keep the historical baseline rolling 30 days

## Run log

`runs/` (gitignored).
