'use client'

/**
 * Knowcap vs Fellow.app — competitor comparison landing page.
 * SEO bait for "Knowcap vs Fellow" / "alternative to Fellow.app".
 * Emphasis: meeting agenda + workspace vs Knowcap's agenda → agent actions,
 * Knowcap captures unstructured calls (WhatsApp, Telegram, in-person) too.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal } from '@/components/impeccable/kit'

const COMPETITOR = 'Fellow.app'
const COMPETITOR_SLUG = 'fellow'
const REGISTER_URL = `${APP_URL}/register?utm_source=compare_${COMPETITOR_SLUG}_page`

const COMPARISON_ROWS: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Meeting recording (Zoom, Meet, Teams)', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI transcript', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI summary', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  // verified 2026-06-01 source: https://fellow.ai/ — Fellow rebranded fellow.app → fellow.ai late 2025; AI summary + AskFellow agent now the hero, agenda is secondary
  { feature: 'Collaborative meeting agenda + notes workspace', them: 'Yes — agenda + AI workspace', us: 'Yes, but built around verified evidence', them_yes: true, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://fellow.ai/ — AskFellow agent auto-syncs action items to Salesforce/HubSpot/Jira/Linear/Asana with no human gate
  { feature: 'Action items detected', them: 'AskFellow auto-syncs to CRM / Jira (no gate)', us: 'AI-extracted, human-confirmed, agent-executed', them_yes: true, us_yes: true, highlight: true },
  { feature: 'Captures unstructured calls (no agenda — WhatsApp, in-person, voice memos)', them: 'No — calendar-meeting-required model', us: 'Yes — any audio source becomes a project memory', them_yes: false, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://fellow.ai/ — Fellow supports 92 languages auto-detection per meeting, not mid-utterance code-switching
  { feature: 'Multilingual mid-meeting code-switching', them: 'Auto-detects per meeting (92 langs), one per recording', us: 'Switches per utterance', them_yes: false, us_yes: true },
  { feature: 'Human verification before agent action', them: 'No — AskFellow runs on AI output', us: 'Every fact confirmed by a named person before agents act', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Odoo SH ticket creation from meeting', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'GitHub PR generation from bug recording', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  // verified 2026-06-01 source: https://fellow.ai/ — Fellow shipped MCP server + Claude Connector; ours is differentiated by serving verified facts (not raw AI output)
  { feature: 'MCP server for AI agent access', them: 'Yes (serves AI summaries)', us: 'Yes — serves human-verified facts only', them_yes: true, us_yes: true, highlight: true },
  { feature: 'WhatsApp / Telegram capture', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Built for Odoo implementation partners', them: 'No', us: 'Built by an Odoo partner', them_yes: false, us_yes: true },
  { feature: 'MENA market focus (Arabic UI / data residency)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Audit trail for AI agent actions', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
]

const FAQS = [
  {
    q: `Can I import my ${COMPETITOR} history into Knowcap?`,
    a: `Yes. Export your ${COMPETITOR} meeting notes (Markdown / DOCX) and upload them as sources into a Knowcap project. Knowcap indexes them, extracts decisions / risks / tasks, and routes them through the human-verification queue. Your historical agenda decisions become searchable, agent-actionable memory.`,
  },
  {
    q: `Does Knowcap work with the same meeting tools as ${COMPETITOR}?`,
    a: `Yes — Zoom, Google Meet, and Microsoft Teams. Knowcap goes further: WhatsApp voice notes, Telegram audio, in-person mobile recordings, uploaded documents, screen shares. ${COMPETITOR} requires a structured calendar meeting; Knowcap captures the unstructured side of how work actually happens.`,
  },
  {
    q: `Why is Knowcap better than ${COMPETITOR} for Odoo partners and operating teams?`,
    a: `${COMPETITOR} is a meeting workspace with an AI agent (AskFellow) that auto-syncs action items to Salesforce / Jira / Asana the moment the AI hears them. If the AI misheard, the wrong task lands on your sprint board. Knowcap is the trust layer: same agent outputs (PR on Odoo SH, ticket on sprint board, WhatsApp follow-up), but every one of them is gated by a one-tap human confirmation against the exact timestamp and speaker quote. Same destinations, very different liability surface.`,
  },
  {
    q: `How is the verification step different from ${COMPETITOR}'s AI summary?`,
    a: `${COMPETITOR}'s AskFellow agent skips the human and routes action items straight to your CRM / sprint board the moment it hears them. Knowcap's verification is one-tap-per-claim against the timestamp + speaker quote — and the moment you tap confirm, an agent takes the next action automatically. Same speed; the human gate is the difference between "shipped what was said" and "shipped what the AI thinks it heard".`,
  },
  {
    q: `Can I try Knowcap for free before switching from ${COMPETITOR}?`,
    a: `Yes. Sign up free at app.knowcap.ai — no credit card. Run a real recurring meeting (1:1, sprint planning, client call) through both systems and compare what each one produces. ${COMPETITOR} gives you a tidy page. Knowcap gives you a closed loop.`,
  },
]

function Hero() {
  const { reduce, rise, container } = useReveal()
  return (
    <section className="ve-section ve-dark ve-hero">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <motion.div variants={container} initial={reduce ? false : 'hidden'} animate={reduce ? undefined : 'show'}>
          <motion.div className="ve-docid" variants={rise}>
            <Tick className="ve-tick" />
            <span className="ve-mono">Comparison · Knowcap vs {COMPETITOR}</span>
          </motion.div>
          <motion.h1 className="ve-h1" variants={rise}>
            {COMPETITOR} transcribes. Knowcap <Mark ink>acts.</Mark>
          </motion.h1>
          <motion.p className="ve-lead ve-prose" variants={rise}>
            {COMPETITOR} gives you a meeting agenda, transcript, and AI summary. Knowcap captures the
            meeting (and the WhatsApp call, the voice note, the in-person room), extracts every
            decision / risk / task, lets a human confirm with one tap, then triggers agents that
            open PRs, create Odoo tickets, send WhatsApp messages — based on what was confirmed.
            The summary is table stakes. The agent action is the product.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={REGISTER_URL}>Switch from {COMPETITOR} free <Arrow /></a>
            <a className="ve-btn ve-btn--ghost" href="#demo">See the difference live</a>
          </motion.div>
          <motion.div className="ve-trust" variants={rise}>
            <span>Structured + unstructured capture</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Agents that ship work</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Full audit trail</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ComparisonTable() {
  return (
    <section id="demo" className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Side by side</h2>
          <p className="ve-lead ve-prose ve-dim">
            Where {COMPETITOR} ends at a tidy meeting page, Knowcap continues — capturing unstructured calls, verifying every claim, and acting on the confirmed ones.
          </p>
        </SectionReveal>
        <SectionReveal>
          <div className="ve-compare-wrap" role="region" aria-label={`Knowcap vs ${COMPETITOR} feature comparison`}>
            <table className="ve-compare">
              <thead>
                <tr>
                  <th scope="col" className="ve-compare-feat">Feature</th>
                  <th scope="col" className="ve-compare-them">{COMPETITOR}</th>
                  <th scope="col" className="ve-compare-us">Knowcap</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className={row.highlight ? 've-compare-row--hl' : ''}>
                    <th scope="row">{row.feature}</th>
                    <td className={row.them_yes ? 've-compare-yes' : 've-compare-no'}>
                      <span aria-hidden="true">{row.them_yes ? '✓' : '✕'}</span>
                      <span className="ve-compare-cell-text">{row.them}</span>
                    </td>
                    <td className={row.us_yes ? 've-compare-yes ve-compare-us-cell' : 've-compare-no'}>
                      <span aria-hidden="true">{row.us_yes ? '✓' : '✕'}</span>
                      <span className="ve-compare-cell-text">{row.us}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>
        <SectionReveal>
          <div className="ve-compare-cta">
            <a className="ve-btn ve-btn--primary" href={REGISTER_URL}>Switch from {COMPETITOR} free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a 20-min demo</Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function CompareFAQ() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal>
          <h2 className="ve-h2" style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>
            Switching from {COMPETITOR}
          </h2>
        </SectionReveal>
        <SectionReveal>
          <div className="ve-faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  <span className="ve-q-sign" aria-hidden="true" />
                  {f.q}
                </summary>
                <div className="ve-faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

const COMPARE_CSS = `
.ve-compare-wrap{overflow-x:auto;border:1px solid var(--t-line);border-radius:6px;background:var(--t-card)}
.ve-compare{width:100%;border-collapse:collapse;font-family:var(--t-fbody);min-width:680px}
.ve-compare th,.ve-compare td{padding:clamp(14px,1.6vw,18px) clamp(14px,1.8vw,22px);text-align:left;vertical-align:top;border-bottom:1px solid var(--t-line);font-size:.98rem;line-height:1.5}
.ve-compare thead th{font-family:var(--t-fmono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--t-prose-dim);background:color-mix(in srgb,var(--t-accent) 6%,transparent);border-bottom:1px solid var(--t-line)}
.ve-compare thead .ve-compare-us{color:var(--t-accent);font-weight:600}
.ve-compare tbody th{font-weight:500;color:var(--t-heading);font-family:var(--t-fbody);width:34%}
.ve-compare tbody td{color:var(--t-prose);width:33%}
.ve-compare-cell-text{display:block;margin-top:2px;font-size:.92rem}
.ve-compare-yes>span[aria-hidden]{display:inline-block;color:var(--t-accent);font-weight:600;margin-right:8px}
.ve-compare-no>span[aria-hidden]{display:inline-block;color:var(--t-prose-dim);opacity:.6;margin-right:8px}
.ve-compare-us-cell{background:color-mix(in srgb,var(--t-accent) 4%,transparent);font-weight:500}
.ve-compare-row--hl th,.ve-compare-row--hl td{background:color-mix(in srgb,var(--t-accent) 7%,transparent)}
.ve-compare-row--hl .ve-compare-us-cell{background:color-mix(in srgb,var(--t-accent) 11%,transparent)}
.ve-compare tbody tr:last-child th,.ve-compare tbody tr:last-child td{border-bottom:0}
.ve-compare-cta{margin-top:clamp(32px,4vw,48px);display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
`

function StyleInject() {
  return <style dangerouslySetInnerHTML={{ __html: COMPARE_CSS }} />
}

export default function ComparePage() {
  return (
    <>
      <StyleInject />
      <ThemedShell
        variant={`compare-${COMPETITOR_SLUG}`}
        hero={<Hero />}
        signature={<><ComparisonTable /><CompareFAQ /></>}
        close={{
          title: <>Stop summarizing meetings. <Mark>Start acting on them.</Mark></>,
          sub: 'Knowcap is the AI meeting tool with agents that do the work — under your human-confirmed control.',
        }}
      />
    </>
  )
}
