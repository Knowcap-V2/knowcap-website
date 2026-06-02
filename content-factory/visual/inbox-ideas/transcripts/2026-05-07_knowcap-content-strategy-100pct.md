# Know cap content strategy 100%

- **Source:** `Pictures/Screenshots/Know cap content strategy 100%.m4a` (Hassan's voice memo)
- **Pre-existing transcript:** `Downloads/Telegram Desktop/Know cap content strategy 100%_original.txt` (UTF-16; cleaned UTF-8 copy at `transcripts/_raw_knowcap-content-strategy.txt`)
- **Captured:** 2026-05-07
- **Speaker:** Hassan (Sam) — single-speaker dictation, ~15 minutes

---

## Light synthesis (3-5 bullets)

- **Knowcap as a risk-insurance system, not a meeting note tool.** Hassan opens by reframing Knowcap as a *knowledge-base risk insurance system* — its core job is to mitigate business risk by being connected across all past meetings, contracts, and conversations. Risks, decisions, tasks, topics, parties are the five extraction categories.
- **Three-level depth model for every use case.** Each category (risk / decision / task / topic / party) has Level 1 → Level 2 → Level 3 of escalating autonomy:
  - **Level 1 — Notify.** Risk flagged mid-meeting → notification delivered to the owner before the call ends. Manager talks to employee about it manually.
  - **Level 2 — Research + propose.** Spin off a research agent that goes online, finds how similar projects mitigated this risk, drafts the mitigation in any format (PDF, video, slack post, Telegram, presentation), waits for human approval, then delivers to the team member.
  - **Level 3 — Mitigate autonomously.** Beyond research: actually executes the mitigation. For an ERP project that means building a tiny module on the ERP. For a supply chain risk, contacts five alternative suppliers via WhatsApp on the user's behalf to check capacity. Risk is "completely killed" through Knowcap's MCP/API surface (Claude, GitHub, NotebookLM, Higgsfield, Buffer, etc.).
- **Content factory is a side effect of meeting capture.** Interesting topics from meetings (e.g., Shopify ↔ Odoo product sync) get assessed by an agent → translated into a content piece (image / audio / video via Higgsfield MCP) → scheduled to Instagram via Buffer API → posted with or without approval. Meetings → content reels, automatically.
- **Decision tree → automatic SOP.** Every decision joins a project-wide decision tree. Each new branch auto-generates an SOP and pushes it to all employees involved in similar past decisions. References speakers + parties: "Decision X was taken by Sam referencing Sarah on how to do this."
- **Human-in-the-loop is the moat.** Hassan is explicit: this is *not* another agentic AI tool. Humans approve every ingestion *and* every outbound message. Each approval teaches the AI an automatic rule. Over time the swarm learns the org's culture, decision-making style, who's overloaded, who's underperforming, what customers complain about. Speed: much faster than chat-based learning, because the data is structured (every decision/task/fact/topic/party in a database).

## Key claims worth pulling forward

- **Meetings are the biggest contract in any business.** Bigger than email, bigger than Slack. Phone calls are #2 (esp. third-world countries — phone-call VoIP integration is on the roadmap).
- **Demo follow-up artifact:** finishing a 2-hour demo meeting → client gets an artifact with the video embedded, timestamped task / decision / fact markers in the text, and screenshots between the lines (frames extracted from the video).
- **Meeting → PRD → PR pipeline:** if a customer requests a feature in the meeting, by the time the meeting ends Knowcap has sent a structured PRD to Claude and Claude has already opened a branch and pull request for that feature.
- **Hassan's own positioning at the end:** 3 companies running, one of them in 6 countries with 300+ employees → "I'm going to have a lot of use cases." Knowcap planned to be open-source with a paid implementation arm.

## Relates to

- **Self-improving SaaS plugin / approve-reject onboarding** (idea captured today) — same human-in-the-loop teaching pattern. Each approval shapes future behaviour.
- **MD-per-user / org / project** — natural fit. The decision tree, party roster, and culture snapshot Hassan describes IS the org.md / project.md / user.md content.
- **Drive ingestion idea** — "Knowcap connected across all my past meetings" is exactly the same shape; Drive is the next adapter after meetings.
- **AI-First framework video (also captured today)** — Hassan's "Level 1 / 2 / 3" autonomy ladder maps directly onto Bogdan's Learn → Wire → Automate → Scale, and his approval-rule learning loop matches Bogdan's "test harness + AI self-checks" pattern.
- **Typed-edge knowledge graph video (also captured today)** — Hassan's decision tree + speaker/party references + decision-X-by-Sam-referencing-Sarah is exactly the typed-edge model from the AI Impact video (`authored`, `derived_from`, `supports`, `contradicts`).

## Raw transcript

(Cleaned full transcript saved alongside as `_raw_knowcap-content-strategy.txt` — UTF-8.)

```
Speaker 1 (00:02)
So no cap is a knowledge base risk. Insurance system, so how does it mitigate
risk? This is one of the very useful use cases in no cap.

Speaker 1 (00:16)
Because we can talk about use cases in risks and decisions. In tasks and
topics and in parties. So let's start off by talking about risks.

Speaker 1 (01:24)
So let's talk about — this is level one. We'll do level 1 / level 2 / level 3
of each one of these use cases.

Speaker 1 (01:33)
This is a complete content creation strategy. So okay — level one: it's with
one of my project managers, and my project manager was talking to a
third-party supplier and a risk was flagged because that supplier was going
to delay delivery of software or product or anything.

Speaker 1 (01:56)
By the time the meeting finishes — because I had in the rules flagged: when a
risk is mentioned, importance level is one, skipped approval and assignment
right away — Knowcap would have already delivered to me as an owner the risk
that happened during the meeting before the meeting ends.

Speaker 1 (02:31)
Because we define every single memory layer — let's just call it a paragraph
— with either a decision, a topic, a risk, a task, or a combination of those
4 categories or parties.

Speaker 1 (03:04)
Level 2: I can automatically spin off a research agent from Knowcap that goes
online, researches how that risk is mitigated across similar projects on the
web, gets all the research, and parses it into any format possible — could be
a PowerPoint, a video, a PDF, an email, a Telegram post, WhatsApp post, or a
Slack bot — saying "here's the risk discussed with the supplier and here's
how to mitigate it." Get my approval before sending to the team member.

Speaker 1 (04:08)
Level 3: not only research the risk, but get notified, approved by a human
that this is an actual risk, then go research mitigation analysis, then
actually DO something — build a website, a CRM, even a mini-application — to
make sure the risk is completely killed. If you're implementing an ERP, it
could build a small module on that ERP that mitigates the risk exactly. Or
contact 5 different suppliers on your behalf via WhatsApp to check capacity.

Speaker 1 (05:19)
Knowledge capture platform is divided across many different MCPs and APIs and
connections to other software, like Claude and GitHub — so it can push code,
create applications — but also do deep research and create presentations
through NotebookLM, or create podcasts out of ideas.

Speaker 1 (06:12)
Imagine after a meeting where we spoke about Shopify–Odoo integration: an
agent assesses interesting topics, decides to read the audio/video transcript,
translate it into a piece of content (a reel), push it through Buffer to
Instagram. Higgsfield MCP for image/video generation, Buffer API for
scheduling. With or without approval — depends on settings.

Speaker 1 (08:48)
Meetings is the biggest contract in any business. Not email, not Slack —
meetings. Where information gets passed on the most. Next biggest could be
phone calls — happens a lot in third-world countries, not like the US where
everything's on Google Meet. We're planning to integrate phone calls using
VoIP.

Speaker 1 (09:31)
Decision tree. Imagine each decision getting added to a decision tree, then
every time a decision tree gets added, an automatic SOP gets generated and
sent to all employees involved. It can reference decisions to speakers and
parties — "Decision X was taken by Sam referencing Sarah on how to do this."
Automatic SOPs. It's a DNA on how to teach future agents to work, approved
by humans. That's the catch.

Speaker 1 (10:29)
This software is not going to be another agentic AI tool. Humans are
extremely involved in the loop. They approve every single ingestion and every
single outbound. They can write rules to override these rules. Every time
they approve, the AI learns automatically through rules.

Speaker 1 (11:18)
With time, the swarm of agents working on a hundred different things inside
Knowcap really start learning how the humans in this organization make
decisions. Because they have this very big database of every single decision
ever, they can learn extremely fast — much faster than chatting with your
keyboard — on what makes you special, your culture, how you make decisions,
who is responsible, who's overloaded, who's underperforming.

Speaker 1 (12:51)
Imagine finishing a 2-hour demo meeting. By the time you're done, your client
has already received an artifact with the video embedded on top, timestamped
task / decision / fact markers in the sequence, screenshots between the text
lines (because Knowcap is watching your video and taking frames). Timestamps
inside text lines reference the video. If a customer was requesting a new
feature, by the time the meeting ends a structured PRD has been sent to
Claude and Claude has already created a branch and a pull request of that
feature.

Speaker 1 (14:23)
Fortunately I have 3 companies running, one of them in 6 countries employing
more than 300 people. Subscribe so you can see how this software — that I'm
making open source — can benefit your business. I have a company that
implements the software too.
```
