---
title: Higgsfield CLI + Claude Code — self-improving content factory
source: https://www.youtube.com/watch?v=FQqkDXq1WEQ
author: Rogue Keith (GenHQ)
duration: 66m
watched: 2026-05-21
tags: [higgsfield, cli, nano-banana, seedance, content-factory]
applies_to: Knowcap, Ariika (outside-product content — hero imagery, ads, social)
---

# Higgsfield CLI + Claude Code — self-improving content factory

## The big idea
A folder-based content factory where Claude generates images + videos via Higgsfield, logs every output to a Google Sheet, and learns from approve/reject feedback over time. Compounds like a pension.

## Why CLI not MCP
**CLI can upload reference images. MCP cannot.** This is the entire unlock — you need to ground generations on your brand's actual reference photos (products, models, environments). MCP can call generation endpoints but can't push files into them.

## The 4 mechanical pieces

### 1. Reference library (one folder per content type)
- `environments/` — 15-20 moodboard images + `environments.md` text descriptions
- `models/` — character sheets (full-body, multiple angles) + close-up garment shots
- `products/` — 6-angle product sheets (generate via Nano Banana: *"white background, create a product sheet covering all angles, 6 images in one photo"*)
- `outputs/` — empty folder where Claude saves results

### 2. UUID system (the secret sauce)
- Upload an image to Higgsfield → it returns a permanent UUID (private to your account)
- Claude reads UUIDs as image refs in prompts forever — no re-upload, no token cost
- Workflow: bulk-upload everything once, extract all UUIDs, write them to `reference_ids.md`. Every future prompt cites them.

### 3. Rules / handoff doc (`handoff.md`)
Hard-won lessons baked in as rules. Examples:
- *"When generating model X, MUST use character sheet + trainer sheet only."*
- *"NEVER use editorial photos as references — Seedance copies them as literal frames into video output."*
- Brand tokens (colors, lighting style, banned terms)

### 4. Self-improvement loop
- `prompt_log.md` — Claude logs every prompt it writes
- `seedance_failure_log.md` — when generations get blocked/rejected, Claude records *why* and rewrites the rule
- `feedback_tracker.csv` (synced to Google Sheets) — approved/rejected/pending + notes column. Claude reads this on every new run.
- Wired to a 6 AM routine: wakes up, batches 30 images + 10 videos, files them in the tracker, Hassan reviews at 9 AM

## Models he uses (inside Higgsfield)
- **Nano Banana Pro** — images, photorealistic
- **Seedance 2.0** — video, takes still + animates

## Caveats (real)
- Generation costs $$ — meter usage
- Seedance treats reference images as **literal frames** in output. Use character sheets, NOT styled editorial shots
- Higgsfield free plan caps concurrent jobs at 8. Chunk batches to 6.

## What applies to Knowcap
- **Outside-product content**: hero shots of "founder using Knowcap at a desk", lifestyle imagery for ads, abstract "AI brain" visuals
- **B2B caveat**: Higgsfield CANNOT render legible UI text or clean dashboard screenshots. Anything that shows actual Knowcap UI must come from Remotion/Hyperframes or real screen recordings — NOT Higgsfield.

## See also
- [[02-remotion-aiden-stannic]] — motion graphics complement (UI animations)
- [[03-hyperframes-and-claude-design]] — the HTML→MP4 alternative
- [[04-higgsfield-mcp-chase]] — MCP variant (simpler but no reference image upload)
- [[05-self-running-ai-company]] — fits this into a 4-layer "AI company" architecture
