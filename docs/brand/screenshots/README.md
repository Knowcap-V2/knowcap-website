# Knowcap product screenshot library

Curated screenshots of the Knowcap product surfaces, used by the [`blogger`](../../../routines/blogger/) routine (and any future blog or comparison-page routine) to embed visuals in posts.

## Scope vs. other repos

This folder holds **product UI captures** (the actual Knowcap app at app.knowcap.ai / hassan.knowcap.ai). It does NOT hold:
- Brand identity assets (logo, type, color swatches) — those live in `../` (the broader `docs/brand/` folder)
- Generative imagery (Higgsfield photoreal, Hyperframes motion graphics) — those live in [`knowcap-content/brand/`](https://github.com/Knowcap-V2/knowcap-content/tree/main/brand)

If you're wondering "which repo gets this asset?":
- Photo of UI shipped to customers → here
- AI-generated photo of a person using Knowcap → `knowcap-content/`
- Logo PNG → `docs/brand/` (parent folder, not this one)

## Layout

```
docs/brand/screenshots/
├── README.md              ← this file
├── _index.json            ← machine-readable index (used by blogger routine)
├── <slug>/
│   ├── full.png           ← 1600×900 (or aspect-matched) hero capture
│   ├── thumb.png          ← 800×450 inline-blog crop
│   └── meta.yaml          ← alt text, captions, what it proves, personas it serves
└── _archive/              ← old captures dated and kept for backfill
```

## meta.yaml shape

```yaml
slug: verification-inbox
title: "Inbox after a meeting — claims extracted, not confirmed"
alt: "Knowcap inbox showing 12 extracted claims from a 47-minute meeting, each in pending state with confirm/reject buttons"
caption: "Every meeting produces claims. None of them act until a named human confirms."
captured_date: 2026-06-02
captured_from: hassan.knowcap.ai   # or app.knowcap.ai
surface: "/inbox?source=<id>"
what_it_proves:
  - extraction works automatically
  - verification step is explicit
  - no-confirm-all-button rule visible
personas: [odoo-partners, mena-audit-firms, mena-agencies, regulated-verticals]
features: [verification, inbox, pending-claims]
# Optional
notes: "Use 1600x900 crop, the right rail can be cut off for blog use"
```

## Refresh cadence

Library drifts when the UI changes. Maintenance:

- **Quarterly:** sweep through `_index.json`, recapture any surface that's visibly changed in the live app
- **Per-feature ship:** when a major new surface ships (new page, redesigned modal), capture it during the same week and update `_index.json`
- **Automated drift detection (future):** a `screenshot-drift-audit` routine compares live captures against library hashes monthly, opens a PR with diffs

## How the blogger routine uses this

1. After generating the draft, scan body for trigger keywords (inbox, confirm, audit trail, Odoo, etc.)
2. Match against `_index.json` → filter by features + persona
3. Pick up to 4 best matches
4. Embed as markdown image tags at end of relevant section, using `alt` + `caption` from meta.yaml

See [`../../../routines/_skills/write-blog-draft/SKILL.md`](../../../routines/_skills/write-blog-draft/SKILL.md) for the full trigger map.

## Capture standards (when adding new screenshots)

- **Resolution:** full = 1600x900 (16:9) or 1400x900 (3:2). Thumb = 800x450.
- **Browser chrome:** crop out the browser address bar — show only the app
- **PII:** mask emails, real names, real org/project names — use generic placeholders for production captures
- **Anti-pattern:** no Loom-style cursor highlight rings (looks dated, sales-y). Plain screenshots only.
- **State setup:** capture meaningful state — an empty inbox is a bad capture; an inbox with 8-12 pending claims is good
- **Format:** PNG (lossless), not JPG. File size ~200-400KB per full capture is fine.

## Adding a new screenshot — checklist

1. Capture in browser at 1600x900 viewport (use DevTools device toolbar for exact size)
2. Save as `docs/brand/screenshots/<slug>/full.png`
3. Create `docs/brand/screenshots/<slug>/thumb.png` (downscale to 800x450)
4. Write `docs/brand/screenshots/<slug>/meta.yaml` (see shape above)
5. Run `routines/_skills/audit-seo/regenerate-screenshot-index.sh` to update `_index.json` (or do it manually for now — script TBD)
6. Commit; the next routine run can use it
