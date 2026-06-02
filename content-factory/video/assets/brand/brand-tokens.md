---
title: Knowcap brand tokens — the real ones (4 themes + K-mark logo)
extracted: 2026-05-21
sources:
  - ~/Github/knowcap/knowcap Main/client/src/themes/registry.ts (canonical)
  - ~/Github/knowcap/knowcap Main/client/public/logos/ (K-mark PNGs)
---

# Knowcap brand tokens — the real source of truth

> **CORRECTION (2026-05-21):** Previous version of this file used the *landing-page* tokens (#005EFF) which is wrong for the app. The actual production app at `client/src/themes/registry.ts` ships **four themes** with different palettes, fonts, and personalities. Match generations to whichever theme the campaign is targeting.

## The Logo (don't render text-only "Knowcap" wordmarks)

**The Knowcap logo is a K-mark, not a wordmark.** A chunky outlined K with an internal hourglass/cross shape. Two variants:

| File | Use | Size |
|---|---|---|
| `client/public/logos/knowcap-mark-light.png` | dark K on light bg (light themes) | 256×256 |
| `client/public/logos/knowcap-mark-dark.png` | white K on navy bg (dark themes) | 1024×1024 |

Both PNGs are copied into `brand/knowcap-launch/k-mark-light.png` and `k-mark-dark.png` for direct use in compositions.

**When showing the brand name as text**, use lowercase `knowcap` in JetBrains Mono (for operator themes) or Space Grotesk (for baseline). Never use a hand-styled wordmark with arbitrary color splits like "Know" + colored "cap".

## The 4 themes

### baseline — current production v3 (cream + monochrome)

Used when: default app surface, no theme picked, marketing materials that need to feel like the production app.

| Token | Value |
|---|---|
| `--background` | `hsl(40 23% 98%)` ≈ `#FBFBF7` warm off-white |
| `--foreground` | `hsl(222.2 84% 4.9%)` near-black |
| `--primary` | `hsl(222.2 47.4% 11.2%)` dark slate (NO accent color — monochrome) |
| `--border` | `hsl(214.3 31.8% 91.4%)` |
| `--font-display` | `'Space Grotesk', system-ui, sans-serif` |
| `--font-body` | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |
| `--font-mono` | `'SF Mono', 'JetBrains Mono', monospace` |
| Density | comfortable |
| Logo variant | `k-mark-light.png` |

### operator-dark — terminal aesthetic (RECOMMENDED for launch video, locked 2026-05-21)

Used when: cinematic launch teasers, dev/AI tech vibe, content for the engineering audience.

| Token | Value |
|---|---|
| `--background` | `#0B0E14` soft-black canvas |
| `--foreground` | `#C9D1D9` warm white text |
| `--card` | `#11151D` raised surface |
| `--primary` | `#58A6FF` soft electric blue (action color) |
| `--muted` | `#1F2530` |
| `--muted-foreground` | `#8B949E` |
| `--border` | `#1F2530` |
| `--destructive` | `#FF7B72` |
| Fonts | **JetBrains Mono everywhere** (display + body + mono all the same) |
| Density | compact (radius 0.25rem) |
| Chrome | Terminal prompt `~/knowcap/<surface> $ _` at top + status bar at bottom |
| Logo variant | `k-mark-dark.png` |

### operator-light — terminal light (Knowcap green)

Same chrome as operator-dark but light surface with **green** primary (`#1F6B3A`). For when you want terminal aesthetic but on a light surface — e.g. carousel cards designed for both light/dark social platforms.

| Token | Value |
|---|---|
| `--background` | `#FAFAF7` warm off-white |
| `--foreground` | `#18181B` near-black slate |
| `--primary` | `#1F6B3A` Knowcap green |
| `--card` | `#F2F0EA` |
| `--border` | `#DDD8CC` |
| Fonts | JetBrains Mono everywhere |
| Logo variant | `k-mark-light.png` |

### library — parchment + serif + oxblood

Used when: bookish/editorial content, knowledge-base aesthetic, blog hero images.

| Token | Value |
|---|---|
| `--background` | `#F5EBDC` parchment |
| `--foreground` | `#2D1F18` warm dark ink |
| `--primary` | `#8B3E2F` oxblood |
| `--card` | `#FBF4E5` cream paper |
| `--border` | `#D9C9A8` |
| `--font-display` | `'EB Garamond', Georgia, serif` |
| `--font-body` | `'Geist Sans', system-ui, sans-serif` |
| Logo variant | `k-mark-light.png` |

## Style rules (universal across themes)

- **No emojis** in branded copy (per Hassan's communication rules)
- **No "AI-flavored" intros** ("in today's fast-paced world", "revolutionary AI-powered", etc.) — see anti-AI rules in [[../learnings/05-self-running-ai-company]]
- **Use the K-mark PNG** for hero logo treatments. NEVER hand-style a wordmark with random color splits.
- **When the brand name appears as text**, write it lowercase: `knowcap` (matches the in-app usage in operator themes). Title-case `Knowcap` only in body copy where capitalization matters.

## Quick CSS variable bundle for HTML compositions

For operator-dark composition headers:

```css
:root {
  --knowcap-bg: #0B0E14;
  --knowcap-fg: #C9D1D9;
  --knowcap-card: #11151D;
  --knowcap-primary: #58A6FF;
  --knowcap-muted: #1F2530;
  --knowcap-muted-fg: #8B949E;
  --knowcap-border: #1F2530;
}
body {
  background: var(--knowcap-bg);
  color: var(--knowcap-fg);
  font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
}
```
