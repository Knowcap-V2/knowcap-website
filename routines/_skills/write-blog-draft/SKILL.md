# write-blog-draft

Generate a Knowcap blog post draft from inputs.

## Status: stub
Real prompt + instruction set TBD. Today: run this manually via Claude Code in this repo, pointing at a specific persona + audit.

## Mode

- **`full-draft`** (default): emit a complete 1,300–1,600 word draft with front-matter, ready for editorial review.
- **`topic-ideation`**: emit 2–3 proposed angles instead of a full draft, used by `content-curator` routine.

## Inputs

| Required | Description |
|---|---|
| `target_persona` | One of the personas from `docs/brand/personas/PRODUCT-PERSONAS.md` |
| `target_keyword` | From `docs/research/audits/` opportunity list, OR user-supplied |
| `mode` | `full-draft` or `topic-ideation` |
| `recent_shipped` | List of last 20 blog slugs from `app/content/blog/` to avoid repeating |

## Voice + style (locked)

- Founder-voice OR industry-expert voice (no PM-speak, no consultant-speak)
- Front-matter MUST include: `title`, `slug`, `persona`, `target_keyword`, `geo_score`, `est_word_count`, `draft_date`
- Cite docs/brand/VISION.md when the post hinges on the trust-layer thesis
- Anti-pattern: never use "leverage", "synergy", "ecosystem", "stakeholder", "stakeholders"
- GEO structure: 134–167 word self-contained passages, FAQ section, schema-friendly headings

## ICP gate

If the persona isn't one of: Odoo partners, MENA SMBs, audit firms, regulated verticals, agencies → refuse and emit "out-of-ICP" message. DO NOT write the draft.

## Outputs

`full-draft` mode: a single .md file with front-matter + body.
`topic-ideation` mode: a markdown comment with N proposed angles.

## TBD

- Exact prompt template — TBD when P1 hits
- MCP connections — Google Trends MCP for keyword sizing? Persona MCP that returns persona JSON?
- Cost cap — what's the budget per draft run?
