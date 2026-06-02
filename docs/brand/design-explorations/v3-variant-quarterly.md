# Knowcap v3 — Variant "Quarterly"

Editorial / publication aesthetic. The thesis: every claim is a verified quote, treated with the typographic respect of a magazine column — not a database row. We are designing for *product readers*, not product users. Reference points: The Atlantic, Stratechery, Bloomberg Briefs.

Same IA, same 11 surfaces, same sidebar order as the v3 baseline. Source-of-truth spec: `docs/v3-design-spec.md` (1,296 lines, verbatim component extraction). This file overlays a different aesthetic vocabulary on top.

---

## Field 1 — Company name and blurb (paste into the first textarea)

Knowcap is meeting intelligence in the language of journalism. We record meetings, calls, and screen sessions; transcribe via Whisper + Pyannote diarization; extract verified claims — facts, risks, decisions, tasks, people — through Gemini 2.5 Pro. Every claim is a quote attributed to a speaker at a precise timestamp, citable and re-verifiable like a magazine article. The product reads like a daily briefing: an Inbox of incoming claims awaiting your routing, an Archive of Sources, a Library of cross-org Claims, and a set of Rules + Agents that shape what enters the record. 11 surfaces, sidebar-driven, three organizations (Knowcap, Ariika, SMEtools). Design direction is editorial / publication — Fraunces or GT Sectra display, Söhne or Inter Tight body, ink on warm paper, asymmetric grid, drop caps, footnote-style citations, single accent terracotta #C8553D.

---

## Field 2 — GitHub repo

https://github.com/Knowcap-V2/knowcap

---

## Field 3 — Any other notes (paste into the second textarea)

DESIGN DIRECTION: "Quarterly" — editorial / publication.

## Aesthetic posture
- Magazine-grade. The Atlantic / Stratechery / Bloomberg Briefs.
- Restraint. Generous whitespace. Wide left margins. Optical alignment.
- Asymmetric grids. Drop caps. Pull-quotes. Footnote-style citations.
- Light mode is primary; dark mode supported but feels "evening read" not "code editor."

## Typography
- Display: **Fraunces** (variable, optical-size aware — free on Google Fonts). NO fallback to GT Sectra or Recoleta; those are paid and would trigger the brand-fonts warning.
- Body: **Instrument Sans** (free on Google Fonts — clean, modern, refined; works as a Söhne stand-in without the paid-font warning). Söhne is paid, skip it.
- Mono: JetBrains Mono — used ONLY in code chips on /developers, never in chrome.
- NEVER Inter, Roboto, Arial, Space Grotesk. They are AI-slop fonts.

## Color palette
- Paper: #F8F4EC (warm cream)
- Ink: #0A1628 (deep navy)
- Muted ink: #4A5468
- Rule lines: #D9D2C2 (warm paper rule)
- Accent: #C8553D (terracotta) — used very sparingly: active sidebar item, primary action, citation chip
- Org tags (demoted to small inline pills, not heroes):
  - Knowcap: #1F6B3A green (kept)
  - Ariika: #4A2FA8 purple (kept)
  - SMEtools: #B5731A amber (kept)
- Category badges rendered as serif-bold small caps on tinted paper, not pill chips.

## Layout
- Sidebar 240px, paper background. Top is a "Volume III · Issue 47" masthead with today's date in small caps.
- Main canvas max-width ~960px, generous gutters.
- **Inbox** = daily briefing. Each InboxRow looks like a column entry: bold serif source title, italic AI prediction, indented blockquote for the top claim, footnote-numbered citations beneath.
- **Sources** = archive. Single column of dated entries, like a periodical's back-issue index.
- **Claims** = library. Each claim is a pull-quote in serif italic, citation in small-caps beneath. Filters at top read like a card catalog.
- **Ask Knowcap** = embedded interview. User question in roman, assistant answer in serif, citations as drop-down footnotes [1] [2] [3].
- **Rules** = full-screen markdown editor, paper background, looks like an essay draft.
- **Agents Definitions** catalog = author cards with portrait wells.
- **Atlas** Library variant promoted; Constellation variant deprioritized.
- **Developers** = a printed manifesto.
- **Home** = today's briefing, signed by the editor.

## Motion
- Page transitions: slow cross-fade, not slide.
- Hover states: subtle ink-color shift, no drop shadows. Citation numbers underline on hover.
- Scroll-triggered: drop caps fade in once when a section enters viewport.

## Vocabulary (verb-free, masthead-flavored)
- Inbox = "Today's briefing"
- Sources = "Archive"
- Claims = "Library"
- Projects = "Beats"
- Rules = "Style guide"
- Agents = "Columnists"
- Atlas = "Index"
- Integrations = "Wire services"
- Developers = "Pressroom"
- Home = "Masthead"

## The one memorable thing
Every claim card has a small-caps masthead-style attribution at the top:

> VOLUME III · ISSUE 47 · 2026 · SOURCE: *Q1 Board Sync* · SPEAKER: Khaled · MINUTE 14:23

Treat every claim like a citation in a printed journal.

## Build order
1. Tokens + type system + paper/ink palette
2. AppLayout shell with masthead sidebar
3. Inbox as daily briefing (highest signal of the aesthetic)
4. Sources as archive
5. Claims as library
6. Ask Knowcap as embedded interview
7. Rules as essay
8. Agents Definitions as author cards
9. Atlas Library variant
10. Integrations + Developers + Home as long-form pages

## IA reference
Same 11 surfaces, same sidebar order as v3 baseline. Full verbatim component spec at `docs/v3-design-spec.md` in this repo.
