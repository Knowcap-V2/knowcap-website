# write-blog-draft

Generate a Knowcap blog post draft. Adapts to what's available — Knowcap source recordings are optional; screenshots from `docs/brand/screenshots/` are an enhancement, not a gate.

## Status: P1 spec (real prompt, ready to run manually)

> **Governed by the PLAYBOOK** (`../claude-knowcap/marketing/digital-employees/seo/PLAYBOOK.md`). Every
> mode below is SERP-STOLEN — the routine passes either an inherited SEO content-brief or a live top-3
> SERP digest as `serp_steal`. **No `serp_steal` → REFUSE.** No more invented essays (16 of them = 0 clicks).

## Modes

Routine picks mode at runtime: first by INTENT (Law 2), then — for informational intent — by what spine is available.

| Mode | Spine of the post | When the routine uses it |
|---|---|---|
| **`money-page`** | A `/compare/*` or use-case "zipper" landing page | **Commercial** intent (best/software/tool/vs/for-persona/pricing). The only format ranking #1 for us (Law 3). NOT a blog post. |
| **`thesis`** | SERP-stolen answer + persona + vision + positioning | Default for informational intent. Answers the query the way the winning results do, beats their depth. NO Knowcap source needed. |
| **`case-study`** | A specific Knowcap recording + its confirmed memories + persona | When the routine finds ≥1 Demo-org source for the persona with ≥3 confirmed memories. |
| **`comparison`** | Competitor research + persona + audit | When `../claude-knowcap/company/docs/research/competitors-*.md` is < 30 days AND not covered in last 5 shipped. |

Each mode is shaped by `serp_steal` (beat the top-10 structure). Each has its own prompt template below.

## Inputs (the routine assembles before calling the skill)

```yaml
mode: money-page | thesis | case-study | comparison
intent: informational | commercial          # navigational was skipped upstream (Law 2)
lang: en | ar                                # follows the keyword's demand (Law 4)
dir: ltr | rtl                               # ltr for en, rtl for ar
hreflang_pair: "<url-or-slug of the other-language equivalent, or null>"
target_persona: odoo-partners | mena-audit-firms | mena-agencies | regulated-verticals
target_keyword: "<string>"
target_keyword_5y_mena_interest: <0-100 OR null if Trends unavailable>

# SERP steal — REQUIRED (Law 1). Either an inherited brief or a live top-3 digest. Absent → REFUSE.
serp_steal:
  source: brief | live-serp
  top_results: [ { title, type, approx_word_count, h2s: [...] }, ... ]   # the ranked competition
  avg_word_count: <int>            # the target to BEAT
  shared_h2s: [...]                # sub-topics every top result covers — must cover all
  paa: [...]                       # People-Also-Ask → become FAQ + H2s
  citable_passages: [...]          # 1-2 passages to write as 134-167w answer blocks (Law 5)

# Always required (brand DNA lives in the claude-knowcap hub — sibling repo, NOT this repo's docs/)
vision_md: "<text>"             # from ../claude-knowcap/company/docs/strategy/vision.md
positioning_md: "<text>"        # from ../claude-knowcap/company/docs/strategy/POSITIONING.md
persona_section_md: "<text>"    # the persona's section from ../claude-knowcap/company/docs/research/product-personas.md
recent_shipped_slugs: [...]     # last 20 slugs from app/content/blog/
recent_drafts_in_pipeline: [...] # to avoid double-drafting

# Required only when mode = case-study
knowcap_sources:
  - source_id: "<uuid>"
    title: "<recording title>"
    duration_seconds: <int>
    verified_claims:
      decisions: [...]
      risks: [...]
      tasks: [...]
      facts: [...]

# Required only when mode = comparison
competitor_positioning_md: "<text>"  # from ../claude-knowcap/company/docs/research/competitors-<name>-positioning.md

# Optional enhancement (any mode)
available_screenshots:
  - slug: "verification-inbox"
    alt: "<alt text>"
    caption: "<caption>"
    file: "../claude-knowcap/company/docs/product/screenshots/verification-inbox/full.png"
    features: [verification, inbox]
    personas: [odoo-partners, mena-audit-firms]
```

## Voice + style (all modes)

- Founder-or-industry-expert voice. NEVER PM-speak, NEVER consultant-speak.
- BANNED — hard rejected at output: `leverage`, `synergy`, `ecosystem`, `stakeholder`, `stakeholders`, `holistic`, `journey` (as noun), `unlock`, `drive` (as verb meaning produce), `robust`
- USE: "the team", "the partner", "the client", "the meeting", "the recording", "the call", "the routine"
- Active voice. Short sentences when the claim is sharp.
- GEO structure: 134-167 word self-contained passages, FAQ section, schema-friendly H2/H3 hierarchy.
- **Arabic posts (`lang: ar`)** — write NATIVELY in Modern Standard Arabic for the searcher, NOT a translation of an English draft. Knowcap voice carries over (founder/expert, concrete, no consultant-speak); use the Arabic product terms (محاضر الاجتماعات، توثيق، تدقيق، تأكيد بشري) and `dir: rtl`. The banned-words list is English; for Arabic apply the same spirit (no filler/buzzwords).

## Entry gates (enforced at skill entry, all modes)

1. **ICP gate** — `target_persona` ∉ {odoo-partners, mena-audit-firms, mena-agencies, audit-and-legal, regulated-verticals} → `REFUSED`, reason `out-of-ICP`.
2. **SERP-steal gate (Law 1)** — `serp_steal` missing/empty → `REFUSED`, reason `no-serp-steal`. We never write from imagination.
3. **Intent gate (Law 2)** — if upstream passed a navigational/tool keyword → `REFUSED`, reason `navigational-intent`. Commercial intent must be `mode: money-page`, not a blog.
Do NOT write the draft if any gate fails.

## Frontmatter (emitted first, all modes, exact shape)

```yaml
---
title: "<title — max 70 chars, must include target_keyword OR close synonym; in {lang}>"
slug: <slug-form-of-title; append "-ar" when lang=ar>
mode: money-page | thesis | case-study | comparison
intent: {intent}
persona: {target_persona}
target_keyword: "{target_keyword}"
target_keyword_5y_mena_interest: {target_keyword_5y_mena_interest}
geo_score: <0-100 per GEO-AUDIT rubric, your honest estimate>
est_word_count: <draft word count>
draft_date: <today YYYY-MM-DD>
description: "<SEO meta description — 120-165 chars, in {lang}, no keyword stuffing>"
tags: [<5-8 kebab-case tags derived from persona + keyword + topic>]
author: "Hassan Arslan"
lang: "{lang}"        # en | ar — follows the keyword's demand (Law 4)
dir: "{dir}"          # ltr | rtl
hreflang_pair: "{hreflang_pair}"   # the other-language equivalent URL/slug, or null
source_knowcap_ids: [<list only if mode=case-study, else []>]
embedded_screenshots: [<list of screenshot slugs used, else []>]
status: draft
---
```

`description`, `tags`, `author`, `lang`, `dir` are consumed by `scripts/publish-draft.mjs` on PR merge to populate the live blog post's frontmatter. Always include them — the publish script errors if `description` is missing.

## Mode `thesis` — the prompt

```
You are writing a SERP-GROUNDED answer post for Knowcap, persona-targeted. This is NOT a free-form
opinion essay — that format earned 0 clicks across 16 posts. You are answering {target_keyword} the way
the winning results answer it, then beating their depth and adding Knowcap's honest angle.

BEFORE structuring, obey `serp_steal`: cover EVERY heading in `serp_steal.shared_h2s`, answer every
`serp_steal.paa` question (these seed the FAQ + H2s), and write at least `serp_steal.avg_word_count`
words (beat the top-10, don't merely match). Lead each major section with a self-contained 134-167-word
answer block (the AI-citation sweet spot, Law 5).

Body structure (target = serp_steal.avg_word_count, beat the top-10; the outline below is the floor):

1. HOOK — 1-2 sentences with a sharp persona-specific opener. Cite a real-world surface fact (e.g., "187 Odoo partners in Egypt sell at $40-80 per consulting hour. The first scope dispute of the year costs the average partner 4-6 days they don't bill for.")
2. THE PAIN — 134-167 words. Why {target_persona} specifically. Use one bullet from persona_section_md as the load-bearing claim.
3. WHY THE CURRENT TOOLING DOESN'T SOLVE IT — 134-167 words. Cite the specific category — productivity meeting tools, generic AI summarizers, etc. Be specific about WHY they fall short for {target_persona}.
4. WHAT THE VERIFIED-FACTS MODEL CHANGES — 200-300 words. Cite vision_md (the trust-ladder, the named-human-confirms, the no-Confirm-All-button rule). Anchor to {target_persona}'s actual workflow.
5. WHAT THIS LOOKS LIKE IN PRACTICE for {target_persona} — 200-300 words. Concrete actions. If `available_screenshots` has matching items, REFERENCE them inline (e.g., "see screenshot below — the partner's project manager confirms 7 claims after a 47-minute call, takes about 4 minutes").
6. FAQ — exactly 5 questions, 134-167 words each, schema-friendly H3.
7. CLOSING — 1-2 sentences. NEVER "book a demo." Use understated finish.
```

## Mode `case-study` — the prompt

```
You are writing a story-spine post anchored on a REAL Knowcap recording from Demo org.

GROUND THE BLOG IN THE RECORDING. Quote the actual verified decisions/risks/tasks from `knowcap_sources[].verified_claims`. Name names (or anonymize as "the partner", "the project lead"). Cite the recording's surface fact in the hook (e.g., "Last month an Odoo partner in Cairo recorded a 47-minute scope call with their client — three of the five 'must-have' modules became Phase Two by the end.").

Body structure (locked, 1,300-1,600 words total):

1. HOOK — open with a fact from the recording.
2. THE STORY SPINE — 250-400 words. Walk through what actually happened in the call, citing verified_claims. Quote specific decisions with their reasoning.
3. WHAT WENT WRONG (OR RIGHT) — 134-167 words. The inflection point.
4. THE INSIGHT — 134-167 words. What this proves about the broader pattern for {target_persona}.
5. WHAT THIS MEANS FOR YOU — 200-300 words. Concrete actions. Reference available_screenshots if they show the same surface.
6. FAQ — exactly 5 questions, 134-167 words each.
7. CLOSING — 1-2 sentences.

`source_knowcap_ids` in frontmatter MUST list the source(s) you actually cited.
```

## Mode `comparison` — the prompt

```
You are writing a positioning-vs-competitor post for {target_persona}, using competitor_positioning_md as the differentiation source.

CONSTRAINTS specific to comparison mode:
- Lead with what the competitor does WELL — credibility first
- Position Knowcap as a DIFFERENT category, not "better at the same thing"
- Avoid trash-talking; cite competitor's own marketing for their claims
- The reader is currently a competitor user OR a buyer comparing — write for both

Body structure (locked, 1,300-1,600 words total):

1. HOOK — name the competitor + their core promise + the specific question {target_persona} should be asking
2. WHAT THE COMPETITOR DOES WELL — 134-167 words. Cite their public claims.
3. WHERE THE COMPETITOR'S MODEL BREAKS for {target_persona} — 200-300 words. The persona-specific edge case.
4. THE DIFFERENT QUESTION KNOWCAP ANSWERS — 200-300 words. Vision-anchored. Reference screenshots if they show the load-bearing surface.
5. WHEN TO PICK COMPETITOR, WHEN TO PICK KNOWCAP — 134-167 words. HONEST recommendation (if competitor is the right fit for this persona, say so — it builds trust).
6. FAQ — exactly 5 questions, 134-167 words each.
7. CLOSING — 1-2 sentences.
```

## Mode `money-page` — the prompt

```
You are writing a COMMERCIAL landing page, not a blog post — the keyword has buyer intent (Law 2/3).
This is the only format that ranks #1 for us (the /compare/* pages). Build a `/compare/*` or use-case
"zipper" page: [use-case] × [persona | language] (e.g. "best AI meeting-minutes software for audit
firms", "أفضل برنامج محاضر اجتماعات"). The output is still a markdown draft, but its shape is a
conversion page, and the routine routes it to a money-page route, NOT /blog (flag in the PR body).

Obey `serp_steal`: match the page TYPE that ranks (comparison table / feature page / listicle), cover
every `serp_steal.shared_h2s`, beat `serp_steal.avg_word_count`.

Structure:
1. H1 with the exact commercial keyword + a one-line value promise.
2. A 134-167-word self-contained answer block directly answering the query (AI-citation; Law 5).
3. The comparison/feature substance the SERP demands (table if competitors rank with one).
4. Honest Knowcap differentiation (verified-facts / human-confirmation / audit-trail).
5. One clear conversion action (NOT "book a demo" copy-slop — a plain, specific next step).
6. FAQ — 5 questions from serp_steal.paa, 134-167 words each, FAQPage schema.
7. JSON-LD schema appropriate to the page type.
```

## Screenshot integration (any mode, optional)

After draft generation, scan the body for trigger keywords:

| Trigger keyword in body | Match against `available_screenshots.features` |
|---|---|
| "inbox", "claims extracted", "before confirmation" | `inbox`, `pending-claims` |
| "confirm", "verify", "named human" | `verification`, `confirm-step` |
| "audit trail", "provenance", "source record" | `source-page`, `audit-trail` |
| "Odoo connection", "push to Odoo", "Odoo project module" | `odoo-integration` |
| "routine", "scheduled" | `routine-list`, `routine-edit` |
| "search", "find", "decision lookup" | `memory-search` |
| "no Confirm All", "Confirm All button" | `no-confirm-all-rule` |
| "agent action", "agent ships" | `agent-action-pr` |

For each match, insert markdown image tag at the END of the relevant section:

```markdown
![{alt_text}](../../{file})
*{caption}*
```

> **Web-serving caveat:** screenshot files live in the hub (`../claude-knowcap/.../screenshots/`), which is NOT deployed. Before embedding, COPY the chosen image into the web app's public assets (e.g. `app/public/blog/<slug>/`) and reference THAT URL in the draft — a hub-relative path 404s on the live site. (Moot until the screenshot index is populated; it is currently empty.)

Maximum 4 screenshots per post. If more match, pick the 4 most-aligned with the persona.

Add the used screenshot slugs to frontmatter `embedded_screenshots: [...]`.

## Validation gates (post-generation, all modes)

1. Banned words → regex scan body (English posts). If any present, REGENERATE that paragraph (max 2 retries) or REFUSE. Arabic posts → apply the same no-buzzword spirit.
2. Word count → **≥ `serp_steal.avg_word_count`** (beat the top-10). Absent a SERP signal, 1,300-1,600 body words. Under target → retry once with expansion guidance.
3. SERP coverage (Law 1) → every `serp_steal.shared_h2s` heading is covered and every `serp_steal.paa` question is answered. Missing any → retry once.
4. Citable passages (Law 5) → at least 2 self-contained 134-167-word blocks present.
5. Target keyword → must appear in title AND H2-section-one AND ≥3 times in body (in the post's language).
6. Language → body language matches `lang`; `dir` correct; `hreflang_pair` set (or explicitly null).
7. Slug uniqueness → must not match any slug in `recent_shipped_slugs` or `recent_drafts_in_pipeline` (AR slug carries `-ar`).
8. FAQ count → exactly 5 H3 questions in the FAQ section.
6. Frontmatter shape → all required keys present, types correct.

## REFUSED output shape

If the skill cannot meet all constraints:

```yaml
---
title: "REFUSED"
mode: {mode}
reason: "<one-line reason>"
diagnostics:
  attempted_keyword: "{target_keyword}"
  banned_words_found: [...]   # if reason was banned-words
  word_count_attempted: <int> # if reason was word-count
---
```

Do NOT emit a fallback generic post. Refuse cleanly.

## Cost cap

- Input cap: 50,000 tokens per skill invocation (≈$0.15 at Sonnet input rates)
- Output cap: 8,000 tokens per skill invocation (≈$0.12 at Sonnet output rates)
- If a single source transcript exceeds 50,000 tokens, summarize via Haiku first; pass summary

## Topic-ideation sub-mode (called by `content-curator` routine)

Skill also supports `mode: topic-ideation`. Same input shape, different output:

```markdown
## Proposed angles ({target_persona})

### Angle 1: <title>
- Mode: thesis | case-study | comparison
- Target keyword: <kw>
- Hook: <1 sentence>
- Knowcap source needed: <slug, or "none">
- Screenshots needed: <list, or "none">
- Why this is worth writing: <1 sentence>

### Angle 2: <title>
(same shape)

### Angle 3: <title> (optional)
```

Constraints:
- Each angle must NOT overlap > 60% with a shipped blog
- Each angle must NOT be already in pipeline
- If only 1 strong angle, emit 1 — quality over quantity
- Limit: max 3 angles
