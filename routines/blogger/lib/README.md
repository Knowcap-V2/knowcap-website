# blogger/lib — verification-panel generator

Generates a Knowcap **verification-inbox SVG** from a post's human-confirmed claims — the cheap, repeatable, **no-browser** alternative to screenshotting the live app.

## Why this exists

Screenshotting `app.knowcap.ai` (connect-chrome / headless) is slow, needs auth, and has to be redone every post. But the verification UI is deterministic and the blogger routine already pulls the real confirmed claims (Knowcap MCP). So we render those claims to SVG from data + the [DESIGN.md](../../../docs/DESIGN.md) tokens. No browser, ever. One asset per post, generated in seconds.

It's a faithful **styled replica fed real data**, not a literal pixel-grab — which for marketing is usually better (no PII to mask, no browser chrome to crop, crisp at any size, always on-brand, accurate to the post's own claims). If literal pixels are ever needed, connect-chrome is the fallback.

## Usage

```bash
node routines/blogger/lib/gen-verification-panel.mjs <claims.json> <out.svg>
```

Input JSON (`examples/odoo-inventory-reconciliation.claims.json` is a worked example):

```json
{
  "project": "Odoo Partners",
  "source": "Outbound Inventory Audit & Reconciliation",
  "totalConfirmed": 9,
  "claims": [
    { "category": "decision|task|risk|fact|note",
      "summary": "one-line claim", "detail": "optional second line",
      "confirmer": "Hassan Arslan", "timestamp": "34:13" }
  ]
}
```

Renders up to 6 claims. Category sets the accent (decision=blue, task=green, risk=amber, fact/note=grey).

## Routine step (case-study mode only)

After the draft passes its gates, the blogger routine should:

1. Take the `verified_claims` it already cited from `knowcap_sources` (the human-confirmed memories).
2. Map 3–5 of them to the input JSON shape (category, summary, detail, confirmer = the memory's `reviewer`, timestamp = `mm:ss` from `resolved_timestamp_seconds`). Skip if mode ≠ case-study or < 3 confirmed.
3. Generate the SVG to **the web-served path** (NOT the hub — hub assets don't deploy):
   ```
   app/public/blog/<slug>/verification-inbox.svg
   ```
4. Embed it in the draft body, right after the story-spine section:
   ```markdown
   ![Knowcap verification inbox — confirmed claims from this meeting, each with its category, the named confirmer, and the timestamp.](/blog/<slug>/verification-inbox.svg)

   *The actual claims behind this post — extracted automatically, each confirmed by a named human.*
   ```

The blog renderer supports `![alt](src)` images (added in `app/lib/blog.ts`), styled by `app/app/blog/blog-styles.ts`.

## Honesty rule

Only render claims that are genuinely **human-confirmed** (`review_status: confirmed`, `confirmation_source: human`). The whole point of the panel is to *show* the verification workflow — rendering unconfirmed claims as "Confirmed" would be a lie that defeats the thesis.
