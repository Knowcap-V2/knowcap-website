'use client'

/**
 * Knowcap vs Fireflies.ai — competitor comparison landing page.
 * SEO bait for "Knowcap vs Fireflies" / "alternative to Fireflies.ai".
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { COMPARE_CSS } from '../compare-styles'

const COMPETITOR = 'Fireflies.ai'
const COMPETITOR_SLUG = 'fireflies'
const APP_URL = 'https://app.knowcap.ai'
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
  { feature: 'Telegram capture (WhatsApp coming)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Captures documents / URLs + screen recordings', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
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
    a: `Yes — Zoom, Google Meet, and Microsoft Teams are all supported. Knowcap also captures Telegram messages, in-person mobile recordings, screen recordings, and documents/URLs (WhatsApp, email, and Slack are coming) — coverage ${COMPETITOR} doesn't reach.`,
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

export default function ComparePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: COMPARE_CSS }} />
      <EditorialShell>
        <PageHero
          kicker={`Comparison · Knowcap vs ${COMPETITOR}`}
          title={<>{COMPETITOR} transcribes. Knowcap <span style={{ color: 'var(--green)' }}>acts.</span></>}
          sub={`${COMPETITOR} gives you a meeting transcript and an AI summary. Knowcap captures the work — meetings, messages, and recordings —, extracts every decision / risk / task, lets a human confirm with one tap, then triggers agents that open PRs and create Odoo tickets. It's the trust layer for your AI agents: they act only on what a human confirmed.`}
        />
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="cm-cta-row">
              <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Switch from {COMPETITOR} free →</a>
              <Link className="cl-btn cl-btn--ghost" href="/book">Book a 20-min demo</Link>
            </div>
            <div className="cm-section" id="compare">
              <h2 className="cm-h2">Side by side</h2>
              <p className="cm-lead">Where {COMPETITOR} stops at automated CRM updates, Knowcap continues — through human verification, into real-world action.</p>
              <div className="cm-table-wrap" role="region" aria-label={`Knowcap vs ${COMPETITOR} feature comparison`}>
                <table className="cm-table">
                  <thead>
                    <tr>
                      <th scope="col">Feature</th>
                      <th scope="col">{COMPETITOR}</th>
                      <th scope="col" className="cm-us">Knowcap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.feature} className={row.highlight ? 'cm-hl' : ''}>
                        <th scope="row">{row.feature}</th>
                        <td className={row.them_yes ? 'cm-yes' : 'cm-no'}>
                          <span aria-hidden="true">{row.them_yes ? '✓' : '✕'}</span>
                          <span className="cm-cell-text">{row.them}</span>
                        </td>
                        <td className={row.us_yes ? 'cm-yes cm-us-cell' : 'cm-no'}>
                          <span aria-hidden="true">{row.us_yes ? '✓' : '✕'}</span>
                          <span className="cm-cell-text">{row.us}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cm-cta-row cm-cta-center">
                <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Switch from {COMPETITOR} free →</a>
                <Link className="cl-btn cl-btn--ghost" href="/book">Book a 20-min demo</Link>
              </div>
            </div>
            <div className="cm-section">
              <h2 className="cm-h2" style={{ textAlign: 'center' }}>Switching from {COMPETITOR}</h2>
              <div className="cm-faq">
                {FAQS.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}</summary>
                    <div className="cm-faq-a">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="cm-close">
          <div className="cl-wrap">
            <h2>Stop trusting raw AI summaries.<br />Ship only what a human confirmed.</h2>
            <p>Knowcap is verified work intelligence — the trust layer for your AI agents, under human-confirmed control.</p>
            <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Get Started Free →</a>
          </div>
        </div>
      </EditorialShell>
    </>
  )
}
