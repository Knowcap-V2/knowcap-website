# Knowcap Video Creator — World-Class AI Video Production Stack

> The single source of truth for all Knowcap motion content. Replaces the ad-hoc work in `knowcap-content/brand/knowcap-launch/`.

## What this folder is

A complete, working AI video production pipeline. Combines:

- **Video generation** — Sora 2, Veo 3.1, Kling 3.0, Seedance 2.0 via fal.ai (single API)
- **Voice** — ElevenLabs v3 (70+ languages, world-class) + Kokoro (local free fallback)
- **Music** — Suno v5 + ElevenLabs Music + Mubert (royalty-free streams)
- **Compositing** — Creatomate (JSON-to-video API) + Hyperframes (local HTML/CSS/GSAP)
- **Stock** — Pexels + Pixabay (free) + Storyblocks (premium)
- **Motion graphics** — Hyperframes + Remotion + Lottie + Rive
- **Lipsync / talking heads** — HeyGen API (optional)
- **Post-processing** — FFmpeg + Demucs (stem separation)

## Routing — which tool for which job

| Need | Tool | Why |
|---|---|---|
| Photorealistic shot of a scene, person, place | **fal.ai → Sora 2** or **Veo 3.1** | Best fidelity + native audio in same pass |
| Cinematic multi-shot sequence with subject consistency | **fal.ai → Kling 3.0** | Cheap ($0.10/sec) + best subject consistency |
| Animated text, UI mockups, motion graphics, branded outros | **Hyperframes** (local) | No cost, full control, version-controlled |
| Long-form text-to-video with stock footage + voiceover | **Creatomate API** | JSON-to-video, fastest path from script |
| Voiceover narration in any of 70+ languages | **ElevenLabs v3 API** | Industry standard |
| Background music matched to mood/tempo | **Suno v5** (no official API yet — manual) or **ElevenLabs Music** ($0.80/min, has API) |
| Royalty-free background music with API | **Mubert API** | Streams royalty-free by mood/genre |
| Stock B-roll footage | **Pexels API** (free) or **Storyblocks** (premium) |
| Stock images | **Pexels API** (free) |
| Custom illustrations / hero shots | **fal.ai → Nano Banana Pro / GPT Image 2 / Flux Ultra** |
| Talking-head explainer with synthetic presenter | **HeyGen API** |
| Whisper transcription of a meeting → subtitle file | **Groq Whisper** (already wired) |
| Stem separation (split music + vocals) | **Demucs** (local Python) |
| Final render to MP4 | **FFmpeg** (local) |

## Folder structure

```
knowcap-video-creator/
├── CLAUDE.md                  # this file — orchestrator instructions
├── README.md                  # quickstart for Hassan
├── stack/
│   ├── INVENTORY.md           # every tool, status, cost
│   ├── signup-checklist.md    # what Hassan signs up for (with URLs)
│   └── monthly-cost-estimate.md
├── skills/                    # custom orchestration skills
│   ├── generate-shot/         # picks best video model for a shot
│   ├── generate-voiceover/    # voice gen with ElevenLabs
│   ├── generate-music/        # music gen via Suno/ElevenLabs/Mubert
│   ├── generate-image/        # image gen routing
│   ├── compose-video/         # combines all into Hyperframes composition
│   └── render-final/          # FFmpeg post-process + export
├── compositions/              # one folder per video project
│   └── (per-project Hyperframes projects)
├── assets/
│   ├── brand/                 # K-marks, brand-tokens.md
│   ├── music/                 # stock + generated tracks
│   ├── sfx/                   # sound effects library
│   ├── stock-footage/         # Pexels/Pixabay cache
│   ├── voice-profiles/        # ElevenLabs voice IDs registry
│   └── fonts/                 # Inter, Space Grotesk, JetBrains Mono
├── outputs/                   # final rendered MP4s (named by project + date)
├── playbooks/                 # end-to-end recipes
│   ├── product-demo-60sec.md
│   ├── feature-launch-30sec.md
│   ├── social-reel-15sec.md
│   └── educational-explainer-90sec.md
├── scripts/                   # shared bash/node utilities
└── .cache/                    # API response cache, model output cache
```

## API keys location

All keys live at `~/.claude/secrets/`. The video-creator-specific ones:

| Secret file | Service | Required for |
|---|---|---|
| `~/.claude/secrets/fal.json` | fal.ai | All AI video generation |
| `~/.claude/secrets/elevenlabs.json` | ElevenLabs | Voiceover + ElevenLabs Music |
| `~/.claude/secrets/suno.json` | Suno (third-party API gateway) | AI music generation |
| `~/.claude/secrets/creatomate.json` | Creatomate | JSON-to-video compositing |
| `~/.claude/secrets/pexels.json` | Pexels | Free stock footage + images |
| `~/.claude/secrets/pixabay.json` | Pixabay | Free stock footage + images |
| `~/.claude/secrets/mubert.json` | Mubert | Royalty-free music streams |
| `~/.claude/secrets/heygen.json` | HeyGen | Talking-head avatars |
| `~/.claude/secrets/groq.json` | Groq | ✅ already have — Whisper STT |
| `~/.claude/secrets/openai.json` | OpenAI | ✅ already have — Sora 2 direct, GPT Image 2 |
| `~/.claude/secrets/google_gemini.json` | Google AI Studio | ✅ already have — Veo 3.1 direct |

## How I (Claude) work in this folder

When Hassan asks for a video, I follow this flow:

1. **Brief intake.** What's the goal, audience, duration, format (16:9 / 9:16 / 1:1)?
2. **Pick playbook.** Match to one of `playbooks/*.md` or compose ad-hoc.
3. **Script.** Write the per-scene script with timestamps. Get Hassan's approval.
4. **Asset generation.** For each scene:
   - If text/UI animation → Hyperframes (local, free)
   - If photorealistic shot → fal.ai (cheapest model that meets fidelity)
   - If stock works → Pexels/Pixabay first
   - If custom illustration → fal.ai → Nano Banana / Flux
5. **Voiceover.** ElevenLabs v3 with the registered voice profile.
6. **Music.** Suno for branded vibe, ElevenLabs Music for API-driven, Mubert for filler.
7. **Compose.** Either Hyperframes (motion graphics-heavy) or Creatomate (stock-heavy with VO).
8. **Render.** Hyperframes → MP4, or Creatomate → MP4.
9. **Post.** FFmpeg for trimming/color/audio mix.
10. **Deliver.** Drop final into `outputs/<project>-<date>.mp4` + report to Hassan with file:/// link.

## Rules I always follow

- **Read the playbook before improvising.** `playbooks/` exists so I don't reinvent recipes.
- **Match the brand.** Use `assets/brand/brand-tokens.md` for colors, fonts, K-mark variants.
- **No emoji or AI-flavored copy** ("revolutionary", "in today's fast-paced", etc.) per Hassan's communication rules.
- **Cache aggressively.** AI video gen is expensive — cache outputs in `.cache/` keyed by prompt+model+seed.
- **Verify before reporting.** Render → grab frames → check quality → THEN tell Hassan.
- **No mid-scene exit animations** in Hyperframes (per `/hyperframes` skill rules).
- **Per-word kinetic reveals** for hero text scenes (use `caption-kinetic-slam` component pattern).
- **White-wipe transitions** between scenes (per `kinetic-type` example).
- **Vary eases** per scene — at least 3 different easing functions to avoid robotic feel.

## When Hassan says "make me a video about X"

1. Ask: format (landscape/vertical/square), duration, where it'll be posted, must-have shots
2. Look at `playbooks/` — does one fit?
3. If yes, follow it. If no, compose from scratch but cite which playbook is closest.
4. Always confirm script + storyboard before generating expensive assets (Sora 2 = $0.75/sec).

## Cost discipline

Every video has a budget. Default budgets:

| Format | Default budget | Typical breakdown |
|---|---|---|
| 15s social reel | $5-10 | ElevenLabs VO $0.50 + Suno/Mubert music $2 + Hyperframes free |
| 30s feature launch | $15-30 | + 2-3 fal.ai shots @ $5 each |
| 60s product demo | $40-80 | + 6-8 generation shots + better music |
| 90s explainer | $80-150 | + HeyGen avatar + more shots |

Report total spend per video in the output report.

## See also

- `stack/INVENTORY.md` — every tool, status, signup status
- `stack/signup-checklist.md` — what Hassan needs to subscribe to
- `playbooks/` — end-to-end recipes
- `../knowcap-content/learnings/` — research notes from videos we studied (Higgsfield, Remotion, Pinterest API, kinetic-type patterns)
