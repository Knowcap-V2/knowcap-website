# Knowcap v3 — Variant "Operator (Light)"

The **light-mode twin** of the Operator variant. Same terminal/keyboard-first power-software DNA — single-letter sidebar shortcuts, dense table-first surfaces, always-visible status bar, ⌘K command palette, Vim-style filter chips — but rendered on warm paper instead of soft-black.

This is NOT the v3 baseline (which is editorial-cream + Space Grotesk sans). This is the Operator aesthetic *in light mode*: still monospace, still keyboard-first, still dense — but inhabitable in daylight.

**Reference mockup in this repo:** `docs/mockups/operator-light.html` (live HTML, open in browser to see exact rendering). Companion dark version: `docs/mockups/operator.html`.

Same IA, same 11 surfaces, same sidebar order as v3 baseline. Full verbatim component spec: `docs/v3-design-spec.md` (1,296 lines).

---

## Field 1 — Company name and blurb (paste into the first textarea)

Knowcap is power software for operators — meeting intelligence built for people who live in the keyboard. We record meetings, calls, and screen sessions; transcribe via Whisper + Pyannote diarization; extract verified claims (facts, risks, decisions, tasks, people) via Gemini 2.5 Pro. Every claim has a speaker, a timestamp, and a source — re-verifiable, queryable, scriptable. 11 surfaces, sidebar-driven, three organizations (Knowcap, Ariika, SMEtools). Design direction: terminal / keyboard-first operator aesthetic IN LIGHT MODE — warm off-white background #FAFAF7, dark slate foreground, JetBrains Mono throughout, single-letter sidebar shortcuts, status bar always visible, ⌘K command palette, Vim-style filter chips (`!todo`, `:speaker:khaled`), filled v3 category badges (FAC green, RSK red, DEC purple, TSK blue, PPL amber). Knowcap green #1F6B3A as the accent. Think Sublime Text light theme × Linear's keyboard DNA × a working operator console. Reference mockup: docs/mockups/operator-light.html in the repo.

---

## Field 2 — GitHub repo

https://github.com/Knowcap-V2/knowcap

---

## Field 3 — Any other notes (paste into the second textarea)

DESIGN DIRECTION: "Operator (Light)" — terminal aesthetic, light mode.

**Critical:** This is the LIGHT-MODE twin of the Operator variant. Visual reference is `docs/mockups/operator-light.html` in the repo — open it in a browser to see exact rendering. Companion dark version at `docs/mockups/operator.html`. Both share the same structure; only the palette flips.

## Aesthetic posture
- Terminal / keyboard-first power software, rendered for daylight.
- NOT the v3 baseline (which is editorial-cream + Space Grotesk). This is monospace-everything.
- Dense. Table-first. Status bar always visible. Every action discoverable via ⌘K.
- Single-letter sidebar shortcuts. ⌘K is the front door.
- Looks like a tool, not a website.

## Typography
- Display + body: **JetBrains Mono** (free on Google Fonts). All weights — 400, 500, 600, 700.
- Heading scale = weight differentiation. No serif in chrome.
- ONE exception: the K-mark logo in **Instrument Serif** (Google Fonts, free) — rendered in Knowcap-green for a moment of contrast.
- NEVER Inter, Roboto, Arial, Space Grotesk. They are AI-slop fonts.

## Color palette
- Background: #FAFAF7 (warm off-white, NOT pure white)
- Surface (sidebar, status bar): #F2F0EA (one step warmer)
- Surface-2 (raised): #EAE7DF
- Border subtle: #DDD8CC
- Border strong (chips, divider): #C8C2B2
- Foreground: #18181B (near-black slate)
- Dim foreground: #5B5B62
- Dimmer (less important text): #8B8B91
- **Accent: #1F6B3A (Knowcap green)** — used for: active sidebar highlight, prompt cursor, prompt path, "active filter" chip outline, status-bar branch indicator, timestamp links
- Filled v3 category badges (NOT outlined — solid pills for light-mode contrast):
  - Fact: #1F6B3A on #E6F4EA (green pill)
  - Risk: #9B1D1D on #FCE8E6 (red pill)
  - Decision: #4A2FA8 on #ECE7FB (purple pill)
  - Task: #1B4F8F on #DCEEFB (blue pill)
  - People: #8A5A12 on #FBEFD8 (amber pill)
- Org chips kept as v3 brand:
  - Knowcap (kc): #1F6B3A green
  - Ariika (ar): #4A2FA8 purple
  - SMEtools (sm): #8A5A12 amber

## Layout (identical to Operator dark)
- Sidebar **56px wide**, single-letter shortcuts vertically: `i a s c p r g x n d h`
- Logo at top: K-mark in Instrument Serif, Knowcap green
- Active nav row: green-tinted background + green left border (2px)
- Top bar (34px): breadcrumb `knowcap / inbox · all-orgs`, ⌘K hint pill on the right
- Main canvas: prompt line `~/knowcap/inbox $ ▊` (blinking cursor), surface title with meta count, filter chips row, dense table
- Filter chips: `!todo`, `!confirmed`, `!all`, `!agents`, `!noise` (bang prefix) and `:speaker:khaled`, `:org:knowcap`, `:after:2026-05-01` (colon prefix)
- Dense table columns: cat (filled badge), org/project (colored chip + name), quote (full text), speaker, @ (timestamp in green), source-id (dimmer)
- Status bar (26px) always visible at bottom: `● all-orgs/inbox · 12 rows · filter: !todo` on left, `j k nav · ⌘K palette · ? help` on right with kbd-style boxes

## Motion
- Cursor blinks in prompt and in command palette.
- No transitions on navigation — instant. Operators don't want to wait.
- Status bar updates flicker subtly when state changes.
- Hover state: faint border-strong flash, no shadows.

## The one memorable thing
The prompt line at the top of every screen:

```
~/knowcap/[surface] $ ▊
```

Blinking green cursor. Instantly readable as "this is a tool, not a website." When ⌘K is invoked, the prompt expands into a real input.

## Vocabulary (terminal-flavored, identical to dark)
- Inbox = "inbox"
- Sources = "sources"
- Claims = "claims"
- Projects = "projects"
- Rules = "rules" (think .rc config files)
- Agents = "routines"
- Atlas = "graph"
- Integrations = "plugins"
- Developers = "sdk"
- Home = "status"

## Build order
1. Light-mode tokens + JetBrains Mono everywhere + Instrument Serif K-mark
2. AppLayout shell: 56px sidebar + 34px topbar + 26px status bar
3. CommandPalette as the canonical entry point — the front door
4. Inbox as dense expandable table (this is the hero surface; nail it first)
5. Sources as dense table with bang/colon filters
6. Claims as grep-output stream with category-color line prefixes
7. Rules as monaco-style markdown editor with ex-mode commands
8. Agents Routines + Definitions as `man`-page entries
9. Atlas — light variant of constellation (subtle dots on paper)
10. Ask Knowcap — terminal-interview style with citation `[1]` links
11. Integrations / Developers / Home as ref-doc layouts

## Pair with dark
Design the toggle from the start. Light is default, but `theme:dark` flips to:
- bg #0B0E14
- fg #C9D1D9
- accent #58A6FF (electric blue)
- category badges become outlined ANSI (bright green/amber/magenta/cyan/orange)

See `docs/mockups/operator.html` for the dark version of every element.
