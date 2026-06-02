# Knowcap v3 — Variant "Operator"

Terminal / keyboard-first power-software aesthetic. The thesis: Knowcap is *for operators* — people who think in shortcuts, live in dark mode, and want every screen to tell them how to drive it without a mouse. Reference points: Linear's keyboard DNA × Bloomberg terminal × Vercel CLI.

Same IA, same 11 surfaces, same sidebar order as the v3 baseline. Source-of-truth spec: `docs/v3-design-spec.md` (1,296 lines, verbatim component extraction). This file overlays a different aesthetic vocabulary on top.

---

## Field 1 — Company name and blurb (paste into the first textarea)

Knowcap is power software for operators. We record meetings, calls, and screen sessions; transcribe via Whisper + Pyannote diarization; extract verified claims (facts, risks, decisions, tasks, people) via Gemini 2.5 Pro. Every claim has a speaker, a timestamp, and a source — re-verifiable, queryable, scriptable. 11 surfaces, sidebar-driven, three organizations (Knowcap, Ariika, SMEtools). Design direction is terminal / keyboard-first operator aesthetic — JetBrains Mono everywhere except long-form, soft-black background #0B0E14, dense table-first layout, status bar always visible, single-letter sidebar shortcuts, Vim-style command palette, every action has a binding. Think Linear's keyboard DNA × Bloomberg terminal × Vercel CLI. Built for people who live in the keyboard.

---

## Field 2 — GitHub repo

https://github.com/Knowcap-V2/knowcap

---

## Field 3 — Any other notes (paste into the second textarea)

DESIGN DIRECTION: "Operator" — terminal, keyboard-first, dense.

## Aesthetic posture
- Linear keyboard DNA × Bloomberg terminal × Vercel CLI.
- Dark by default; light mode supported but feels secondary.
- Dense. Table-first. Status bar always visible. Every action discoverable via ⌘K.
- Monospace dominates. Single-letter shortcuts shown next to every sidebar item.
- The product looks like a tool, not a website.

## Typography
- Display + body: **JetBrains Mono** (free, open-source, on Google Fonts — Berkeley Mono is paid and would trigger the brand-fonts warning, skip it).
- Heading scale: only weights vary (JetBrains Mono regular / bold / extra-bold / italic). No serif in chrome.
- ONE exception: the K-mark logo in a short serif (**Instrument Serif** on Google Fonts — free) for one moment of contrast.
- NEVER Inter, Roboto, Arial, Space Grotesk.

## Color palette
- Background: #0B0E14 (soft black, not pure black)
- Surface: #11151D (one step up)
- Foreground: #C9D1D9 (warm white)
- Dim foreground: #8B949E
- Subtle border: #1F2530
- Accent (cursor, primary action, active focus): #58A6FF (soft electric blue)
- Category-as-ANSI:
  - Fact: #3FB950 (bright green)
  - Risk: #D29922 (amber)
  - Decision: #BC8CFF (magenta)
  - Task: #79C0FF (cyan)
  - People: #FF7B72 (orange)
- Org accents repurposed as ANSI-style chips:
  - Knowcap: #3FB950 (green) — kept
  - Ariika: #BC8CFF (magenta) — shifted from purple to ANSI magenta
  - SMEtools: #D29922 (amber) — kept

## Layout
- Sidebar **44px collapsed** (icon + single-letter shortcut), **220px expanded**. Defaults to collapsed.
- Single-letter shortcut visible next to every nav item:
  `i` Inbox · `a` Ask · `s` Sources · `c` Claims · `p` Projects · `r` Rules · `g` Agents · `x` Atlas · `n` Integrations · `d` Developers · `h` Home
- Main canvas full-width, dense table-first.
- **Status bar always visible at bottom (24px)**: cursor position, row count, filter expression, ⌘K hint, branch indicator (org/project context).
- Top bar minimal: breadcrumb + ⌘K hint, no logo.
- **InboxRow** renders as a single dense table row, expandable inline. Keys `j/k` navigate, Enter expands, ⌘Enter routes to project.
- **Sources** = dense virtualized table. Vim-style filter chips: `!recording`, `:speaker:khaled`.
- **Claims** = grep-output style. Each line: `[CATEGORY] org/project · "quote" · speaker @ 14:23 · source-id`.
- **Rules** = full-screen monaco-style editor; `:w` to save; `?` for help overlay.
- **Agents Definitions** = `man`-page-style entries: section headers, dense prose, code blocks.
- **Atlas** Constellation variant promoted (suits dark aesthetic). When sidebar collapsed, Atlas falls back to ASCII-art constellation rendering.
- **Ask Knowcap** = terminal prompt at top, response in monospace, citations as `[1]` links.
- **Developers** = command-reference layout.
- **Home** = today's status dashboard, all numbers mono.

## Motion
- No transitions on navigation — instant. Operators don't want to wait.
- Cursor blinks in command palette.
- Status bar flickers subtly when state changes (one frame).
- Hover state: faint single-pixel border flash. No drop shadows.

## Vocabulary (terminal-flavored)
- Inbox = "inbox"
- Sources = "sources"
- Claims = "claims"
- Projects = "projects"
- Rules = "rules" (think `.rc` config)
- Agents = "routines" (cron-like)
- Atlas = "graph"
- Integrations = "plugins"
- Developers = "sdk"
- Home = "status"

## The one memorable thing
Every screen has a tiny prompt-style header in the top-left:

```
~/knowcap/[surface] $ _
```

Blinking cursor. Instantly readable as "this is a tool." When you focus the command palette (⌘K), the prompt expands to a real input field.

## Build order
1. Tokens + Berkeley Mono everywhere + soft-black palette
2. AppLayout shell with 44px collapsed sidebar + 24px status bar
3. CommandPalette as the canonical entry point — this is the front door
4. Inbox as dense expandable table
5. Sources as grep-output stream
6. Claims as grep-output stream with category-color line prefixes
7. Rules as monaco-style editor with ex-mode commands
8. Agents Routines + Definitions as `man`-page entries
9. Atlas Constellation (dark) + ASCII fallback
10. Ask Knowcap as terminal interview
11. Integrations / Developers / Home as ref docs

## IA reference
Same 11 surfaces, same sidebar order as v3 baseline. Full verbatim component spec at `docs/v3-design-spec.md` in this repo.
