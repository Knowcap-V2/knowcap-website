# Initial capture plan — screenshot library v0

Target: ~25 surfaces covering the load-bearing visuals for the 4 ICPs and the verification thesis.

## Capture priority (tiered)

### Tier 1 — used in nearly every blog (capture first)

| Slug | Surface | Why |
|---|---|---|
| `verification-inbox-pending` | Inbox with extracted-but-unconfirmed claims (8-12) | The "extraction is automatic, action is not" thesis |
| `claim-confirmation-step` | One claim being confirmed (confirm/reject UI visible) | The named-human gate |
| `source-page-verified` | Source page with verified tags, speaker attribution, timestamps | The audit-trail/provenance proof |
| `memory-categories` | Memory list filtered by category (decisions/risks/tasks/facts) | The 4-category extraction model |
| `no-confirm-all-rule` | The settings/UX area where "Confirm All" would be — and isn't | The locked design rule |

### Tier 2 — used in 50%+ of blogs

| Slug | Surface | Why |
|---|---|---|
| `routine-list` | Routine library view | "Routines act on confirmed facts" |
| `routine-edit` | Single routine config | Routine→Skill→Run model in product |
| `skill-library` | Skills page | The WHAT layer |
| `memory-search-by-speaker` | Memory search filtered by named human | Provenance lookup |
| `agent-action-pr` | An agent's PR to GitHub or ticket to Odoo (the "draft to inbox" pattern) | Action with audit |
| `org-instructions-page` | Organization-level instructions UI | Multi-tier instructions hierarchy |
| `connection-list` | Integrations / connections page | Where Odoo, GitHub, etc. live |

### Tier 3 — persona-specific

| Slug | Surface | Persona |
|---|---|---|
| `odoo-multi-instance-connection` | Odoo connection setup, multi-instance | Odoo partners |
| `odoo-routine-push` | A routine pushing a confirmed task to Odoo | Odoo partners |
| `audit-trail-export` | Audit trail download UI (for compliance) | MENA audit firms |
| `pdpl-compliance-section` | Settings page showing data retention/regional storage controls | MENA audit firms (PDPL Art 36) |
| `multilingual-mid-meeting` | Source page showing language-switched segments (English↔Arabic mid-call) | MENA agencies |
| `shared-meeting-cross-org` | Shared-meeting flow showing first-confirmer-wins | Agencies + multi-org founders |
| `project-instructions-page` | Project-level instructions UI | Multi-tenant founders |

### Tier 4 — supplementary

| Slug | Surface | Why |
|---|---|---|
| `live-recording-screen` | The recording-in-progress UI | Onboarding visual |
| `upload-source-screen` | Drag-drop file upload (for blogs about retroactive ingestion) | Onboarding visual |
| `home-dashboard-light` | Default home view, light theme | Hero visual |
| `home-dashboard-dark` | Same in dark theme | Hero visual variant |
| `chat-with-citations` | A chat answer with timestamp citations clickable | "Search vs. cite" demo |

## Capture method

1. Use real Chromium via `connect-chrome` (gstack browser) on port 34567 or fresh port
2. Sign Hassan in once at start of session
3. Set viewport to 1600x900 via DevTools device toolbar
4. For each Tier 1+2 surface:
   - Navigate to the surface
   - Set up meaningful state (e.g., for verification-inbox: make sure 8-12 pending claims exist; if not, run extraction on a recent source first)
   - Capture full-page screenshot to a file
   - Note any masking needed (real names, real emails)
5. Save to `docs/brand/screenshots/<slug>/full.png`
6. Downscale to thumb.png (800x450) via `sharp` or manual crop
7. Write meta.yaml

## Estimated time

- Tier 1 (5 surfaces): 30 min — these need state setup
- Tier 2 (7 surfaces): 30 min — most should be ready-state
- Tier 3 (7 surfaces): 45 min — persona-specific state setup, some may need product work to demonstrate (e.g., Odoo multi-instance might not exist yet — defer)
- Tier 4 (5 surfaces): 15 min — quick captures

Total: ~2 hours for full library, ~30 min for Tier 1 alone.

## What's deferred

- Animated captures (Loom-style) — out of scope; static only
- Multi-step flow captures (sequence of screens) — capture each step as its own slug, link in caption
- Mobile viewport captures — defer until first mobile-focused blog
