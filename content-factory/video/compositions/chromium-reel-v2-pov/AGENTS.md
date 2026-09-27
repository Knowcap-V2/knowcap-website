<!-- github-project-provenance-2026-09-27 -->
## GitHub report identity (Hassan, 27 September 2026)

This rule supersedes older GitHub issue provenance/title/label instructions below or elsewhere. Applies to every organization's GitHub projects and every reporting person, including Hassan, Shady, Sara and customers.
- Every project item carries two TEXT fields: **Source chat** = the actual originating chat title, including its date/run when present; **Reported by** = the actual reporting person. A shared GitHub account, assignee, department abbreviation or filing agent is not evidence of the person's identity. For an autonomous report, record the actual agent/routine; never invent a human or chat title. Unknown values stay blank and are disclosed.
- Issue title: `[<actual source chat title>][<reporting person>][<type>][P<n>][<area>] <specific title>`, keeping only applicable type/priority/area brackets. Example: `[AV Techstack-Watch 9/27 #32][Hassan][bug][P2][security] Email reservation function permits anonymous execution without checking user ownership`.
- Store these identities in the project fields, **not identity labels** (`found-by:`, `reported-by:`, or source-chat labels). Preserve the actual discovery/verification history in the body; the reporting person and discovering agent can differ. Other type, priority, area and method labels remain valid. Existing Odoo requirements are unchanged.
- Discover/reuse each project's field IDs; create missing fields as TEXT. After adding the issue to each destination project, set both fields and read the item back. A title/body or label alone is not completion. New projects get the same fields. Do not guess IDs or silently claim success when permissions prevent setting them.
- Historical backfill uses evidence only; never substitute today's chat/person for an old report. Remove an identity label from an item only after its information is preserved in fields or the body; do not delete repository-wide labels as a shortcut.
<!-- /github-project-provenance-2026-09-27 -->

# HyperFrames Composition Project

## Skills

This project uses AI agent skills for framework-specific patterns. Install them if not already present:

```bash
npx skills add heygen-com/hyperframes
```

Skills encode patterns like `window.__timelines` registration, `data-*` attribute semantics, Tailwind v4 browser-runtime styling for `--tailwind` projects, and shader-compatible CSS rules that are not in generic web docs. Using them produces correct compositions from the start.

## Commands

```bash
npm run dev          # start the preview server (long-running — keep it alive in background)
npm run check        # lint + validate + inspect
npm run render       # render to MP4
npm run publish      # publish and get a shareable link
npx hyperframes docs <topic> # reference docs in terminal
```

> **`npm run dev` is a long-running server, not a one-shot command.** It blocks until stopped.
> Always run it as a background process so it stays alive while you edit compositions.
> Running it in the foreground will time out and kill the server, breaking the browser preview.

## Project Structure

- `index.html` — main composition (root timeline)
- `compositions/` — sub-compositions referenced via `data-composition-src`
- `assets/` — media files (video, audio, images)
- `meta.json` — project metadata (id, name)
- `transcript.json` — whisper word-level transcript (if generated)

## Linting — Always Run After Changes

After creating or editing any `.html` composition, run the full check before considering the task complete:

```bash
npm run check
```

Fix all errors before presenting the result.

## Key Rules

1. Every timed element needs `data-start`, `data-duration`, and `data-track-index`
2. Visible timed elements **must** have `class="clip"` — the framework uses this for visibility control
3. GSAP timelines must be paused and registered on `window.__timelines`:
   ```js
   window.__timelines = window.__timelines || {};
   window.__timelines["composition-id"] = gsap.timeline({ paused: true });
   ```
4. Videos use `muted` with a separate `<audio>` element for the audio track
5. Sub-compositions use `data-composition-src="compositions/file.html"`
6. Only deterministic logic — no `Date.now()`, no `Math.random()`, no network fetches

## Documentation

Full docs: https://hyperframes.heygen.com/introduction

Machine-readable index for AI tools: https://hyperframes.heygen.com/llms.txt
