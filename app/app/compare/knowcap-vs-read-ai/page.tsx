'use client'

/**
 * Knowcap vs Read.ai — competitor comparison landing page.
 * SEO bait for "Knowcap vs Read.ai" / "alternative to Read.ai".
 * Emphasis: human-verification + Odoo/GitHub agents + MCP.
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { COMPARE_CSS } from '../compare-styles'

const COMPETITOR = 'Read.ai'
const COMPETITOR_SLUG = 'read-ai'
const APP_URL = 'https://app.knowcap.ai'
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
  { feature: 'Telegram capture (WhatsApp coming)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Captures documents, URLs & screen recordings', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
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
    a: `Yes — Zoom, Google Meet, and Microsoft Teams are all supported. Knowcap also captures Telegram messages, in-person mobile recordings, screen recordings, and documents/URLs, which ${COMPETITOR} doesn't (WhatsApp, email, and Slack are coming).`,
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

export default function ComparePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: COMPARE_CSS }} />
      <EditorialShell>
        <PageHero
          kicker={`Comparison · Knowcap vs ${COMPETITOR}`}
          title={<>{COMPETITOR} transcribes. Knowcap <span style={{ color: 'var(--green)' }}>acts.</span></>}
          sub={`${COMPETITOR} gives you a meeting transcript and an AI summary. Knowcap captures the work — meetings, messages, and recordings — extracts every decision / risk / task, lets a human confirm with one tap, then triggers agents that open PRs and create Odoo tickets. It's the trust layer for your AI agents: nothing ships until a named person confirms it.`}
        />
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="cm-cta-row">
              <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Switch from {COMPETITOR} free →</a>
              <Link className="cl-btn cl-btn--ghost" href="/contact-us">Contact us</Link>
            </div>
            <div className="cm-section" id="compare">
              <h2 className="cm-h2">Side by side</h2>
              <p className="cm-lead">Where {COMPETITOR} stops at the summary, Knowcap continues — through human verification, into real-world action.</p>
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
            <p style={{ marginTop: 20, marginBottom: 0 }}>
              <a
                className="cm-close-link"
                href="/compare"
                style={{ color: 'rgba(251,250,248,.7)', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                See all comparisons →
              </a>
            </p>
          </div>
        </div>
      </EditorialShell>
    </>
  )
}
