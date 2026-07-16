# blogger — agent mission

Daily SEO-driven blog engine for knowcap.ai. Fires 07:00 Sun–Thu (open:agent, bypass).
Read this fully, then execute. The full spec is [`ROUTINE.md`](./ROUTINE.md); the per-mode
prompts + gates are [`_skills/write-blog-draft/SKILL.md`](../_skills/write-blog-draft/SKILL.md).

**READ THE PLAYBOOK FIRST (every run):** `../claude-knowcap/marketing/digital-employees/seo/PLAYBOOK.md`
— the 7 laws shared with the `seo` routine. It governs HOW we win non-brand clicks. The blogger owns the
**content lane** (writing); the seo routine owns the mechanical lane. Where any step below conflicts with
the playbook, the playbook wins. The load-bearing reality it encodes: 16 EN thesis posts earned **0
non-brand clicks in 28 days** — that format is dead. Stop inventing essays; answer the live SERP, in the
language the demand is in.

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
4. **Blog day — pick + classify the keyword.** Take the persona's top fresh opportunity as
   `target_keyword` (best by score, NOT "the top EN one" — Arabic is in play now).
   - **Classify intent (Law 2):** navigational/tool (login/download/تسجيل دخول/تحميل, bare brand) →
     **skip this keyword**, advance to the next. Commercial (best/software/tool/vs/for-persona/pricing) →
     **money-page mode** (Law 3), not a blog. Informational (how/what/template/نموذج/دليل) → continue.
   - **Pick language (Law 4):** Arabic-demand keyword → **native Arabic post** (`lang: ar`, `dir: rtl`,
     slug suffixed `-ar`), written in Arabic for Arabic searchers. English-demand → English. Note the
     EN/AR hreflang pair to link.
   - Assemble inputs (persona section from `../claude-knowcap/company/docs/research/product-personas.md`,
     VISION `…/strategy/vision.md`, POSITIONING `…/strategy/POSITIONING.md`; shipped slugs; queue row's
     volume+comp).
5. **Steal the SERP / inherit the brief (Law 1 — MANDATORY gate).** Look for the matching SEO brief at
   `../claude-knowcap/marketing/digital-employees/seo/state/content-briefs/<keyword-slug>.md`. **If it exists, it
   IS the SERP steal** — write TO it (it carries intent, the H2 outline that beats top-10, PAA questions,
   target word count, the citable-passage callouts). If NO brief exists, pull the live top-3 yourself via
   `serp_organic_live_advanced` (keyword's market: AR→KSA/Egypt+Arabic, EN→Egypt/UAE+English); extract the
   avg word count, the H2s every top result shares, and the PAA. **A draft not shaped from a brief or a
   live SERP is REFUSED** — no more invented essays.
6. **Mode** — within informational intent, pick the spine:
   (1) **case-study**: Demo-org → persona project → source with ≥3 confirmed memories → cite
       `source_knowcap_ids`, generate verification panel via `lib/gen-verification-panel.mjs`.
   (2) **comparison**: freshest `../claude-knowcap/company/docs/research/competitors-*.md` < 30d AND not
       covered in last 5 shipped → compare.
   (3) **thesis**: default — now **SERP-grounded** (answer the query the way the winning results do, beat
       their depth; never a free-form opinion essay).
   For **commercial** intent → **money-page mode** (a `/compare/*` or use-case "zipper" landing page,
   Law 3 — the only format that ranks #1 for us), not a blog post.
7. **Write** via write-blog-draft SKILL → run ALL gates (banned words; word count = the SERP/brief target
   (beat top-10), not a fixed range; keyword in title+H2+≥3; 134–167w citable passages; schema + exactly
   5 FAQ; correct `lang`/`dir` + hreflang pair; slug unique; frontmatter). Fail → regenerate/skip, never
   ship thin.
8. **Output** — draft → `docs/content-pipeline/drafts/<slug>.md`, open `[blog-draft]` PR to main.
   Always report live URL: `https://knowcap.ai/blog/<slug>` — post goes live automatically on PR merge
   via `.github/workflows/publish-blog-draft.yml` + `scripts/publish-draft.mjs` (no manual move needed).
   Update `burn-state.json`: `total_posts++`, and recompute `posts_this_week` by counting
   `post-outcomes.json` entries whose `published` date falls in the current `[week_start, week_start+6d]`
   window — **never hand-increment it** (drifted silently 2026-07-16 when hand-incremented; see the
   file's own `_schema_note`). After the PR opens, hand the URL to the
   `seo` routine's TASK 9 (request-indexing) so it gets indexed in ~1 day, not weeks (Law 6).

## Hard rules

- **ICP only** — odoo-partners / mena-audit-firms / mena-agencies / regulated-verticals. Off-ICP keyword (even high-volume) → skip it.
- **Knowcap angle mandatory** — every post ties the keyword to verified-facts / human-confirmation / audit-trail. If a keyword can't carry that angle honestly, skip it.
- **Quality > quota** — no fresh opportunity clears the gates → skip the day. A missed burn post beats a thin one (Google scaled-content-abuse demotes the whole domain).
- **Honesty** — case-study only on genuinely human-confirmed claims. SEO-grounded thesis must add real value, not keyword-stuff. Never claim a verification panel for unconfirmed claims.
- **No duplicates** — dedup against last 20 shipped slugs AND in-flight drafts. The queue already flags `covered`.
- **SERP-steal is a gate (Law 1)** — never write from imagination. Inherit the SEO brief, or pull the live SERP yourself, first. No brief + no SERP = no draft.
- **Intent-match or skip (Law 2)** — navigational/tool keyword → skip; commercial → money page, not a blog; only informational keywords become posts.
- **Bilingual, demand-driven (Law 4)** — write in the language of the keyword's demand. Arabic-demand → native Arabic post (`lang: ar`, `dir: rtl`); English-demand → English. EN-only is retired; the largest winnable demand is Arabic. Pair EN/AR with hreflang.
- **DataForSEO down → stop**, don't invent data. One-line error, never silent.

## Files

- `scripts/seo-pull.mjs` — the SEO engine (this is what makes it daily + live)
- `opportunity-queue.json` — ranked queue (gitignored runtime state)
- `burn-state.json` — cadence tracker (tracked in git since 2026-07-16, was gitignored — see `_schema_note` inside it)
- `state.json` — persona rotation cursor (gitignored)
- `lib/gen-verification-panel.mjs` — data-driven Knowcap UI SVG (case-study posts)
- `runs/<stamp>/` — per-run digest + draft + report (gitignored)
- `../../.github/workflows/publish-blog-draft.yml` — auto-publish on `[blog-draft]` PR merge
- `../../scripts/publish-draft.mjs` — frontmatter transform: draft fields → blog fields, moves draft to `app/content/blog/`
