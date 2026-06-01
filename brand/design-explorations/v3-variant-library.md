# Knowcap v3 — Variant "Library"

The K in Knowcap stands for *knowledge*. This variant leans into that: warm parchment paper, oxblood accent, a touch of EB Garamond serif for display, and the surface treatment of a well-kept reference library — without going full 19th-century novel.

**Critical:** The visual reference is `docs/mockups/library-v2.html` in this repo (open in a browser to see the exact rendering). NOT `library.html` — that was v1, too literal / too booky / too hard to read. v2 is the approved aesthetic: library DNA preserved, modern readable execution.

Same IA, same 11 surfaces, same sidebar order as v3 baseline. Full verbatim component spec: `docs/v3-design-spec.md` (1,296 lines).

---

## Field 1 — Company name and blurb (paste into the first textarea)

Knowcap is meeting intelligence with a librarian's discipline. The K in our name stands for *knowledge* — we treat every claim from a meeting like a citation in a reference work. Record meetings, calls, and screen sessions; transcribe via Whisper + Pyannote diarization; extract verified claims (facts, risks, decisions, tasks, people) via Gemini 2.5 Pro. Every claim has a speaker, a timestamp, a source — re-verifiable, queryable. 11 surfaces, sidebar-driven, three organizations (Knowcap, Ariika, SMEtools). Design direction is "library" — warm parchment paper #F5EBDC background, oxblood accent #8B3E2F, EB Garamond serif for the K-mark logo + surface titles + claim headlines, Geist Sans for body copy at 14.5px. Modern card-based layout with a thin oxblood accent stripe on each claim card (the "book spine" gesture). NOT a heavy book pastiche — readable, modern, restrained. Reference mockup: docs/mockups/library-v2.html.

---

## Field 2 — GitHub repo

https://github.com/Knowcap-V2/knowcap

---

## Field 3 — Any other notes (paste into the second textarea)

DESIGN DIRECTION: "Library" — knowledge / reference / warm parchment, modern execution.

**Critical:** Visual reference is `docs/mockups/library-v2.html` in this repo. Open it in a browser to see exact rendering. There is also an earlier `docs/mockups/library.html` — DO NOT use that as reference, it's too literal / too dense serif / too theatrical. v2 is the approved version.

## Aesthetic posture
- The K in Knowcap = knowledge. Library / reference-work DNA.
- Warm parchment + oxblood accent — NOT the cream + Space Grotesk baseline.
- Modern card layout, generous whitespace, restrained serif touch.
- Light mode only for the initial design (no dark twin in this variant).
- Restrained, readable, librarian-grade. NOT a 19th-century novel pastiche.

## Typography
- Display + K-mark + surface titles + claim headlines: **EB Garamond** (free on Google Fonts) — weights 500, 600, 700 only.
- Body / nav / meta / quotes / labels: **Geist Sans** (free on Google Fonts, distinctive, very readable) — weights 300, 400, 500, 600, 700.
- NO mono font in chrome (only on /developers code chips, JetBrains Mono).
- NEVER Inter, Roboto, Arial, Space Grotesk. AI-slop fonts.
- Body size 14.5px line-height 1.55. Headlines 21px (claim) and 44px (surface title). Display weight 600, never lighter.

## Color palette
- Parchment (page bg): #F5EBDC (warm cream)
- Parchment-2 (sidebar bg): #EFE3CF (slightly warmer)
- Card / surface: #FBF4E5 (cream paper card)
- Rule lines: #D9C9A8 (warm rule)
- Ink (foreground): #2D1F18 (warm dark, NOT pure black)
- Ink-muted: #6B584A
- Ink-dim: #998470
- **Accent: #8B3E2F (oxblood)** — used for: active sidebar left-bar (2px), claim card left-edge stripe (default), tab underline on active, AI-prediction badge bg, K-mark color
- Soft oxblood (badge bg): #F2DCD3
- Category accents (used as per-card left-edge stripe + cat badge bg):
  - Fact: #1F6B3A on #DCEBE0 (Knowcap green)
  - Risk: #9B1D1D on #F5DDD9
  - Decision: #4A2FA8 on #E5DEF7 (Ariika purple)
  - Task: #1B4F8F on #DCE7F2
  - People: #8A5A12 on #F2E4C7 (SMEtools amber)
- Org dots in workspace switcher: oxblood (All), green (Knowcap), purple (Ariika), amber (SMEtools)

## Layout (Inbox surface)
- AppLayout: 240px sidebar + main flex-1.
- Sidebar: K-mark serif + "Knowcap" wordmark with "v3 · library" subtitle, then a Workspace switcher (4 rows: All / Knowcap / Ariika / SMEtools), then 4 grouped nav sections (Work / Knowledge / Automate / More). Each nav link has a 2px transparent left border that becomes oxblood on active state. Active link also gets a cream-paper card background.
- Main canvas: max-width 1080px, generous left/right padding.
- Surface header: tiny crumb ("All organizations · Inbox") then big serif title "Inbox" then a sans deck explaining today's state.
- Toolbar: 5 underline-style tabs (To do / Confirmed / All / Agents / Noise) with the active tab in oxblood. Right side has "Importance ↓" and "Search" pills.
- Card list: each claim is a card with:
  - 3px left edge stripe colored by category (or oxblood as default)
  - Category small-caps badge at top + org/project chip beside it
  - Serif headline (21px EB Garamond 600)
  - Italic sans quote (14px)
  - AI-prediction line: oxblood-soft "Predicted route" / "Auto-routed" / "Awaiting route" badge + project name
  - Meta column on the right: speaker (bold), `@ HH:MM` timestamp (tabular nums), source name (dim)
- Footer colophon: "K · Knowcap · Inbox" — tiny, centered, italic K.

## Other surfaces — apply the same vocabulary
- **/sources** = "Archive". Same card-list pattern, columns adapted.
- **/claims** = "Library" (yes, literally — the library inside Library). Same card pattern, category-colored stripe per claim.
- **/projects** = card grid, oxblood headers.
- **/rules** = a markdown editor on parchment. Looks like writing rules in a leather-bound notebook.
- **/agents** = author-card grid for Definitions; routine cards for Routines.
- **/atlas** = soft constellation on parchment, oxblood lines.
- **/integrations** = card grid, parchment.
- **/developers** = long-form reference layout. EB Garamond headings, Geist body, JetBrains Mono code blocks.
- **/ask** = a single column of conversation. User questions in roman sans, assistant answers in EB Garamond italic with numbered footnote citations.
- **/home** = "Today's reading" with greeting + stats.

## Motion
- Page transitions: 200ms cross-fade.
- Hover state on cards: subtle bg shift (cream → warmer cream), no shadow change.
- Active tab underline animates in.

## Vocabulary (light library touch)
Keep the v3 baseline vocabulary mostly intact (Inbox, Sources, Claims, Projects, Rules, Agents, Atlas, Integrations, Developers, Home, Ask Knowcap). Don't replace them with "Today's briefing" / "Archive" — that was the rejected Quarterly direction. Library uses normal Knowcap nouns, just rendered on parchment with serif touches.

The ONE place where vocabulary leans library:
- Tiny footer colophon on every surface: "K · Knowcap · <SurfaceName>"
- /developers landing has a chapter-style numbering on its sub-sections

## What NOT to do
- No bookshelf-as-sidebar (rejected — too literal)
- No Roman numerals on entries (rejected — too booky)
- No "Chapter IV — Inbox" theatrics (rejected — overdone)
- No marginalia column on Inbox rows (rejected — hard to read)
- No EB Garamond on body copy (rejected — fatiguing)
- No "ye olde" tone in microcopy

## Build order
1. Tokens + parchment palette + Geist Sans / EB Garamond pairing
2. AppLayout shell with workspace switcher + grouped sidebar
3. Inbox as approved (card list with category-colored left stripe)
4. Sources, Claims, Projects, Atlas as variations of the same card pattern
5. Rules editor on parchment
6. Agents Routines + Definitions
7. Ask Knowcap as serif-italic conversation
8. Integrations + Developers + Home

## IA reference
Same 11 surfaces, same sidebar order as v3 baseline. Full verbatim component spec at `docs/v3-design-spec.md` in this repo. Visual reference: `docs/mockups/library-v2.html`.
