# refresh-persona

Re-validate MENA SME persona segmentation against fresh signal.

## Status: stub

## Inputs

- `docs/brand/personas/PRODUCT-PERSONAS.md` (current canonical)
- `docs/brand/personas/PRODUCT-PERSONAS-UPDATE-*.md` (last validation pass)
- Google Trends API — interest by sub-region (MENA-focused), 5-year window
- LinkedIn free company search — SMB counts per country
- YouTube Data API — comment mining on MENA-business channels (pain language)
- (optional) Apollo.io if not rate-limited

## Checks (TBD — fill in P1)

- For each persona segment in PRODUCT-PERSONAS.md:
  - Has total search interest shifted > 20% MoM or > 50% YoY?
  - Has the LinkedIn company count changed > 10% (account for org churn)?
  - Are there new pain-language clusters in YouTube comments?
- If ≥1 segment has shifted ≥1 tier (painkiller ↔ vitamin, or reachability), trigger a new UPDATE doc.

## Outputs

- New `docs/brand/personas/PRODUCT-PERSONAS-UPDATE-<YYYY-MM-DD>.md` with: the new signal, the proposed re-rating, AND a "DO NOT change canonical" footer reminding the human to make that call.
- Updated CSVs in `docs/research/data/` (per existing patterns: `trends-mena-*.csv`, `MENA-LINKEDIN-COUNTS.csv`, `youtube-mena-pain-comments.csv`)

## TBD

- Google Trends MCP wrapper (current pytrends has reliability issues)
- LinkedIn scraping rate-limit handling
- Whether to call Apollo (paid) or skip
