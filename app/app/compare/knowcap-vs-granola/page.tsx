'use client'

/**
 * Knowcap vs Granola.ai — competitor comparison landing page.
 * SEO bait for "Knowcap vs Granola" / "alternative to Granola.ai".
 * Emphasis: mobile + Telegram + screen/doc capture vs Granola's Mac-desktop-only model, agent actions.
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import { COMPARE_CSS } from '../compare-styles'

const COMPETITOR = 'Granola.ai'
const COMPETITOR_SLUG = 'granola'
const APP_URL = 'https://app.knowcap.ai'
const REGISTER_URL = `${APP_URL}/register?utm_source=compare_${COMPETITOR_SLUG}_page`

const COMPARISON_ROWS: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Capture inputs (meetings, recordings, docs/URLs)', them: 'Desktop-app system audio only', us: 'Meetings (Meet) + calls/recordings + screen recordings + documents/URLs', them_yes: true, us_yes: true, highlight: true },
  { feature: 'AI transcript', them: 'Yes', us: 'Yes', them_yes: true, us_yes: true },
  { feature: 'AI summary + editable note', them: 'Yes — its signature surface', us: 'Yes', them_yes: true, us_yes: true },
  // verified 2026-06-01 source: https://www.granola.ai/download — Granola added iPhone app late 2025; still no Android, no in-person/field-call optimization on either OS
  { feature: 'Mobile capture (iOS / Android, in-person, recordings)', them: 'iPhone only (no Android, no field-call mode)', us: 'Full mobile capture (iOS + Android) for in-person and field calls', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Telegram capture (WhatsApp coming)', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Action items detected', them: 'In the note (read-only)', us: 'Live agents act on them', them_yes: true, us_yes: true, highlight: true },
  { feature: 'Human verification before agent action', them: 'No', us: 'Every fact confirmed by a named person before agents act', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Multilingual mid-meeting code-switching', them: 'Single language per recording', us: 'Switches per utterance', them_yes: false, us_yes: true },
  { feature: 'Odoo SH ticket creation from meeting', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'GitHub PR generation from bug recording', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'MCP server for AI agent access', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Built for Odoo implementation partners', them: 'No', us: 'Built by an Odoo partner', them_yes: false, us_yes: true },
  { feature: 'MENA market focus (Arabic UI / data residency)', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Audit trail for AI agent actions', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
]

const FAQS = [
  {
    q: `Can I import my ${COMPETITOR} history into Knowcap?`,
    a: `Yes. Export your ${COMPETITOR} notes (Markdown) and upload them as sources into a Knowcap project. Knowcap re-indexes them, extracts decisions / risks / tasks, and routes them through the human-verification queue — so your existing notes become searchable, agent-actionable memory.`,
  },
  {
    q: `Does Knowcap work with the same meeting tools as ${COMPETITOR}?`,
    a: `Yes — Zoom, Google Meet, Microsoft Teams. The difference is HOW: ${COMPETITOR} runs as a Mac/Windows desktop app capturing system audio, with an iPhone companion for syncing (no Android, no in-person room mode). Knowcap also sends a meeting bot to the call (cloud-side) and captures from your phone — iOS or Android — for in-person rooms, screen recordings, Telegram messages, and documents/URLs (WhatsApp, email, and Slack are coming). You're not tied to your laptop being open, or to iOS.`,
  },
  {
    q: `Why is Knowcap better than ${COMPETITOR} for sales teams and field operators?`,
    a: `${COMPETITOR} is great when you're at your desk on a Zoom call, or on iPhone syncing back to it. The moment you take a meeting in-person, on the phone, on Telegram, or you're on the road with an Android — ${COMPETITOR}'s model doesn't reach (WhatsApp, email, and Slack capture are coming to Knowcap too). Knowcap captures the work you're actually doing, regardless of device or channel. And the captured work feeds agents that take real-world action — not just a clean note.`,
  },
  {
    q: `How is the verification step different from ${COMPETITOR}'s AI summary?`,
    a: `${COMPETITOR}'s value prop is the editable AI note that mirrors how you'd take notes by hand. It's beautifully designed and read-only output. Knowcap turns each extracted fact into a claim card — exact timestamp, speaker quote — and a human (you) confirms with one tap. Confirmed claims trigger agents: PR opened, Odoo ticket created, Telegram follow-up sent. The note is not the deliverable; the action is.`,
  },
  {
    q: `Can I try Knowcap for free before switching from ${COMPETITOR}?`,
    a: `Yes. Sign up free at app.knowcap.ai — no credit card. Try one mobile / in-person meeting and one Zoom call. If ${COMPETITOR} can't capture both, you've already seen the difference.`,
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
          sub={`${COMPETITOR} gives you a beautiful AI note from a desktop video call. Knowcap captures the work — meetings, messages, and recordings — the in-person room, the Telegram thread, the screen recording — extracts every decision / risk / task, lets a human confirm, then triggers agents that ship real work. Knowcap is verified work intelligence — the trust layer for your AI agents, under human-confirmed control.`}
        />
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="cm-cta-row">
              <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Switch from {COMPETITOR} free →</a>
              <Link className="cl-btn cl-btn--ghost" href="/book">Book a 20-min demo</Link>
            </div>
            <div className="cm-section" id="compare">
              <h2 className="cm-h2">Side by side</h2>
              <p className="cm-lead">Where {COMPETITOR} ends at a clean desktop note, Knowcap continues — capturing mobile + Telegram + screen recordings + in-person calls, verifying each claim, and acting on the confirmed ones.</p>
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
