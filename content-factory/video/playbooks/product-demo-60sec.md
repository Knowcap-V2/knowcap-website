---
title: 60-second Product Demo Playbook
matches_reference: https://www.youtube.com/watch?v=j-SzV4i9Fbg (the Knowcap demo video Hassan keeps comparing against)
duration: 56-60 sec
budget: $15-25
---

# 60-Second Product Demo Playbook

The recipe for matching the reference video's professional quality. Use this for any Knowcap launch, feature reveal, or platform showcase.

## Anatomy (the 11-scene structure)

| # | Time | Scene | Purpose |
|---|---|---|---|
| 1 | 0-4s | **Hook with asset icon + first capability** | "Turn Screen Recordings" with camera icon — what we ingest |
| 2 | 4-7s | **Second asset type** | "and Documents" with PDF icon |
| 3 | 7-10s | **DARK SCENE transition** | "Into your project memory" — the value proposition |
| 4 | 10-15s | **Action verb hero text** | "just Drag and Drop" — how easy it is |
| 5 | 15-20s | **Product UI #1 (interface)** | Chat input with file attachments — proves it works |
| 6 | 20-26s | **Product UI #2 (output structure)** | "Odoo Project Team Evaluation" card — what you GET |
| 7 | 26-33s | **Product UI #3 (the magic)** | "Performance Analysis & Evidence" with risks + timestamps — the differentiator |
| 8 | 33-37s | **Source attribution** | Mock video player at 00:45 — shows verifiability |
| 9 | 37-42s | **Benefit headline #1** | "Complex Docs from Meetings in Minutes not Weeks" |
| 10 | 42-47s | **Benefit headline #2** | "On Board New Team Members in Minutes" |
| 11 | 47-56s | **Lockup + CTA + QR** | Logo, tagline, beta program CTA, scannable QR |

## Production sequence (what I do, in order)

### Step 1 — Confirm script with Hassan (5 min, free)

Adapt these placeholders to the campaign:

```
Scene 1: "Turn [INPUT TYPE 1]" — e.g. Screen Recordings, Meetings, Calls
Scene 2: "and [INPUT TYPE 2]" — e.g. Documents, Emails, Slack
Scene 3 (DARK): "Into your [VALUE]" — e.g. project memory, audit trail
Scene 4: "just [VERB] and [VERB]" — e.g. Drag and Drop, Talk and Watch
Scenes 5-7: 3 product UI moments (the actual screens/outputs)
Scene 8: timestamp-backed evidence (video player + timecode link)
Scene 9: "[Complex Thing] in [Time Unit] not [Worse Time Unit]"
Scene 10: "[Action] [Audience] in [Time]"
Scene 11: K-mark + "nowcap.ai" + "Capture. Govern. Deliver." + Beta CTA + QR
```

Always confirm the script verbatim with Hassan before generating expensive assets.

### Step 2 — Generate music FIRST (~$0.30, 2-5 min)

**Tool: Suno v5 via PiAPI** (or Mubert API for instrumental fallback)

```bash
# Prompt: "uplifting tech-product anthem, 60 seconds, building from gentle to confident,
#          inspired by Apple keynote intros, BPM 92, key C major, no vocals, minimal melody"
```

Save to `assets/music/<project>-track.mp3`. **Generate FIRST** because the entire video pacing locks to the beat.

### Step 3 — Whisper-transcribe the music to find beats (~30 sec, free)

```bash
npx hyperframes transcribe assets/music/<project>-track.mp3 --output beats.json
# Or use Groq Whisper for instrumental beat-detection — better with onset analysis
```

Use the timestamp data to align each scene transition to a downbeat.

### Step 4 — Generate voiceover (~$0.40, 3 min)

**Tool: ElevenLabs v3 API**

For each text scene that needs narration:
```bash
curl https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID \
  -H "xi-api-key: $ELEVENLABS_KEY" \
  -d '{"text":"...","model_id":"eleven_v3","voice_settings":{"stability":0.5,"similarity_boost":0.75}}'
```

For a demo without narration (just music + on-screen text — matches the reference), skip this step.

### Step 5 — Generate visual assets in parallel

**Scenes 1-2 icons:** Already in `assets/brand/` (camera icon, PDF icon). Pre-existing CSS components in Hyperframes.

**Scenes 5-7 product UI:** Two paths —
- (a) **Mock in HTML/CSS** inside Hyperframes composition — what we did for the May 22 launch. Free, exact-brand. Best for now.
- (b) **Real screenshots** via /connect-chrome against hassan.knowcap.ai — adds ~15 min, more authentic.

**Scene 8 video player:** Mock UI in CSS — instant, free.

**Optional cinematic cutaways:** If we want a Sora 2 shot of "person watching a meeting transform into action items" (~5 sec):
```bash
# Via fal.ai
curl https://fal.run/fal-ai/sora-2/text-to-video \
  -H "Authorization: Key $FAL_KEY" \
  -d '{"prompt":"Cinematic shot of a person at a desk, laptop showing a Zoom meeting, the meeting transforms into floating action item cards, soft warm office lighting, shallow depth of field","duration":5,"aspect_ratio":"16:9"}'
# Cost: ~$3.75
```

Cache the result in `.cache/sora2/<hash>.mp4` keyed by prompt hash.

### Step 6 — Compose in Hyperframes

Use the existing pattern at `compositions/launch-v3-may2026/` as the template. Key rules:

1. **Per-word kinetic reveals** — use the `caption-kinetic-slam` pattern (4 entrance modes cycling)
2. **White-wipe transitions** between scenes (~0.5s) — pattern from `kinetic-type` example
3. **Vary eases** per scene — `back.out(1.7)`, `expo.out`, `back.out(2.2)`, `power3.out`
4. **No exit animations** mid-timeline (transitions handle exits)
5. **Grain overlay** for paper texture
6. **Cinematic-zoom block** on product UI scenes (slow Ken Burns)
7. **Music** embedded via `<audio>` element with `data-start="0"` and the same duration as root composition

### Step 7 — Lint, render, verify

```bash
cd compositions/<project>
npm run check    # 0 errors, address overflow warnings
npm run render   # ~90 sec for 60s composition
```

Grab frames at 1s, 5s, 12s, 17s, 25s, 30s, 40s, 45s, 52s. Compare to the reference video's frames at the same timestamps.

### Step 8 — Post-process via FFmpeg if needed

- Mix music + voiceover at the right levels (music -18dB, VO -6dB)
- Add subtle audio fades at the start and end
- Color correct if needed (raise saturation 5-10% for richer purples)

```bash
ffmpeg -i hyperframes-render.mp4 -i music.mp3 -i voiceover.mp3 \
  -filter_complex "[1:a]volume=0.5[a1];[2:a]volume=1.0[a2];[a1][a2]amix=inputs=2[a]" \
  -map 0:v -map "[a]" -c:v copy outputs/<project>-final.mp4
```

### Step 9 — Deliver report

Write to chat:
- Final file path with `file:///` link
- Total cost (summed from each API call)
- Total render time
- Side-by-side comparison frames vs reference

## Common pitfalls (from the May 22 build)

1. **Whole-phrase reveals look amateur.** Always per-word with varied entrance modes.
2. **Exit animations before transitions empty the scene.** Use white-wipe transitions instead.
3. **Same ease everywhere = robotic.** Mandatory: 3+ different eases per scene.
4. **Product card too small on a 1080p canvas.** Either make cards 1560px+ wide OR scale into them with cinematic zoom.
5. **Wide hero text gets cut off.** Split to 2 lines instead of shrinking font.
6. **PNG K-mark has a gray frame on white BG.** Apply `mix-blend-mode: multiply` to the img.

## Reference example

The Knowcap demo video at https://www.youtube.com/watch?v=j-SzV4i9Fbg is the quality bar. Frame-by-frame breakdown of what they do at each timestamp is in `../../knowcap-content/learnings/` (transcripts cached, frame extractions in `~/.claude/cache/watch/j-SzV4i9Fbg-*.jpg`).

## Variations of this playbook

- **For a Product Hunt launch** — extend the QR code scene to include "#1 product of the day if you upvote" CTA
- **For a sales demo** — replace scenes 9-10 with case study stats ("3 hours of meetings → 1 page of action items")
- **For investor pitch teaser** — keep structure but use slower pacing (90 sec instead of 56)
