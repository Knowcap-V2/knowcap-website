---
title: Self-evolve Knowcap agent — cloud coding agent that PRs improvements based on research
captured: 2026-05-07
resolved: 2026-05-12
type: feature-idea + experiment
status: EXPERIMENT scheduled 2026-05-17 (Sunday) — manual one-shot, no automation yet
supersedes: "[[wiki/Knowcap/content-and-features/self-improving-plugin-amplitude-onboarding]]"
related: ["[[wiki/Knowcap/content-and-features/ai-first-framework-hasan-toor]]", "[[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]]"]
playbook: "C:\\Users\\Eng.Hassan\\Github\\arslan-ventures\\av-claude-workspace\\docs\\self-evolve-experiment.md"
---

# Self-evolve Knowcap agent

## TL;DR

A cloud coding agent — for Hassan, not end users — that (1) builds a structured understanding of the Knowcap codebase, (2) scouts the web for research/ideas/material, (3) opens PRs on `hassan-*` branches implementing improvements. Hassan reviews and merges. Loop. Eventually users guide it; for now research guides it.

The original "approve/reject buttons" framing wasn't about end-user onboarding — it was about **Hassan reviewing PRs** the agent opens.

## What the agent does

- Reads the Knowcap codebase from `knowcap Main/` to build context.
- Scouts a curated reading pile (Raindrop Unwatched primary, web scout fallback).
- Picks one item, drafts a 5-line spec (what / why / where / how / not-in-scope).
- Branches `hassan-evolve-<slug>` off latest `main`, implements, opens PR.
- Tags itself out of the merge — Hassan reviews and merges.
- Repeats until quota / stop conditions hit.

## Three eventual flavors (one Sunday tests one)

| Flavor | Input | Output | Status |
|---|---|---|---|
| **Feature-poacher** | Raindrop Unwatched + curated reading pile + web scout | Feature PRs citing research source | **First experiment 2026-05-17** |
| Bug-hunter | CVE feeds, security advisories, AI/SaaS incident postmortems | Hardening PRs | Wait for feature-poacher verdict |
| Refactor-monkey | Own codebase + recent commits + lint output | Internal cleanup PRs | Wait for feature-poacher verdict |

## The Sunday 2026-05-17 experiment

**Setup:** No new infrastructure. Burn leftover ~20% of weekly Claude Max quota the evening before Monday's reset. Single-flavor (feature-poacher). Manual session in `knowcap Main/`. No scheduled routines yet.

**Reading pile:** Raindrop "Unwatched" collection (70352923) primary → Exa/Perplexity web scout fallback if pile is exhausted.

**Branch:** `hassan-evolve-<slug>` off latest `main`. Agent never merges its own PR.

**Stop conditions:**
- Quota hint drops below ~5%
- Three of agent's PRs are still open and unmerged
- Six passes through pile with no PR-worthy item found

**Quality bar** (all five required):
1. Traceable — PR description links the exact research source.
2. Vertical — ships a working slice, not 20 speculative files. <300 LOC delta unless trivially mechanical.
3. Honest test note — either tested + how, or "did not test because X."
4. Doesn't touch production-sensitive paths (no prod env vars, no migrations, no Gemini billing config).
5. Reversible — `git revert` undoes cleanly.

**Monday-morning verdict** from three numbers:
- PRs opened
- PRs merged after Hassan review
- PRs Hassan had to rewrite vs accept as-is

If merged ≥ 1 AND rewrite-rate < 50% → **promote to scheduled routine** and spawn the other two flavors. Otherwise tighten the playbook and re-run next Sunday.

## Why this fits Knowcap's thesis

- It's the same human-in-the-loop loop Hassan describes everywhere else: AI proposes, Hassan approves, AI learns from the approval signal — applied to **product changes themselves.**
- It pairs with the [[wiki/Knowcap/content-and-features/ai-first-framework-hasan-toor]] "test harness" idea: define what good looks like (PR shape + quality bar), agent self-checks, Hassan reviews outputs not process.
- Validates the [[wiki/Knowcap/content-and-features/knowcap-content-strategy-vision]] L3 ("mitigate autonomously") pattern in Hassan's own dogfood loop before pitching it to clients.

## Full playbook

Lives in the engine, not the brain: [self-evolve-experiment.md](C:\Users\Eng.Hassan\Github\arslan-ventures\av-claude-workspace\docs\self-evolve-experiment.md). That's the file Hassan opens Sunday night and pastes from into a fresh Claude Code session.

## History

- 2026-05-06 first capture: misread as "Amplitude-style end-user onboarding plugin" (see [[wiki/Knowcap/content-and-features/self-improving-plugin-amplitude-onboarding]] for the original).
- 2026-05-07 raw re-capture: "self improving saas plugin with amplitude style on boarding for new features with approve or reject button"
- 2026-05-12 grilling clarified: not for end users — for Hassan. Cloud coding agent. PRs are the "approve/reject" surface.
