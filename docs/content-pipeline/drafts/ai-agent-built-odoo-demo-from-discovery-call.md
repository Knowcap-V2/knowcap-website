---
title: "I Didn't Build the Odoo Demo. My AI Agent Did — From the Call."
slug: "ai-agent-built-odoo-demo-from-discovery-call"
mode: "thesis"
intent: "informational"
persona: "odoo-partners"
target_keyword: "AI Odoo demo"
target_keyword_5y_mena_interest: null
geo_score: 84
est_word_count: 1550
draft_date: "2026-06-29"
description: "A client wanted a full Odoo demo by the next afternoon, in front of their CEO. An AI agent built it — database, custom code, and sales docs — pulling the discovery call from Knowcap. Here is exactly how, plus the open-source skill."
tags: ["odoo", "odoo-partners", "ai-agent", "claude-code", "knowcap", "build-in-public", "erp", "mena"]
author: "Hassan Arslan"
lang: "en"
dir: "ltr"
hreflang_pair: null
source_knowcap_ids: []
embedded_screenshots: []
status: draft
---

A client asked us for a full Odoo demo. The meeting was the next day, 1:30 PM, in front of their CEO. I didn't build it. Claude built it — pulling everything it needed from Knowcap — while I mostly watched. By the time the meeting started there was a live, working Odoo database tailored to their business, a custom feature that doesn't exist natively, and a full sales kit. I open-sourced the whole pipeline as a Claude Code skill ([github.com/Smetools/odoo-demo-architect](https://github.com/Smetools/odoo-demo-architect)) — steal it. Here is exactly what happened, step by step.

## It remembered the call — in Egyptian Arabic

I didn't brief the agent. I said "we have a demo tomorrow." It queried [Knowcap](https://knowcap.ai) — our meeting-intelligence platform — over its MCP, pulled the actual discovery-call transcript, and read the client's pains back to me in their own words: orders living in 13 WhatsApp groups, an operations manager burning 7 to 10 every morning hand-splitting truck loads, and a real fear of handing sales reps control over key-account credit.

The part I'm most proud of: that call was in Egyptian Arabic. Knowcap is the first Egyptian-Arabic-dialect meeting-intelligence platform you can connect to Claude as an MCP. So the agent didn't read a cleaned-up English summary — it understood a real Masri business conversation and acted on it. For a MENA founder, that is the whole unlock. The discovery is where the deal is won or lost, and the discovery happens in dialect.

## It researched what to build — and corrected me

I assumed two of the hero features were "just configuration." The agent pushed back, and it was right. Odoo's credit limit only *warns* — it does not block an order — so a true hard-stop the client could trust needed custom code. But fleet load-building by weight? Native in Odoo 19 with the right module, no code required. It researched native-versus-custom for the client's exact Odoo version before touching anything. It knew. I didn't.

This is the step most demos skip, and it's why most demos break live: someone promises a behavior the platform doesn't actually have, then improvises in front of the buyer. The agent refused to do that.

## It stood up a real database

Not slides. A live database. It connected to Odoo over the API, installed the modules the scope needed, and loaded realistic data — products with real weights, customers with credit limits, trucks with capacity, a B2B price list. Then it pre-staged one customer right under their credit limit, on purpose, so the hero feature would fire live during the meeting instead of needing a story about what *would* happen.

## It wrote, shipped, and tested the custom code

The hard part: a credit-limit hard-block with a manager-only override. The agent wrote the module, pushed it to GitHub, deployed it, broke once on a version-specific field change, fixed itself, and re-deployed. Then it proved the feature instead of trusting it — created a throwaway order that came in at 56,379 against a 50,000 limit, confirmed the block fired, confirmed the manager override released it, and left the demo records pristine. A verification log captured the real numbers.

That testing loop is the difference between a demo and a liability. An untested feature in front of a CEO is a coin flip.

## It produced the three sales documents

From the same client data, it generated three documents: a run-of-show for the meeting, a one-page leave-behind for the decision-maker, and a one-page, step-by-step demo script so whoever runs the meeting can't get lost. Brand-themed, self-contained, ready to send. Discovery call in, working demo plus full sales kit out, near-zero interference from me.

## The real lesson: an agent is only as good as its memory

Strip away the Odoo specifics and here is what actually happened. Claude was the brain — it researched, built, coded, and tested. Knowcap was the memory — it fed the agent what the client actually said, in their own dialect, over MCP. Neither half works alone. A brilliant agent with no memory of the discovery call builds a generic demo that misses the point. A perfect memory with no agent is just a transcript nobody reads.

Most "AI did my job" stories quietly skip the memory problem. They paste a transcript into a prompt and call it grounding. That falls apart the moment the work spans more than one conversation, or the conversation wasn't in English. The reason this pipeline worked is that the agent could reach for the truth of the call on demand — structured, searchable, in dialect — the same way a good account manager would remember it.

This is what "AI-native" actually means in practice. The agent does the 80% — research, build, documentation, testing — grounded in real memory, so the founder does the 20% only a human can: the relationship and the decisions. I wasn't replaced. I was freed to be in the room instead of in the weeds the night before.

## Steal it — the skill is open source

I packaged the entire pipeline as a Claude Code skill and made it free. If you sell or implement Odoo, you can run the same thing on your own deals:

- **The skill:** [github.com/Smetools/odoo-demo-architect](https://github.com/Smetools/odoo-demo-architect) (MIT — use it, fork it, sell with it)
- **What it does:** point it at a discovery call and a reachable Odoo instance; it mines the pains, researches native-versus-custom, stands up a live demo database with realistic data, builds and tests the hero features, and writes the three sales documents.
- **What it runs on:** [Claude Code](https://claude.com/claude-code) as the agent, [Knowcap](https://knowcap.ai) as the memory (connect the Knowcap MCP so the agent pulls the discovery transcript and the client's pains directly — no transcript hunting). No Knowcap yet? You can paste a transcript instead, but you lose the on-demand recall and the dialect-native capture that made this work.

Install is one line — clone it into your Claude Code skills folder — then ask Claude to build a demo for a client from your discovery call. The README walks through the Odoo API key, the config, and the version gotchas (Odoo 19 renamed several core fields; they're all documented so you don't relearn them the hard way).

Steal it, run it on a real deal, and tell me what you'd add. That feedback is how the next version gets built — in public.
