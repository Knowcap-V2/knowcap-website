---
name: knowcap-reel
description: End-to-end pipeline that pulls a moment from a Knowcap meeting, cleans the audio with Auphonic (gold standard), syncs kinetic captions, mixes with a Mubert music bed, and produces a branded vertical reel MP4 ready to post. Use when Hassan says "/knowcap-reel", "make a reel from this meeting", or names a source UUID with a topic.
---

# /knowcap-reel — The Phase 1 Workflow (LEAN)

End-to-end: Knowcap meeting → Auphonic-cleaned audio → motion-graphic reel with synced captions + music bed → publish-ready MP4.

## When to invoke

Hassan says any of:
- `/knowcap-reel <source-id> "<topic or quote>"`
- "Make a reel from [meeting name]"
- "Clip that part where [person] said [thing] and make it a reel"
- "Pull [topic] from yesterday's meeting and turn it into a vertical"

## Inputs needed

Before starting, confirm in ONE batch (never ask one-at-a-time; never leave gaps):

1. **Source identifier:** Knowcap source UUID, or a meeting name + date I can search for
2. **Topic / quote:** What moment to extract — exact quote OR topic keyword
3. **Aspect ratio:** 9:16 vertical (default), 1:1 square, or 16:9 horizontal
4. **Duration:** 15s (default), 20s, 30s — caps the speech window at ~11/16/26 seconds respectively
5. **Tone/mood for music:** professional / casual / cinematic / urgent / contemplative
6. **Opening hook copy:** default `CAPTURED IN KNOWCAP`, or override with a Hassan-supplied teaser

## The pipeline (lean stack)

```
[Step 1] Search Knowcap for the moment
   ↓
[Step 2] Download source + extract clip (FFmpeg)
   ↓
[Step 3] Clean audio (Auphonic — gold standard)
   ↓
[Step 4] Whisper transcribe via Groq → word-level timestamps (FREE)
   ↓
[Step 5] Generate music bed (Mubert) or pick from library
   ↓
[Step 6] Build Hyperframes vertical composition from template
   ↓
[Step 7] Render to MP4
   ↓
[Step 8] FFmpeg final mix (voice + music)
   ↓
[Step 9] Drop in outputs/ + report (publishing deferred)
```

## Step-by-step

### Step 1: Search for the moment

If Hassan gave a source UUID:
```
mcp__knowcap__get_source sourceId=<uuid>
mcp__knowcap__get_source_transcriptions sourceId=<uuid> format=json
```

If Hassan gave a topic keyword:
```
mcp__knowcap__search_project projectId=<knowcap-project-id> q="<topic>" kinds=[transcript]
```

Pick the highest-relevance hit. If 3+ candidates are close, surface top 3 with permalinks + 1-line context and ask Hassan to pick.

Once locked in, capture:
- `source_id` (UUID)
- `start_seconds` (e.g., 187.4 — clip starts here in the source)
- `end_seconds` (e.g., 198.2 — clip ends here)
- `speaker_id` → resolve to confirmed name via `mcp__knowcap__list_speakers`

Clip length must be ≤ (target_duration - 4) seconds to leave room for hook + outro.

### Step 2: Download + extract clip

```bash
SOURCE_URL=$(mcp__knowcap__get_source sourceId=$SRC_ID | jq -r '.file_url')

# Cache source download by UUID — repeated reels from same source skip download
CACHE_MP4=~/Github/knowcap/knowcap-video-creator/.cache/sources/${SRC_ID}.mp4
[ -f "$CACHE_MP4" ] || curl -sL "$SOURCE_URL" -o "$CACHE_MP4"

# Extract just the clip
mkdir -p ~/Github/knowcap/knowcap-video-creator/.cache/clips
ffmpeg -y -i "$CACHE_MP4" \
  -ss "$START_SECONDS" -to "$END_SECONDS" \
  -vn -acodec mp3 -ar 44100 -ab 192k \
  ~/Github/knowcap/knowcap-video-creator/.cache/clips/${REEL_SLUG}-raw.mp3
```

### Step 3: Audio cleanup (Auphonic — gold standard)

```bash
AUPHONIC_USER=$(jq -r .username < ~/.claude/secrets/auphonic.json)
AUPHONIC_PASS=$(jq -r .password < ~/.claude/secrets/auphonic.json)
AUPHONIC_PRESET=$(jq -r .preset_uuid < ~/.claude/secrets/auphonic.json)

# Submit production
JOB_RESPONSE=$(curl -s -X POST "https://auphonic.com/api/simple/productions.json" \
  -u "$AUPHONIC_USER:$AUPHONIC_PASS" \
  -F "preset=$AUPHONIC_PRESET" \
  -F "input_file=@.cache/clips/${REEL_SLUG}-raw.mp3" \
  -F "action=start")

JOB_UUID=$(echo "$JOB_RESPONSE" | jq -r '.data.uuid')

# Poll until status = "Done" (max 90 seconds for a 15-sec clip)
for i in $(seq 1 45); do
  STATUS=$(curl -s "https://auphonic.com/api/production/$JOB_UUID.json" \
    -u "$AUPHONIC_USER:$AUPHONIC_PASS" | jq -r '.data.status_string')
  [ "$STATUS" = "Done" ] && break
  [ "$STATUS" = "Error" ] && { echo "Auphonic failed"; exit 1; }
  sleep 2
done

# Download the cleaned MP3
OUTPUT_URL=$(curl -s "https://auphonic.com/api/production/$JOB_UUID.json" \
  -u "$AUPHONIC_USER:$AUPHONIC_PASS" | jq -r '.data.output_files[0].download_url')

curl -sL "$OUTPUT_URL" -u "$AUPHONIC_USER:$AUPHONIC_PASS" \
  -o .cache/clips/${REEL_SLUG}-clean.mp3
```

**If `~/.claude/secrets/auphonic.json` doesn't exist** (Hassan hasn't signed up yet), fall back to FFmpeg afftdn:

```bash
ffmpeg -y -i .cache/clips/${REEL_SLUG}-raw.mp3 \
  -af "afftdn=nf=-25, highpass=f=80, loudnorm=I=-14:LRA=11:TP=-1.5" \
  .cache/clips/${REEL_SLUG}-clean.mp3
```

Note in the delivery report that we used the fallback so Hassan knows to expect Auphonic upgrade later.

### Step 4: Word-level transcription (Groq Whisper, free)

```bash
cd ~/Github/knowcap/knowcap-video-creator/compositions/<reel-slug>
npx hyperframes transcribe \
  ../../.cache/clips/${REEL_SLUG}-clean.mp3 \
  --output transcript.json \
  --model small
```

Output JSON shape:
```json
{
  "words": [
    { "word": "the", "start": 0.12, "end": 0.21 },
    { "word": "bottleneck", "start": 0.21, "end": 0.85 },
    ...
  ]
}
```

The composition reads this at render time and fires each word's entrance animation at `(word.start + 2.0)` — the 2.0s offset accounts for the opening hook scene.

### Step 5: Music bed (Mubert)

```bash
MUBERT_KEY=$(jq -r .api_key < ~/.claude/secrets/mubert.json)

# Map tone to Mubert tags
case "$TONE" in
  professional) TAGS='["technology","ambient","minimal","piano"]' ;;
  casual)       TAGS='["lo-fi","chill","beats"]' ;;
  cinematic)    TAGS='["cinematic","epic","strings","piano"]' ;;
  urgent)       TAGS='["electronic","driving","percussion"]' ;;
  contemplative) TAGS='["ambient","piano","atmospheric"]' ;;
esac

# Request track
TASK_RESPONSE=$(curl -s -X POST "https://api-b2b.mubert.com/v2/RecordTrackForTags" \
  -H "Content-Type: application/json" \
  -d "{\"method\":\"RecordTrackForTags\",\"params\":{\"pat\":\"$MUBERT_KEY\",\"tags\":$TAGS,\"duration\":$DURATION,\"format\":\"mp3\",\"bitrate\":256}}")

TRACK_URL=$(echo "$TASK_RESPONSE" | jq -r '.data.tasks[0].url')

# Poll until track is ready
while [ "$TRACK_URL" = "null" ] || [ -z "$TRACK_URL" ]; do
  sleep 2
  # Re-fetch or use webhook
done

curl -sL "$TRACK_URL" -o compositions/<reel-slug>/music.mp3
```

**Library fallback** (if Mubert key missing): pick from pre-curated `assets/music/<tone>-<bpm>.mp3` library.

### Step 6: Build Hyperframes composition

Initialize a new project:

```bash
cd ~/Github/knowcap/knowcap-video-creator/compositions
npx hyperframes init "$REEL_SLUG" --tailwind --yes
cd "$REEL_SLUG"

# Copy assets
cp ../../assets/brand/k-mark-light.png .
cp ../../.cache/clips/${REEL_SLUG}-clean.mp3 voice.mp3
# music.mp3 already in place from Step 5
# transcript.json already in place from Step 4
```

Write `index.html` from the template at `~/Github/knowcap/knowcap-video-creator/skills/knowcap-reel/template-9x16.html` (next file to create after this one).

Key template features:
- 1080×1920 (vertical)
- Reads `transcript.json` and dynamically generates per-word `<span>` elements
- Two `<audio>` tags: `voice.mp3` with `data-start="2"` + `music.mp3` with `data-start="0"`
- Hyperframes auto-mixes audio when `<audio>` elements are properly tagged
- Three scenes: hook (0-2s) → captions (2-13s, or 2-26s depending on duration) → outro (last 2s)
- White-wipe transitions between scenes (per Hyperframes scene-transitions rules)

### Step 7: Render

```bash
cd compositions/${REEL_SLUG}
npm run check    # MUST pass — fix overflow warnings before rendering
npm run render
```

Output: `compositions/${REEL_SLUG}/renders/<timestamp>.mp4`.

### Step 8: Final audio mix verification

Hyperframes' audio handling usually nails the levels, but verify:

```bash
ffprobe -v error -show_streams renders/latest.mp4 2>&1 | grep -E "codec_name|sample_rate|channels"
```

If levels need adjusting (voice too quiet under music), re-mix:

```bash
ffmpeg -y -i renders/latest.mp4 -i voice.mp3 -i music.mp3 \
  -filter_complex "
    [1:a]volume=1.0,adelay=2000|2000,highpass=f=80[voice];
    [2:a]volume=0.16[bed];
    [voice][bed]amix=inputs=2:duration=longest:dropout_transition=3,loudnorm=I=-14:LRA=11:TP=-1[out]
  " \
  -map 0:v -map "[out]" -c:v copy -c:a aac -b:a 192k \
  ../../outputs/${REEL_SLUG}-9x16.mp4
```

### Step 9: Deliver report

Write to Hassan:

```
✅ Reel: <slug>
   file:///C:/Users/Eng.Hassan/Github/knowcap/knowcap-video-creator/outputs/<slug>-9x16.mp4
   1080×1920 · 15s · 8.2 MB

Source: <Knowcap meeting name> at [<start>—<end>]
Speaker: <Confirmed name + role>
Quote: "<the actual line>"

Costs:
   Knowcap MCP         $0.00
   Auphonic cleanup    $0.13  (0.18 min × $0.13/min) [OR: FFmpeg fallback $0.00]
   Whisper Groq        $0.00
   Mubert music        $0.00  (included in Creator plan)
   Hyperframes render  $0.00
   ─────────────────
   Total               $0.13

Render time: 1m 12s

Suggested caption:
   <draft 1-line + 2-3 hashtags matching topic>

Frames (3 stills): [t=2s] [t=8s] [t=14s] attached for review.
```

Open the MP4 via `start` so Hassan sees it immediately.

**Do NOT publish.** Hassan posts manually for Phase 1.

## Brand rules (always apply)

- Format: **1080×1920 vertical** (TikTok/Reels/Shorts native)
- Brand accent: **Purple #7C3AED** (matches landing page)
- Font: **Inter 700/800** for kinetic captions, **JetBrains Mono** for lower-thirds
- K-mark: light variant on white, dark variant on dark (mix-blend-mode multiply on white BG)
- Per-word reveals with 4 entrance modes cycling (top-drop / slide-left / slide-right / scale-pop) — pattern from `caption-kinetic-slam` registry component
- White-wipe transitions (0.2s) between scenes — pattern from `kinetic-type` example
- Speaker lower-third in JetBrains Mono, white text on subtle black bar at bottom, slides in 0.3s and holds for 3s
- NO emojis, NO AI-flavored copy ("revolutionary", "in today's fast-paced", etc.)

## Cache policy (stays cheap)

| Cache key | Cache lifetime |
|---|---|
| `.cache/sources/<src-id>.mp4` | 30 days (re-download if stale) |
| `.cache/clips/<reel-slug>-raw.mp3` | permanent (deterministic from src+timestamps) |
| `.cache/clips/<reel-slug>-clean.mp3` | permanent (deterministic from raw clip) |
| `.cache/clips/<reel-slug>-transcript.json` | permanent |
| `assets/music/<library-track>.mp3` | permanent |

Re-rendering same reel with different caption styling or music = $0 (all cached).

Re-rendering with different copy/cut = costs only the Auphonic call ($0.13) if the source clip range changed.

## Pitfalls (don't repeat these)

1. **Clip too long for target duration.** A 15s reel has ~11s of speech window. If the moment is 12s+, either truncate or upgrade to 20s/30s reel.
2. **Speaker label not confirmed.** Don't use raw `SPEAKER_00` labels — always resolve via `mcp__knowcap__list_speakers` first.
3. **Public posting consent.** If the meeting is with a client/external party, confirm with Hassan it's OK to post publicly BEFORE rendering. Default to "draft for review only" if unsure.
4. **Mubert tag mismatch.** If the music feels wrong, regenerate with different tags — it's free within the Mubert plan.
5. **Auphonic preset.** Make sure the preset Hassan created in Auphonic UI targets -14 LUFS (not -16) — that's the Instagram/TikTok standard.

## When Auphonic / Mubert keys aren't there yet

The skill auto-detects missing keys and downgrades gracefully:

```bash
# At runtime
[ -f ~/.claude/secrets/auphonic.json ] || USE_FFMPEG_FALLBACK=1
[ -f ~/.claude/secrets/mubert.json ] || USE_MUSIC_LIBRARY=1
```

The reel still gets made, just at 80% quality. The delivery report flags which paths were used.

## See also

- `phase-1.md` (one folder up) — Phase 1 plan + cost
- `playbooks/social-reel-15sec.md` — the underlying format pattern
- `stack/INVENTORY.md` — all tools available (most deferred to Phase 2)
- `template-9x16.html` (next file in this folder) — the actual Hyperframes template
- `compositions/launch-v3-may2026/index.html` — example structure (different format but shows kinetic patterns)
