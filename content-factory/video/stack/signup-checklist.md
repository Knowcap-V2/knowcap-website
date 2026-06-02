---
title: Signup Checklist
status: Phase 1 locked (lean stack)
updated: 2026-05-22
---

# Signup Checklist

What to sign up for, **starting with Phase 1 only**. Phase 2+ optional adds are at the bottom.

## PHASE 1 — The only 2 signups you need right now

Total cost: **$25/mo flat + ~$0.13/reel marginal**.

### 1. Auphonic — gold-standard audio cleanup ⭐

- **Sign up:** [auphonic.com/pricing](https://auphonic.com/pricing) → **Pro plan $11/mo** (9 production hours/mo included)
- **Why:** Industry standard for speech cleanup. Used by professional podcasters. Adaptive leveler + intelligent noise reduction + loudness normalization to -14 LUFS (Instagram/TikTok standard).
- **After signup, do ONE-time setup in Auphonic UI:**
  1. Create a preset called "Knowcap Reel"
  2. Enable: Adaptive Leveler, Noise & Hum Reduction, Filtering, Loudness Normalization
  3. Loudness target: **-14 LUFS** (NOT -16 — that's podcast standard, we want social-media standard)
  4. Output format: MP3 192kbps stereo
  5. Copy the preset UUID from the URL
- **Save key as:** `~/.claude/secrets/auphonic.json`
  ```json
  {
    "username": "hsa@smetools.io",
    "password": "<your-auphonic-password>",
    "preset_uuid": "<the-preset-uuid-from-step-5>"
  }
  ```
- **Alternative:** [Adobe Podcast Enhance](https://podcast.adobe.com) at $10/mo — slightly cheaper, similar quality. Tell me if you prefer this and I'll swap the skill.

### 2. Mubert — royalty-free music beds

- **Sign up:** [mubert.com/render](https://mubert.com/render) → **Creator $14/mo** (API access included)
- **Why:** Generates royalty-free instrumental tracks by mood/tags. Programmatic — no manual licensing per track. Perfect for music beds under voice.
- **Save key as:** `~/.claude/secrets/mubert.json`
  ```json
  {
    "api_key": "<mubert-api-token>"
  }
  ```

**PHASE 1 TOTAL: $25/mo.** That's it. Drop the keys in, tell me, and I smoke-test both.

---

## What I already have (no signup needed for Phase 1)

| Tool | Status | What it does |
|---|---|---|
| Knowcap MCP | ✅ wired | Pull source recordings + transcripts |
| Groq Whisper Large v3 | ✅ key in `groq.json` | Word-level transcription (FREE) |
| Hyperframes + 15 skills | ✅ installed | Motion graphics + 5 registry blocks |
| FFmpeg 8.1 | ✅ installed | Audio extract + final mux |
| OpenAI key | ✅ in `openai.json` | (For Phase 2 if needed) |
| Google Gemini key | ✅ in `google_gemini.json` | (For Phase 2 if needed) |
| Higgsfield CLI | ✅ installed | (For Phase 2 if needed) |
| AssemblyAI | ✅ key in `assemblyai.json` | (For diarization in Phase 2) |

---

## PHASE 2+ — When/if you need them later

These are NOT needed for the Knowcap-audio-to-reel workflow. Sign up only when scope expands.

### Phase 2: AI-generated cutaways (cinematic shots between audio moments)

- **fal.ai** ([fal.ai/dashboard](https://fal.ai/dashboard)) — pay-as-you-go for Sora 2 / Veo 3.1 / Kling 3.0 / Flux. ~$80/mo at moderate use.
- **When to add:** When pure motion-graphic reels stop feeling fresh and you want photoreal B-roll between captions.

### Phase 3: Synthetic voiceover for non-Knowcap content

- **ElevenLabs Creator $22/mo** ([elevenlabs.io/pricing](https://elevenlabs.io/pricing))
- **When to add:** When you want to make reels that DON'T use Knowcap audio (e.g., scripted promo, marketing announcement) and need a synthetic voice.

### Phase 4: Hero music tracks (vocals, branded songs)

- **Suno Pro $10/mo + PiAPI gateway** ([suno.com](https://suno.com), [piapi.ai](https://piapi.ai))
- **When to add:** When Mubert instrumentals aren't enough and you want a branded song with vocals for a launch.

### Phase 5: Stock-heavy long-form content

- **Creatomate Growth $99/mo** ([creatomate.com](https://creatomate.com))
- **When to add:** When you need 2-3 minute videos with lots of stock footage and voiceover — outside the Hyperframes sweet spot.

### Phase 6: Talking-head explainer videos

- **HeyGen Creator $89/mo** ([heygen.com/api](https://www.heygen.com/api))
- **When to add:** When you want a synthetic presenter (not Hassan on camera, not Knowcap audio).

### Phase 7: Automated publishing

- **Buffer Essentials $15/mo** ([buffer.com](https://buffer.com)) OR **Postiz Pro $19/mo** ([postiz.com](https://postiz.com))
- **When to add:** When you're producing 20+ reels/month and manual posting becomes the bottleneck.

### Free APIs (register only — anytime)

- **Pexels API** ([pexels.com/api](https://www.pexels.com/api/)) — free stock photos + video. Worth registering even for Phase 1.
- **Pixabay API** ([pixabay.com/api/docs](https://pixabay.com/api/docs/)) — same.
- **Pinterest API v5** ([developers.pinterest.com](https://developers.pinterest.com)) — moodboard scraping; 1-3 day OAuth approval.

---

## How keys get smoke-tested

After you drop a key into `~/.claude/secrets/<service>.json`, tell me. I'll:

1. Read the file
2. Make a minimal API call to verify auth works
3. Report GREEN (working) or RED (problem with the key, error message)
4. If RED, walk you through fixing it

No surprises mid-pipeline.
