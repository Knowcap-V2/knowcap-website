# weekly-blog

Generates one blog draft per week, opens a PR to `docs/content-pipeline/drafts/` for review.

## Status: stub
Runtime not wired yet. Run manually via Claude Code today; cron-trigger via Hermes/GitHub Actions later.

## Trigger

See [`triggers.yml`](./triggers.yml) — cron `0 6 * * MON` (every Monday 06:00 UTC = 09:00 Cairo).

## Skill

Calls [`_skills/write-blog-draft/SKILL.md`](../_skills/write-blog-draft/SKILL.md).

## Inputs

- `docs/brand/personas/PRODUCT-PERSONAS.md` — pick a target persona based on rotation or audit-driven priority
- `docs/brand/VISION.md` — voice, anti-positioning, trust-layer thesis
- `docs/brand/POSITIONING.md` — three-sentence positioning, anti-positioning
- `docs/research/audits/` — most recent SEO + GEO audit findings (target keywords + gaps)
- `app/content/blog/` — last 20 shipped blogs (avoid topic repetition)
- `docs/research/competitors/` — competitor positioning (for differentiation angle)

## Outputs

- One markdown file at `docs/content-pipeline/drafts/<slug>.md`
- One PR titled `[blog-draft] <title>` against `main`
- Front-matter: `title`, `slug`, `persona`, `target_keyword`, `geo_score`, `est_word_count`, `draft_date`

## Human confirms

- Merge PR = approve + advance to review queue (next routine: `content-curator` or manual edit pass)
- Close PR = reject (consider tightening the skill prompt if rejected for prompt-quality reasons)

## Constraints

- ICP-aligned only — Odoo partners, MENA SMBs, audit firms (regulated), agencies. NEVER write for "any SME."
- 1,300–1,600 words
- GEO-optimized: 134–167 word self-contained passages, FAQ section, schema-friendly structure
- Front-matter must include `geo_score` per `docs/research/audits/GEO-AUDIT-*.md` scoring rubric
- Never write a blog whose title overlaps with a shipped blog in `app/content/blog/`

## Run log

`runs/` (gitignored). Each run produces a timestamped folder with the draft, the prompt, the chosen persona, and metadata.
