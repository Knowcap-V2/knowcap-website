# Read.ai — Architecture & Product Surface

_Compiled 2026-05-19 from: (a) Hassan's own 30-min Knowcap-recorded walkthrough of the full read.ai onboarding flow, (b) read.ai's MCP launch blog post (Feb 25 2026), (c) read.ai public marketing site (Apify scrape in progress)._

> **Sources cross-referenced:** Hassan's `Read.ai Onboarding and Setup Walkthrough` transcript at `~/Downloads/Read.ai Onboarding and Setup Walkthrough.txt` (390 lines, observation-rich). The YouTube clip `LIeqR_VpeH8` he linked was a music-heavy hype reel with no extractable intel. Apify website-content-crawler run `P0XH1VG9VnxZR5mDi` on https://www.read.ai/ — running at time of writing, dataset `YufiMdMvsnZ0j3zAc`.

## TL;DR (the part that contradicts our prior assumption)

**Earlier memory** ([[reference_readai_architecture]] v1, written 2026-05-19 morning): "Read.ai uses BOTH Google Meet API and a bot."

**Hassan's walkthrough proves both halves wrong:**

- **No bot.** At [21:07] Hassan literally says "this is what I was talking about. You're sharing Read AI and it only appears on the top. **Does not send a bot.**" — confirmed by zero Meet roster entries for a bot user across his entire test call.
- **No Google Meet REST API path either.** The consent dialog he triggers is Meet's stock **screen-share consent prompt** ("hassan arslan has initiated media collection with Read AI"). That dialog is the one Meet shows when a third-party app uses `getDisplayMedia()` against the Meet tab — same browser primitive Knowcap's `tabCapture` uses. Not the `conferenceRecords.recordings` REST API I'd hypothesised.

**What Read.ai actually does:**

| Capture mechanism | Surface |
|---|---|
| **Desktop app** (Windows installer ~12MB at `Read+AI_latest_x64-setup.exe`) | Records system audio + screen for in-person / ad-hoc calls. Asks for Microphone + System Audio permissions on first run. Recording starts via a button in their app. |
| **Chrome extension** (300K–400K users, 4.5★ from ~27 ratings per the store listing) | Detects Meet/Zoom/Teams pages, surfaces a "Join Read AI" button on the upcoming-meeting card, and triggers the `getDisplayMedia` screen-share prompt against the Meet tab when the user clicks Join. |
| **Calendar OAuth** | Read OAuths Google Calendar (+ Outlook) on signup and uses it ONLY to schedule the recording — NOT to ingest media. The actual audio/video still comes from the screen-share consent. |

That's the entire capture stack. No bot. No Meet REST API. No Drive `drive.meet.readonly` scope. The Drive integration they require is for separate Drive-as-knowledge-source ingestion, not for pulling Meet recordings (the Meet recordings never go to Drive in their flow because they never trigger Meet's native record).

## The 30-min onboarding flow (verbatim from Hassan's recording)

1. **Sign-up** at `read.ai` — Google account picker.
2. **Choose calendar** — Google Calendar or Outlook Calendar. Hassan chose Google.
3. **Calendar OAuth** — Read AI asks to "access calendar, change it". Scope: `calendar.events`. Used purely for upcoming-meeting detection.
4. **Onboarding wizard:**
   - "All calendar events (Recommended)" vs cherry-pick which events Read joins.
   - "Email meeting recaps to: People with access (Recommended)".
5. **Optional integrations** offered: Zoom (required to do Zoom notes), Teams, Outlook, Gmail, **Google Drive (full access recommended)**, HubSpot.
   - Hassan connected Gmail + Drive.
6. **Chrome extension install** — adds the Read AI extension to Chromium. Stated function (per their wizard): "Open extension to any meeting in progress + access live notes."
7. **Desktop app install** — `Read+AI_latest_x64-setup.exe` (12.1MB). Wizard text: "Capture meetings without a bot. Access your reports and search across your meetings and knowledge with Ask Read."
8. **Desktop permissions** — modal "Recording Permissions Required" asks for **Microphone** + **System Audio**. Both mandatory before any recording.
9. **First-record test** — Hassan starts a desktop recording (no Meet call yet). Result: "Desktop Recording 2026-05-19 15:52:52" appears under Reports, transcribed live in-app.
10. **Live Meet join test:**
    - Hassan creates a Google Meet event for 4:00 PM.
    - Read's home dashboard auto-detects the upcoming meeting from his Google Calendar OAuth and shows a "Join from Read AI" button on the upcoming-meeting card.
    - Clicking Join opens the Meet tab AND triggers the standard `getDisplayMedia` screen-share consent dialog with the message _"hassan arslan has initiated media collection with Read AI. If this dialogue is accepted, Meet will share audio and video of the meeting to Read AI."_
    - Once granted, a banner in Meet reads _"You're sharing call audio and video with Read AI"_ — Meet's stock screen-share banner. No bot user appears in the roster.

## Read.ai product surfaces (with Knowcap mapping)

| Read.ai surface | Knowcap equivalent | Gap / opportunity |
|---|---|---|
| **Reports** (per-meeting summary with Read Score 0-100, Sentiment, Engagement metrics) | Recordings (per-meeting summary, transcript, action items) | **Knowcap missing**: numeric "Read Score" engagement metric. Cheap to compute from existing Gemini classifier + speaker timeline. |
| **Folders** (personal / shared / smart) | Projects | Read's smart-folder concept (auto-rules) is the same logic as Knowcap's routines — we have it, they have it. |
| **Ask Read** (chat across all meetings + integrations) | Knowcap chat | Parity. Both grounded RAG over user's meeting corpus. |
| **Smart Scheduler Link** (15 / 30 / 60 / 90 min defaults + custom) | **NONE** | Calendly-killer baked into a meeting tool. Easy add — uses the same Google Calendar OAuth scope Knowcap already has. |
| **CRM Recommendations** (auto-suggests Salesforce/HubSpot stage moves from meeting content) | SMEtools CRM agent (separate skill) | Read embeds this in their main product. Knowcap has the LLM + the transcripts but doesn't push CRM moves inside Knowcap UI. |
| **Coaching mode** (post-meeting feedback for the user — what they said, where they could improve) | **NONE** | Hassan flagged this as interesting at [13:14] of the walkthrough. Different from our live-tip layer in meet-full-prod (which is intra-call); this is async post-meeting. |
| **Ada digital twin** (cross-platform — Windows, MacOS, Android, iPhone, Chrome — "ask Ada anything via email") | **NONE** | Email-addressable AI personal assistant. Hassan flagged at [26:37]. Separate product, possibly more aspirational than shipped. |
| **MCP server** (Feb 25 2026 blog: "Read AI MCP: Your Meetings Just Became Your Most Powerful Dev Tool" — generates FastAPIs from transcripts, integrates with Claude Code + VS Code) | [[project_knowcap_mcp]] (knowcap-mcp wraps Knowcap API as MCP for Claude Code) | **Direct competitor.** Read's claim is more ambitious (auto-generates APIs from meeting content). Knowcap's MCP is simpler / more straightforward — read transcripts, write tasks, etc. |
| **Desktop app for in-person meetings** | **NONE** | Knowcap is browser-first. No way for Hassan to record an in-person sales call without a separate recorder app. |
| **Chrome extension** (300K+ users) | Knowcap extension (smaller install base) | Read's extension is the on-ramp to their desktop app. Knowcap extension has parity for browser-only capture but no desktop integration. |

## Pricing (verbatim from Hassan's screenshots at [11:36] and [12:06])

- **Pro** — $19.75/mo per license. Unlimited meeting transcripts, 100 file-upload credits/mo.
- **Enterprise** (Most Popular) — $29.75/mo per license. 200 file-upload credits/mo. Premium integrations.
- **Enterprise+** — $39.75/mo per license, 5+ licenses minimum. 300 file-upload credits/mo. HIPAA compliance. Premium support.
- All tiers: annual saves 25%.
- 7-day free trial on Enterprise tier (no card required to start — Hassan got dropped in directly).

For positioning: Knowcap's current pricing is below all three tiers, which is the right wedge for now (early-stage, undercut the incumbent). Once Knowcap hits feature parity on the missing pieces (Smart Scheduler, Coaching, CRM Recommendations), the $19-29/license band is where pricing should land.

## Compliance posture (Read.ai homepage [29:48])

- **SOC 2 Type 2 Certified** ✅
- **GDPR Compliant** ✅
- **HIPAA Compliant** ✅ (Enterprise+ only)

Knowcap has none of these certifications yet. Plan-side note: HIPAA gates the US healthcare TAM entirely; SOC 2 Type 2 is the table-stakes for enterprise sales conversations. Neither is needed for Knowcap's current ICP (founders, small teams), but they show up as objection-handlers in sales calls.

## Capture-architecture comparison (the technical bit)

```
                   READ.AI                              KNOWCAP (post-PR #562)
                ┌─────────────┐                       ┌─────────────────────┐
                │ Desktop App │  ──── system audio   │ Bot (Recall-style)   │ ─── existing
                │ + Extension │  ──── screen share   │   (paid ~$0.70/hr)   │
                └─────────────┘                       │                      │
                       │                              │ OR                   │
                       │ getDisplayMedia              │                      │
                       ▼                              │ chrome.tabCapture    │ ─── meet-full-prod PR
              ┌────────────────┐                      │ (Meet tab → PCM →    │
              │  Meet tab      │                      │   AssemblyAI WS)     │
              │  (no bot user) │                      └─────────────────────┘
              └────────────────┘
                       +
              Google Calendar OAuth (scheduling only,
                NOT for media ingest)
```

**Verdict:** Knowcap's `tabCapture` path in meet-full-prod PR #562 is **architecturally identical** to what Read.ai does inside their extension. Where they diverge:

1. **Read has a desktop app that captures system audio outside the browser.** Knowcap doesn't — if Hassan's on an in-person call or non-browser meeting (FaceTime, native Zoom desktop client without browser), Knowcap can't capture. This is a real gap.
2. **Read's extension is the same path PR #562 uses,** but Read polishes the in-meeting UX (the "Join from Read AI" card on the home dashboard, the auto-detected upcoming-meeting suggestions) — Knowcap has the plumbing, needs the product polish.
3. **Read does NOT use the Meet REST API for ingest.** Knowcap meet-full-prod ALSO uses the Meet REST API (`conferenceRecords.recordings`, `transcripts.entries`) as a SECOND, post-call path. That's actually a Knowcap advantage — Read.ai users can't capture if their desktop app isn't running or their extension misses the start, whereas Knowcap can backfill via the Meet REST API after the fact (provided the user enabled Meet's native record).

## Strategic opportunities for Knowcap

Ranked by ROI (cheapest to ship that closes a Read-specific advantage):

1. **Smart Scheduler Link** — Calendly competitor inside Knowcap. Reuses existing Calendar OAuth scope. ~2-3 days. Adds a SKU that doesn't exist on Read's free trial — could be a free tier add.
2. **Read Score / Sentiment metrics on the meeting card** — Knowcap already classifies sentiment in PR #562 (live + post). Add it to the Recordings list view as a chip. ~1 day.
3. **Coaching mode (async, post-meeting)** — Reuse Gemini Flash with a different prompt over the full transcript. ~2 days. Hassan flagged interest in this at [13:14].
4. **MCP server hardening** — knowcap-mcp already exists ([[project_knowcap_mcp]]). Match Read.ai's MCP blog by publishing a public docs page + 3 example workflows. ~1 day. Marketing win.
5. **Desktop app** — biggest gap, biggest cost. Electron wrapper around an existing screen+audio capture. Probably 2-3 weeks. Not urgent until users complain about in-person meeting capture.
6. **CRM Recommendations inside Knowcap** — pull SMEtools CRM agent's logic into Knowcap proper. ~1 week. Wraps existing work.
7. **HIPAA / SOC 2 Type 2** — sales-cycle blocker. Don't ship until first enterprise inbound. 6-12 month process.

## Surprises (worth flagging Hassan)

- **Read.ai's "no bot" claim is technically true but it leans hard on screen-share consent dialogs.** Every meeting requires the user to grant `getDisplayMedia` ONCE. After that it's persistent. Knowcap's tabCapture path inherits the same UX cost.
- **Their MCP server (Feb 2026) is the strongest competitive signal.** They are positioning as a dev tool, not a meeting tool. This is the same lane Knowcap MCP plays in. We are not behind — but we are not loud about it. Marketing problem, not engineering problem.
- **Free trial is 7 days on Enterprise** — they default-aim users at the expensive tier with the trial. Knowcap's free path is more generous, which is the right wedge for adoption but worse for revenue conversion.

## Marketing-site corroboration (Apify run `P0XH1VG9VnxZR5mDi`, 87 pages, finished 2026-05-19 16:21)

Read.ai's own marketing pages back the walkthrough findings — with three additions worth flagging:

1. **`/desktop` page is explicit** (verbatim): _"Record and summarize meetings without needing a bot. In person discussions, 1:1s, Slack Huddles? The Desktop app has you covered."_ — confirms zero bot, AND tells us their desktop app captures **Slack Huddles** (browser+desktop hybrid call surface). Knowcap doesn't.

2. **`/extension` page lists 4 functions** (verbatim):
   - Ask Search Copilot questions across your meetings
   - View and join in-progress meetings
   - Instantly add Read to live calls
   - Copy your Smart Scheduler link

   So the extension is the on-ramp for both the live-add flow AND the scheduler link. The scheduling link is positioned as a first-class extension feature, not buried in the web app.

3. **`/coaching` page reveals the metric framework** (verbatim): _"Speaker Metrics establish baselines around Clarity, Inclusion, and Impact using past meeting data."_ — three specific axes, not just a generic "engagement score." This is a more defensible product surface than I'd estimated. Knowcap would need to define its own 3-axis framework or copy these directly.

4. **`/recommendations` page is broader than CRM-stage moves**: their headline claim is _"1 in 3 meeting participants are unnecessary."_ The recommendations engine identifies low-participation attendees and proposes:
   - Mark a meeting participant optional or remove
   - Change the time or length of a meeting
   - Review a meeting series for deletion
   This is _calendar-hygiene_ AI, not _CRM-update_ AI. The CRM Recommendations Hassan saw in the report card during onboarding are a separate surface inside Reports.

5. **`/agents` page** — Read positions an entire "Agentic Workflow Suite." Direct competitor to Knowcap's project routines. Their pitch: _"Each agent works independently or as part of a coordinated team."_ Same architecture story Knowcap tells.

6. **Localisation footprint** — site is fully translated to it / es / pt / fr / ja / hi / de / ru / zh, each with its own `/plans-pricing` page. That's 9 non-English markets with localised pricing. Knowcap is English-only. Localisation is a moat, not a feature.

7. **Digital Twin "Ada"** — `/digital-twin` page confirms it's a shipped product, not aspirational. Three sub-skills:
   - Ada Answers (knowledge-base Q&A)
   - Ada Schedules (post-meeting "schedule next steps, send invites")
   - Ada Covers For You ("get caught up with ease after vacation")
   Marketed as **free**. So they're using it as a top-of-funnel acquisition lever for the paid tiers.

## Followups / open questions

- [x] When Apify run `P0XH1VG9VnxZR5mDi` finishes, append the marketing-site claim list to `architecture.md` — see section above. ✅ 2026-05-19
- [ ] Cross-reference with Recall.ai, Otter.ai, Fathom, Granola, Tactiq — Read.ai is one of ~6 active competitors. Next research pass.
- [ ] Decide whether Smart Scheduler Link is a Knowcap V2 P0 — Hassan to weigh in.
- [ ] Decide on the 3-axis Knowcap speaker-metrics framework (vs Read's Clarity/Inclusion/Impact).
- [ ] Knowcap localisation — punt or plan? Cheap with current LLM costs.

## Memory diff

Old memory [[reference_readai_architecture]] said: "Read.ai uses BOTH Google Meet API and a bot."
That's wrong on both halves — they use neither. Updating that memory in the same commit as this doc lands.
