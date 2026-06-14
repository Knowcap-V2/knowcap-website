'use client'

/**
 * Version C (role-first) — re-skinned onto the V6b "Editorial Light" system.
 *
 * Re-skinned off the deprecated dark theme onto EditorialShell (cream paper,
 * Fraunces display, Inter body, JetBrains Mono marginalia, green #1F6B3A accent,
 * dark-ink footer) with a page-scoped CSS string under the `vc-` prefix.
 *
 * Message preserved: a generic hero + the three role tracks (ERP/CRM Implementers,
 * Agencies, Teams) + a governance band + closing CTA. Positioning corrected to
 * "verified work intelligence — the trust layer for AI agents": meetings are one
 * input among many (calls, screen recordings, documents/URLs, Telegram), and the
 * documents are outputs, not the identity. Reachable at /c; not in the live / rotation.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EditorialShell from '@/components/editorial/shell'

const APP_URL = 'https://app.knowcap.ai'

/* ---------------------------------------------------------------- styles */

const CSS = `
.vc-hero{padding:148px 0 0;text-align:left}
@media(max-width:720px){.vc-hero{padding:120px 0 0}}
.vc-hero .cl-wrap{display:grid;grid-template-columns:1fr;gap:clamp(40px,4vw,64px);align-items:center}
@media(min-width:900px){.vc-hero .cl-wrap{grid-template-columns:1.04fr .96fr}}
.vc-hero-main{max-width:560px}
.vc-kicker{display:flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11px;
  font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--sec)}
.vc-kicker .vc-kdot{color:var(--green)}
.vc-h1{font-weight:470;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2.3rem,5vw,4rem);line-height:1.06;letter-spacing:-.022em;margin-top:30px;
  max-width:18ch}
.vc-h1 em{font-style:italic;font-weight:540;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green)}
.vc-sub{margin-top:28px;max-width:52ch;font-size:17px;line-height:1.7;color:var(--sec)}
.vc-sub b{color:var(--ink);font-weight:600}
.vc-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:36px}
.vc-trust{margin-top:30px;font-family:var(--mono);font-size:12px;letter-spacing:.03em;
  color:var(--sec);line-height:1.7;max-width:56ch}
.vc-trust .vc-sep{color:var(--border-2);padding:0 12px}

/* hero exhibit — the SOP-with-cited-moments window, on editorial paper */
.vc-exhibit{position:relative;background:var(--white);border:1px solid var(--border);
  border-radius:12px;overflow:hidden;text-align:left;
  box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 28px rgba(24,24,27,.06),0 30px 72px rgba(24,24,27,.09)}
.vc-exhibit-bar{display:flex;align-items:baseline;justify-content:space-between;gap:12px;
  padding:14px 18px;background:#F7F5F0;border-bottom:1px solid var(--border)}
.vc-exhibit-bar .vc-bar-l{font-size:13.5px;font-weight:600;letter-spacing:-.01em;color:var(--ink)}
.vc-exhibit-bar .vc-bar-r{font-family:var(--mono);font-size:11px;color:var(--green-deep);
  background:var(--green-tint);border-radius:5px;padding:2px 8px;white-space:nowrap}
.vc-exhibit-body{padding:16px 18px;display:flex;flex-direction:column;gap:10px}
.vc-claim{border:1px solid var(--border);border-radius:10px;background:var(--white);padding:13px 15px}
.vc-claim--verified{background:var(--green-tint);border-color:rgba(31,107,58,.28)}
.vc-claim-head{display:flex;align-items:center;gap:9px;margin-bottom:7px;flex-wrap:wrap}
.vc-tag{display:inline-block;font-family:var(--mono);padding:2.5px 8px;border-radius:2px;
  text-transform:uppercase;letter-spacing:.1em;font-size:9.5px;font-weight:500;
  background:var(--green-tint);color:var(--green-deep)}
.vc-tag--task{background:transparent;color:var(--sec);border:1px solid var(--border)}
.vc-claim-speaker{font-size:12px;font-weight:600;color:var(--ink)}
.vc-claim-ts{font-family:var(--mono);font-size:11px;color:var(--sec);margin-left:auto}
.vc-claim-quote{font-family:var(--disp);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:15px;line-height:1.45;color:var(--ink);
  margin-bottom:9px}
.vc-claim-foot{display:flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;
  color:var(--green-deep)}
.vc-claim-foot .vc-check{width:16px;height:16px;border-radius:50%;background:var(--green);
  color:#fff;font-size:10px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.vc-exhibit-cap{margin:18px auto 0;max-width:60ch;text-align:center;font-family:var(--mono);
  font-style:italic;font-size:11.5px;line-height:1.7;letter-spacing:.02em;color:var(--sec)}
.vc-exhibit-cap .vc-figno{font-style:normal;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--green);padding-right:9px}

/* reveal */
.vc-reveal{opacity:0;transform:translateY(16px);
  transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.vc-reveal.is-in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.vc-reveal{opacity:1;transform:none;transition:none}}

/* section register marginalia */
.vc-reg{display:flex;align-items:center;gap:16px;margin-bottom:24px}
.vc-reg-no{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec);white-space:nowrap}
.vc-reg-no .vc-reg-num{color:var(--green)}
.vc-reg-rule{height:1px;flex:1;background:var(--border)}

/* roles section */
.vc-section{padding:104px 0}
@media(max-width:860px){.vc-section{padding:72px 0}}
.vc-roles{border-top:1px solid var(--border)}
.vc-head{max-width:760px}
.vc-h2{font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.8rem,3.4vw,2.7rem);line-height:1.13;letter-spacing:-.018em}
.vc-lead{margin-top:22px;font-size:16.5px;line-height:1.7;color:var(--sec);max-width:56ch}
.vc-tracks{display:grid;grid-template-columns:1fr;gap:0;margin-top:64px;border-top:1px solid var(--border)}
.vc-track{display:grid;grid-template-columns:1fr;gap:18px;padding:40px 0;
  border-bottom:1px solid var(--border)}
@media(min-width:860px){.vc-track{grid-template-columns:.34fr .66fr;gap:48px}}
.vc-track:last-child{border-bottom:0}
.vc-track-head{display:flex;gap:18px;align-items:baseline}
.vc-track-no{font-family:var(--disp);font-weight:320;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(2.6rem,4vw,3.6rem);line-height:1;letter-spacing:-.03em;color:var(--border-2);flex:none}
.vc-track-title{font-weight:540;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.3rem,2vw,1.6rem);line-height:1.18;letter-spacing:-.012em;color:var(--ink)}
.vc-track-list{list-style:none;margin:0;padding:0;display:grid;gap:13px}
.vc-track-list li{display:flex;gap:11px;align-items:flex-start;font-size:15px;line-height:1.65;
  color:var(--sec)}
.vc-track-list li svg{flex:none;margin-top:4px}

/* governance band — dark ink */
.vc-gov-wrap{padding:104px 0}
@media(max-width:860px){.vc-gov-wrap{padding:72px 0}}
.vc-gov{background:var(--ink);color:var(--cream);border-radius:4px;padding:64px 56px}
@media(max-width:720px){.vc-gov{padding:48px 28px}}
.vc-gov .vc-reg-no{color:rgba(251,250,248,.6)}
.vc-gov .vc-reg-num{color:var(--green-dark)}
.vc-gov .vc-reg-rule{background:rgba(251,250,248,.18)}
.vc-gov h2{font-family:var(--disp);font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.7rem,3vw,2.5rem);line-height:1.12;letter-spacing:-.02em;color:var(--cream);
  margin:0 0 20px;max-width:22ch}
.vc-gov-sub{font-size:16.5px;line-height:1.7;color:rgba(251,250,248,.74);max-width:58ch}
.vc-gov-chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
.vc-chip{font-family:var(--mono);font-size:.72rem;letter-spacing:.02em;
  border:1px solid rgba(251,250,248,.22);border-radius:999px;padding:9px 16px;
  color:rgba(251,250,248,.82)}
.vc-chip .vc-chip-dot{display:inline-block;width:6px;height:6px;border-radius:50%;
  background:var(--green-dark);margin-right:8px;vertical-align:middle}

/* closer — dark ink band */
.vc-closer-wrap{padding:0 0 110px}
@media(max-width:860px){.vc-closer-wrap{padding:0 0 72px}}
.vc-closer{background:var(--ink);color:var(--cream);border-radius:4px;padding:72px 64px;
  display:grid;grid-template-columns:repeat(12,1fr);column-gap:48px;align-items:center}
@media(max-width:860px){.vc-closer{grid-template-columns:1fr;row-gap:36px;padding:56px 32px}}
.vc-closer-text{grid-column:1/span 8}
.vc-closer-ctas{grid-column:9/span 4;display:flex;flex-direction:column;align-items:stretch;gap:12px}
@media(max-width:860px){
  .vc-closer-text,.vc-closer-ctas{grid-column:1/-1}
  .vc-closer-ctas{flex-direction:row;flex-wrap:wrap}
}
.vc-closer .vc-kicker{color:rgba(251,250,248,.6)}
.vc-closer .vc-kdot{color:var(--green-dark)}
.vc-closer h2{font-family:var(--disp);font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2rem,4vw,3.1rem);line-height:1.1;letter-spacing:-.02em;color:var(--cream);margin-top:24px}
.vc-closer h2 em{font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green-dark)}
.vc-closer-sub{margin-top:22px;font-size:16.5px;line-height:1.65;color:rgba(251,250,248,.72);max-width:44ch}
.vc-closer-note{margin-top:18px;font-family:var(--mono);font-size:11.5px;letter-spacing:.03em;
  color:rgba(251,250,248,.5)}
.vc-closer .vc-btn{text-align:center}
.vc-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);
  color:var(--ink);box-shadow:0 6px 22px rgba(126,211,155,.25)}
.vc-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.vc-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
`

/* ------------------------------------------------------------- utilities */

function Tick() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="#1F6B3A" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
    <div ref={ref} className={`vc-reveal ${inView ? 'is-in' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Reg({ no, label }: { no: string; label: string }) {
  return (
    <div className="vc-reg" aria-hidden="true">
      <span className="vc-reg-no"><span className="vc-reg-num">{no}</span> · {label}</span>
      <span className="vc-reg-rule" />
    </div>
  )
}

/* ------------------------------------------------------------------ data */

const ROLES = [
  {
    title: 'ERP / CRM Implementers',
    bullets: [
      'Enforce SOPs, flag skipped steps, and keep go-lives on track with cross-meeting memory.',
      'Generate client-ready artifacts — SOPs, PRDs, audits, KPI dashboards — with timestamp proof on every claim.',
      'Onboard replacements in minutes with a single project dashboard linking back to source moments.',
      'Built with Odoo partners in mind. Mirrors the Odoo lifecycle from discovery to go-live.',
    ],
  },
  {
    title: 'Agencies',
    bullets: [
      'Turn calls and screen recordings into SOPs, PRDs, and annotated walkthroughs. No re-explaining.',
      'Verify decisions instantly via timestamped moments inside every artifact.',
      'Both you and your client confirm scope changes — disputes end before they start.',
    ],
  },
  {
    title: 'Teams',
    bullets: [
      'Project health, master action trackers, and decision recall across every conversation.',
      'Built-in governance layer — flag deviations from your methodology automatically.',
      'New hires get the full project memory on day one.',
    ],
  },
]

const EXHIBIT_CARDS = [
  { time: '0:08:42', speaker: 'Operations lead', text: '“Phase 1 success means a working PO flow by end of week 4.”', tag: 'Decision', action: 'Cited in section 2.1' },
  { time: '0:15:19', speaker: 'Implementation', text: '“Inventory module configured before warehouse goes live.”', tag: 'Task', action: 'Cited in section 3.4' },
  { time: '0:22:01', speaker: 'Client', text: '“Multi-currency support is non-negotiable for the Europe rollout.”', tag: 'Decision', action: 'Cited in section 4.2' },
]

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section className="vc-hero">
      <div className="cl-wrap">
        <Reveal className="vc-hero-main">
          <p className="vc-kicker">Knowcap <span className="vc-kdot">·</span> Verified work intelligence</p>
          <h1 className="vc-h1">
            Verified work intelligence, with <em>proof.</em>
          </h1>
          <p className="vc-sub">
            Knowcap turns the conversations that run your projects — <b>meetings, calls,
            screen recordings, documents &amp; URLs, Telegram</b> — into timestamp-verified
            facts. SOPs, PRDs, onboarding guides, audits, and KPIs come out the other side,
            each claim cited back to the exact second it was said.
          </p>
          <div className="vc-cta-row">
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free</a>
            <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
          </div>
          <div className="vc-trust">
            Built by an Odoo partner
            <span className="vc-sep" aria-hidden="true">·</span>
            The trust layer for your AI agents
            <span className="vc-sep" aria-hidden="true">·</span>
            Audit trail on every action
          </div>
        </Reveal>

        <Reveal>
          <figure style={{ margin: 0 }}>
            <div
              className="vc-exhibit"
              role="img"
              aria-label="A Knowcap SOP draft with three meeting moments verified and cited into specific sections"
            >
              <div className="vc-exhibit-bar">
                <span className="vc-bar-l">SOP draft · Client onboarding</span>
                <span className="vc-bar-r">3 cited moments</span>
              </div>
              <div className="vc-exhibit-body">
                {EXHIBIT_CARDS.map((c) => (
                  <article className="vc-claim vc-claim--verified" key={c.time}>
                    <div className="vc-claim-head">
                      <span className={`vc-tag${c.tag === 'Task' ? ' vc-tag--task' : ''}`}>{c.tag}</span>
                      <span className="vc-claim-speaker">{c.speaker}</span>
                      <span className="vc-claim-ts">{c.time}</span>
                    </div>
                    <p className="vc-claim-quote">{c.text}</p>
                    <div className="vc-claim-foot">
                      <span className="vc-check">&#10003;</span>Verified · {c.action}
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <figcaption className="vc-exhibit-cap">
              <span className="vc-figno">Fig. 01</span>
              Three confirmed moments, each cited into the exact section of the document it backs.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- roles */

function Roles() {
  return (
    <section className="vc-section vc-roles">
      <div className="cl-wrap">
        <div className="vc-head">
          <Reveal>
            <Reg no="§01" label="By role" />
            <h2 className="vc-h2">Tailored to how you actually work.</h2>
          </Reveal>
          <Reveal>
            <p className="vc-lead">One verified memory, three ways to put it to work.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="vc-tracks">
            {ROLES.map((r, i) => (
              <div className="vc-track" key={r.title}>
                <div className="vc-track-head">
                  <span className="vc-track-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="vc-track-title">{r.title}</h3>
                </div>
                <ul className="vc-track-list">
                  {r.bullets.map((b) => (
                    <li key={b}><Tick />{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ governance */

const GOV_CHIPS = [
  'Methodology flags: 2 pending',
  'Client portal: restricted access',
  'Every claim: timestamp-verifiable',
]

function Governance() {
  return (
    <section className="vc-gov-wrap">
      <div className="cl-wrap">
        <Reveal>
          <div className="vc-gov">
            <Reg no="§02" label="Governance" />
            <h2>Governance + client-safe controls.</h2>
            <p className="vc-gov-sub">
              Flag missed approvals and skipped steps, then share through restricted client
              portals with redaction and access controls — always backed by verifiable
              timestamps. Nothing reaches an agent until a named human confirms it.
            </p>
            <div className="vc-gov-chips">
              {GOV_CHIPS.map((p) => (
                <span key={p} className="vc-chip">
                  <span className="vc-chip-dot" aria-hidden="true" />{p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- closer */

function Closer() {
  return (
    <section className="vc-closer-wrap">
      <div className="cl-wrap">
        <Reveal>
          <div className="vc-closer">
            <div className="vc-closer-text">
              <span className="vc-kicker">Knowcap <span className="vc-kdot">·</span> The difference</span>
              <h2>
                Make every conversation produce <em>docs you can trust.</em>
              </h2>
              <p className="vc-closer-sub">
                AI-generated, proof-backed, cited to the second. Humans confirm. Agents act.
              </p>
              <p className="vc-closer-note">Built for Saudi PDPL and GDPR Article 22 from day one.</p>
            </div>
            <div className="vc-closer-ctas">
              <a className="cl-btn cl-btn--solid vc-btn" href={`${APP_URL}/register`}>Get Started Free</a>
              <Link className="cl-btn cl-btn--ghost vc-btn" href="/book">Book a Demo</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ page */

export default function VersionC() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <noscript>
        <style>{`.vc-reveal{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
      <Hero />
      <Roles />
      <Governance />
      <Closer />
    </EditorialShell>
  )
}
