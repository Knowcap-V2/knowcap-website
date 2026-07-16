# blogger

Generates one blog draft per week, picks the right mode (thesis / case-study / comparison) based on what's available, embeds matching screenshots if any, opens a PR to `docs/content-pipeline/drafts/`.

## Status: P1 spec (real instructions, run manually today)

## Trigger

See [`triggers.yml`](./triggers.yml) — cron `0 6 * * MON` (Monday 06:00 UTC = 09:00 Cairo).

## Skill

Calls [`_skills/write-blog-draft/SKILL.md`](../_skills/write-blog-draft/SKILL.md) in `thesis` / `case-study` / `comparison` mode (routine picks).

## Daily flow + burn cadence (SEO engine)

This routine fires DAILY (07:00 Sun–Thu). Every run:

1. **Pull SEO insights** — `node routines/blogger/scripts/seo-pull.mjs` → refresh `opportunity-queue.json` + digest. **Cost-amortized:** the script reuses the cached queue (no API spend) while it's fresh (<7d) and ≥4 fresh picks remain, and re-pulls automatically when it ages out or runs thin. So a real pull (~$0.45–0.90) happens roughly weekly; the other runs are $0.00. ≈$0.05/post amortized. `--force` to re-pull on demand.
2. **Surface the digest** to Hassan (the open:agent run window / Claude agents sidebar — see AGENT.md).
3. **Decide if today is a blog-gen day** from `routines/blogger/burn-state.json`:
   - **burn phase**: generate a post on 3 days/week (Sun/Tue/Thu) until `total_posts >= 24` (~8 weeks), then flip to steady.
   - **steady phase**: generate 1 post/week (Sun).
   - Not a blog-gen day → stop after the digest (insights only, no post).
4. On a blog-gen day → mode selection + write, using the queue's top fresh opportunity as `target_keyword`.

`burn-state.json` (tracked runtime state since 2026-07-16 — was gitignored; promoted for the same reason
post-outcomes.json was in PR #130, an untracked hand-edited counter is how it drifted silently):
```json
{ "phase": "burn", "started": "2026-06-15", "total_posts": 0, "week_start": "2026-06-15", "posts_this_week": 0, "blog_days": ["SUN","TUE","THU"] }
```
After each shipped draft PR: `total_posts++`. Recompute (never hand-increment) `posts_this_week` by counting
`post-outcomes.json` entries whose `published` date falls in `[week_start, week_start+6d]` — this is the
fix for the 2026-07-16 drift (counter read 1 when reality was 2; see `burn-state.json`'s own `_schema_note`).
Recompute the same way on week rollover (don't just reset to 0 — a post published on the rollover day itself
must still count). Flip `phase→steady` + `blog_days→["SUN"]` when `total_posts >= 24`. If the file is absent,
seed burn from today. **Quality bar:** never publish to hit a quota — if no fresh opportunity clears the
gates, skip the day (a missed burn post beats a thin one).

## Mode selection (runtime)

> Governed by `../claude-knowcap/marketing/digital-employees/seo/PLAYBOOK.md`. Intent + language + the
> SERP-steal come BEFORE the content-spine choice.

```
1. Pick persona via round-robin from state.json (if absent → default index 0 = odoo-partners, then create it — see "Persona rotation state")
2. CLASSIFY INTENT (Law 2) on target_keyword:
   - navigational / tool (login, download, تسجيل دخول, تحميل, bare brand) → SKIP keyword, advance
   - commercial (best, software, tool, vs, for-<persona>, pricing)        → mode = money-page (Law 3)
   - informational (how, what, why, template, نموذج, دليل)                → continue to step 4
3. PICK LANGUAGE (Law 4) from the keyword's demand:
   - Arabic-demand keyword → lang=ar, dir=rtl, slug `-ar` suffix, EN hreflang pair noted
   - English-demand keyword → lang=en, dir=ltr
4. STEAL THE SERP (Law 1 — mandatory):
   - brief exists at ../claude-knowcap/marketing/digital-employees/seo/state/content-briefs/<keyword-slug>.md?
       → inherit it (it carries intent, the beat-top-10 H2 outline, PAA, word-count target, GEO passages)
   - else pull live top-3 via serp_organic_live_advanced (keyword's market) → derive structure
   - neither obtainable → REFUSE (no invented essays)
5. PICK SPINE (informational only):
   a. `case-study`: Demo org → persona project → source with ≥3 confirmed memories → most recent
   b. `comparison`: freshest ../claude-knowcap/company/docs/research/competitors-*.md < 30d AND not in last 5 shipped
   c. `thesis` (default): SERP-grounded answer, beat the top-10 — NOT a free-form essay
```

For **money-page** mode, build a `/compare/*` or use-case "zipper" landing page (`[use-case] × [persona|language]`), not a blog post — that is the only format ranking #1 for us (Law 3). The first few *informational* runs pick `thesis` (Demo org empty, no fresh competitor doc < 30d) — but now SERP-grounded, never invented.

## Knowledge base (hub) — paths

Brand DNA, personas, research, and screenshots live in the `claude-knowcap` hub (PR #40 2026-06-11, restructured into `company/docs/` 2026-06-15). NOT under this repo's `docs/`. Hub paths below are relative to this repo root (`knowcap-website/`) — the hub is a sibling repo under `knowcap/`:

| Input | Hub path (relative to repo root) |
|---|---|
| Personas | `../claude-knowcap/company/docs/research/product-personas.md` |
| Vision | `../claude-knowcap/company/docs/strategy/vision.md` |
| Positioning | `../claude-knowcap/company/docs/strategy/POSITIONING.md` |
| Competitors | `../claude-knowcap/company/docs/research/competitors-*.md` (one file per competitor, e.g. `competitors-read-ai-positioning.md`) |
| Screenshots index | `../claude-knowcap/company/docs/product/screenshots/_index.json` |

Outputs stay in THIS repo: drafts → `docs/content-pipeline/drafts/`, shipped → `app/content/blog/` (auto-moved on PR merge).

## Persona rotation state

`routines/blogger/state.json` (gitignored) holds the round-robin cursor. Shape:

```json
{ "personas": ["odoo-partners", "mena-audit-firms", "mena-agencies", "regulated-verticals"], "cursor": 0 }
```

Each run reads `cursor`, picks `personas[cursor]`, then advances `cursor = (cursor + 1) % personas.length` and writes back. **If the file is absent (fresh clone / cloud routine), default to `cursor: 0` (`odoo-partners`) and create it** — never fail on missing state. The persona set is the research-gated ICP roster (see personas study); the cursor is a blind queue, not a per-run decision.

## Inputs (in execution order)

1. **Read persona rotation state** from `routines/blogger/state.json` (gitignored; if absent, default to index 0 = `odoo-partners` and create it)
2. **Read `../claude-knowcap/company/docs/research/product-personas.md`** → pick the persona's section (study segment names map to slugs: "Odoo implementation partners" → `odoo-partners`, "Audit / accounting firms" → `mena-audit-firms`, etc.)
3. **Read `../claude-knowcap/company/docs/strategy/vision.md`** → voice + anti-positioning
4. **Read `../claude-knowcap/company/docs/strategy/POSITIONING.md`** → three sentences + anti-positioning
5. **Run `node routines/blogger/scripts/seo-pull.mjs`** (live SEO engine). Pulls DataForSEO Google-Ads keyword demand for MENA (KSA + Egypt + UAE) in EN + AR, expands persona seeds into real related keywords with **search volume + competition**, filters to Knowcap ICP intent, ranks by `volume × competition-weight`, dedups against shipped posts, and writes `routines/blogger/opportunity-queue.json` + a digest. **`target_keyword` = the persona's top fresh (uncovered) opportunity** from the queue **by score — EN or AR** (Arabic is in play; Law 4). Auth: DataForSEO creds in `~/.claude/secrets/blogger.md`.
6. DataForSEO volume + competition from step 5 is the demand signal. Record the chosen keyword's `search_volume` + `competition` in frontmatter.
6a. **Classify intent + pick language (Laws 2 & 4):** navigational/tool → skip the keyword, take the next; commercial → money-page mode (Law 3); informational → continue. Arabic-demand keyword → `lang: ar`, `dir: rtl`, `-ar` slug.
6b. **Steal the SERP (Law 1 — mandatory):** read the matching brief at `../claude-knowcap/marketing/digital-employees/seo/state/content-briefs/<keyword-slug>.md` if present (inherit its outline/PAA/word-count/GEO callouts); else pull live top-3 via `serp_organic_live_advanced` in the keyword's market. No brief + no SERP → REFUSE.
7. **Try `case-study` mode:**
   - Query Knowcap MCP `mcp__knowcap__list_sources` → Demo org, persona project
   - For each source, `mcp__knowcap__list_memories` filtered to source via `metadata.source_id`
   - Pick source with ≥3 confirmed memories tagged with target_keyword OR persona
   - If found: assemble `knowcap_sources` input array
8. **If no case-study candidate, try `comparison` mode:**
   - List `../claude-knowcap/company/docs/research/competitors-*.md`, check mtime of each
   - If freshest is < 30 days AND topic not in recent 5 shipped → mode = comparison
9. **Default to `thesis` mode** if neither condition met
10. **Pick matching screenshots** from `../claude-knowcap/knowledge/product/screenshots/_index.json`:
    - Match `features` in index against keywords from the draft hook + main thesis
    - Filter by `personas` matching target_persona
    - Cap at 4 candidates
11. **Read `app/content/blog/`** → list of last 20 shipped slugs
12. **Read `docs/content-pipeline/drafts/`** → list of in-flight drafts

## Tool / MCP connections (locked)

| Connection | Purpose | Auth | Mode |
|---|---|---|---|
| `mcp__knowcap__list_sources` | List Demo org sources for persona | `KNOWCAP_API_KEY` in `~/.claude.json` mcpServers.knowcap.env | read |
| `mcp__knowcap__list_memories` | Pull verified claims from picked sources | same | read |
| `mcp__knowcap__get_source` | Get source title + duration + metadata | same | read |
| DataForSEO Google Ads | Keyword volume + competition (replaces Trends) | creds in `~/.claude/secrets/blogger.md` | read |
| Filesystem | Read docs/, write `docs/content-pipeline/drafts/<slug>.md` | OS perms | read + write |
| `gh` CLI (or GitHub MCP when re-loaded) | Open PR | `gh auth` | write |

## Outputs

A single markdown file at `docs/content-pipeline/drafts/<slug>.md` with frontmatter (see SKILL.md for exact shape). Then opens a PR titled `[blog-draft] <title>` against `main`.

PR body includes:
- Mode picked + why
- Persona + keyword + volume/competition
- If case-study: source_knowcap_ids cited
- If screenshots embedded: which slugs from `_index.json`
- Validation gate pass/fail summary
- Live URL: `https://knowcap.ai/blog/<slug>`

## Human confirms

- **Merge PR** = approve → `.github/workflows/publish-blog-draft.yml` fires automatically, runs `scripts/publish-draft.mjs` to transform draft frontmatter and move the file to `app/content/blog/<slug>.md`, then commits to main. Vercel redeploys. Post is live within ~2 min. No manual move needed.
- **Close PR** = reject; routine logs the rejection reason to `runs/<timestamp>/rejected.txt` for future prompt-tuning

## Constraints

- ICP-aligned only — Odoo partners, MENA audit firms, MENA agencies, regulated verticals. If selected persona signal is ambiguous, refuse (don't write).
- **SERP-steal is a gate (Law 1)** — inherit the brief or pull the live SERP first; no draft from imagination.
- **Intent-match or skip (Law 2)** — navigational → skip; commercial → money page; only informational → post.
- **Bilingual, demand-driven (Law 4)** — language follows the keyword's demand; native Arabic post for Arabic demand, hreflang pair. EN-only retired.
- **Word count = the SERP/brief target** (beat the top-10), not a fixed range. Absent a SERP signal, default 1,300–1,600 body words.
- **GEO citation layer (Law 5)** — 134–167-word self-contained passages, JSON-LD schema, 5-question FAQ.
- NEVER duplicate a topic from last 20 shipped slugs
- ALWAYS cite the source Knowcap recording in frontmatter `source_knowcap_ids` (only when mode=case-study)
- Screenshots ENHANCE, don't gate — if no match in library, ship text-only and flag for hand-add

## Failure modes (graceful)

| Failure | Behavior |
|---|---|
| Demo project empty | Fall through to `thesis` mode (don't skip) |
| Trends API fails | Pass `target_keyword_5y_mena_interest: null`, flag in PR body, continue |
| Knowcap API fails | If `case-study` attempted, fall through to `thesis` mode |
| Last 20 blogs cover this keyword | Advance to next keyword from audit; if all 3 covered, skip this run |
| Banned words in output | Skill regenerates that paragraph (max 2 retries); if still bad, REFUSED |
| Word count outside range | Skill retries once with adjustment guidance |
| Screenshot library has no match | Ship text-only, no failure |

## Run log

`runs/<YYYY-MM-DD-HHMMSS>/` (gitignored):
- `prompt.txt` — exact prompt sent
- `inputs.json` — every file read, every API response
- `draft.md` — the produced draft
- `pr-url.txt` — opened PR URL (or `dry-run` if dry-run mode)
- `cost.json` — token + API call totals
- `mode-decision.json` — why thesis / case-study / comparison was picked

## Dry-run mode

Set `--dry-run` flag (or env `WEEKLY_BLOG_DRY_RUN=1`):
- All reads happen normally
- Draft written to `runs/<timestamp>/draft.md` only — NOT to `docs/content-pipeline/drafts/`
- NO commit, NO PR opened
- Outputs run report to stdout summarizing mode picked, what was read, what was drafted, what cost
