# Knowcap Video Creator

World-class AI video production toolkit for Knowcap. Built 2026-05-22 after determining that ad-hoc Hyperframes-only work wasn't matching the professional reference video quality.

## Quickstart

1. **Read** [stack/signup-checklist.md](./stack/signup-checklist.md) — what to sign up for (in priority order, with URLs).
2. **Drop API keys** into `~/.claude/secrets/<service>.json` as documented.
3. **Tell me** when each key is wired — I'll smoke-test against the API.
4. **Ask** for a video using one of the playbooks in `playbooks/`.

## The stack (what's actually here)

- **Video generation:** fal.ai (gateway to Sora 2 / Veo 3.1 / Kling 3.0 / Seedance 2.0)
- **Voice:** ElevenLabs v3 + Kokoro local fallback
- **Music:** Suno v5 + ElevenLabs Music + Mubert (royalty-free)
- **Compositing:** Creatomate (JSON-to-video) + Hyperframes (HTML-native, local)
- **Stock:** Pexels + Pixabay + Pinterest (all free)
- **Motion graphics:** Hyperframes + 15 sub-skills (GSAP, anime.js, Lottie, Three.js)
- **Lipsync:** HeyGen API (optional)
- **Post:** FFmpeg + Demucs

Full details in [CLAUDE.md](./CLAUDE.md) and [stack/INVENTORY.md](./stack/INVENTORY.md).

## Folder map

```
knowcap-video-creator/
├── CLAUDE.md                  Orchestrator instructions for me (Claude)
├── README.md                  ← you are here
├── stack/                     Tool inventory + signup + cost
├── skills/                    Custom orchestration scripts (per-API wrappers)
├── compositions/              One folder per video project (Hyperframes)
├── assets/                    Brand, music, sfx, stock cache, voice profiles, fonts
├── outputs/                   Final rendered MP4s
├── playbooks/                 End-to-end recipes (60s demo, 30s launch, 15s reel)
├── scripts/                   Shared utilities (FFmpeg post-process, caching)
└── .cache/                    API response cache (gitignored)
```

## What's working right now (without any new sign-ups)

- ✅ Hyperframes — HTML-native composition + 15 skills + 5 registry blocks installed
- ✅ Kokoro TTS — local voice generation, 54 voices
- ✅ Groq Whisper — transcription
- ✅ FFmpeg — local video processing
- ✅ Higgsfield CLI — already installed
- ✅ OpenAI key (for GPT Image 2, and Sora 2 if enabled)
- ✅ Google Gemini key (for Veo 3.1 if enabled)
- ✅ The May 22 launch composition at [compositions/launch-v3-may2026/](./compositions/launch-v3-may2026/)

## What unlocks the full kit (Hassan signs up)

Top 5 priority APIs — total **~$220-300/mo** + pay-as-you-go:

1. **[fal.ai](https://fal.ai/dashboard)** — primary video gateway. Pay-as-you-go.
2. **[ElevenLabs Creator $22/mo](https://elevenlabs.io/pricing)** — voice
3. **[Suno Pro $10/mo](https://suno.com) + [PiAPI gateway](https://piapi.ai)** — music
4. **[Creatomate Growth $99/mo](https://creatomate.com/pricing)** — JSON-to-video
5. **[Mubert Creator $14/mo](https://mubert.com/render)** — royalty-free music API

Plus free APIs (register only): Pexels, Pixabay, Pinterest API v5.

Full breakdown: [stack/signup-checklist.md](./stack/signup-checklist.md).
Cost projections: [stack/monthly-cost-estimate.md](./stack/monthly-cost-estimate.md).

## See also

- [knowcap-content/learnings/](../knowcap-content/learnings/) — research notes (Higgsfield CLI, Remotion, Hyperframes patterns, Pinterest API, kinetic-type techniques, the j-SzV4i9Fbg reference video frames)
- The reference video Hassan wants to match: https://www.youtube.com/watch?v=j-SzV4i9Fbg
