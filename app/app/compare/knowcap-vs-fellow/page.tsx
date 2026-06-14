'use client'

/**
 * Knowcap vs Fellow.app — competitor comparison landing page.
 * SEO bait for "Knowcap vs Fellow" / "alternative to Fellow.app".
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { COMPARE_CSS } from '../compare-styles'
import CompareJsonLd from '@/components/compare/compare-json-ld'

const COMPETITOR = 'Fellow.app'
const COMPETITOR_SLUG = 'fellow'
const APP_URL = 'https://app.knowcap.ai'
const REGISTER_URL = `${APP_URL}/register?utm_source=compare_${COMPETITOR_SLUG}_page`

const COMPARISON_ROWS: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Reads the screen — slides, shared docs & on-screen actions (not just the audio)', them: 'No — the bot records the screen video, but intelligence comes from the audio transcript', us: 'Yes — captures the screen and AI-reads what’s shown (slides, docs, code, dashboards), timestamped & searchable', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Meeting recording (Zoom, Meet, Teams)', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI transcript', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI summary', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  // verified 2026-06-01 source: https://fellow.ai/ — Fellow rebranded fellow.app → fellow.ai late 2025; AI summary + AskFellow agent now the hero, agenda is secondary
  { feature: 'Collaborative meeting agenda + notes workspace', them: 'Yes — agenda + AI workspace', us: 'Yes, but built around verified evidence', them_yes: true, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://fellow.ai/ — AskFellow agent auto-syncs action items to Salesforce/HubSpot/Jira/Linear/Asana with no human gate
  { feature: 'Action items detected', them: 'AskFellow auto-syncs to CRM / Jira (no gate)', us: 'AI-extracted, human-confirmed, agent-executed', them_yes: true, us_yes: true, highlight: true },
  { feature: 'Captures unstructured work (no agenda — Telegram, in-person, screen recordings, docs/URLs)', them: 'No — calendar-meeting-required model', us: 'Yes — any source becomes a project memory', them_yes: false, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://fellow.ai/ — Fellow supports 92 languages auto-detection per meeting, not mid-utterance code-switching
  { feature: 'Multilingual mid-meeting code-switching', them: 'Auto-detects per meeting (92 langs), one per recording', us: 'Switches per utterance', them_yes: false, us_yes: true },
  { feature: 'Human verification before agent action', them: 'No — AskFellow runs on AI output', us: 'Every fact confirmed by a named person before agents act', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Odoo SH ticket creation from meeting', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'GitHub PR generation from bug recording', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  // verified 2026-06-01 source: https://fellow.ai/ — Fellow shipped MCP server + Claude Connector; ours is differentiated by serving verified facts (not raw AI output)
  { feature: 'MCP server for AI agent access', them: 'Yes (serves AI summaries)', us: 'Yes — serves human-verified facts only', them_yes: true, us_yes: true, highlight: true },
  { feature: 'Telegram capture (WhatsApp coming)', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
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
    a: `Yes — Zoom, Google Meet, and Microsoft Teams. Knowcap goes further: Telegram messages, in-person mobile recordings, screen recordings, and uploaded documents/URLs (WhatsApp, email, and Slack are coming). ${COMPETITOR} requires a structured calendar meeting; Knowcap captures the unstructured side of how work actually happens.`,
  },
  {
    q: `Why is Knowcap better than ${COMPETITOR} for Odoo partners and operating teams?`,
    a: `${COMPETITOR} is a meeting workspace with an AI agent (AskFellow) that auto-syncs action items to Salesforce / Jira / Asana the moment the AI hears them. If the AI misheard, the wrong task lands on your sprint board. Knowcap is the trust layer: same agent outputs (PR on Odoo SH, ticket on sprint board, Telegram follow-up), but every one of them is gated by a one-tap human confirmation against the exact timestamp and speaker quote. Same destinations, very different liability surface.`,
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

export default function ComparePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: COMPARE_CSS }} />
      <CompareJsonLd slug="fellow" competitor={COMPETITOR} faqs={FAQS} />
      <EditorialShell>
        <PageHero
          kicker={`Comparison · Knowcap vs ${COMPETITOR}`}
          title={<>{COMPETITOR} transcribes. Knowcap <span style={{ color: 'var(--green)' }}>acts.</span></>}
          sub={`${COMPETITOR} gives you a meeting agenda, transcript, and AI summary. Knowcap captures the work — meetings, messages, and recordings — extracts every decision / risk / task, lets a human confirm, then triggers agents that ship real work. Knowcap is verified work intelligence — the trust layer for your AI agents, under human-confirmed control.`}
        />
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="cm-cta-row">
              <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Switch from {COMPETITOR} free →</a>
              <Link className="cl-btn cl-btn--ghost" href="/contact-us">Contact us</Link>
            </div>
            <div className="cm-section" id="compare">
              <h2 className="cm-h2">Side by side</h2>
              <p className="cm-lead">Where {COMPETITOR} ends at a tidy meeting page, Knowcap continues — capturing unstructured calls, verifying every claim, and acting on the confirmed ones.</p>
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
                <Link className="cl-btn cl-btn--ghost" href="/contact-us">Contact us</Link>
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
            <p><a className="cm-close-link" href="/compare">See all comparisons →</a></p>
          </div>
        </div>
      </EditorialShell>
    </>
  )
}
