# weekly-blog

Generates one blog draft per week, picks the right mode (thesis / case-study / comparison) based on what's available, embeds matching screenshots if any, opens a PR to `docs/content-pipeline/drafts/`.

## Status: P1 spec (real instructions, run manually today)

## Trigger

See [`triggers.yml`](./triggers.yml) — cron `0 6 * * MON` (Monday 06:00 UTC = 09:00 Cairo).

## Skill

Calls [`_skills/write-blog-draft/SKILL.md`](../_skills/write-blog-draft/SKILL.md) in `thesis` / `case-study` / `comparison` mode (routine picks).

## Mode selection (runtime)

```
1. Pick persona via round-robin from state.json
2. Try `case-study` mode:
   - Query Knowcap MCP (Demo org → persona project) for sources
   - For each candidate source, pull confirmed memories (>= 3 required)
   - If 1+ candidate qualifies → mode = case-study, pick the most recent
3. If no case-study candidate, try `comparison` mode:
   - Check docs/research/competitors/<name>/positioning.md mtime
   - If freshest competitor doc is < 30 days old AND not covered in last 5 shipped → mode = comparison
4. Default to `thesis` mode
```

The first dry-run picked `thesis` mode (Demo org empty, no fresh competitor doc < 30d). That's the expected path until Demo org gets seeded.

## Inputs (in execution order)

1. **Read persona rotation state** from `routines/weekly-blog/state.json` (gitignored)
2. **Read `docs/brand/personas/PRODUCT-PERSONAS.md`** → pick the persona's section
3. **Read `docs/brand/VISION.md`** → voice + anti-positioning
4. **Read `docs/brand/POSITIONING.md`** → three sentences + anti-positioning
5. **Read most recent `docs/research/audits/SEO-AUDIT-*.md`** → top-3 keyword opportunities (currently: scan for keyword candidates manually; eventually: parse a `keyword_opportunities_by_persona` table)
6. **Query Google Trends via pytrends** (urllib3<2.0 required) → validate 5-year MENA interest, pick highest recent growth
7. **Try `case-study` mode:**
   - Query Knowcap MCP `mcp__knowcap__list_sources` → Demo org, persona project
   - For each source, `mcp__knowcap__list_memories` filtered to source via `metadata.source_id`
   - Pick source with ≥3 confirmed memories tagged with target_keyword OR persona
   - If found: assemble `knowcap_sources` input array
8. **If no case-study candidate, try `comparison` mode:**
   - List `docs/research/competitors/*/positioning.md` mtime
   - If freshest is < 30 days AND topic not in recent 5 shipped → mode = comparison
9. **Default to `thesis` mode** if neither condition met
10. **Pick matching screenshots** from `docs/brand/screenshots/_index.json`:
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
