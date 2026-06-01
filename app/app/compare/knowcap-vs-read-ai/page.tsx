'use client'

/**
 * Knowcap vs Read.ai — competitor comparison landing page.
 * SEO bait for "Knowcap vs Read.ai" / "alternative to Read.ai".
 * Emphasis: human-verification + Odoo/GitHub agents + MCP.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal } from '@/components/impeccable/kit'

const COMPETITOR = 'Read.ai'
const COMPETITOR_SLUG = 'read-ai'
const REGISTER_URL = `${APP_URL}/register?utm_source=compare_${COMPETITOR_SLUG}_page`

const COMPARISON_ROWS: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Meeting recording (Zoom, Meet, Teams)', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI transcript', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI summary + meeting analytics', them: 'Yes (sentiment, engagement)', us: 'Yes (claims-and-evidence)', them_yes: true, us_yes: true },
  // verified 2026-06-01 source: https://www.read.ai/ — Read.ai auto-syncs action items to Slack/Notion/Asana/Salesforce/HubSpot via Ada agent; no human gate before push
  { feature: 'Action items detected', them: 'Auto-pushed to Slack / Notion / CRM (no gate)', us: 'Live agents act on confirmed facts only', them_yes: true, us_yes: true, highlight: true },
  { feature: 'Human verification before agent action', them: 'No — Ada agent pushes without review', us: 'Every fact confirmed by a named person before agents act', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Multilingual mid-meeting code-switching', them: 'Single language per recording (20+ supported, one at a time)', us: 'Switches per utterance', them_yes: false, us_yes: true },
  { feature: 'Odoo SH ticket creation from meeting', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'GitHub PR generation from bug recording', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://www.read.ai/ — Read.ai shipped an MCP server; ours is differentiated because it serves verified facts (not raw AI summaries)
  { feature: 'MCP server for AI agent access', them: 'Yes (serves AI-generated summaries)', us: 'Yes — serves human-verified facts only', them_yes: true, us_yes: true, highlight: true },
  { feature: 'WhatsApp / Telegram capture', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Built for Odoo implementation partners', them: 'No', us: 'Built by an Odoo partner', them_yes: false, us_yes: true },
  { feature: 'MENA market focus (Arabic UI / data residency)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Audit trail for AI agent actions', them: 'No', us: 'Yes — every action timestamped to its source', them_yes: false, us_yes: true, highlight: true },
]

const FAQS = [
  {
    q: `Can I import my ${COMPETITOR} history into Knowcap?`,
    a: `Yes. Export your ${COMPETITOR} transcripts and upload them as sources into a Knowcap project. Knowcap re-extracts decisions / risks / tasks and routes them through the human-verification queue — so your back catalog gets the trust layer that ${COMPETITOR} never gave it.`,
  },
  {
    q: `Does Knowcap work with the same meeting tools as ${COMPETITOR}?`,
    a: `Yes — Zoom, Google Meet, and Microsoft Teams are all supported. Knowcap also captures WhatsApp voice notes, Telegram audio, screen recordings, and uploaded documents, which ${COMPETITOR} doesn't.`,
  },
  {
    q: `Why is Knowcap better than ${COMPETITOR} for regulated industries?`,
    a: `${COMPETITOR}'s AI summaries are inputs to a black box — when a regulator or a client asks "who decided this and when," there's no audit trail. Knowcap pairs every agent action to a human-confirmed claim, with timestamp + speaker quote + the named person who confirmed it. The audit ledger is the product, not an afterthought.`,
  },
  {
    q: `How is the verification step different from ${COMPETITOR}'s AI summary?`,
    a: `${COMPETITOR} writes the summary, its Ada agent pushes the action items straight into Slack / Notion / Salesforce, and you trust it. If the AI misheard, the wrong task lands in your stack. Knowcap shows each extracted fact as a claim card — exact timestamp, speaker quote, classification (decision / risk / task) — and a human (you) confirms or rejects it with one tap. Only confirmed claims feed the agents that take real-world actions. Sentiment analytics are a side dish; verified action is the main course.`,
  },
  {
    q: `Can I try Knowcap for free before switching from ${COMPETITOR}?`,
    a: `Yes. Sign up free at app.knowcap.ai — no credit card. Run one real meeting through both systems and compare what each one will do with the output. ${COMPETITOR} pushes whatever its AI heard straight into your CRM. Knowcap pauses on each claim until a human confirms — then ships a PR.`,
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
            <span>Human-verified facts only</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>MCP-native</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Full audit trail on every action</span>
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
            Where {COMPETITOR} stops at the summary, Knowcap continues — through human verification, into real-world action.
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
