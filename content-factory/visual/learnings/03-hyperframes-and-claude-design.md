---
title: Hyperframes + Claude Design — HTML-based video editing
source: https://youtube.com/watch?v=ZNbgOhxhzXg
author: Nate (AI Automation Society)
duration: ~30m
watched: 2026-05-21 (from wiki transcript dated 2026-04-19)
tags: [hyperframes, claude-design, html-video, video-editing]
applies_to: Knowcap (BIG implication — this might beat Remotion for your use case)
---

# Hyperframes + Claude Design — HTML-based video editing

## The big idea (and why this might be more important than Remotion for Knowcap)
Two distinct tools. Both render video by generating HTML/CSS and converting it to MP4 via ffmpeg. **Hassan already uses Claude Design** (memory: `project_design_tooling.md`).

| Tool | What it is | When to use |
|---|---|---|
| **Claude Design** | Web app at claude.design. Has animation timeline from-template. No-code. Hassan already pays for this. | Quick branded edits, social clips, animated landing-page mockups, when speed matters |
| **Hyperframes** | Open-source by HeyGen. CLI + skills + catalog of pre-built animations (notifications, terminal typing, 3D UI reveals, transitions). Runs via Claude Code. | When you need control, programmatic re-renders, version-controlled animation source |

## Why this is huge for Knowcap

### The killer pipeline (the video's actual demo)
1. **Use Claude Design** to mock the Knowcap landing page in branded design
2. **Export as standalone HTML** (button literally exists)
3. **Drop HTML into a new Claude Design Animation project** OR **into a Hyperframes project**
4. Prompt: *"Turn this into an animated release video"*
5. Get a 30-second branded launch video that matches your site 1:1

That output of "AI Automation Society first agent promo" would have taken a motion designer 2-4 hours. He prompted it in one line.

### Why Hyperframes beats Remotion specifically
- **Catalog of pre-built animations** (Mac OS notification, Reddit post card, 3D UI reveal, terminal typing, karaoke captions, "chromatic radial split"). You don't start from zero.
- **Built-in audio sync** — feed a transcript JSON with word-level timestamps, animations sync to your voiceover
- **Better at handling a real video** — you can drop in a face-cam MP4 and Hyperframes will composite motion graphics on top
- **Already iterated 60+ times** — the author considers it production-grade despite Remotion being older

## The transcript-sync trick (KEY for Knowcap demos)
- Hyperframes can read a JSON like `{ "word": "transcription", "start": 4.2, "end": 4.7 }` and time animations to specific words
- For Knowcap demos this is gold: Hassan narrates "and then Knowcap turns this meeting into 5 action items" → animations fire on the words *meeting* and *action items*
- Generate the JSON via OpenAI Whisper (or local whisper.cpp)

## Real cost data (from the video)
- One edited 37-sec video at full quality: ~10% of a $200/mo Claude Max plan's 5-hour limit
- 4 iterations to get a video he was happy with
- Render time: a few minutes per iteration

## Caveats
- HTML-based ≠ free of bugs. The author reports localhost preview being "hit or miss" on Hyperframes (Remotion more stable on previews)
- The blur-on-text bug appeared repeatedly — needed 4 iterations
- Make sure to CLEAR session context between iterations (he hit 263k tokens before resetting)
- Quality still depends on taste — *"if someone has really good understanding of what makes videos engaging... they're going to be able to use these tools like crazy"*

## What applies to Knowcap — actionable

### Day-1 test (recommended over Remotion)
1. Open Claude Design, mock a Knowcap "what's new in v3" page using existing brand
2. Export standalone HTML
3. Drop into Claude Code, ask Hyperframes to turn it into a 30-sec animated launch video
4. Compare result vs. Remotion test

### Pipeline once validated
- All in-product UI demos → Hyperframes
- All product-launch / feature-reveal videos → Hyperframes (Claude Design front-end)
- All photorealistic ad creative → Higgsfield (per [[01-higgsfield-cli-rogue-keith]])

## Hyperframes install hint
He says: don't `npx install` it directly. Clone the official Hyperframes repo URL → paste the URL into Claude Code → say *"this is an open-source video editing tool I want to use, analyze the repo, build skills around it, help me install."* Claude Code does the setup.

## See also
- [[02-remotion-aiden-stannic]] — the competitor (use this as a fallback if Hyperframes localhost is broken)
- [[01-higgsfield-cli-rogue-keith]] — different lane (photorealistic vs UI)
