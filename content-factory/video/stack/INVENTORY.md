---
title: Knowcap Video Creator — Full Stack Inventory
updated: 2026-05-22
status_legend: "✅ live / 🟡 needs API key / 🆓 free, just register / 🔴 not yet integrated"
---

# Full Stack Inventory

Every tool in the kit, what it does, its current status, and how I invoke it.

## 1. Video Generation (the AI-shot layer)

| Tool | Status | What it does | Pricing | How I invoke |
|---|---|---|---|---|
| **[fal.ai](https://fal.ai)** | 🟡 needs key | **PRIMARY** — single API gateway to 600+ models incl. Sora 2, Veo 3.1, Kling 3.0, Seedance 2.0, Wan 2.6 | Pay-as-you-go, $0.10-0.75/sec depending on model | `curl https://fal.run/fal-ai/<model> -H "Authorization: Key $FAL_KEY"` |
| **[OpenAI Sora 2](https://platform.openai.com)** | ✅ already have OpenAI key | Cinematic top-tier, best physics | $0.75/sec @ 1080p | Direct API or via fal.ai |
| **[Google Veo 3.1](https://aistudio.google.com)** | ✅ already have Gemini key | True 4K native, audio in same pass, highest res ceiling | $0.10-0.60/sec | Via Google AI Studio or fal.ai |
| **[Kling 3.0](https://klingai.com)** | 🟡 needs key OR use via fal.ai | Cheapest premium, best multi-shot subject consistency | $0.10/sec | Via fal.ai (recommended) |
| **[Seedance 2.0 (ByteDance)](https://seedance.ai)** | 🟡 via fal.ai | Best narrative storytelling, native audio, multi-shot | ~$0.30/clip | Via fal.ai (also via Higgsfield) |
| **[Higgsfield](https://higgsfield.ai)** | ✅ already installed CLI | Aggregator: 17 image models + 14 video models, includes proprietary models | $99-499/mo plans | `higgsfield generate ...` CLI or MCP |
| **[Hailuo 2.3 (Minimax)](https://hailuoai.video)** | 🟡 via fal.ai | Cheapest at $0.28/6-sec clip, strong lip-sync | $0.28/clip | Via fal.ai |

**Recommendation:** Sign up for **fal.ai** as the primary. It's the swiss-army knife — same code path for every model.

## 2. Image Generation (stills, hero shots, refs)

| Tool | Status | What it does | Pricing | How I invoke |
|---|---|---|---|---|
| **[Nano Banana Pro (Google)](https://aistudio.google.com)** | ✅ Gemini key | Best for editing existing images, photorealistic | Via Gemini API quota | Direct Gemini API |
| **[GPT Image 2 (OpenAI)](https://platform.openai.com)** | ✅ OpenAI key | Top-tier general-purpose | $0.04-0.19/image | Direct OpenAI API |
| **[Flux 1.1 Pro Ultra](https://fal.ai/models/fal-ai/flux-pro)** | 🟡 via fal.ai | Open-weights, fast, best for hero compositions | $0.06/image | Via fal.ai |
| **[Recraft v3](https://fal.ai/models/fal-ai/recraft-v3)** | 🟡 via fal.ai | Best for vector/design illustrations | $0.04/image | Via fal.ai |
| **[Ideogram 2.0](https://ideogram.ai)** | 🟡 needs key | Best for text-in-image (logos, posters) | $0.08/image | Direct API |
| **[Midjourney v7](https://midjourney.com)** | 🔴 Discord only — no API | Best aesthetic but no programmatic access | $30/mo | Manual / Discord bot |

**Recommendation:** Use **fal.ai** for everything (Flux + Recraft) + **direct GPT Image 2** for fast iterations.

## 3. Voice / Text-to-Speech

| Tool | Status | What it does | Pricing | How I invoke |
|---|---|---|---|---|
| **[ElevenLabs v3](https://elevenlabs.io)** | 🟡 needs key | **PRIMARY** — gold standard, 70+ languages, voice cloning | $5-99/mo plans + API char rates | `curl https://api.elevenlabs.io/v1/text-to-speech/<voice_id>` |
| **[Cartesia Sonic](https://cartesia.ai)** | 🟡 needs key | 5x cheaper than ElevenLabs, streaming, 15 langs | $4-99/mo | Direct API |
| **[OpenAI TTS](https://platform.openai.com)** | ✅ OpenAI key | Good quality, simple integration | $15/M chars | Already accessible |
| **[Kokoro (local)](https://github.com/hexgrad/kokoro)** | ✅ via Hyperframes media skill | Free, runs locally, 54 voices | $0 | `npx hyperframes tts "..." --voice af_nova` |
| **[Hume EVI 2](https://hume.ai)** | 🟡 needs key | Best emotional expressiveness | Per-second pricing | Direct API |
| **[PlayHT](https://play.ht)** | 🟡 needs key | Voice cloning, dubbing | $39-99/mo | Direct API |

**Recommendation:** **ElevenLabs Creator ($22/mo)** for brand voice + Kokoro free for prototyping.

## 4. Music Generation

| Tool | Status | What it does | Pricing | How I invoke |
|---|---|---|---|---|
| **[Suno v5](https://suno.com)** | 🟡 needs API gateway | **BEST QUALITY** — full songs with vocals, Studio DAW, generative stems | $10/mo Pro + API via third-party gateway | Via [SunoAPI.org](https://sunoapi.org) or [PiAPI](https://piapi.ai) third-party gateways |
| **[ElevenLabs Music](https://elevenlabs.io/music)** | 🟡 same key as voice | Official API, royalty-free, $0.80/min | Bundled with EL plan | Same auth as voice |
| **[Udio](https://udio.com)** | 🔴 limited API | Strong alternative to Suno | $10/mo | Mostly manual |
| **[Mubert API](https://mubert.com/render)** | 🟡 needs key | **API-friendly royalty-free streams** by mood/genre | $14/mo Pro for API | `curl https://api-b2b.mubert.com/v2/...` |
| **[Epidemic Sound API](https://www.epidemicsound.com)** | 🟡 needs key | Licensed library, professional catalog | $19-49/mo | Direct API |

**Recommendation:** **Suno v5 Pro** for hero brand tracks + **Mubert API** for programmatic fillers.

## 5. Compositing / Video Editing APIs

| Tool | Status | What it does | Pricing | How I invoke |
|---|---|---|---|---|
| **[Creatomate](https://creatomate.com)** | 🟡 needs key | **PRIMARY** — JSON-to-video API, responsive templates, fastest path from script to MP4 | $41/mo (144 min) or $99/mo (723 min) | `curl https://api.creatomate.com/v1/renders` |
| **[Shotstack](https://shotstack.io)** | 🟡 alternative | Cloud video editing API, $0.40/min on pay-as-you-go | $0.40/rendered min | Direct API |
| **[Hyperframes](https://github.com/heygen-com/hyperframes)** | ✅ installed locally | HTML/CSS/GSAP → MP4, full control, free | $0 | `npm run render` in project |
| **[Remotion](https://remotion.dev)** | 🟡 source-available | React-based, requires license >$$$ for company use | Free for individuals | `npx remotion render` |
| **[Plainly](https://plainlyvideos.com)** | 🟡 alternative | After Effects template rendering as a service | Custom pricing | Direct API |

**Recommendation:** **Creatomate Growth ($99/mo)** for stock-heavy fast videos + **Hyperframes** (local, free) for branded motion graphics.

## 6. Stock Footage + Images

| Tool | Status | What it does | Pricing | How I invoke |
|---|---|---|---|---|
| **[Pexels API](https://www.pexels.com/api)** | 🆓 register only | Free stock photos + videos, well-curated | Free, 200/hr rate limit | `curl https://api.pexels.com/v1/search` |
| **[Pixabay API](https://pixabay.com/api/docs)** | 🆓 register only | Free stock photos + videos | Free, 100/min | `curl https://pixabay.com/api/videos` |
| **[Unsplash API](https://unsplash.com/developers)** | 🆓 register only | High-quality stock photos only | Free, 50/hr | Direct API |
| **[Storyblocks](https://www.storyblocks.com)** | 🟡 paid | Premium stock library | $30-149/mo | Manual download |
| **[Pinterest API v5](https://developers.pinterest.com)** | 🟡 needs OAuth | Scrape boards for moodboard refs | Free w/ app approval | OAuth flow + REST |

**Recommendation:** **All three free** (Pexels + Pixabay + Unsplash) + **Pinterest API** for moodboard ingestion.

## 7. Motion Graphics Frameworks (local, free)

| Tool | Status | What it does |
|---|---|---|
| **[Hyperframes](https://hyperframes.heygen.com)** | ✅ installed + 15 skills | HTML-native, GSAP-powered, our primary |
| **[GSAP](https://gsap.com)** | ✅ via Hyperframes | Tweening engine |
| **[Anime.js](https://animejs.com)** | ✅ via Hyperframes skill | Alternative tween library |
| **[Lottie](https://lottiefiles.com)** | ✅ via Hyperframes skill | After Effects → JSON animations |
| **[Three.js](https://threejs.org)** | ✅ via Hyperframes skill | 3D scenes, particles |
| **[Rive](https://rive.app)** | 🟡 needs account | Interactive vector animations | $0-99/mo | Editor + runtime |
| **[Theatre.js](https://theatrejs.com)** | 🔴 not installed | JS-based animation editor | Free | Self-host |

## 8. Lipsync / Talking Heads

| Tool | Status | What it does | Pricing |
|---|---|---|---|
| **[HeyGen API](https://www.heygen.com/api)** | 🟡 needs key | Best avatar quality, lip-synced to audio | $89-449/mo |
| **[Synthesia](https://www.synthesia.io)** | 🟡 alternative | Corporate training style | $30-90/mo |
| **[D-ID](https://www.d-id.com)** | 🟡 alternative | Real-time streaming avatar | $5-300/mo |
| **[Sync.so](https://sync.so)** | 🟡 alternative | Lipsync overlay on existing footage | Pay-as-you-go |

**Recommendation:** Skip for now. Add when Hassan needs presenter content.

## 9. Audio Processing (local)

| Tool | Status | What it does |
|---|---|---|
| **[FFmpeg](https://ffmpeg.org)** | ✅ installed 8.1 | Universal video/audio swiss army knife |
| **[Demucs](https://github.com/facebookresearch/demucs)** | 🔴 needs pip install | Stem separation (split vocals/drums/bass/other) |
| **[SoX](http://sox.sourceforge.net)** | 🔴 install if needed | Audio normalization, effects |
| **[Whisper (Groq)](https://groq.com)** | ✅ key in groq.json | Transcription, captions, lip-sync timing |

## 10. Speech-to-Text (for captions, lip-sync timing)

| Tool | Status | What it does |
|---|---|---|
| **[Groq Whisper Large v3](https://console.groq.com)** | ✅ key | Fast, accurate, cheap |
| **[OpenAI Whisper API](https://platform.openai.com)** | ✅ OpenAI key | Reference quality |
| **[AssemblyAI](https://www.assemblyai.com)** | ✅ key in assemblyai.json | Diarization, sentiment, chapters |
| **[Hyperframes transcribe](https://hyperframes.heygen.com)** | ✅ via skill | Wraps whisper.cpp locally |

## What's installed and working RIGHT NOW

- ✅ Hyperframes CLI + 15 skills (motion graphics, GSAP, etc.)
- ✅ Higgsfield CLI (already had)
- ✅ FFmpeg 8.1
- ✅ Node 24 + Bun 1.3
- ✅ Groq Whisper STT
- ✅ OpenAI key (for GPT-image-2, Sora 2 if you enable)
- ✅ Google Gemini key (for Veo 3.1 if you enable)
- ✅ AssemblyAI key

## What needs Hassan to sign up

See **[signup-checklist.md](./signup-checklist.md)** for the prioritized list with sign-up URLs.

## Monthly cost forecast

See **[monthly-cost-estimate.md](./monthly-cost-estimate.md)** for line-item budget.
