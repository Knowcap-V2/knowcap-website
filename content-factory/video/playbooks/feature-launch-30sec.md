---
title: 30-second Feature Launch Playbook
duration: 28-32 sec
budget: $5-10
use_when: Shipping a new feature, sub-30-sec social post, twitter/linkedin native video
---

# 30-Second Feature Launch Playbook

Shorter than the product demo. For when you ship a single new feature and want to announce it on social.

## Anatomy (the 5-scene structure)

| # | Time | Scene | Purpose |
|---|---|---|---|
| 1 | 0-4s | **Problem framing** | "Tired of [pain]?" or "[Time waste statement]" |
| 2 | 4-10s | **Feature reveal** | "[Feature name] is here." with K-mark + product shot |
| 3 | 10-20s | **Show it in action** | Real UI screenshot OR animated mock with cinematic zoom |
| 4 | 20-26s | **One concrete benefit** | "X turns Y into Z in Minutes not Hours" |
| 5 | 26-30s | **CTA + link** | "Live now on knowcap.ai" with K-mark + URL |

## Production sequence

### 1. Brief intake (free)
- What feature are we launching?
- Pain point it solves (one sentence)?
- One real UI screenshot or do we mock it?
- Platform (Twitter/LinkedIn/IG vertical)?

### 2. Music — pick from cache (free if cached)
For 30-sec assets, reuse a track from `assets/music/<vibe>/`. Build a 10-track library:
- `uplifting-tech-92bpm.mp3` (default)
- `cinematic-build-80bpm.mp3` (slower, dramatic)
- `corporate-confident-100bpm.mp3` (B2B SaaS standard)

Only generate new music for hero launches.

### 3. Voiceover (~$0.10)
Optional. Often 30-sec videos work better with just music + on-screen text.

### 4. Visual assets
- Scenes 1, 2, 4, 5 — Hyperframes motion graphics (free)
- Scene 3 — Real screenshot or HTML mock

### 5. Compose + render
Same Hyperframes patterns as the 60-sec playbook (per-word reveals, white-wipe transitions, varied eases).

For aspect ratio:
- **16:9** for YouTube/LinkedIn → 1920×1080
- **9:16** for Twitter/IG Story → 1080×1920 (swap composition dimensions)
- **1:1** for IG feed → 1080×1080

### 6. Deliver
- Default output to `outputs/<feature-slug>-<aspect>.mp4`
- Generate all 3 aspect ratios if Hassan wants multi-platform posting

## Cost breakdown

| Item | Cost |
|---|---|
| Music from cache | $0 |
| ElevenLabs VO if used | $0.05 |
| Hyperframes render | $0 |
| 1 fal.ai Flux still if needed | $0.06 |
| **Total** | **~$0.10-5** |

## Throughput

Can produce **30 of these per day** with the cached-music + Hyperframes-only path.
