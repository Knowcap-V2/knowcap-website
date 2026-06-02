---
title: Knowcap — content strategy & vision (Hassan voice memo)
captured: 2026-05-06
source: Hassan voice memo, ~15 min, file "Know cap content strategy 100%_original.txt"
type: content-strategy + feature-spec
status: canonical (Hassan's own framing)
---

# Knowcap — content strategy & vision

> Hassan recorded this as the **complete content creation strategy** for Knowcap (his words, line 21 of the original transcript). It doubles as a feature spec because every content angle is also a product capability.

## TL;DR

Knowcap is a **knowledge-base risk-insurance system**. It ingests every meeting (and eventually phone calls via VoIP), defines each "memory layer" (≈ paragraph) as one of **5 categories — Risks, Decisions, Tasks, Topics, Parties** (or a combination), and acts on them at **3 levels of agentic depth (L1 → L2 → L3)**. Humans approve every ingestion and every outbound; the system learns from those approvals and gets faster over time.

The content strategy is to **walk through one use case per category × per level = 15 content pieces minimum**, each grounded in a real meeting story from one of Hassan's 3 companies (one operates in 6 countries, 300+ people).

## Core framing

- Knowcap is **NOT** "another agentic AI tool". The differentiator is **human-in-the-loop on every ingest + every outbound**.
- Every approval becomes a rule. The AI learns the org's culture, decision-making patterns, and who-does-what — fast, because it has a giant structured database of past decisions/tasks/facts/topics/parties.
- Meetings are the **biggest information contract in any business** — bigger than email, bigger than Slack. Phone calls are #2, especially in third-world countries (vs. US where everything is on Google Meet).

## The 5 memory categories

Every paragraph in a meeting transcript gets tagged as one (or a combination) of:

1. **Risks**
2. **Decisions**
3. **Tasks**
4. **Topics**
5. **Parties** (people / companies referenced)

## The 3 levels of agentic depth

Each category can be processed at L1, L2, or L3 — each level adds more autonomy and more action.

### L1 — passive notification
Knowcap detects the item mid-meeting, finishes processing **before the meeting ends**, and delivers it to the right human (owner / supplier / manager) via Telegram / WhatsApp / Gmail / Slack / project-mgmt task.

### L2 — research + recommend
Spins up a research agent that goes online, finds how others have handled similar situations, and parses the output into any format requested (PowerPoint, video, PDF, email, Telegram post, WhatsApp post, Slack post). Sends to Hassan for approval before delivering to the team member who received the news.

### L3 — research + execute + mitigate
On top of L2: actually **builds something** to kill the issue.
- For an ERP project → builds a small module that mitigates the risk
- For a supplier delay → contacts 5 alternative suppliers via WhatsApp on Hassan's behalf to check capacity
- For a feature request → sends an organized PRD to Claude, which opens a branch + PR before the meeting ends

## Worked examples (one per category, mostly L1)

### Risk — supplier purchase-order delay
A project manager is meeting with a third-party supplier. Supplier signals the PO will be delayed. Because Knowcap is connected across all past meetings (and the VoIP system, in the advanced version), it already knows this supplier has caused similar delays before that hurt clients. Rule: when a risk is mentioned at importance L1, skip approval, assign immediately. By the time the meeting ends, the risk is already routed.

### Decision → automatic SOP generation
Each decision gets added to a **decision tree**. Every time the tree grows, an SOP is auto-generated and sent to all involved employees. Decisions can be referenced to speakers and parties — "Decision X was taken by Sam referencing Sarah on how to do Y." The decision tree becomes the **DNA for teaching future agents how to work — approved by humans**.

### Task → AI does the task, not just moves the card
Most PM tools just move tasks across a Kanban. Knowcap **does the work**: ships a feature via Claude, sends the customer a staging link, and asks for the merge approval. The AI runs the task; humans approve.

### Topic → content generation
Example: a meeting covers Shopify ↔ Odoo product-sync (rare topic, low content volume online). An agent assesses interesting topics post-meeting, reads the audio/video transcript, generates a reel via Higgsfield MCP (images / audio / video), schedules it in Buffer via API, and posts to Instagram. Hassan's preference: approval required, so he can steer.

### Party — track customer sentiment
Ingest customer phone calls + meetings → know what customers are complaining about, what they're frustrated with, how similar issues were solved in the past, and through which tasks. Sentiment over time per party.

## Vision artefact: the post-meeting deliverable

After a 2-hour demo meeting, the client receives an artifact with:
- **Video embedded** at top
- **Timestamps** for every task / decision / fact / topic
- **Screenshots** captured between text lines (because Knowcap watches the video, not just transcribes)
- Inline timestamp links inside text lines that jump back to the video moment
- If the customer requested a new feature → a PRD has already been sent to Claude, and Claude has already opened a branch + PR

## Connectors / MCPs called out

- VoIP system (phone calls)
- Higgsfield MCP (image / audio / video generation)
- Buffer API (schedule + post social content)
- Claude / GitHub (push code, open PRs, build mini-apps)
- NotebookLM (deep research → presentations + podcasts)
- Telegram / WhatsApp / Gmail / Slack (approval routing + outbound)

## Content production plan (implied)

Hassan plans to use his 3 companies (one in 6 countries, 300+ people) as a use-case factory. **Lots of real material to mine** — risks, decisions, tasks, topics, parties — every level. Goal: open-source the software, sell the implementation services.

## Closing pitch (in his words)

> "I have a company that implements the software. So if you guys are interested, let us know and we'll take a look at your business and see how Knowcap can benefit you."

---

## Original transcript (cleaned)

Lightly fixed for transcription errors:
- "no cap" / "old cap" → **Knowcap**
- "voiceover IP" → **VoIP**
- "clot code" → **Claude Code**
- "buffer" → **Buffer**
- "Higgs field" → **Higgsfield**
- "odu" → **Odoo**
- "canban" → **Kanban**
- "poll request" → **pull request**
- "meditate" (in context "how to mitigate") → **mitigate**
- "erisk" → **a risk**

---

**Speaker 1 (00:02)**
So Knowcap is a knowledge-base risk-insurance system. So how does it mitigate risk? This is one of the very useful use cases in Knowcap.

**Speaker 1 (00:16)**
Because we can talk about use cases in Risks and Decisions, in Tasks and Topics and in Parties. So let's start off by talking about Risks.

**Speaker 1 (00:30)**
So my team is meeting with a supplier about a purchase order. The supplier somehow indicated in the meeting that adjusting a purchase order will cause probable delays for the lead time of that purchase order. And because Knowcap is connected across all my past meetings —

**Speaker 1 (00:58)**
— Knowcap knows that before, this supplier has caused a certain delay that made a certain issue with our clients. Because also it has access to all of my VoIP system.

**Speaker 1 (01:15)**
But that's a bit complex. Let's just talk about it without the VoIP system.

**Speaker 1 (01:24)**
So let's talk about this at level one. We'll do level 1, level 2, level 3 of each one of these use cases. Hold s***.

**Speaker 1 (01:33)**
This is a complete content creation strategy. So okay — level one: it's with one of my project managers. My project manager was talking to a third-party supplier and a risk was flagged because that supplier was going to delay delivery of software or product or anything, right?

**Speaker 1 (01:56)**
By the time the meeting finishes — because I had it in the rules: when a risk is mentioned at importance level 1, skip approval and assignment right away — what happens is that Knowcap would have already delivered to me, as an owner or a supplier or a manager or whatever, that risk that happened during the meeting, and before the meeting ends.

**Speaker 1 (02:31)**
Because we define every single memory layer — let's just call it a paragraph — we define each paragraph with either a Decision, a Topic, a Risk, a Task, or a combination of those 4 categories, or Parties. By the time we finish, I would already have known about the risk.

**Speaker 1 (02:55)**
So this is level one. After the meeting, the first level is: I can just talk to my employee about that risk and how to mitigate it, if I know that information.

**Speaker 1 (03:04)**
Or — I can automatically spin off a research agent from Knowcap that goes online, researches how that risk is mitigated across similar projects on the web, gets all the research it can do, and parses it up in any format possible: a PowerPoint presentation, a video, a PDF, an email, a Telegram post, a WhatsApp post, a Slack bot. "Here's the risk you guys discussed with the supplier."

**Speaker 1 (03:42)**
"And here's how to mitigate it based on those research findings." And I can have it get my approval for that mitigation before it sends it off to the team member who was in the meeting receiving that risk news.

**Speaker 1 (03:56)**
So that's level 1 for risks. There's still level 2 and level 3 for risks (sorry — risks, not decisions).

**Speaker 1 (04:08)**
Another example for risks — at level 2 you have the option to not only research that risk, but to get notified, be approved by a human that this is an actual risk —

**Speaker 1 (04:26)**
— and then go on and research mitigation analysis or assessment, come back, and after it comes back, not only will it deliver a report, but it will actually do something. Like build a website, a CRM, or even a small software / mini application — to make sure that risk is completely killed. For example, if you're implementing an ERP project, it could build a very small application or module on that ERP project that mitigates that risk exactly. Or if it's a supplier issue, it can go and contact on your behalf five different suppliers through WhatsApp to see if they have the necessary capacity to fulfill that purchase order that the first supplier said was going to be a delay.

**Speaker 1 (05:19)**
That's the third-level risk assessment: not only will it report and let you know the mitigation, it will mitigate it itself through various means. Because the knowledge-capture platform is divided across many different MCPs and APIs and connections to other software — like Claude and GitHub, so it can push code and create applications. But it can also do deep research and create presentations through NotebookLM, or create podcasts out of ideas. So for example, we spoke about very interesting topics regarding deep deep deep knowledge in a certain industry / sector.

**Speaker 1 (06:12)**
Let's say we spoke about the integration process between Shopify and Odoo and how to make sure that all products are synced across each other all the time without errors. That's an interesting topic — there's not a lot of content about it out there. So imagine after such a meeting, you have an agent that assesses interesting topics, decides to go and read the audio / video transcript, translates it into a piece of content (a reel), and pushes it through Buffer to Instagram.

**Speaker 1 (06:49)**
So it has an MCP for Higgsfield — it can generate images, audios, videos. And it has another API integration with Buffer — it can, from the meetings, generate content, schedule it on Buffer, and post it automatically. With approval or without approval —

**Speaker 1 (07:10)**
— depends on your settings. For me, I would set it to get my approval first so I can direct it. So it can send me that approval notification on Telegram, WhatsApp, Gmail, Slack —

**Speaker 1 (07:27)**
— or even as a task on my project-management tool. So that's a Topic, level 2 or level 3. Then you have Tasks. I don't need to explain how Tasks could be very, very, very expansive — a thousand permutations, to say the least. Because in Tasks, basically you have an automatic project manager — an entire project-management AI that not only does your tasks —

**Speaker 1 (08:07)**
— meaning it doesn't just handle the movements of these tasks through your project-management software on the Kanban view. No — it goes out there and DOES the task. Finishes the task, sends the customer a "your task is finished" — like a feature.

**Speaker 1 (08:26)**
An additional feature implemented through Claude Code. Here's a staging environment. Give us your okay. Send us back —

**Speaker 1 (08:33)**
— okay, so we can merge it. All that happens by AI, not humans. Why? Because Knowcap really organizes the information coming in and ingesting from all these different platforms — mainly meetings.

**Speaker 1 (08:48)**
Because meetings are the biggest information contract that could ever exist in any business. It's not email, it's not Slack — it's meetings, right?

**Speaker 1 (08:58)**
Meetings are where information gets passed on the most, out of any other means. The next biggest could be phone calls — which happens a lot in third-world countries. It's not like the US —

**Speaker 1 (09:13)**
— where everything is handled on a Google Meet. So we're planning also to integrate phone calls using VoIP. What else?

**Speaker 1 (09:31)**
Decisions — decision tree. Imagine how this reflects in SOPs. Imagine each decision getting added to a decision tree, and every time a decision tree gets added, an automatic SOP gets generated from that decision tree and sent out to all employees involved in one of those decisions.

**Speaker 1 (09:58)**
Because it can reference decisions to speakers and parties. So it can say "Decision X was taken by Sam, referencing Sarah on how to do this and that." Automatic SOPs — and not only that, it's really a DNA on how to teach future agents to work, approved by humans. That's the catch.

**Speaker 1 (10:29)**
This software is not going to be just another agentic AI tool. No — because humans are extremely involved in the loop. Extremely — they approve every single ingestion —

**Speaker 1 (10:46)**
— or every single knowledge capture. And then they have the AI work. And then before it gets sent out of the system, they have to also approve every single outbound by the AI. Of course they can write rules to override these rules. But the thing is, every time they approve an ingestion or approve an outbound message, the AI learns automatically through rules on how to adjust those approvals.

**Speaker 1 (11:18)**
So with time, the AI working inside Knowcap — the swarm of agents working on a hundred different things inside Knowcap — they start learning how the humans in this organization learn or make decisions. And because they have this extreme database — a very big database of every single decision that was ever made, and tasks and facts and topics and parties — they can learn extremely fast, much faster than just chatting using your keyboard or audio. Much faster on what makes you special —

**Speaker 1 (12:01)**
— what is your culture, how do you make decisions, how do you make tasks, who is usually responsible for those tasks?

**Speaker 1 (12:08)**
If someone's overloaded with tasks because they've extracted, for example, 170 tasks in the past couple of days — who's doing the most tasks, who's not, who's doing the least, who's basically not performing? Customer phone calls —

**Speaker 1 (12:29)**
— it can ingest all that. So what customers are complaining about, what are they frustrated with, and how we've solved similar issues in the past, through what tasks. That has sentiment to us.

**Speaker 1 (12:51)**
And because it sees the meetings as well — not only does it have audio, it actually sees. So imagine finishing up a meeting that is 2 hours of demoing how a certain system works (like how Claude Code worked, for example). By the time you're done with the demo, your client would have already received an artifact that has the video embedded on top, with timestamps for each task, decision, and fact —

**Speaker 1 (13:25)**
— and sequence. And then it has screenshots — because it's watching your video, so it's taking frames as screenshots between the text lines. But also inside the text lines: timestamps that reference the video. That's the power. And if a customer was requesting a new feature — by the time the meeting is done, Knowcap would have already sent a very organized PRD to Claude, and Claude would have already created a branch and a pull request of that feature.

**Speaker 1 (14:09)**
So this is what Knowcap is. I hope you guys like it, and I can't wait to create content about the use cases — because there'll be a lot. I have —

**Speaker 1 (14:23)**
— fortunately, I have 3 companies running. One of them is in 6 countries, employing more than 300 people. So I'm going to have a lot of use cases in the future.

**Speaker 1 (14:35)**
So please subscribe so you can see how this software — that I'm making open-source for you guys — can benefit your businesses. But of course I have a company that implements the software. So if you guys are interested, let us know and we'll take a look at your business and see how Knowcap can benefit you.

**Speaker 1 (14:59)**
Thank you.
