# content-curator

Event-triggered: when a new file lands in `docs/research/` (audit, competitor breakdown, persona update), suggest 2–3 blog topic angles that would translate the research into content for shipped channels.

## Status: stub
Runtime not wired yet.

## Trigger

See [`triggers.yml`](./triggers.yml) — event: any push to main that adds files under `docs/research/`.

## Skill

Calls [`_skills/write-blog-draft/SKILL.md`](../_skills/write-blog-draft/SKILL.md) — but in "topic-ideation" mode, not full-draft mode.

## Inputs

- The new file(s) that triggered the event (full content)
- `docs/brand/personas/` (which personas benefit from this research?)
- `app/content/blog/` (have we covered this angle already?)
- `docs/content-pipeline/drafts/` (don't propose what's already in the queue)

## Outputs

- A COMMENT on the PR that added the research (NOT a separate PR — keep the discussion in context)
- Comment body: 2–3 proposed blog angles, each with a target persona, target keyword, and rough outline
- Optional: a `[blog-draft] ...` PR for the strongest of the 2–3 if signal-confidence is high (configured per-trigger)

## Human confirms

- React to the comment with thumbs-up = approve a draft (will trigger `weekly-blog` to prioritize)
- Reply with "skip" = ignore

## Constraints

- Never propose a topic that overlaps > 60% with a shipped blog or pending draft
- Never propose more than 3 topics per trigger event — quality over quantity
- If the research file is itself a blog draft (someone forgot to put it in `docs/content-pipeline/drafts/`), open a "move" PR instead of curating

## Run log

`runs/` (gitignored).
