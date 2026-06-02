# write-blog-draft

Generate a Knowcap blog post draft. Adapts to what's available — Knowcap source recordings are optional; screenshots from `docs/brand/screenshots/` are an enhancement, not a gate.

## Status: P1 spec (real prompt, ready to run manually)

## Three modes

Routine picks mode at runtime based on what's available — the routine doesn't fail when a Knowcap source isn't available, it shifts mode.

| Mode | Spine of the post | When the routine uses it |
|---|---|---|
| **`thesis`** | Persona + audit + vision + positioning | Default. General positioning posts. NO Knowcap source needed. |
| **`case-study`** | A specific Knowcap recording + its confirmed memories + persona | When the routine finds at least 1 source in Demo org for the target persona with ≥3 confirmed memories. |
| **`comparison`** | Competitor research + persona + audit | When `docs/research/competitors/<name>/positioning.md` is fresher than 30 days AND not already covered in last 5 shipped blogs. |

Each mode has its own prompt template below.

## Inputs (the routine assembles before calling the skill)

```yaml
mode: thesis | case-study | comparison
target_persona: odoo-partners | mena-audit-firms | mena-agencies | regulated-verticals
target_keyword: "<string>"
target_keyword_5y_mena_interest: <0-100 OR null if Trends unavailable>

# Always required
vision_md: "<text>"             # from docs/brand/VISION.md
positioning_md: "<text>"        # from docs/brand/POSITIONING.md
persona_section_md: "<text>"    # the persona's section from PRODUCT-PERSONAS.md
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
competitor_positioning_md: "<text>"  # from docs/research/competitors/<name>/positioning.md

# Optional enhancement (any mode)
available_screenshots:
  - slug: "verification-inbox"
    alt: "<alt text>"
    caption: "<caption>"
    file: "docs/brand/screenshots/verification-inbox/full.png"
    features: [verification, inbox]
    personas: [odoo-partners, mena-audit-firms]
```

## Voice + style (all modes)

- Founder-or-industry-expert voice. NEVER PM-speak, NEVER consultant-speak.
- BANNED — hard rejected at output: `leverage`, `synergy`, `ecosystem`, `stakeholder`, `stakeholders`, `holistic`, `journey` (as noun), `unlock`, `drive` (as verb meaning produce), `robust`
- USE: "the team", "the partner", "the client", "the meeting", "the recording", "the call", "the routine"
- Active voice. Short sentences when the claim is sharp.
- GEO structure: 134-167 word self-contained passages, FAQ section, schema-friendly H2/H3 hierarchy.

## ICP gate (enforced at skill entry, all modes)

If `target_persona` ∉ {odoo-partners, mena-audit-firms, mena-agencies, audit-and-legal, regulated-verticals} → emit `REFUSED` with reason `out-of-ICP`. Do NOT write the draft.

## Frontmatter (emitted first, all modes, exact shape)

```yaml
---
title: "<title — max 70 chars, must include target_keyword OR close synonym>"
slug: <slug-form-of-title>
mode: thesis | case-study | comparison
persona: {target_persona}
target_keyword: "{target_keyword}"
target_keyword_5y_mena_interest: {target_keyword_5y_mena_interest}
geo_score: <0-100 per GEO-AUDIT rubric, your honest estimate>
est_word_count: <draft word count>
draft_date: <today YYYY-MM-DD>
source_knowcap_ids: [<list only if mode=case-study, else []>]
embedded_screenshots: [<list of screenshot slugs used, else []>]
status: draft
---
```

## Mode `thesis` — the prompt

```
You are writing a positioning post for Knowcap, persona-targeted. The post is GROUND-LEVEL THESIS — it doesn't cite a specific recording, it builds the argument from market + persona + vision.

Body structure (locked, 1,300-1,600 words total):

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

Maximum 4 screenshots per post. If more match, pick the 4 most-aligned with the persona.

Add the used screenshot slugs to frontmatter `embedded_screenshots: [...]`.

## Validation gates (post-generation, all modes)

1. Banned words → regex scan body. If any present, REGENERATE that paragraph (max 2 retries) or REFUSE.
2. Word count → 1,300-1,600 (body only, not frontmatter). If outside, retry once with tightening/expansion guidance.
3. Target keyword → must appear in title AND H2-section-one AND ≥3 times in body.
4. Slug uniqueness → must not match any slug in `recent_shipped_slugs` or `recent_drafts_in_pipeline`.
5. FAQ count → exactly 5 H3 questions in the FAQ section.
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
