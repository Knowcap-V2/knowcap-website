# Design System — Knowcap Landing Page

## Product Context
- **What this is:** Landing page for Knowcap — the trust layer for AI agents
- **Who it's for:** Odoo partners (beachhead), agencies, multi-company founders, regulated verticals
- **Space/industry:** Meeting intelligence → verified knowledge → agent actions
- **Project type:** Marketing landing page for a SaaS web app (knowcap.ai → app.knowcap.ai)

## Memorable Thing
"AI that only acts on truth" — visitors leave thinking this is the one where humans confirm before agents act.

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian — function-first, clean, confident. Infrastructure for truth.
- **Decoration level:** Minimal — typography and whitespace carry everything. Dot pattern on dark hero as the only texture.
- **Mood:** Serious, professional, trustworthy. Not playful, not startup-y. Like Stripe's docs crossed with a legal brief.
- **Reference sites:** linear.app (craft), vercel.com (confidence), tana.inc (anti-positioning)

## Typography
- **Display/Hero:** Space Grotesk — locked by VISION.md. -0.02em letter-spacing on large headings.
- **Body:** System sans (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) — consistent with app.
- **Mono/Claims/Stats:** JetBrains Mono — used for key claims, statistics, timestamps, code snippets, and category labels. Makes the page feel like infrastructure, not marketing.
- **Loading:** Google Fonts `family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600`
- **Scale:**
  - Hero h1: clamp(2.2rem, 4.5vw, 3.2rem) bold
  - Section h2: clamp(1.6rem, 3vw, 2.2rem) bold
  - Eyebrow: 10.5px uppercase tracking-wider bold (Space Grotesk)
  - Body: 15px / 1.6 line-height
  - Card title: 15px semibold (Space Grotesk)
  - Card body: 13px / 1.6
  - Small/meta: 12px
  - Mono stats: 24-28px semibold (JetBrains Mono)

## Color
- **Approach:** Restrained — one accent, color is rare and meaningful
- **Background:** #FBFAF8 (cream) — locked by VISION.md
- **Surface:** #FFFFFF (cards)
- **Background muted:** #F5F4F1 (secondary surfaces)
- **Border:** #E7E4DD — locked by VISION.md
- **Border hover:** #D9D5CC
- **Ink (primary text):** #18181B — locked by VISION.md
- **Ink secondary:** #4A4F5A
- **Ink muted:** #8A8F99
- **Accent:** #1F6B3A (Knowcap green = verified = truth) — the ONLY accent color
- **Accent light:** #E8F5ED (green tint for badges/backgrounds)
- **Hero gradient:** linear-gradient(135deg, #18181B, #0A0A0A)
- **Dark sections:** Same hero gradient (used for hero, governance, CTA, footer)
- **Category colors (for 5-category visuals only):**
  - Fact: #1F6B3A (green)
  - Risk: #9B1D1D (red)
  - Decision: #4A2FA8 (purple)
  - Task: #1B4F8F (blue)
  - Person: #8A5A12 (amber)
- **Semantic:** Success #1F6B3A, Warning #D97706, Error #9B1D1D

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — not cramped, not airy
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(88-96)
- **Section padding:** 88-96px vertical, 40px horizontal
- **Max content width:** 1100px centered
- **Card padding:** 24-28px
- **Card border-radius:** 12px (rounded-xl)
- **Button border-radius:** 8px (rounded-lg)
- **Pill border-radius:** 999px (rounded-full)

## Layout
- **Approach:** Hybrid — dark hero for opening, cream body with mixed centered/left-aligned content
- **Grid:** 3-column for cards (responsive to 1-column on mobile)
- **Max content width:** 1100px
- **Hero:** Full-width dark gradient, content centered, max-width 780px for headline
- **Dark sections:** Full-width background, content constrained to 1100px
- **Cards:** 1px border, 12px radius, subtle hover shadow

## Motion
- **Approach:** Minimal-functional
- **Easing:** ease-out for entrances
- **Duration:** 500-700ms for scroll-triggered fade-ins
- **Patterns:** Fade-in + translate-y(8-20px) on scroll into view. No parallax, no bouncy entrances, no decorative animations.

## Component Patterns

### Buttons
- **Primary:** bg #1F6B3A, white text, 8px radius, 13-15px font, "Start Verifying →"
- **Ghost (on dark):** 1px border rgba(255,255,255,0.12), white/70 text, 8px radius
- **Ghost (on light):** 1px border #E7E4DD, #18181B text, 8px radius

### Badges/Pills
- **Evidence pill:** green dot + "evidence" in JetBrains Mono 11px, #E8F5ED bg, #1F6B3A border
- **Claim pill:** red dot + "claim" in JetBrains Mono 11px, #FEF2F2 bg
- **Eyebrow badge:** uppercase 10.5px, #F5F4F1 bg, #E7E4DD border, #8A8F99 text

### Hero Badge
- Dark translucent bg (rgba white 6%), 1px border (rgba white 8%), pill shape
- Green dot + JetBrains Mono 12px text

### Code Block
- #18181B bg, 12px radius, 36-40px padding
- JetBrains Mono 13px, line-height 1.8
- Syntax: keys #58A6FF, strings #4ade80, comments rgba(255,255,255,0.25)

### Section Eyebrow
- 10.5px uppercase, tracking 0.08em, bold, Space Grotesk, #8A8F99
- Always above the section title, 10-12px margin-bottom

## A/B Test Versions

Four versions sharing this design system, differing in copy and section order:

| Version | Hero angle | Key differentiator |
|---|---|---|
| A (control) | Current copy — "Turn human claims into evidence" | Baseline measurement |
| B (outcome) | "Your meetings become verified actions. Automatically." | Outcome-focused, Odoo demo proof |
| C (role) | "AI that turns meetings into project docs, with proof." | Role-based cards (ERP/CRM, Agencies, Teams) |
| D (magic) | "Your meeting just flagged a risk, drafted mitigations, and contacted a supplier. Before it ended." | L1/L2/L3 escalation stories |

## Source Documents
- Visual tokens: `docs/VISION.md` line 303 (locked palette + font)
- Full design system: `~/Github/knowledge/llm-wiki/wiki/Knowcap/knowcap-mockup-design-system.md`
- Positioning copy: `docs/POSITIONING.md` (three sentences for three surfaces)
- Strategy context: `docs/STRATEGY.md` (three-loop flywheel)
- StratDev Figma: `https://www.figma.com/design/zaWrwYbvwG9G5UpXowQEMq/Knowcap`

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-25 | Created design system | /design-consultation based on VISION.md tokens + competitive research (10 products) |
| 2026-05-25 | Single accent (#1F6B3A green) | Green = verified = truth. No secondary accent. Color is rare and meaningful. |
| 2026-05-25 | JetBrains Mono for key claims | Makes claims feel like code contracts, not marketing copy. Unique in the space. |
| 2026-05-25 | Removed EU AI Act compliance badge | Product supports the requirements but no formal certification. Don't claim what you haven't audited. |
| 2026-05-25 | Removed fake stats + testimonials | A product about truth shouldn't have fabricated numbers on its landing page. |
| 2026-05-25 | Human confirmation = mechanism, not headline | Lead with outcomes (speed, actions, results). Verification is step 3, not the tagline. |
| 2026-05-25 | 4-version A/B test | Test outcome-first vs role-first vs show-the-magic vs current baseline |
| 2026-05-25 | Incorporated StratDev role-based layout | ERP/CRM Implementers, Agencies, Teams — better than generic personas |
