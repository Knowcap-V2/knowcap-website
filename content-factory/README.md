# Content Factory

Visual content production tooling for Knowcap marketing. Merged from two separate repos on 2026-06-02 as part of the marketing-repo consolidation.

## Layout

```
content-factory/
├── README.md                    ← this file
├── visual/                      ← static image / branded layouts (was Knowcap-V2/knowcap-content)
│   ├── brand/
│   │   ├── claude-design/       ← claude.design HTML exports
│   │   ├── higgsfield/          ← Higgsfield photoreal generation (Rogue Keith blueprint refs)
│   │   ├── knowcap-launch/      ← Hyperframes-based launch motion (compositions, brand assets)
│   │   └── remotion/            ← Remotion React compositions
│   ├── campaigns/               ← per-campaign output (empty — populate as campaigns ship)
│   ├── inbox-ideas/             ← raw idea capture for visual content
│   ├── learnings/               ← distilled knowledge from source videos
│   └── wiki-strategy/           ← strategy notes
│
└── video/                       ← video skills (was Knowcap-V2/knowcap-video-creator)
    ├── compositions/            ← per-reel HTML/Hyperframes compositions (no renders/)
    │   └── chromium-reel/
    ├── playbooks/               ← reusable playbooks: feature-launch-30sec, product-demo-60sec, social-reel-15sec
    ├── skills/                  ← reusable skills loaded by composition agents
    ├── scripts/                 ← utility scripts
    ├── stack/                   ← stack docs
    ├── assets/                  ← static assets used across compositions
    ├── phase-1.md               ← phase-1 plan
    ├── CLAUDE.md                ← Claude Code routing for this folder
    └── SOURCE-README.md         ← the original README from knowcap-video-creator
```

## What was NOT merged

Source-only merge per the 2026-06-02 strategy decision. Heavy outputs and vendored libraries stay in the archived original repos:

| Skipped | Size | Why | Where to find |
|---|---|---|---|
| `brand/hyperframes/` (vendored library) | 755 MB | Vendored third-party library, re-clonable from upstream | Archived: `Knowcap-V2/knowcap-content-archive` (pending) |
| `brand/knowcap-launch/renders/` | 34 MB | Output JPGs from render passes — regeneratable | Same archive |
| `knowcap-video-creator/knowcap-claude-reel/` | 3 MB | Output reels | Archived: `Knowcap-V2/knowcap-video-creator-archive` (pending) |
| `knowcap-video-creator/outputs/` | 98 MB | Generated videos | Same archive |
| `knowcap-video-creator/references/` | 39 MB | Reference videos for AI training — large, regeneratable | Same archive |
| `knowcap-video-creator/compositions/*/renders/` | varies | Per-composition output MP4s | Same archive |
| `agentdb.rvf` + `.lock` | — | Ruflo agent state (regenerable) | Skipped (state, not source) |

If you need any of these:
1. Re-clone the archived repo: `gh repo clone Knowcap-V2/knowcap-content-archive` (or `-video-creator-archive`)
2. Pull what you need into the relevant `content-factory/` subfolder
3. Add to `.gitignore` if it should not be re-committed (most outputs should stay out)

## Regenerating Hyperframes (the big one)

The hyperframes library was vendored at 755 MB (with its own `.git` history of binary commits). It's an open-source library. Re-installation:

```bash
# From content-factory/visual/brand/
git clone <hyperframes-upstream-url> hyperframes
cd hyperframes
bun install        # or npm install
```

The Hyperframes-based compositions in `knowcap-launch/compositions/` reference the library via relative paths or a registered location — check `knowcap-launch/package.json` and `knowcap-launch/hyperframes.json` for the resolution.

## Why this lives here

Both repos generate visual content for Knowcap marketing. Their outputs are blog hero images, landing page videos, social reels, launch animations. The blog routine (`routines/blogger/`) will eventually embed video clips and stills from these.

Keeping them next to the docs/ they illustrate and the routines/ that may invoke them is the right shape.

## Distinct from screenshots

`docs/brand/screenshots/` = **product UI captures** (the actual Knowcap app), used by blog routines to show "this is what the inbox looks like."

`content-factory/` = **visual production tooling** for generated content (Higgsfield photoreal, Hyperframes motion, Remotion videos, reel compositions).

Don't conflate: a Higgsfield-generated photoreal scene goes in `content-factory/visual/brand/higgsfield/outputs/`; a screen-capture of the Knowcap inbox goes in `docs/brand/screenshots/verification-inbox/`.

## Maintenance

- New compositions land in `content-factory/{visual,video}/compositions/`
- Renders/outputs are gitignored (`.gitignore` in this folder)
- When a composition becomes blog-ready, the routine that uses it references the source path
- Quarterly: audit for stale folders, prune

## Provenance

| File / folder | Originated in | Original repo (now archived) |
|---|---|---|
| `visual/` and below | `Knowcap-V2/knowcap-content` | → `knowcap-content-archive` |
| `video/` and below | `Knowcap-V2/knowcap-video-creator` | → `knowcap-video-creator-archive` |

Original git history is preserved in the archived repos.
