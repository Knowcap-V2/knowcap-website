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

`burn-state.json` (gitignored runtime state):
```json
{ "phase": "burn", "started": "2026-06-15", "total_posts": 0, "week_start": "2026-06-15", "posts_this_week": 0, "blog_days": ["SUN","TUE","THU"] }
```
After each shipped draft PR: `total_posts++`, `posts_this_week++`. Reset `posts_this_week` on week rollover. Flip `phase→steady` + `blog_days→["SUN"]` when `total_posts >= 24`. If the file is absent, seed burn from today. **Quality bar:** never publish to hit a quota — if no fresh opportunity clears the gates, skip the day (a missed burn post beats a thin one).

## Mode selection (runtime)

```
1. Pick persona via round-robin from state.json (if absent → default index 0 = odoo-partners, then create it — see "Persona rotation state")
2. Try `case-study` mode:
   - Query Knowcap MCP (Demo org → persona project) for sources
   - For each candidate source, pull confirmed memories (>= 3 required)
   - If 1+ candidate qualifies → mode = case-study, pick the most recent
3. If no case-study candidate, try `comparison` mode:
   - Check ../claude-knowcap/knowledge/topics/research/competitors/<name>/positioning.md mtime
   - If freshest competitor doc is < 30 days old AND not covered in last 5 shipped → mode = comparison
4. Default to `thesis` mode
```

The first dry-run picked `thesis` mode (Demo org empty, no fresh competitor doc < 30d). That's the expected path until Demo org gets seeded.

## Knowledge base (hub) — paths

Brand DNA, personas, research, and screenshots migrated to the `claude-knowcap` hub (PR #40, 2026-06-11). They are NO LONGER under this repo's `docs/`. Hub paths below are written relative to this repo root (`knowcap-website/`) — the hub is a sibling repo under `knowcap/`:

| Input | Hub path (relative to repo root) |
|---|---|
| Personas | `../claude-knowcap/knowledge/people/PRODUCT-PERSONAS.md` |
| Vision | `../claude-knowcap/knowledge/strategies/VISION.md` |
| Positioning | `../claude-knowcap/knowledge/strategies/POSITIONING.md` |
| SEO audits | `../claude-knowcap/knowledge/topics/research/audits/SEO-AUDIT-*.md` |
| Competitors | `../claude-knowcap/knowledge/topics/research/competitors/<name>/positioning.md` |
| Screenshots index | `../claude-knowcap/knowledge/product/screenshots/_index.json` |

Outputs stay in THIS repo: drafts → `docs/content-pipeline/drafts/`, shipped → `app/content/blog/`.

## Persona rotation state

`routines/blogger/state.json` (gitignored) holds the round-robin cursor. Shape:

```json
{ "personas": ["odoo-partners", "mena-audit-firms", "mena-agencies", "regulated-verticals"], "cursor": 0 }
```

Each run reads `cursor`, picks `personas[cursor]`, then advances `cursor = (cursor + 1) % personas.length` and writes back. **If the file is absent (fresh clone / cloud routine), default to `cursor: 0` (`odoo-partners`) and create it** — never fail on missing state. The persona set is the research-gated ICP roster (see personas study); the cursor is a blind queue, not a per-run decision.

## Inputs (in execution order)

1. **Read persona rotation state** from `routines/blogger/state.json` (gitignored; if absent, default to index 0 = `odoo-partners` and create it)
2. **Read `../claude-knowcap/knowledge/people/PRODUCT-PERSONAS.md`** → pick the persona's section (study segment names map to slugs: "Odoo implementation partners" → `odoo-partners`, "Audit / accounting firms" → `mena-audit-firms`, etc.)
3. **Read `../claude-knowcap/knowledge/strategies/VISION.md`** → voice + anti-positioning
4. **Read `../claude-knowcap/knowledge/strategies/POSITIONING.md`** → three sentences + anti-positioning
5. **Run `node routines/blogger/scripts/seo-pull.mjs`** (live SEO engine, replaces the old static SEO-audit scan AND the dead Google Trends step). Pulls DataForSEO Google-Ads keyword demand for MENA (KSA + Egypt + UAE) in EN + AR, expands persona seeds into real related keywords with **search volume + competition**, filters to Knowcap ICP intent, ranks by `volume × competition-weight`, dedups against shipped posts, and writes `routines/blogger/opportunity-queue.json` + a digest. **`target_keyword` = the persona's top fresh (uncovered) opportunity** from the queue. Auth: DataForSEO creds in `~/.claude/secrets/blogger.md`.
6. **(Google Trends removed.)** DataForSEO volume + competition from step 5 is the demand signal — Trends was near-zero for this B2B ICP. Record the chosen keyword's `search_volume` + `competition` in frontmatter.
7. **Try `case-study` mode:**
   - Query Knowcap MCP `mcp__knowcap__list_sources` → Demo org, persona project
   - For each source, `mcp__knowcap__list_memories` filtered to source via `metadata.source_id`
   - Pick source with ≥3 confirmed memories tagged with target_keyword OR persona
   - If found: assemble `knowcap_sources` input array
8. **If no case-study candidate, try `comparison` mode:**
   - List `../claude-knowcap/knowledge/topics/research/competitors/*/positioning.md` mtime
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
| Google Trends via `pytrends` | Keyword sizing (MENA-only, 5-year) | none (free) | read |
| Filesystem | Read docs/, write `docs/content-pipeline/drafts/<slug>.md` | OS perms | read + write |
| `gh` CLI (or GitHub MCP when re-loaded) | Open PR | `gh auth` | write |

## Outputs

A single markdown file at `docs/content-pipeline/drafts/<slug>.md` with frontmatter (see SKILL.md for exact shape). Then opens a PR titled `[blog-draft] <title>` against `main`.

PR body includes:
- Mode picked + why
- Persona + keyword + Google Trends signal
- If case-study: source_knowcap_ids cited
- If screenshots embedded: which slugs from `_index.json`
- Validation gate pass/fail summary
- Link to `runs/<timestamp>/REPORT.md`

## Human confirms

- **Merge PR** = approve; next routine (`content-curator` or manual edit pass) handles polish before publish-to-blog (move from `docs/content-pipeline/drafts/` to `app/content/blog/`)
- **Close PR** = reject; routine logs the rejection reason to `runs/<timestamp>/rejected.txt` for future prompt-tuning

## Constraints

- ICP-aligned only — Odoo partners, MENA audit firms, MENA agencies, regulated verticals. If selected persona signal is ambiguous, refuse (don't write).
- 1,300–1,600 words (body, not frontmatter)
- GEO-optimized passages
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
