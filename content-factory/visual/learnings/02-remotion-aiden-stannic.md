---
title: Remotion + Claude Code — programmatic motion graphics
source: https://www.youtube.com/watch?v=NU3OIRcaQeI
author: Aiden Stannic
duration: 10m
watched: 2026-05-21
tags: [remotion, motion-graphics, claude-code, react]
applies_to: Knowcap (inside-product visualizations — UI demos, feature animations)
---

# Remotion + Claude Code — programmatic motion graphics

## The big idea
Remotion is a React-based framework where you write **code** (well, Claude writes code) to render MP4 video. No After Effects timeline. Natural-language prompt → Claude generates React components → renders at `localhost:3000` → exports MP4. ~5-8 min per generation.

## Setup (the entire thing)
1. Use Claude Code desktop app (the GUI, not just the CLI terminal)
2. New project folder
3. **Make sure mode is set to "Code" not "Ask" or "Plan"** — easy to miss
4. Run `npx skills add remotiondev/skills` inside Claude Code (one line)
5. Prompt with natural language: *"Build me a smooth Apple-style animation with motion blur, fast transitions, high quality. Introducing [X]..."*
6. Approve permissions when asked
7. Get a localhost URL when done; click → MP4

## Why it matters for software companies (his exact callout)
> *"If you want a terminal typing out certain code in your website because you have a software company, you can do that really easily if you had no motion design or After Effects experience and you don't have to hire a motion designer."*

This is **literally Knowcap**. Terminal animations, dashboard sweeps, "transcript morphs into action items" reveals — all things you'd otherwise pay a motion designer 2-4 hours per asset for.

## Caveats (real)
- **Remotion + Claude Code skill was 1 week old at filming time.** Fresh tech, expect rough edges
- 5-8 min render per generation. Each polished asset = 20-30 min wall time after iterations
- Eats tokens — he reports ~10% of his Max-plan 5-hour limit per project
- Quality tracks YOUR taste. No-taste-in → no-taste-out

## What applies to Knowcap
**Asset shortlist** (all Remotion's lane, not Higgsfield's):

1. Landing-page hero loop (10s) — transcript text typing → action items materializing
2. "Meeting → memory" animation — Knowcap's actual differentiation, shown not told
3. Agent-to-agent handoff visualization — for the $50K Vertical Pack pitch deck
4. Product-Hunt launch hero
5. In-app onboarding micro-animations (slots into your TourSpotlight work)
6. Twitter/X demo loops (high engagement format)
7. YouTube shorts intro template
8. Email header banners with subtle motion

## Workflow note
Hassan should keep Remotion output in `brand/remotion/` and commit final MP4s + the React source. The React source means future-you (or Shady) can re-render with minor tweaks without paying full token cost again.

## See also
- [[03-hyperframes-and-claude-design]] — Hyperframes claims to be a "better Remotion" + Claude Design is the no-code variant
- [[01-higgsfield-cli-rogue-keith]] — the complement (photorealistic, NOT UI)
