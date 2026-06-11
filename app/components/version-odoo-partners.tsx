'use client'

/**
 * /for/odoo-partners — Phase 1 beachhead conversion page.
 * Rewritten to V6b Editorial Light (EditorialShell) to match site-wide theme.
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const APP_URL = 'https://app.knowcap.ai'
const REGISTER_URL = `${APP_URL}/register?utm_source=odoo_partners_page`

const PAGE_CSS = `
/* Odoo Partners page — op-* prefix, cl-root vars */
.op-exhibit{max-width:780px;margin:32px auto 0;padding:0 40px}
.op-exhibit-label{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--sec);margin-bottom:12px}
.op-claims{display:flex;flex-direction:column;gap:8px}
.op-claim{background:var(--white);border:1px solid var(--border);border-radius:8px;padding:12px 16px;display:grid;grid-template-columns:64px 1fr auto;gap:8px 14px;align-items:start}
.op-claim[data-state=verified]{border-left:3px solid var(--green)}
.op-claim[data-state=pending]{border-left:3px solid var(--amber)}
.op-claim-time{font-family:var(--mono);font-size:11px;color:var(--sec);padding-top:3px}
.op-claim-body{}
.op-claim-speaker{font-family:var(--mono);font-size:10px;color:var(--sec);display:block;margin-bottom:3px;text-transform:uppercase;letter-spacing:.06em}
.op-claim-text{font-size:13.5px;color:var(--ink);line-height:1.5}
.op-claim-action{font-family:var(--mono);font-size:11px;color:var(--green);display:block;margin-top:4px}
.op-claim-tag{font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:999px;white-space:nowrap;align-self:center}
.op-claim-tag[data-t=risk]{background:rgba(220,38,38,.1);color:#DC2626}
.op-claim-tag[data-t=decision]{background:var(--green-tint);color:var(--green)}
.op-claim-tag[data-t=task]{background:rgba(176,124,40,.1);color:var(--amber)}
.op-section{padding:clamp(48px,5vw,72px) 0}
.op-section-head{text-align:center;max-width:640px;margin:0 auto clamp(32px,4vw,52px)}
.op-section-head h2{font-family:var(--disp);font-size:clamp(1.5rem,2.8vw,2rem);font-weight:460;letter-spacing:-.02em;font-variation-settings:'SOFT' 55,'WONK' 0;margin-bottom:12px}
.op-section-head p{font-size:16px;line-height:1.7;color:var(--sec)}
.op-steps{max-width:720px;margin:0 auto}
.op-step{display:grid;grid-template-columns:52px 1fr;gap:24px;padding:36px 0;border-bottom:1px solid var(--border)}
.op-step:last-child{border-bottom:0}
.op-step-no{font-family:var(--mono);font-size:12px;color:var(--green);font-weight:500;letter-spacing:.06em;padding-top:5px}
.op-step-time{font-family:var(--mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sec);display:block;margin-bottom:8px}
.op-step-h{font-family:var(--disp);font-size:clamp(1.05rem,2vw,1.2rem);font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;margin:0 0 10px;color:var(--ink)}
.op-step-p{font-size:15px;line-height:1.7;color:var(--sec);margin:0}
.op-mockup{margin-top:16px;border:1px solid var(--border);border-radius:6px;overflow:hidden}
.op-mockup-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;background:var(--ink);font-family:var(--mono);font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(251,250,248,.5)}
.op-mockup-ok{color:var(--green-dark)}
.op-mockup-body{padding:12px 16px;background:var(--white)}
.op-mockup-body blockquote{font-size:13.5px;line-height:1.6;color:var(--sec);font-style:italic;margin:0}
.op-mockup-body code{font-family:var(--mono);font-size:.8rem;background:var(--green-tint);color:var(--green);padding:1px 6px;border-radius:3px}
.op-row{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed var(--border)}
.op-row:last-child{border-bottom:0}
.op-rk{font-family:var(--mono);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sec);flex-shrink:0}
.op-rv{font-size:.88rem;color:var(--ink);text-align:right}
.op-strip{margin-top:clamp(28px,3.5vw,44px);padding:clamp(16px,2vw,22px) clamp(18px,2.4vw,26px);border:1px solid var(--border);border-left:3px solid var(--green);border-radius:4px;background:var(--white);font-size:15px;line-height:1.6;color:var(--sec);max-width:720px;margin-left:auto;margin-right:auto}
.op-strip strong{color:var(--ink)}
.op-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:36px;justify-content:center}
.op-faq{border-top:1px solid var(--border);margin-top:28px;max-width:720px;margin-left:auto;margin-right:auto}
.op-faq details{border-bottom:1px solid var(--border)}
.op-faq summary{padding:18px 0;cursor:pointer;font-weight:500;font-size:15px;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;color:var(--ink)}
.op-faq summary::-webkit-details-marker{display:none}
.op-faq summary::after{content:'+';font-family:var(--mono);font-size:18px;color:var(--sec);flex-shrink:0}
.op-faq details[open] summary::after{content:'−'}
.op-faq-a{padding:0 0 18px;color:var(--sec);font-size:15px;line-height:1.75}
.op-close{background:var(--ink);color:rgba(251,250,248,.7);text-align:center;padding:clamp(56px,6vw,80px) 40px}
.op-close h2{font-family:var(--disp);font-size:clamp(1.7rem,3vw,2.4rem);font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;color:#fff;margin-bottom:18px;letter-spacing:-.02em;line-height:1.15}
.op-close p{font-size:15px;margin-bottom:28px}
@media(max-width:720px){.op-exhibit{padding:0 22px}.op-claim{grid-template-columns:52px 1fr auto}.op-step{grid-template-columns:40px 1fr}.op-cta-row{flex-direction:column;align-items:stretch}.op-close{padding:48px 22px}}
`

const FAQS = [
  {
    q: 'How does Knowcap know which Odoo module the bug is in?',
    a: 'Knowcap reads the screen recording (what the client clicked, the URL path, the field names) and the spoken context. It maps those signals to the Odoo module tree (stock, sale, account, hr, etc.). When the call-out is ambiguous, the claim sits in your inbox tagged "module: unsure" and you pick from a shortlist before promoting to evidence.',
  },
  {
    q: 'Does Knowcap need write access to my client\'s GitHub repo?',
    a: 'Only if you want the agent to open the PR for you. Connect-only mode (read access) is supported — the agent will draft the PR locally and hand the patch back to your dev team as a diff. You decide per-client.',
  },
  {
    q: 'Can my client record bugs in Arabic? In Hindi?',
    a: 'Yes. Knowcap\'s transcription handles 80+ languages including Arabic, Hindi, French, and Egyptian Arabic specifically. The extracted claim is stored in the original language; the PR description and Odoo ticket can be translated to English (or kept in the original) per your project setting.',
  },
  {
    q: 'What if the bug is in a custom module not in the codebase?',
    a: 'The agent still files the Odoo SH ticket with full reproduction and severity. For the PR step, it asks the dev team to point it at the custom module repo (often a private one). Once it has read access it generates the PR same as any other module.',
  },
  {
    q: 'Does this work with Odoo SH or on-premise Odoo?',
    a: 'Both. Odoo SH is the first-class integration (native ticket + PR flow). On-premise Odoo connects via the standard XML-RPC / JSON-RPC API for ticket creation; the GitHub PR step is repo-agnostic so it works the same.',
  },
  {
    q: 'How long does setup take for a new client?',
    a: 'About 15 minutes. You point Knowcap at the client\'s Odoo SH project and GitHub repo, set the default ticket assignee, and pick the Telegram (or Slack) channel for notifications. The client only needs to install the Knowcap recorder browser extension — one click.',
  },
]

export default function VersionOdooPartners() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <EditorialShell>
        <PageHero
          kicker="For Odoo implementation partners"
          title={<>From client meeting to Odoo SH PR.<br />Before the meeting ends.</>}
          sub="Your client mentions a bug or asks for a feature mid-meeting. Knowcap captures it, classifies it, and waits for one tap from you. Then an Odoo SH ticket opens, a GitHub PR appears — before the call wraps."
        />

        {/* Live claims exhibit */}
        <div className="op-exhibit">
          <div className="op-exhibit-label">Live · 2 claims · 0:31:04</div>
          <div className="op-claims">
            <div className="op-claim" data-state="verified">
              <span className="op-claim-time">0:14:22</span>
              <div className="op-claim-body">
                <span className="op-claim-speaker">Client</span>
                <span className="op-claim-text">"The warehouse module crashes when we receive a partial shipment."</span>
                <span className="op-claim-action">✓ Odoo SH ticket #4821 opened</span>
              </div>
              <span className="op-claim-tag" data-t="risk">Risk</span>
            </div>
            <div className="op-claim" data-state="verified">
              <span className="op-claim-time">0:17:49</span>
              <div className="op-claim-body">
                <span className="op-claim-speaker">Client</span>
                <span className="op-claim-text">"Can we add a barcode scanner to the picking flow?"</span>
                <span className="op-claim-action">✓ PR opened on stock_barcode module</span>
              </div>
              <span className="op-claim-tag" data-t="decision">Decision</span>
            </div>
            <div className="op-claim" data-state="pending">
              <span className="op-claim-time">0:24:51</span>
              <div className="op-claim-body">
                <span className="op-claim-speaker">PM</span>
                <span className="op-claim-text">"Send the revised SOW for sign-off by Friday."</span>
              </div>
              <span className="op-claim-tag" data-t="task">Task · pending</span>
            </div>
          </div>
        </div>

        {/* 80-second loop */}
        <div className="cl-page-body">
          <div className="cl-wrap">
            <div className="op-section">
              <div className="op-section-head">
                <h2>The 80-second loop.</h2>
                <p>One client conversation. One tap from you. Four agents working in parallel. By the time the call ends, your Odoo SH ticket is in code review.</p>
              </div>

              <div className="op-steps">
                <div className="op-step">
                  <span className="op-step-no">01</span>
                  <div>
                    <span className="op-step-time">0:00 — Client records the bug</span>
                    <h3 className="op-step-h">Your client opens Knowcap and records a 30-second screen capture.</h3>
                    <p className="op-step-p">No ticket form. No "please file a bug report" email. The reproduction is captured live, in the client's own words, with the screen as evidence.</p>
                    <div className="op-mockup" aria-hidden="true">
                      <div className="op-mockup-bar">
                        <span>Knowcap · screen recording</span>
                        <span className="op-mockup-ok">● Recording · 0:24</span>
                      </div>
                      <div className="op-mockup-body">
                        <blockquote>"Watch — I click receive, pick partial, and the warehouse module just… reloads. No error, no ticket, it just dumps the picking."</blockquote>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="op-step">
                  <span className="op-step-no">02</span>
                  <div>
                    <span className="op-step-time">0:30 — Knowcap extracts the claim</span>
                    <h3 className="op-step-h">AI identifies the affected module, severity, and reproduction steps.</h3>
                    <p className="op-step-p">Categorized as a Risk, ready for one-tap human review. The claim sits in your inbox with the exact 24-second clip attached and the words quoted verbatim.</p>
                    <div className="op-mockup" aria-hidden="true">
                      <div className="op-mockup-bar">
                        <span>Inbox · claim extracted</span>
                        <span>Risk · pending</span>
                      </div>
                      <div className="op-mockup-body">
                        <div className="op-row"><span className="op-rk">Module</span><span className="op-rv"><code>stock.picking</code></span></div>
                        <div className="op-row"><span className="op-rk">Severity</span><span className="op-rv">High · data loss</span></div>
                        <div className="op-row"><span className="op-rk">Repro</span><span className="op-rv">Receive → partial → reload</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="op-step">
                  <span className="op-step-no">03</span>
                  <div>
                    <span className="op-step-time">1:00 — You confirm</span>
                    <h3 className="op-step-h">One tap promotes the claim to evidence.</h3>
                    <p className="op-step-p">An agent reads it, creates a ticket in your Odoo SH instance, moves it from New → In Progress, and notifies your dev team in Telegram.</p>
                    <div className="op-mockup" aria-hidden="true">
                      <div className="op-mockup-bar">
                        <span>Odoo SH · ticket #4821 created</span>
                        <span className="op-mockup-ok">● In Progress</span>
                      </div>
                      <div className="op-mockup-body">
                        <div className="op-row"><span className="op-rk">Customer</span><span className="op-rv">Demo Client A</span></div>
                        <div className="op-row"><span className="op-rk">Module</span><span className="op-rv">Warehouse</span></div>
                        <div className="op-row"><span className="op-rk">Assigned</span><span className="op-rv">@dev-team · Telegram pinged</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="op-step">
                  <span className="op-step-no">04</span>
                  <div>
                    <span className="op-step-time">2:00 — GitHub PR opened</span>
                    <h3 className="op-step-h">A second agent reads your client's repo and generates the fix.</h3>
                    <p className="op-step-p">It identifies the unindexed loop in <code>stock.picking.bulk_receive</code>, generates the patch, opens a PR. Ticket auto-moves to Code Review with the PR linked.</p>
                    <div className="op-mockup" aria-hidden="true">
                      <div className="op-mockup-bar">
                        <span>GitHub · PR #312 opened</span>
                        <span className="op-mockup-ok">● Code Review</span>
                      </div>
                      <div className="op-mockup-body">
                        <div className="op-row"><span className="op-rk">Title</span><span className="op-rv">fix(stock): index bulk_receive loop</span></div>
                        <div className="op-row"><span className="op-rk">Files</span><span className="op-rv"><code>stock/models/stock_picking.py</code></span></div>
                        <div className="op-row"><span className="op-rk">Ticket</span><span className="op-rv">#4821 → Code Review</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="op-strip">
                <strong>Same loop for features.</strong> Client describes the feature on a call → Task in project → PR scaffold ready. You only ever review what a named human already confirmed.
              </div>

              <div className="op-cta-row">
                <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Start free for Odoo partners →</a>
                <Link className="cl-btn cl-btn--ghost" href="/book">Book a 20-min demo</Link>
              </div>
            </div>

            {/* FAQ */}
            <div className="op-section">
              <div className="op-section-head">
                <h2>FAQ</h2>
              </div>
              <div className="op-faq">
                {FAQS.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>{f.q}</summary>
                    <div className="op-faq-a">{f.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="op-close">
          <div className="cl-wrap">
            <h2>Stop manually triaging tickets.<br />Start acting on meetings.</h2>
            <p>Your client records. Knowcap extracts. Agents act. You merge.</p>
            <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Get Started Free →</a>
          </div>
        </div>
      </EditorialShell>
    </>
  )
}
