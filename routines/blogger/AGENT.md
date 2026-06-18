# blogger — agent mission

Daily SEO-driven blog engine for knowcap.ai. Fires 07:00 Sun–Thu (open:agent, bypass).
Read this fully, then execute. The full spec is [`ROUTINE.md`](./ROUTINE.md); the per-mode
prompts + gates are [`_skills/write-blog-draft/SKILL.md`](../_skills/write-blog-draft/SKILL.md).

## Mission

Every day: pull live MENA SEO demand, refresh the ranked opportunity queue, surface a
digest. On burn-cadence blog days: write ONE genuinely-useful, ICP-gated, Knowcap-angled
post targeting the top fresh opportunity, open a draft PR. Never publish thin content to
hit a quota.

## Daily run (in order)

1. **SEO pull** — `node routines/blogger/scripts/seo-pull.mjs` (creds in `~/.claude/secrets/blogger.md`).
   Writes `opportunity-queue.json` (ranked, ICP-filtered, deduped vs shipped **and drafted**) + a digest.
   **Self-skips the paid API** while the cached queue is fresh (<7d) and deep enough (≥4 fresh picks) —
   one ~$0.90 pull feeds weeks of posts at ~$0.05 each, then re-pulls automatically when the queue ages
   out (weekly) or the backlog runs thin. Always call it every run; the script decides whether to spend
   (`--force` overrides). If DataForSEO errors (auth/funds), log one line + STOP (don't fabricate keywords).
2. **Digest** — surface the top picks to Hassan in the run window / Claude agents sidebar.
3. **Burn-state** — read `burn-state.json`; decide if today is a blog-gen day (see ROUTINE.md
   "Daily flow + burn cadence"). If not → done for today (insights only).
4. **Blog day** — pick the persona's top fresh EN opportunity as `target_keyword`. Assemble inputs
   (persona section from `../claude-knowcap/company/docs/research/product-personas.md`,
   VISION from `../claude-knowcap/company/docs/strategy/vision.md`,
   POSITIONING from `../claude-knowcap/company/docs/strategy/POSITIONING.md`;
   shipped slugs; queue row's volume+comp).
5. **Mode** — try in order:
   (1) **case-study**: Demo-org → persona project → source with ≥3 confirmed memories → cite `source_knowcap_ids`, generate verification panel via `lib/gen-verification-panel.mjs`.
   (2) **comparison**: freshest `../claude-knowcap/company/docs/research/competitors-*.md` < 30d AND not covered in last 5 shipped → compare.
   (3) **thesis**: default.
6. **Write** via write-blog-draft SKILL → run ALL gates (banned words, 1300–1600 words, keyword
   in title+H2+≥3, slug unique, exactly 5 FAQ, frontmatter). Fail → regenerate/skip, never ship thin.
7. **Output** — draft → `docs/content-pipeline/drafts/<slug>.md`, open `[blog-draft]` PR to main.
   Always report live URL: `https://knowcap.ai/blog/<slug>` — post goes live automatically on PR merge
   via `.github/workflows/publish-blog-draft.yml` + `scripts/publish-draft.mjs` (no manual move needed).
   Update `burn-state.json` (total_posts++, posts_this_week++).

## Hard rules

- **ICP only** — odoo-partners / mena-audit-firms / mena-agencies / regulated-verticals. Off-ICP keyword (even high-volume) → skip it.
- **Knowcap angle mandatory** — every post ties the keyword to verified-facts / human-confirmation / audit-trail. If a keyword can't carry that angle honestly, skip it.
- **Quality > quota** — no fresh opportunity clears the gates → skip the day. A missed burn post beats a thin one (Google scaled-content-abuse demotes the whole domain).
- **Honesty** — case-study only on genuinely human-confirmed claims. SEO-grounded thesis must add real value, not keyword-stuff. Never claim a verification panel for unconfirmed claims.
- **No duplicates** — dedup against last 20 shipped slugs AND in-flight drafts. The queue already flags `covered`.
- **English posts**, MENA-targeted (mine EN + AR demand, publish EN).
- **DataForSEO down → stop**, don't invent data. One-line error, never silent.

## Files

- `scripts/seo-pull.mjs` — the SEO engine (this is what makes it daily + live)
- `opportunity-queue.json` — ranked queue (gitignored runtime state)
- `burn-state.json` — cadence tracker (gitignored)
- `state.json` — persona rotation cursor (gitignored)
- `lib/gen-verification-panel.mjs` — data-driven Knowcap UI SVG (case-study posts)
- `runs/<stamp>/` — per-run digest + draft + report (gitignored)
- `../../.github/workflows/publish-blog-draft.yml` — auto-publish on `[blog-draft]` PR merge
- `../../scripts/publish-draft.mjs` — frontmatter transform: draft fields → blog fields, moves draft to `app/content/blog/`
