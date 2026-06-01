'use client'

/**
 * Knowcap vs Fireflies.ai — competitor comparison landing page.
 * SEO bait for "Knowcap vs Fireflies" / "alternative to Fireflies.ai".
 * Emphasis: multilingual mid-meeting code-switching + agent actions.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal } from '@/components/impeccable/kit'

const COMPETITOR = 'Fireflies.ai'
const COMPETITOR_SLUG = 'fireflies'
const REGISTER_URL = `${APP_URL}/register?utm_source=compare_${COMPETITOR_SLUG}_page`

const COMPARISON_ROWS: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Meeting recording (Zoom, Meet, Teams)', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI transcript', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI summary', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  // verified 2026-06-01 source: https://fireflies.ai/ — Fireflies auto-creates tasks in Asana/Trello + auto-fills Salesforce/HubSpot from AI output (no human gate)
  { feature: 'Action items detected', them: 'Auto-creates tasks in Asana / CRM (no gate)', us: 'Live agents act on confirmed facts only', them_yes: true, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://fireflies.ai/ — Fireflies "Auto-Language Detection" switches MEETING-TO-MEETING (one language per recording), not mid-utterance
  { feature: 'Multilingual mid-meeting code-switching (English / Arabic / Hindi / Tagalog)', them: 'Auto-detects per meeting, single language per recording', us: 'Switches per utterance', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Human verification before agent action', them: 'No — automation runs on AI output', us: 'Every fact confirmed by a named person before agents act', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Odoo SH ticket creation from meeting', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'GitHub PR generation from bug recording', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://fireflies.ai/ — Fireflies shipped an MCP server (Claude/Devin/ChatGPT); ours is differentiated by serving verified facts not raw AI summaries
  { feature: 'MCP server for AI agent access', them: 'Yes (serves AI-generated summaries)', us: 'Yes — serves human-verified facts only', them_yes: true, us_yes: true, highlight: true },
  { feature: 'WhatsApp / Telegram capture', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Built for Odoo implementation partners', them: 'No', us: 'Built by an Odoo partner', them_yes: false, us_yes: true },
  { feature: 'MENA market focus (Arabic UI / data residency)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Audit trail for AI agent actions', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
]

const FAQS = [
  {
    q: `Can I import my ${COMPETITOR} history into Knowcap?`,
    a: `Yes. Export your ${COMPETITOR} transcripts and upload them as sources into a Knowcap project. Knowcap re-indexes them, extracts decisions / risks / tasks, and routes them through the human-verification queue — so your existing recordings get the trust layer too.`,
  },
  {
    q: `Does Knowcap work with the same meeting tools as ${COMPETITOR}?`,
    a: `Yes — Zoom, Google Meet, and Microsoft Teams are all supported. Knowcap also captures WhatsApp voice notes, Telegram audio, in-person mobile recordings, and screen shares — coverage ${COMPETITOR} doesn't reach.`,
  },
  {
    q: `Why is Knowcap better than ${COMPETITOR} for MENA SMEs and bilingual teams?`,
    a: `${COMPETITOR} forces you to pick one language per recording. The moment your sales call code-switches between Arabic and English (or English and Hindi, or any other pair), ${COMPETITOR}'s transcript misses lines and the AI summary loses context. Knowcap detects language per utterance, so the bilingual reality of a MENA / South Asian / Filipino sales meeting is captured intact.`,
  },
  {
    q: `How is the verification step different from ${COMPETITOR}'s AI summary?`,
    a: `${COMPETITOR}'s "AskFred" gives you summaries the AI generated and pipes action items to your CRM automatically. If the AI misheard, the wrong action lands in HubSpot. Knowcap shows each extracted fact as a claim card with timestamp + speaker quote; a human (you) confirms or rejects with one tap. Only confirmed claims feed agents that take real-world actions.`,
  },
  {
    q: `Can I try Knowcap for free before switching from ${COMPETITOR}?`,
    a: `Yes. Sign up free at app.knowcap.ai — no credit card. Run a real bilingual meeting through both systems and compare the transcripts. The multilingual gap is usually visible in the first session.`,
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
            {COMPETITOR} gives you a meeting transcript and an AI summary. Knowcap captures the
            meeting, extracts every decision / risk / task, lets a human confirm with one tap, then
            triggers agents that open PRs, create Odoo tickets, send WhatsApp messages — based on
            what was confirmed. The summary is table stakes. The agent action is the product.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={REGISTER_URL}>Switch from {COMPETITOR} free <Arrow /></a>
            <a className="ve-btn ve-btn--ghost" href="#demo">See the difference live</a>
          </motion.div>
          <motion.div className="ve-trust" variants={rise}>
            <span>Multilingual per-utterance</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Human-verified facts only</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Agents that ship work</span>
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
            Where {COMPETITOR} stops at automated CRM updates, Knowcap continues — through human verification, into real-world action.
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
