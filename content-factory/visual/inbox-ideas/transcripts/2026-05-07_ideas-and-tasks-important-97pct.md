# Ideas and tasks — important level 97%

- **Source:** `Pictures/Screenshots/Ideas and tasks  important level 97%.m4a` (Hassan voice memo, ~3:50)
- **Transcribed via:** Groq Whisper (full segments JSON saved at `_raw_ideas-and-tasks.json`)
- **Audio also saved:** `_audio_ideas-tasks.mp3`
- **Captured:** 2026-05-07
- **Speaker:** Hassan (Sam) — running brainstorm while recording

---

## Light synthesis (3-5 bullets)

- **Read.ai must be embedded inside Google Meet for live, context-aware transcription.** Don't run after-the-fact — load the transcription engine with context from the last 10 meetings of the same kind / same speakers so it both transcribes better AND summarizes "adjacent to" prior meetings.
- **Memory operations across meetings — not just additive.** Today Knowcap stores risks/decisions/tasks/topics/parties as accumulating items. Hassan wants the *operations* between them as first-class:
  - **Decisions** can be **superseded** by later decisions
  - **Tasks** can be **completed**, **reassigned**, or **ignored** (because earlier meetings already did them)
  - **Risks** can be **mitigated**
  - **Parties** can be **double / triple referenced**
  - **Topics** can be **weighted** — re-occurrence increases weight, drives importance ranking
- **This is the RAG accuracy unlock for huge orgs.** Hassan's claim: with importance+history confirmed for every memory item, a RAG database scales from hundreds to thousands of meetings without quality decay. Self-quote: "this is truly artificial intelligence — not the lame-ass coding memory systems Claude and ChatGPT invented." Frames Knowcap's approach as actual team memory vs. solo-coder memory.
- **The competitive moat question Hassan asks himself:** *Why aren't Claude / ChatGPT building this?* If a team buys 100 Claude agents, why don't they share memory across all chat conversations? Even if they did it via chat, Knowcap is stronger because it's grounded in **meeting visuals + audio**, not text chat.
- **Closing line, verbatim:** "oh my god I'm on to something big — I feel it — I feel like I'm on to something very very big, let me know."

## Concrete features to extract

| Feature | Where it lives |
|---|---|
| Read.ai live in Google Meet (not post-meeting) | Meeting capture layer |
| Context-loaded transcription (last 10 same-kind meetings) | Whisper / RAG pre-prompt |
| Decision: `superseded_by` relation | Memory schema |
| Task: `completed_by_prior_meeting` / `reassigned` | Memory schema |
| Risk: `mitigated_by` relation | Memory schema |
| Party: cross-meeting reference count | Memory schema |
| Topic: re-occurrence weight | Memory schema |
| Cross-meeting RAG with importance + history | RAG system |

## Relates to

- **Typed-edge knowledge graph video** — Hassan's `superseded_by` / `mitigated_by` / `completed_by` are *exactly* the typed edges from the AI Impact video. He's independently arriving at the same conclusion: relationships need types, not just adjacency.
- **Knowcap content-strategy m4a (same day)** — that recording defined the 5 categories (risk/decision/task/topic/party) and the 3 autonomy levels. This recording adds the **state transitions** between memories of the same category.
- **AI-First framework video** — Hassan's "actual AI" vs. "ChatGPT memory" jab is the same point Bogdan makes: AI as operating system requires structured org memory, not chat history.
- **Self-improving SaaS plugin idea** — the topic-weighting + history-confirmed importance feeds the same approve/reject loop.

## Raw transcript (Whisper, timestamped)

```
[00:00] Another idea — because I've had a couple while recording — is, first of all,
       Read.ai definitely needs to be embedded through Google Meet so I can have
       real-time transcription. That's way better.

[00:25] Transcription should also be loaded with context of the last recent memories
       for the same kind of meeting or same speakers, so it can transcribe very
       well.

[00:44] If it has context of the last 10 meetings, then not only can it transcribe,
       but it can summarize in a way where it's adjacent to the first 10 meetings.
       That's a good idea.

[00:55] The risks, tasks, everything can be superseded or mitigated. Because we spoke
       about superseded, we didn't speak about mitigated. Or tasks done. Or tasks
       ignored because of previous tasks that were already done in previous
       meetings.

[01:22] So basically, decisions could be superseded. Tasks could be completed or
       reassigned. Risks could be mitigated. Parties could be double or triple
       referenced. Topics could be increased in size if they're reoccurring.
       Topics could be weighted.

[01:52] This would definitely increase the accuracy of the RAG system, especially if
       like an organization had hundreds or thousands of meetings — because no
       matter how big the RAG database gets, it is confirmed with importance and
       history for every single decision, task, etc.

[02:31] Holy shit, this is truly artificial intelligence. You can argue this is
       actual AI, not what they've invented with Claude and ChatGPT with these
       lame-ass coding memory systems — they don't benefit anyone. We wanted team
       memory and history and knowledge capture, and that doesn't happen in Claude.

[03:05] Why isn't Claude or ChatGPT doing this? I'm very curious, why is it not in
       the underlying infrastructure of the module? You have like a RAG pipeline
       across meetings. If someone bought 100 agents of Claude for his team
       members, why don't they all share memory across the board from the chat
       conversations?

[03:31] But even if they did this through chat conversations, our solution is much
       stronger because it's in just meeting visuals and audio.

[03:39] Oh my god, I'm on to something big. I feel it. I feel like I'm on to
       something very very big. Let me know.
```
