# Design System — Landing Version E ("The Record")

> This is a **separate** design system from `DESIGN.md`. `DESIGN.md` documents the
> cream + Space Grotesk system shared by versions A–D. Version E (`/e`) was built
> with the impeccable skill to test an independent design point of view against
> that hand-built system. **Copy and section order are identical to Version A**
> (the constant); only the visual system differs. `DESIGN.md` was intentionally
> left untouched.

## Premise of the test
Judge an independent design's taste against the hand-built A–D system, holding copy
constant. Version A's exact words and section order are reused verbatim; every visual
decision (type, color, spacing, layout, motion) is made fresh.

## Memorable thing
"AI that only acts on truth." Version E renders *verified* as a physical mark — a brass
highlight — so the page reads like a record where confirmed facts are sealed, not a
marketing page that asserts them.

## Aesthetic direction
- **Lane:** brass-and-midnight forensic dossier / notary. Authority through precision.
- **Deliberately avoids** the three saturated 2026 reflexes for this category: SaaS-cream
  minimalism, terminal-dark-green "operator" mode, and editorial-serif-italic. (A–D live
  in the first two.)
- **Mood:** exacting, official, calm. A legal brief crossed with a measurement instrument.

## Typography (3 families, loaded on the `/e` route only)
- **Display — Bricolage Grotesque.** Hero + section headings. Confident humanist grotesque;
  not on any reflex-reject list and clearly distinct from A's Space Grotesk.
- **Body — Source Serif 4.** Document/record voice. Inverts the editorial reflex on purpose
  (grotesque display + serif body, not the usual serif-display + sans-labels).
- **Mono — Spline Sans Mono.** Evidentiary metadata only: timestamps, exhibit labels, step
  numbers, stat figures, kicker labels. Literal to the product (audit trail), not costume.
- Loaded via `next/font/google` in `app/app/e/page.tsx`, exposed as `--ve-display` /
  `--ve-body` / `--ve-mono`. Scale uses `clamp()` with a >=1.25 ratio; hero ceiling ~4.9rem.

## Color (strategy: Committed)
Midnight ink drenches the anchor sections (hero, process, testimony, security, close,
footer); cool off-white paper carries the content sections; one brass signal means
"verified" — reaching past the obvious green=verified cultural pull.

| Token | Value | Role |
|---|---|---|
| `--ink` | `#14161D` | Midnight blue-black ground (drenched sections) |
| `--ink-2` / `--ink-3` | `#1B1E27` / `#242833` | Raised surfaces on dark |
| `--paper` | `#F4F5F7` | Cool off-white body (NOT cream — chroma toward blue, not warm) |
| `--paper-2` | `#EBECF0` | Secondary light surface |
| `--prose` / `--prose-dim` | `#2B303B` / `#565C68` | Body / secondary text on paper |
| `--ink-prose` / `--ink-prose-dim` | `#E7E9EE` / `#A7ACB8` | Body / secondary text on ink |
| `--brass` / `--brass-bright` / `--brass-ink` | `#C79A3A` / `#E2B557` / `#8A6516` | The single "verified" signal |
| `--line` / `--line-dark` | `#DCDEE4` / `rgba(255,255,255,.10)` | Hairlines |

All body/secondary text verified >= 4.5:1 against its background.

## Layout & anti-slop reworks
Same sections as A, restructured to avoid AI tells:
- **Stat cards → evidence ledger.** The four metrics are a hairline-divided ledger, not four
  identical bordered stat cards.
- **Icon-tile feature cards → alternating editorial exhibits.** Screenshots framed as
  "exhibits" with mono captions; no rounded icon tiles above headings.
- **Quote cards → testimony.** Large serif pull-quotes separated by hairlines with mono
  attributions, not a 3-card grid.
- **Security cards → datasheet.** A `<dl>` spec list, not four icon cards.
- **No per-section eyebrows.** A's decorative one-word kickers ("Features", "Impact",
  "Security") are dropped (chrome, not copy). Numbers appear **only** on the genuine
  4-step process, where the order carries meaning.
- **No side-stripe borders, no gradient text, no glassmorphism, no hero-metric template.**

## Motion
- framer-motion. Ambitious staggered hero first-load (ease-out-expo); per-section reveals
  scoped to what they reveal (not one uniform fade on everything); brass "verified" mark
  wipes in under the keyword.
- `prefers-reduced-motion` honored globally: a media-query override plus framer-motion
  `useReducedMotion()` so reveals render content immediately with no transform.

## Tracking
`/e` renders `<ABTracker variant="e" />` (gtag + Clarity) and `e` was added to the
`VARIANTS` array in `app/middleware.ts`, so the `kc-landing-variant` cookie can be set to
`e` and PostHog registers it alongside A–D. **Merging activates a 5-way (20% each) split**
on production `/`.

## Files
- `app/app/e/page.tsx` — server wrapper, loads the three fonts on this route only.
- `app/components/version-e.tsx` — the page (all sections + scoped CSS + motion), self-contained.
- `app/middleware.ts` — `VARIANTS` now includes `'e'`.
- `PRODUCT.md` — strategic context written by `/impeccable init`.
