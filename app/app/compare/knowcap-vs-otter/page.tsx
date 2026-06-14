'use client'

/**
 * Knowcap vs Otter.ai — competitor comparison landing page.
 * SEO bait for "Knowcap vs Otter" / "alternative to Otter.ai".
 * Emphasis: multilingual mid-meeting code-switching + agent actions + MENA focus.
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { COMPARE_CSS } from '../compare-styles'

const COMPETITOR = 'Otter.ai'
const COMPETITOR_SLUG = 'otter'
const APP_URL = 'https://app.knowcap.ai'
const REGISTER_URL = `${APP_URL}/register?utm_source=compare_${COMPETITOR_SLUG}_page`

const COMPARISON_ROWS: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Reads the screen — slides, shared docs & on-screen actions (not just the audio)', them: 'Slides only — screenshots in the transcript, not read (gated AI image-chat on Business/Enterprise)', us: 'Yes — captures the screen and AI-reads what’s shown (slides, docs, code, dashboards), timestamped & searchable', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Meeting recording (Zoom, Meet, Teams)', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI transcript', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI summary', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'Action items detected', them: 'Read-only list', us: 'Live agents act on them', them_yes: true, us_yes: true, highlight: true },
  // verified 2026-06-01 source: https://help.otter.ai/hc/en-us/articles/360047247414 — Otter requires manual language selection per recording; only French↔English auto-switches
  { feature: 'Multilingual mid-meeting code-switching (English / Arabic / Hindi / Tagalog)', them: 'Single language per recording (French↔English only)', us: 'Switches per utterance', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Human verification before agent action', them: 'No', us: 'Every fact confirmed by a named person before agents act', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Odoo SH ticket creation from meeting', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'GitHub PR generation from bug recording', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  // verified 2026-06-01 source: https://otter.ai/ — Otter shipped an MCP server (ChatGPT/Claude can read meeting knowledge); ours is differentiated by writing verified facts back
  { feature: 'MCP server for AI agent access', them: 'Read-only (query transcripts)', us: 'Read + write verified facts to your stack', them_yes: true, us_yes: true, highlight: true },
  { feature: 'Telegram capture (WhatsApp coming)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Built for Odoo implementation partners', them: 'No', us: 'Built by an Odoo partner', them_yes: false, us_yes: true },
  { feature: 'MENA market focus (Arabic UI / data residency)', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Audit trail for AI agent actions', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
]

const FAQS = [
  {
    q: `Can I import my ${COMPETITOR} history into Knowcap?`,
    a: `Yes. Export your ${COMPETITOR} transcripts (TXT / DOCX) and upload them as sources into a Knowcap project. Knowcap re-indexes them, extracts decisions / risks / tasks, and routes them through the same human-verification queue as fresh recordings — so your back catalog gets the trust layer too.`,
  },
  {
    q: `Does Knowcap work with the same meeting tools as ${COMPETITOR}?`,
    a: `Yes — Zoom, Google Meet, and Microsoft Teams are all supported. Knowcap also captures Telegram messages, in-person mobile recordings, screen recordings, and documents/URLs (WhatsApp, email, and Slack are coming), which ${COMPETITOR} doesn't.`,
  },
  {
    q: `Why is Knowcap better than ${COMPETITOR} for MENA SMEs and Odoo partners?`,
    a: `Three reasons. (1) Multilingual handling: ${COMPETITOR} forces you to pick one language per recording, which breaks the moment your client switches between Arabic and English mid-sentence — Knowcap switches per utterance. (2) Data residency: Knowcap can run in EU / MENA regions; ${COMPETITOR} is US-only. (3) Knowcap was built by an Odoo implementation partner — confirmed scope decisions can open SH tickets and PRs directly, not just sit as bullets in a summary.`,
  },
  {
    q: `How is the verification step different from ${COMPETITOR}'s AI summary?`,
    a: `${COMPETITOR} gives you a summary the AI generated. You read it and trust it (or don't). Knowcap shows each extracted fact as a claim card with the exact timestamp + speaker quote, and a human (you) confirms or rejects it with one tap. Only confirmed claims feed the agents that take real-world actions — so when a client says "that's not what we agreed," you have the record.`,
  },
  {
    q: `Can I try Knowcap for free before switching from ${COMPETITOR}?`,
    a: `Yes. Sign up free at app.knowcap.ai — no credit card. Test it on one real meeting against your existing ${COMPETITOR} workflow. Most teams see the multilingual handling and the agent actions in the first session.`,
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
          sub={`${COMPETITOR} gives you a meeting transcript and an AI summary. Knowcap captures the work — meetings, messages, and recordings — extracts every decision / risk / task, lets a human confirm with one tap, then triggers agents that open PRs and create Odoo tickets. It's the trust layer for your AI agents: only what a human confirmed ever reaches your stack.`}
        />
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="cm-cta-row">
              <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Switch from {COMPETITOR} free →</a>
              <Link className="cl-btn cl-btn--ghost" href="/contact-us">Contact us</Link>
            </div>
            <div className="cm-section" id="compare">
              <h2 className="cm-h2">Side by side</h2>
              <p className="cm-lead">Where {COMPETITOR} stops at the transcript, Knowcap continues — through human verification, into real-world action.</p>
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
