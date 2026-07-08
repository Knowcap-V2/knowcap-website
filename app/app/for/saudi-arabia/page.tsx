import type { Metadata } from 'next'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import SiteJsonLd from '@/components/site/site-json-ld'
import { SAUDI_FAQ } from '@/lib/site-schema'
import { COMPARE_CSS } from '../../compare/compare-styles'

// /for/saudi-arabia — KSA beachhead / SEO landing page.
// Target keyword: "AI meeting notes" (Saudi Arabia) + Arabic محضر اجتماع intent.
// Closes the internal-link gap: three blog posts already link here.
export const metadata: Metadata = {
  title: 'AI Meeting Notes Saudi Arabia — Arabic + English | Knowcap',
  description:
    'AI meeting notes for Saudi teams. Captures Arabic↔English code-switching, exports the محضر in either language, a human confirms each claim. PDPL-ready.',
  alternates: { canonical: 'https://knowcap.ai/for/saudi-arabia' },
  openGraph: {
    title: 'AI Meeting Notes for Saudi Arabia — Arabic + English, PDPL-ready',
    description:
      'Real Riyadh meetings switch between Arabic and English mid-sentence. Knowcap captures them intact, exports the محضر in either language, and a named human confirms every decision before any agent acts.',
    url: 'https://knowcap.ai/for/saudi-arabia',
    type: 'website',
    images: [{ url: '/og/default.jpg', width: 1376, height: 768, alt: 'Knowcap — The Trust Layer for AI Agents' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/default.jpg'],
  },
}

const REGISTER_URL = 'https://app.knowcap.ai/register?utm_source=saudi_arabia_page'

const STEPS = [
  {
    n: '1',
    h: 'Listen',
    b: 'Joins Zoom, Google Meet, or Teams — or captures a voice note, chat message, Telegram thread, screen recording, or an uploaded document or URL. In-person meetings record without a bot awkwardly joining the call.',
  },
  {
    n: '2',
    h: 'Extract',
    b: 'AI pulls every decision, task, and risk out of the conversation as a claim card, each one pinned to its exact timestamp, the speaker quote, and a classification.',
  },
  {
    n: '3',
    h: 'Confirm',
    b: 'A named human reads each claim and approves or rejects it with one tap. Nothing moves until a person signs off.',
  },
  {
    n: '4',
    h: 'Act',
    b: 'Only confirmed claims feed the agents — they open Odoo SH tickets, draft GitHub PRs, and send follow-ups, each traceable to the confirmed claim and the person who approved it. An MCP server serves these human-verified facts to AI agents, not raw summaries.',
  },
]

const TABLE: { feature: string; them: string; us: string; them_yes: boolean; us_yes: boolean; highlight?: boolean }[] = [
  { feature: 'Arabic ↔ English in one meeting', them: 'One language per recording — switched lines lost', us: 'Language per utterance — kept intact', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Exports the محضر اجتماع in Arabic or English', them: 'No', us: 'Yes', them_yes: false, us_yes: true },
  { feature: 'Human confirmation before any action', them: 'No — auto-pushes raw AI output', us: 'One-tap confirm by a named human', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Audit trail — every action to a timestamped speaker quote', them: 'No', us: 'Yes', them_yes: false, us_yes: true, highlight: true },
  { feature: 'Acts on the meeting (Odoo SH ticket, GitHub PR)', them: 'Stops at a summary', us: 'Agents act on confirmed facts', them_yes: false, us_yes: true },
  { feature: 'In-person capture without a meeting bot', them: 'Limited', us: 'Voice notes, Telegram, recordings', them_yes: false, us_yes: true },
  { feature: 'Data residency (EU/MENA regions)', them: 'Not typically offered', us: 'EU/MENA available', them_yes: false, us_yes: true },
  { feature: 'Built MENA-first', them: 'No MENA presence', us: 'By an Odoo partner, for MENA', them_yes: false, us_yes: true },
]

const SA_CSS = `
.sa-def{background:color-mix(in srgb,var(--green) 6%,var(--white));border:1px solid var(--border);border-left:3px solid var(--green);border-radius:8px;padding:22px 26px;margin:4px 0 8px;max-width:74ch}
.sa-def h2{font-family:var(--disp);font-size:clamp(1.3rem,2.4vw,1.7rem);font-weight:460;letter-spacing:-.02em;font-variation-settings:'SOFT' 55,'WONK' 0;margin:0 0 10px}
.sa-def p{color:var(--sec);font-size:15.5px;line-height:1.75;margin:0}
.sa-prose p{color:var(--sec);font-size:16px;line-height:1.8;max-width:68ch;margin:0 0 16px}
.sa-prose p:last-child{margin-bottom:0}
.sa-prose a{color:var(--green-dark);text-decoration:underline;text-underline-offset:3px}
.sa-steps{display:grid;gap:18px;max-width:72ch;margin-top:8px}
.sa-step{display:flex;gap:16px;align-items:flex-start}
.sa-step-n{flex-shrink:0;width:30px;height:30px;border-radius:50%;background:color-mix(in srgb,var(--green) 14%,transparent);color:var(--green-dark);font-family:var(--mono);font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;margin-top:2px}
.sa-step-h{font-weight:560;color:var(--ink);font-size:16px;margin-bottom:3px}
.sa-step-b{color:var(--sec);font-size:14.5px;line-height:1.65}
`

export default function SaudiArabiaPage() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: COMPARE_CSS + SA_CSS }} />
      <SiteJsonLd faqs={SAUDI_FAQ} speakable />
      <PageHero
        kicker="For Saudi Arabia · Arabic ↔ English · PDPL-ready"
        title={<>AI meeting notes for Saudi teams — in Arabic and English, <span style={{ color: 'var(--green)' }}>confirmed by a human</span></>}
        sub="Real Riyadh meetings don't pick one language — they switch between Arabic and English mid-sentence. Knowcap captures them intact, turns every decision, task, and risk into a claim card pinned to its timestamp and speaker quote, and waits for one human tap before any agent acts. The محضر comes out in Arabic or English. Humans confirm. Agents act."
      />
      <div className="cl-page-body">
        <div className="cl-wrap">
          <div className="cm-cta-row">
            <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Start free →</a>
            <Link className="cl-btn cl-btn--ghost" href="/contact-us">Talk to us</Link>
          </div>

          <div className="cm-section" style={{ paddingBottom: 0 }}>
            <div className="sa-def">
              <h2>What are AI meeting notes?</h2>
              <p>AI meeting notes are an automatic record of a meeting — transcript, decisions, tasks, and risks — produced by AI instead of a person typing minutes. Knowcap follows a Listen → Extract → Confirm → Act pipeline: it listens to the meeting, extracts each decision, task, and risk as a claim card pinned to its timestamp and speaker quote, has a named human confirm or reject each one with a single tap, and only then lets AI agents act on what was confirmed. For Saudi teams that matters twice over: the meeting is captured intact even when it switches between Arabic and English mid-sentence, and nothing the AI mis-heard becomes a wrong ticket — because a person signed off first.</p>
            </div>
          </div>

          <div className="cm-section">
            <h2 className="cm-h2">The Saudi meeting problem: Arabic, English, and the محضر in between</h2>
            <div className="sa-prose">
              <p>Saudi business runs in Arabic by default — government tenders, board minutes, regulatory submissions, the محضر اجتماع that has to be on file. But a real Riyadh meeting is not pure Arabic. It is Arabic with English business terms dropped in mid-sentence — the code-switch that happens dozens of times in one call.</p>
              <p>The incumbents optimize for one language per recording. Otter, Fireflies, and Read.ai expect Arabic or English, then lose the lines where the meeting switched. You get a transcript with holes exactly where the decisions were made.</p>
              <p>Knowcap keeps language per utterance. The Arabic stays Arabic, the English stays English, and the switched line in between is captured whole. When the meeting ends, you export the decision record — the محضر اجتماع — in Arabic or in English, whichever the file needs.</p>
            </div>
          </div>

          <div className="cm-section" style={{ paddingTop: 0 }}>
            <h2 className="cm-h2">How it works: Listen → Extract → Confirm → Act</h2>
            <p className="cm-lead">Knowcap is not just a transcriber. It is a four-step pipeline that turns talk into traceable work.</p>
            <div className="sa-steps">
              {STEPS.map((s) => (
                <div className="sa-step" key={s.n}>
                  <div className="sa-step-n" aria-hidden="true">{s.n}</div>
                  <div>
                    <div className="sa-step-h">{s.h}</div>
                    <div className="sa-step-b">{s.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cm-section" style={{ paddingTop: 0 }}>
            <h2 className="cm-h2">Knowcap vs typical AI meeting notes tools</h2>
            <p className="cm-lead">How a verified, MENA-first tool differs from the generic transcribe-and-summarize tools that rank for this search.</p>
            <div className="cm-table-wrap" role="region" aria-label="Knowcap vs typical AI meeting notes tools">
              <table className="cm-table">
                <thead>
                  <tr>
                    <th scope="col">What matters for a Saudi team</th>
                    <th scope="col">Typical AI notes tools</th>
                    <th scope="col" className="cm-us">Knowcap</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((row) => (
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
          </div>

          <div className="cm-section" style={{ paddingTop: 0 }}>
            <h2 className="cm-h2">Why human-verified beats raw auto-notes</h2>
            <div className="sa-prose">
              <p>Most tools treat AI output as ground truth. They transcribe, summarize, and — in several cases — auto-push action items into your stack with no human in the loop. When the AI mishears &ldquo;don&rsquo;t ship Friday&rdquo; as &ldquo;ship Friday,&rdquo; that becomes a real ticket, a real follow-up, a real mistake nobody approved.</p>
              <p>Knowcap puts a named person between the AI and the action. A claim card is a proposal, not a fact, until someone confirms it. Reject the ones the AI got wrong; confirm the ones it got right. Only confirmed claims reach the agents.</p>
              <p>The result is an audit trail instead of a black box. When a client later says &ldquo;that is not what we agreed,&rdquo; you do not have a paraphrased summary — you have the exact recording, the timestamp, the speaker quote, and the name of the person who confirmed it. The confirmation is the product.</p>
            </div>
          </div>

          <div className="cm-section" style={{ paddingTop: 0 }}>
            <h2 className="cm-h2">PDPL accountability — without inventing a certificate</h2>
            <div className="sa-prose">
              <p>PDPL is Saudi Arabia&rsquo;s real Personal Data Protection Law, regulated by SDAIA. Knowcap&rsquo;s claim here is narrow and defensible.</p>
              <p>First, data residency: Knowcap can run in EU/MENA regions, so meeting recordings and the personal data inside them need not leave the region. Second, a named-human audit trail: every extracted claim is confirmed or rejected by a named person, and that confirmation — with the exact timestamp and speaker quote — is kept as the permanent record. Together these support PDPL accountability and record-keeping, the kind audit and regulated firms care about. For what audit firms must keep on file, see <Link href="/blog/saudi-pdpl-article-36-audit-firms-ai-meeting-records">PDPL and AI meeting records</Link>.</p>
              <p>We do not claim Knowcap is &ldquo;PDPL certified&rdquo; or &ldquo;SDAIA approved&rdquo; — no such certification exists, and anyone telling you they have one is guessing. The defensible line is simply this: data-residency options plus a named-human audit trail help your team meet PDPL accountability and record-keeping requirements — versus tools that auto-push raw AI output with no human gate and no traceable record of who approved what.</p>
            </div>
          </div>

          <div className="cm-section" style={{ paddingTop: 0 }}>
            <h2 className="cm-h2">Who it&rsquo;s for</h2>
            <div className="sa-prose">
              <p>Knowcap is built for Saudi teams whose meetings are bilingual and whose mistakes are expensive. Saudi SMEs riding Vision 2030 expansion that need real meeting documentation, not a transcript with holes in it. <Link href="/for/odoo-partners">Odoo implementation partners</Link> turning a client call into an Odoo SH ticket and a GitHub PR before the meeting ends — Knowcap is built by an Odoo partner. Agencies capturing scope and approvals with receipts. And audit and professional-services firms, who need every agent action tied to a human-confirmed claim with a timestamp and speaker quote — because when a regulator or client asks who decided something and when, &ldquo;the AI summarized it&rdquo; is not an answer.</p>
              <p>The interface is in Arabic where it counts, the capture handles the code-switching your team actually does, and the محضر exports in the language the file requires.</p>
            </div>
          </div>

          <div className="cm-section" style={{ paddingTop: 0 }}>
            <h2 className="cm-h2" style={{ textAlign: 'center' }}>Questions Saudi teams ask</h2>
            <div className="cm-faq">
              {SAUDI_FAQ.map((f, i) => (
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
          <h2>Your meetings are bilingual.<br />Your record should be too.</h2>
          <p>Capture Arabic and English intact, confirm every claim, and let agents act only on what a human signed off.</p>
          <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Get Started Free →</a>
          <p style={{ marginTop: 20, marginBottom: 0 }}>
            <Link
              className="cm-close-link"
              href="/compare"
              style={{ color: 'rgba(251,250,248,.7)', textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Compare Knowcap to Otter, Fireflies &amp; Read.ai →
            </Link>
          </p>
        </div>
      </div>
    </EditorialShell>
  )
}
