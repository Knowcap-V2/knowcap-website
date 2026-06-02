---
title: Phase 1 — Knowcap Audio → Motion Graphic Reels
status: locked
locked: 2026-05-22
budget: $25/mo flat + ~$0.13/reel
throughput_goal: 30-50 reels/month
deferred: publishing (Phase 2), voiceover/TTS (not needed — Knowcap audio IS the voice)
---

# Phase 1: The Number-One Workflow (LEAN)

> Pull audio from Knowcap → clean it (gold-standard) → attach to motion-graphic reel with synced captions + music bed → deliver MP4 ready to post.
>
> **Locked 2026-05-22 after Hassan corrected: "you don't need ElevenLabs or Buffer for Phase 1."**

## What this produces

A 15-30 second vertical reel (1080×1920) for IG/TikTok/Twitter/LinkedIn:
- The CLEAN audio from a chosen Knowcap moment plays end-to-end
- Kinetic captions sync word-by-word to the spoken voice (TikTok-style, muted-friendly)
- Soft music bed underneath (-22dB)
- Brand-graphics intro hook + Knowcap K-mark outro
- All Hassan does is pick the meeting + the moment → I deliver the MP4

Publishing is **not** part of Phase 1 — Hassan posts the MP4 manually (one click per platform). Phase 2 wires automated publishing later.

## The Stack (lean)

| Step | Tool | Status | Cost |
|---|---|---|---|
| **Audio source** | Knowcap MCP (`mcp__knowcap__*`) | ✅ already wired | $0 |
| **Audio cleanup (gold standard)** | **Auphonic API** | 🟡 needs $11/mo signup | $0.13/reel marginal |
| **Word-level captions** | Groq Whisper Large v3 | ✅ already have key | $0 |
| **Music bed** | **Mubert API** | 🟡 needs $14/mo signup | included in plan |
| **Motion graphics + render** | Hyperframes + 15 skills + 5 registry blocks | ✅ already installed | $0 |
| **Audio mux** | FFmpeg 8.1 | ✅ already installed | $0 |

**Total: $25/mo flat + ~$0.13 per reel.**

For 50 reels/month: **$25 flat + $6.50 usage = $31.50/mo all-in.**

## What I cut (after Hassan's correction)

| Tool I'd added | Why I cut it |
|---|---|
| ElevenLabs ($22/mo) | Knowcap audio IS the voice — no TTS needed. Auphonic is the speech-cleanup gold standard, not ElevenLabs Voice Isolator. |
| Buffer ($15/mo) | Publishing deferred. Hassan posts manually for now. |
| Creatomate ($99/mo) | Not needed — Hyperframes handles motion graphics natively |
| fal.ai usage | Not needed — no AI-generated video in this workflow |
| Suno music | Mubert covers music bed needs; Suno only needed for hero branded tracks (Phase 2) |

## Why Auphonic (not the alternatives)

Auphonic is the **podcast/speech-audio gold standard**. Used by professional podcast networks (NPR, Joe Rogan's earlier team, This American Life, etc.) for:

- Adaptive leveler (auto-normalizes voice across the clip, no manual level matching)
- Intelligent noise gate (cuts room tone, keyboard clicks, mouth noise)
- Loudness normalization to broadcast standards (-16 LUFS for podcasts, -14 LUFS for social)
- Filter & de-esser (smooths harsh sibilants)
- Multi-track support (each speaker on their own track if Knowcap exports them)

Comparison on the Knowcap meeting use case:

| Tool | Quality | Multi-speaker | API | Cost |
|---|---|---|---|---|
| **Auphonic** | ⭐⭐⭐⭐⭐ (industry standard) | ✅ Yes | ✅ REST + Python SDK | $11/mo + $0.13/min usage |
| ElevenLabs Voice Isolator | ⭐⭐⭐⭐ (excellent for solo voice) | 🟡 OK | ✅ REST | Bundled $22/mo |
| Adobe Podcast Enhance | ⭐⭐⭐⭐⭐ (excellent) | ✅ Yes | ✅ REST | $9.99/mo |
| Krisp | ⭐⭐⭐ (good) | ✅ Yes | ✅ REST | $8/mo |
| FFmpeg afftdn (free) | ⭐⭐ (decent) | ✅ Yes | local | $0 |

Adobe Podcast Enhance is also a great alternative — slightly cheaper, similar quality. If you'd rather use that, swap it in: [podcast.adobe.com](https://podcast.adobe.com).

## The Pipeline

```
Knowcap meeting recording
    ↓ (mcp__knowcap__get_source — returns signed file_url)
Download MP4 to .cache/
    ↓ (ffmpeg -ss <start> -to <end> -vn → mp3)
Extract just the clip Hassan wants (timestamps from transcript)
    ↓
Auphonic cleanup (gold standard) — $0.13/min
    ↓
Groq Whisper transcribe → word-level timestamps (FREE)
    ↓
Mubert music bed at the right BPM/mood (included)
    ↓
Hyperframes composition:
   - 0-2s: opening hook ("CAPTURED IN KNOWCAP")
   - 2-13s: audio plays + kinetic captions sync per word
   - 13-15s: K-mark + nowcap.ai outro
    ↓
Render to MP4 + FFmpeg final mix
    ↓
Drop in outputs/<reel-slug>-9x16.mp4 + report to Hassan
```

## Reel structure

```
┌─────────────────────────────────────┐
│                                     │
│         CAPTURED                    │  ← 0-2s opening hook
│       IN KNOWCAP                    │     bold kinetic type, purple accent
│                                     │
└─────────────────────────────────────┘
   white-wipe transition (0.2s)
┌─────────────────────────────────────┐
│                                     │
│   [Sara Msilmani — SMEtools CEO]   │  ← speaker lower-third (3s)
│                                     │
│       "the bottleneck                │  ← kinetic captions
│        isn't the tech,               │     sync per word to audio
│        it's the                      │     purple highlights on keywords
│        DECISION."                    │
│                                     │
│  ▶ playing cleaned voice            │
│  ░░░░ music bed at -22dB            │
│                                     │
└─────────────────────────────────────┘
   white-wipe (0.2s)
┌─────────────────────────────────────┐
│                                     │
│         🅺  nowcap.ai                │  ← K-mark + URL outro (13-15s)
│      Capture. Govern. Deliver.      │
│                                     │
└─────────────────────────────────────┘
```

## Sign-up (just 2 things)

| # | Service | URL | Plan | Cost |
|---|---|---|---|---|
| 1 | **Auphonic** | [auphonic.com/pricing](https://auphonic.com/pricing) | **Pro** ($11/mo, 9 production hours included) | $11/mo |
| 2 | **Mubert** | [mubert.com/render](https://mubert.com/render) | **Creator** ($14/mo, API access) | $14/mo |

That's it. **$25/mo total.**

(Optional alternative: swap Auphonic for **[Adobe Podcast Enhance](https://podcast.adobe.com) $10/mo** — similar quality, slightly cheaper. Tell me which you prefer.)

## How to save the API keys

After signing up, drop the keys here:

```bash
# ~/.claude/secrets/auphonic.json
{
  "username": "hsa@smetools.io",
  "password": "<auphonic-password-OR-use-api-token>",
  "preset_uuid": "<created-via-Auphonic-UI-with-Knowcap-meeting-preset>"
}

# ~/.claude/secrets/mubert.json
{
  "api_key": "<mubert-api-key>"
}
```

For Auphonic, create a preset in their web UI matching:
- Adaptive Leveler: ON
- Noise reduction: ON
- Loudness target: -14 LUFS (Instagram/TikTok standard)
- Output: MP3 192kbps

I'll smoke-test both APIs once keys are dropped.

## What I do RIGHT NOW (no signup required)

I can build the **full Phase 1 pipeline** today using free tools and ship a proof-of-concept reel:

- ✅ Knowcap MCP — pull audio
- ✅ FFmpeg afftdn — audio cleanup (decent, not gold standard)
- ✅ Groq Whisper — word timing
- 🟡 Library music bed — manually curated 5 cleared tracks
- ✅ Hyperframes — motion graphic composition
- ✅ FFmpeg — final mux

The output would be 80% of the quality of the full Auphonic+Mubert version. Once you sign up for those, the same skill auto-upgrades to use them (drop-in replacement).

## What I need from you (in order)

1. **Pick a Knowcap meeting + a moment** to use as the test case. Either a specific source UUID + timestamps OR a quote you remember and I'll find it via search.
2. **Sign up for Auphonic + Mubert** (10 min total, $25/mo).
3. **Drop the API keys** in `~/.claude/secrets/`.
4. **Approve the first reel** I make — we'll iterate on caption style + music vibe until you say "lock this template", then I batch-produce.

## Throughput once locked

**50 reels/month is realistic.** Each reel takes me ~5 minutes wall time + your ~2-minute review.

## See also

- [skills/knowcap-reel/SKILL.md](./skills/knowcap-reel/SKILL.md) — the orchestration skill (the actual code that runs this pipeline)
- [stack/INVENTORY.md](./stack/INVENTORY.md) — full reference for Phase 2+ tools (when we need them)
- [playbooks/social-reel-15sec.md](./playbooks/social-reel-15sec.md) — the format pattern
