'use client'

/**
 * /for/odoo-partners — Phase 1 beachhead conversion page.
 *
 * V6b "Editorial Light" re-skin (2026-06-14). Same chrome as the homepage:
 * cream EditorialShell header + dark-ink footer, Fraunces display, Inter body,
 * JetBrains Mono marginalia, green #1F6B3A accent. Page-scoped CSS is injected
 * once under the unique `op-` prefix and reads .cl-root tokens.
 *
 * Audience: Odoo implementation partners (the StratDev Meta-Ads target).
 * Signature is the client-meeting → Odoo SH PR loop, an honest 0:00–2:00
 * vertical timeline with small inline mockup chips. FAQs preserved verbatim.
 *
 * Positioning: Knowcap is verified work intelligence — the trust layer for AI
 * agents. Meetings/calls/screen recordings/documents/Telegram are inputs; MCP
 * is a supporting capability, not the headline. No "voice notes", no
 * "meeting recorder" framing.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const APP_URL = 'https://app.knowcap.ai'
const REGISTER_URL = `${APP_URL}/register?utm_source=odoo_partners_page`

/* ----------------------------------------------------------------------- */
/* Page-scoped CSS — all selectors prefixed op-, reading .cl-root tokens.   */
/* ----------------------------------------------------------------------- */

const PAGE_CSS = `
/* reveal — opacity/transform only */
.op-reveal{opacity:0;transform:translateY(18px);
  transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.op-reveal.is-in{opacity:1;transform:none}
.op-step,.op-card{opacity:0;transform:translateY(12px);
  transition:opacity .55s cubic-bezier(.21,.6,.35,1),transform .55s cubic-bezier(.21,.6,.35,1)}
.op-reveal.is-in :where(.op-step,.op-card){opacity:1;transform:none}
.op-reveal.is-in :where(.op-step,.op-card):nth-of-type(2){transition-delay:.12s}
.op-reveal.is-in :where(.op-step,.op-card):nth-of-type(3){transition-delay:.24s}
.op-reveal.is-in :where(.op-step,.op-card):nth-of-type(4){transition-delay:.36s}
@media(prefers-reduced-motion:reduce){
  .op-reveal,.op-step,.op-card{opacity:1;transform:none;transition:none}
}

/* shared section + register marginalia */
.op-section{padding:96px 0}
@media(max-width:860px){.op-section{padding:64px 0}}
.op-section + .op-section{border-top:1px solid var(--border)}
.op-head{max-width:760px}
.op-reg{display:flex;align-items:center;gap:16px;margin-bottom:24px}
.op-reg-no{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec);white-space:nowrap}
.op-reg-no .op-reg-num{color:var(--green)}
.op-reg-rule{height:1px;flex:1;background:var(--border)}
.op-h2{font-family:var(--disp);font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.7rem,3.2vw,2.6rem);line-height:1.14;letter-spacing:-.018em}
.op-lead{margin-top:22px;font-size:16.5px;line-height:1.7;color:var(--sec);max-width:60ch}

/* hero CTA row + trust line (live under PageHero) */
.op-hero-extra{text-align:center;margin-top:30px}
.op-cta-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px}
.op-trust{margin-top:30px;font-family:var(--mono);font-size:12px;letter-spacing:.04em;
  color:var(--sec);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0 0}
.op-trust .op-sep{color:var(--border-2);padding:0 14px}
.op-trust--2{margin-top:12px}

/* signature figure */
.op-figure{font-family:var(--disp);font-style:italic;font-weight:480;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:clamp(2.4rem,4.4vw,3.4rem);
  line-height:1;letter-spacing:-.02em;color:var(--green);margin-bottom:14px}

/* loop timeline */
.op-process{display:flex;flex-direction:column;gap:0;margin-top:56px;
  border-top:1px solid var(--border)}
.op-step{display:grid;grid-template-columns:64px 1fr;column-gap:clamp(20px,3vw,40px);
  padding:40px 0;border-bottom:1px solid var(--border)}
@media(max-width:640px){.op-step{grid-template-columns:1fr;row-gap:8px}}
.op-step-no{font-family:var(--disp);font-weight:320;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(2.4rem,4vw,3.2rem);line-height:.9;letter-spacing:-.03em;color:var(--border-2)}
.op-step-time{font-family:var(--mono);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--green);display:inline-block;margin-bottom:8px}
.op-step h3{font-family:var(--disp);font-weight:540;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.15rem,1.9vw,1.4rem);line-height:1.22;letter-spacing:-.01em;color:var(--ink)}
.op-step p{margin-top:12px;font-size:15px;line-height:1.7;color:var(--sec);max-width:60ch}
.op-step p code,.op-mockup code{font-family:var(--mono);font-size:.86em;
  background:var(--green-tint);color:var(--green-deep);padding:1px 6px;border-radius:3px}

/* mockup chips */
.op-mockup{margin-top:18px;border:1px solid var(--border);border-radius:8px;overflow:hidden;
  background:var(--white);max-width:520px}
.op-mockup-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:9px 14px;border-bottom:1px solid var(--border);font-family:var(--mono);
  font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--sec);
  background:color-mix(in srgb,var(--green) 4%,var(--cream))}
.op-mockup-tag{color:var(--green-deep);display:inline-flex;align-items:center;gap:6px;font-weight:500}
.op-mockup-body{padding:14px 16px;font-family:var(--body);color:var(--ink-soft);
  font-size:.92rem;line-height:1.55}
.op-mockup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:8px 0;border-bottom:1px dashed var(--border)}
.op-mockup-row:last-child{border-bottom:0}
.op-mockup-k{font-family:var(--mono);font-size:.64rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--sec)}
.op-mockup-v{font-family:var(--body);color:var(--ink);font-size:.9rem}

/* strip note */
.op-strip{margin-top:48px;padding:22px 26px;border:1px solid var(--border);
  border-left:3px solid var(--green);border-radius:0 6px 6px 0;background:var(--green-tint);
  font-size:15.5px;line-height:1.6;color:var(--green-deep);max-width:820px}
.op-strip strong{color:var(--green-deep);font-weight:600}

/* inputs band — what Knowcap captures */
.op-inputs{margin-top:24px;font-family:var(--mono);font-size:13px;line-height:1.7;
  color:var(--sec);max-width:64ch;padding-top:20px;border-top:1px solid var(--border)}
.op-inputs::before{content:'* ';color:var(--green)}
.op-inputs b{color:var(--ink);font-weight:600}

.op-section-cta{margin-top:48px}

/* check icon */
.op-tick{flex:none;vertical-align:-1px}

/* FAQ — editorial rules */
.op-faq{max-width:780px;margin-top:48px;border-top:1px solid var(--border)}
.op-faq details{border-bottom:1px solid var(--border)}
.op-faq summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:14px;
  padding:20px 0;font-family:var(--disp);font-weight:560;
  font-variation-settings:'SOFT' 55,'WONK' 0;font-size:17px;letter-spacing:-.01em;
  color:var(--ink);transition:color .15s ease}
.op-faq summary::-webkit-details-marker{display:none}
.op-faq summary:hover{color:var(--green)}
.op-faq summary::after{content:'+';font-family:var(--mono);font-size:18px;color:var(--sec);
  margin-left:auto;flex:none}
.op-faq details[open] summary::after{content:'−'}
.op-q-sign{font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--green);flex:none}
.op-faq-a{padding:0 0 22px 30px;font-size:15px;line-height:1.7;color:var(--sec);max-width:64ch}

/* closer — dark ink band */
.op-closer-wrap{padding:96px 0}
@media(max-width:860px){.op-closer-wrap{padding:64px 0}}
.op-closer{background:var(--ink);color:var(--cream);border-radius:6px;padding:64px 56px;
  display:grid;grid-template-columns:repeat(12,1fr);column-gap:48px;align-items:center}
@media(max-width:860px){.op-closer{grid-template-columns:1fr;row-gap:32px;padding:48px 30px}}
.op-closer-text{grid-column:1/span 8}
.op-closer-ctas{grid-column:9/span 4;display:flex;flex-direction:column;align-items:stretch;gap:12px}
@media(max-width:860px){
  .op-closer-text,.op-closer-ctas{grid-column:1/-1}
  .op-closer-ctas{flex-direction:row;flex-wrap:wrap}
}
.op-closer .op-kicker{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(251,250,248,.6)}
.op-closer .op-kdot{color:var(--green-dark)}
.op-closer h2{font-family:var(--disp);font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.8rem,3.6vw,2.9rem);line-height:1.12;letter-spacing:-.02em;color:var(--cream);
  margin-top:20px}
.op-closer h2 em{font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green-dark)}
.op-closer-sub{margin-top:20px;font-size:16px;line-height:1.65;
  color:rgba(251,250,248,.72);max-width:46ch}
.op-closer .op-btn{text-align:center}
.op-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);
  color:var(--ink);box-shadow:0 6px 22px rgba(126,211,155,.25)}
.op-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.op-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
`

/* ------------------------------------------------------------- utilities */

function Tick() {
  return (
    <svg className="op-tick" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="#1F6B3A" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { rootMargin: '-8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`op-reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

function Reg({ no, label }: { no: string; label: string }) {
  return (
    <div className="op-reg" aria-hidden="true">
      <span className="op-reg-no"><span className="op-reg-num">{no}</span> · {label}</span>
      <span className="op-reg-rule" />
    </div>
  )
}

/* ----------------------------------------------------------------------- */
/* Signature: "The client-meeting loop" — honest 0:00–2:00 timeline         */
/* ----------------------------------------------------------------------- */

function MeetingLoop() {
  return (
    <section id="loop" className="op-section">
      <div className="cl-wrap">
        <Reveal className="op-head">
          <Reg no="§01" label="The loop · client meeting → Odoo SH PR" />
          <div className="op-figure">Under two minutes</div>
          <h2 className="op-h2">From a sentence on the call to a PR in code review.</h2>
          <p className="op-lead">
            One client conversation. One tap from you. Four agents working in parallel. By the time the
            call ends, the Odoo SH ticket is open and the fix is in code review — every step traceable to
            the exact words your client said.
          </p>
        </Reveal>

        <Reveal>
          <div className="op-process">
            <div className="op-step">
              <div className="op-step-no" aria-hidden="true">01</div>
              <div>
                <span className="op-step-time">0:00 — Client records the bug</span>
                <h3>Your client records a 30-second screen capture inside Knowcap.</h3>
                <p>
                  No ticket form. No &ldquo;please file a bug report&rdquo; email. The reproduction is
                  captured live, in the client&apos;s own words, with the screen as evidence.
                </p>
                <div className="op-mockup" aria-hidden="true">
                  <div className="op-mockup-bar">
                    <span>Knowcap · screen recording</span>
                    <span className="op-mockup-tag"><Tick />Recording · 0:24</span>
                  </div>
                  <div className="op-mockup-body">
                    &ldquo;Watch — I click receive, pick partial, and the warehouse module just&hellip;
                    reloads. No error, no ticket, it just dumps the picking.&rdquo;
                  </div>
                </div>
              </div>
            </div>

            <div className="op-step">
              <div className="op-step-no" aria-hidden="true">02</div>
              <div>
                <span className="op-step-time">0:30 — Knowcap extracts the claim</span>
                <h3>AI identifies the affected module, severity, and reproduction steps.</h3>
                <p>
                  Categorized as a Risk, ready for one-tap human review. The claim sits in your inbox
                  with the exact clip attached and the words quoted verbatim.
                </p>
                <div className="op-mockup" aria-hidden="true">
                  <div className="op-mockup-bar">
                    <span>Inbox · claim extracted</span>
                    <span className="op-mockup-tag">Risk · pending</span>
                  </div>
                  <div className="op-mockup-body">
                    <div className="op-mockup-row"><span className="op-mockup-k">Module</span><span className="op-mockup-v"><code>stock.picking</code></span></div>
                    <div className="op-mockup-row"><span className="op-mockup-k">Severity</span><span className="op-mockup-v">High · data loss</span></div>
                    <div className="op-mockup-row"><span className="op-mockup-k">Repro</span><span className="op-mockup-v">Receive → partial → reload</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="op-step">
              <div className="op-step-no" aria-hidden="true">03</div>
              <div>
                <span className="op-step-time">1:00 — You confirm</span>
                <h3>One tap promotes the claim to evidence.</h3>
                <p>
                  An agent reads it, creates a ticket in YOUR Odoo SH instance (Customer: Demo Client A,
                  Module: Warehouse), moves it from New → In Progress, and notifies your dev team in
                  Telegram.
                </p>
                <div className="op-mockup" aria-hidden="true">
                  <div className="op-mockup-bar">
                    <span>Odoo SH · ticket #4821 created</span>
                    <span className="op-mockup-tag"><Tick />In Progress</span>
                  </div>
                  <div className="op-mockup-body">
                    <div className="op-mockup-row"><span className="op-mockup-k">Customer</span><span className="op-mockup-v">Demo Client A</span></div>
                    <div className="op-mockup-row"><span className="op-mockup-k">Module</span><span className="op-mockup-v">Warehouse</span></div>
                    <div className="op-mockup-row"><span className="op-mockup-k">Assigned</span><span className="op-mockup-v">@dev-team · Telegram pinged</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="op-step">
              <div className="op-step-no" aria-hidden="true">04</div>
              <div>
                <span className="op-step-time">2:00 — GitHub PR opened</span>
                <h3>A second agent reads your client&apos;s repo and generates the fix.</h3>
                <p>
                  It identifies the unindexed loop in <code>stock.picking.bulk_receive</code>, generates
                  the patch, opens a PR. Ticket auto-moves to Code Review with the PR linked.
                </p>
                <div className="op-mockup" aria-hidden="true">
                  <div className="op-mockup-bar">
                    <span>GitHub · PR #312 opened</span>
                    <span className="op-mockup-tag"><Tick />Code Review</span>
                  </div>
                  <div className="op-mockup-body">
                    <div className="op-mockup-row"><span className="op-mockup-k">Title</span><span className="op-mockup-v">fix(stock): index bulk_receive loop</span></div>
                    <div className="op-mockup-row"><span className="op-mockup-k">Files</span><span className="op-mockup-v"><code>stock/models/stock_picking.py</code></span></div>
                    <div className="op-mockup-row"><span className="op-mockup-k">Ticket</span><span className="op-mockup-v">#4821 → Code Review</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="op-strip">
            <strong>Same loop for features.</strong> Client describes the feature on a call → Task in
            project → PR scaffold ready. You only ever review what a named human already confirmed.
          </p>
        </Reveal>

        <Reveal>
          <p className="op-inputs">
            A screen recording is only one input. Knowcap also captures from your{' '}
            <b>client meetings (Google Meet), calls and recordings, documents and URLs, and Telegram</b>{' '}
            — so the same confirm-then-act loop runs no matter where the scope decision was made.
          </p>
        </Reveal>

        <Reveal className="op-section-cta">
          <div className="op-cta-row" style={{ justifyContent: 'flex-start' }}>
            <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Start free for Odoo partners <span aria-hidden="true">→</span></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------- */
/* FAQ — Odoo-partner-specific (preserved verbatim)                         */
/* ----------------------------------------------------------------------- */

const ODOO_FAQS = [
  {
    q: 'How does Knowcap know which Odoo module the bug is in?',
    a: 'Knowcap reads the screen recording (what the client clicked, the URL path, the field names) and the spoken context. It maps those signals to the Odoo module tree (stock, sale, account, hr, etc.). When the call-out is ambiguous, the claim sits in your inbox tagged "module: unsure" and you pick from a shortlist before promoting to evidence.',
  },
  {
    q: 'Does Knowcap need write access to my client’s GitHub repo?',
    a: 'Only if you want the agent to open the PR for you. Connect-only mode (read access) is supported — the agent will draft the PR locally and hand the patch back to your dev team as a diff. You decide per-client.',
  },
  {
    q: 'Can my client record bugs in Arabic? In Hindi?',
    a: 'Yes. Knowcap’s transcription handles 80+ languages including Arabic, Hindi, French, and Egyptian Arabic specifically. The extracted claim is stored in the original language; the PR description and Odoo ticket can be translated to English (or kept in the original) per your project setting.',
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
    a: 'About 15 minutes. You point Knowcap at the client’s Odoo SH project and GitHub repo, set the default ticket assignee, and pick the Telegram (or Slack) channel for notifications. The client only needs to install the Knowcap recorder browser extension — one click.',
  },
]

function OdooFaq() {
  return (
    <section id="faq" className="op-section">
      <div className="cl-wrap">
        <Reveal className="op-head">
          <Reg no="§02" label="Objections" />
          <h2 className="op-h2">Fair questions, Odoo-partner edition.</h2>
        </Reveal>
        <Reveal>
          <div className="op-faq">
            {ODOO_FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  <span className="op-q-sign" aria-hidden="true">Q.</span>
                  {f.q}
                </summary>
                <div className="op-faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------- */
/* Closer — dark ink band                                                   */
/* ----------------------------------------------------------------------- */

function Closer() {
  return (
    <section className="op-closer-wrap">
      <div className="cl-wrap">
        <Reveal>
          <div className="op-closer">
            <div className="op-closer-text">
              <span className="op-kicker">Knowcap <span className="op-kdot">·</span> For Odoo partners</span>
              <h2>
                Stop manually triaging tickets.<br />
                Your client records. Agents <em>act</em>.
              </h2>
              <p className="op-closer-sub">
                Knowcap is verified work intelligence — the trust layer for your AI agents. Your client
                speaks, a named human confirms, and the work happens. You merge.
              </p>
            </div>
            <div className="op-closer-ctas">
              <a className="cl-btn cl-btn--solid op-btn" href={REGISTER_URL}>Start free for Odoo partners</a>
              <Link className="cl-btn cl-btn--ghost op-btn" href="/book">Book a Demo</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------- */
/* Page export — keep name + signature so /for/odoo-partners keeps working. */
/* ----------------------------------------------------------------------- */

export default function VersionOdooPartners() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <PageHero
        kicker="For Odoo implementation partners"
        title={<>From client meeting to Odoo SH PR. <span style={{ color: 'var(--green)' }}>Before the meeting ends.</span></>}
        sub="Your client mentions a bug or asks for a feature mid-call. Knowcap captures it, classifies it as a scope decision or bug, and waits for one tap from you. Then an Odoo SH ticket opens, a GitHub PR appears, and your project tracker advances — every action backed by a fact a named human confirmed."
      />
      <div className="cl-page-body" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="cl-wrap">
          <div className="op-hero-extra">
            <div className="op-cta-row">
              <a className="cl-btn cl-btn--solid" href={REGISTER_URL}>Start free for Odoo partners <span aria-hidden="true">→</span></a>
              <a className="cl-btn cl-btn--ghost" href="#loop">See the loop</a>
            </div>
            <div className="op-trust">
              <span>Built by an Odoo partner</span>
              <span className="op-sep" aria-hidden="true">·</span>
              <span>Native Odoo SH integration</span>
              <span className="op-sep" aria-hidden="true">·</span>
              <span>Full audit trail on every action</span>
            </div>
            <div className="op-trust op-trust--2">
              <span>Captures meetings · calls &amp; recordings · screen recordings · documents · URLs · Telegram</span>
            </div>
          </div>
        </div>
      </div>
      <MeetingLoop />
      <OdooFaq />
      <Closer />
    </EditorialShell>
  )
}
