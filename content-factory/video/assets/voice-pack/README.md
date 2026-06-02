---
title: Hassan Arslan Voice Pack
purpose: Anti-slop reference for every content generation task
created: 2026-05-24
sources:
  - wiki/AV Ventures/people/Hassan Sam Arslan.md
  - wiki/AV Ventures/strategies/bundle-pitch.md
  - wiki/AV Ventures/strategies/marketing-plan-2026.md
  - wiki/AV Ventures/strategies/Content Strategy Development.md
  - wiki/AV Ventures/strategies/Knowcap SMEtools Flywheel.md
  - wiki/AV Ventures/strategies/content/weekly-content-2026-04-20.md
  - wiki/Knowcap/topics/Knowcap Brand Identity and Positioning.md
  - wiki/Knowcap/topics/Knowcap Content - Learnings 2026 Q2.md
  - raw/meetings/Knowcap (~242 meeting transcripts)
  - ~/.claude/projects/.../memory/feedback_communication.md
---

# Hassan Arslan Voice Pack

Five files Claude reads before drafting any content for Hassan. The anti-slop pattern surfaced in the "Claude Code SEO" tutorial (#2 in [Knowcap Content Learnings 2026 Q2](file:///C:/Users/Eng.Hassan/Github/knowledge/llm-wiki/wiki/Knowcap/topics/Knowcap%20Content%20-%20Learnings%202026%20Q2.md)):

> "The voice-pack pattern (`humor.md` + `voice.md` + `stats.md` + `stories.md` + `opinions.md`) is the antidote to AI slop and the biggest single quality jump."

## Files

| File | Use when | Read order |
|---|---|---|
| [voice.md](./voice.md) | Every content task — sentence cadence, register, tone | 1st |
| [opinions.md](./opinions.md) | Posts / reels making a claim or hot take | 2nd |
| [stats.md](./stats.md) | Anything needing real numbers | 3rd |
| [stories.md](./stories.md) | Anything needing a concrete example | 4th |
| [humor.md](./humor.md) | Tone calibration — Hassan is dry, not zany | 5th |

## How to load this pack

In any content-generating skill or composition, prepend:

```
Voice pack at ~/Github/knowcap/knowcap-video-creator/assets/voice-pack/
Read ALL FIVE files before drafting. Match the patterns documented there.
```

## How to maintain

- Update `stats.md` monthly with fresh numbers from Ariika/SMEtools/Knowcap
- Add to `stories.md` whenever Hassan tells a memorable example (extract from new meetings via knowcap MCP)
- Update `opinions.md` when Hassan locks a new strong take in a meeting/post
- Never edit `voice.md` without diffing against 5+ recent meeting transcripts
- Never add to `humor.md` without confirming Hassan actually uses that beat
