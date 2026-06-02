---
title: 15-second Social Reel Playbook
duration: 12-15 sec
budget: $0-2
use_when: TikTok, Instagram Reels, YouTube Shorts, Twitter videos under 15s
---

# 15-Second Social Reel Playbook

The high-throughput format. Built for daily content, viral hooks, quick takes.

## Anatomy (the 3-beat structure)

| # | Time | Scene | Purpose |
|---|---|---|---|
| 1 | 0-3s | **HOOK** | Single sentence that stops the scroll |
| 2 | 3-12s | **PAYOFF** | One concrete proof/visual/insight |
| 3 | 12-15s | **CTA + handle** | Logo + link + follow prompt |

## Aspect ratio

**Always 9:16 (1080×1920)** — TikTok/Reels/Shorts native. Configure Hyperframes with these dimensions.

## Production sequence

### 1. Get the hook from Hassan (free)
One sentence. Examples:
- "What if your meeting notes wrote themselves?"
- "Every Knowcap meeting becomes 5 action items. Automatically."
- "Stop re-explaining decisions. We caught it on tape."

### 2. Compose in Hyperframes (free, ~10 min)

Templates I cycle through (avoid repetition across daily posts):

| Style | When to use |
|---|---|
| **Bold purple-on-white kinetic type** | High-attention hook |
| **Dark mode + brand-blue glow** | Tech credibility |
| **Black + white minimal** | Editorial weight |
| **Animated product mock zooming in** | Show, don't tell |

### 3. Music

For social reels, the **music IS the content**. Don't generate per-reel. Maintain a 30-track library in `assets/music/social/` of pre-cleared royalty-free tracks at common BPMs (90, 100, 120, 140) and let me pick.

If a reel needs a specific Suno track, generate ONE that gets reused for that campaign's 7-day burst.

### 4. Voiceover

Usually NO voiceover on a 15-sec reel — captions do the work. If needed (rare), use Kokoro local (free) for speed.

### 5. Captions are mandatory

For TikTok/Reels muted-by-default viewing, every reel must have captions. Use Hyperframes' `caption-kinetic-slam` component — pulls word-by-word timing from a Whisper transcript.

### 6. Render

```bash
# Change composition dimensions in hyperframes init or edit index.html
data-width="1080" data-height="1920"
```

Render time: ~15 sec for a 15-sec reel.

### 7. Deliver

Output to `outputs/social/<date>-<slug>-9x16.mp4`.

## Cost

| Item | Cost |
|---|---|
| Music from library | $0 |
| Hyperframes render | $0 |
| Voice if used (Kokoro local) | $0 |
| 1 fal.ai still if hero shot needed | $0.06 |
| **Total per reel** | **~$0-2** |

## Throughput

**50 reels/month is realistic on this stack.** Daily posting cadence is feasible.

## Anti-patterns

- ❌ Don't use the slow cinematic zoom from product-demo playbook — wrong rhythm for 15s
- ❌ Don't use long fades — every cut should be a snap (white-wipe 0.15s instead of 0.3s)
- ❌ Don't use whole-phrase reveals — per-word ALWAYS on social
- ❌ Don't generate new music for every reel — pull from library
- ❌ Don't use the K-mark + nowcap.ai lockup at start — wait until end. The hook IS the first frame.
