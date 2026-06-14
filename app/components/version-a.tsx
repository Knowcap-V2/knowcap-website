'use client'

/**
 * Version A — full landing variant on the V6b "Editorial Light" system.
 *
 * Re-skin of the old "A" copy onto EditorialShell: cream paper, Fraunces
 * display, Inter body, JetBrains Mono marginalia, green #1F6B3A accent,
 * dark-ink footer. All sections rebuilt self-contained with a unique `va-`
 * class prefix referencing .cl-root tokens — no legacy themed sections, no
 * theme switcher.
 *
 * Positioning: Knowcap is verified work intelligence, the trust layer for AI
 * agents. Meetings are ONE input. Live capture = meetings (Meet), calls/
 * recordings, screen recordings, documents/URLs, Telegram. Messages
 * (WhatsApp / email / Slack) are building before launch. MCP is a supporting
 * capability, not the headline identity.
 *
 * Tracks variant "a". Reachable at /a; not in the live / rotation.
 */

import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

/* ---------------------------------------------------------------- styles */

const CSS = `
/* shared layout rhythm */
.va-section{padding:clamp(64px,8vw,108px) 0}
.va-section--white{background:var(--white);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.va-section--ruled{border-top:1px solid var(--border)}
.va-head{max-width:760px}
.va-h2{font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.8rem,3.4vw,2.8rem);line-height:1.14;letter-spacing:-.018em}
.va-h2 em{font-style:italic;font-weight:540;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green)}
.va-lead{margin-top:22px;font-size:17px;line-height:1.7;color:var(--sec);max-width:60ch}
.va-lead b{color:var(--ink);font-weight:600}

/* section register marginalia */
.va-reg{display:flex;align-items:center;gap:16px;margin-bottom:24px}
.va-reg-no{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec);white-space:nowrap}
.va-reg-no .va-reg-num{color:var(--green)}
.va-reg-rule{height:1px;flex:1;background:var(--border)}

/* hero CTA + trust */
.va-cta-row{display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
.va-trust{margin-top:34px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px 0;
  font-family:var(--mono);font-size:12px;letter-spacing:.04em;color:var(--sec)}
.va-trust .va-sep{color:var(--border-2);padding:0 14px}
.va-capture{margin-top:12px;text-align:center;font-family:var(--mono);font-size:12px;
  letter-spacing:.03em;color:var(--sec)}

/* hero exhibit — claim stack on cream paper */
.va-exhibit{position:relative;max-width:560px;margin:56px auto 0;padding:0 4px}
.va-exhibit-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  font-family:var(--mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--sec);padding-bottom:14px;margin-bottom:16px;border-bottom:1px solid var(--border)}
.va-exhibit-bar .va-bar-left{display:inline-flex;align-items:center;gap:8px;color:var(--green-deep)}
.va-stack{display:flex;flex-direction:column;gap:12px}
.va-card{background:var(--white);border:1px solid var(--border);border-radius:10px;
  padding:16px 18px;box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 26px rgba(24,24,27,.05)}
.va-card-head{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.va-card-ts{font-family:var(--mono);font-size:11px;color:var(--green)}
.va-card-speaker{font-size:12px;font-weight:600;color:var(--ink)}
.va-card-text{font-family:var(--disp);font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;
  font-size:16px;line-height:1.45;color:var(--ink);margin:0 0 12px}
.va-card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  padding-top:10px;border-top:1px dashed var(--border)}
.va-tag{font-family:var(--mono);font-size:9.5px;font-weight:500;letter-spacing:.1em;
  text-transform:uppercase;padding:2.5px 8px;border-radius:2px}
.va-tag--decision{background:var(--green-tint);color:var(--green-deep)}
.va-tag--risk{background:transparent;color:var(--sec);border:1px solid var(--border)}
.va-tag--task{background:transparent;color:var(--sec);border:1px solid var(--border)}
.va-state{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;
  color:var(--sec);display:inline-flex;align-items:center;gap:7px;font-weight:500}
.va-state--verified{color:var(--green-deep)}
.va-dot{width:6px;height:6px;border-radius:50%;background:var(--amber)}
.va-card-action{margin-top:10px;padding:8px 12px;border-radius:6px;background:var(--green-tint);
  border:1px solid rgba(31,107,58,.22);font-family:var(--mono);font-size:11px;letter-spacing:.04em;
  color:var(--green-deep);display:flex;align-items:center;gap:8px;font-weight:500}
.va-exhibit-cap{margin:22px auto 0;max-width:54ch;text-align:center;font-family:var(--mono);
  font-style:italic;font-size:12px;line-height:1.7;letter-spacing:.02em;color:var(--sec)}
.va-figno{font-style:normal;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
  color:var(--green);padding-right:10px}

/* problem turn */
.va-prob-turn{margin-top:32px;padding-top:26px;border-top:1px solid var(--border);
  font-family:var(--disp);font-size:clamp(1.25rem,2.2vw,1.7rem);font-weight:460;
  font-variation-settings:'SOFT' 55,'WONK' 0;line-height:1.35;color:var(--ink);max-width:46ch}
.va-prob-turn .va-green-it{color:var(--green);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1}

/* process — numbered loop strip */
.va-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:56px;
  border-top:1px solid var(--border)}
@media(max-width:980px){.va-steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){.va-steps{grid-template-columns:1fr}}
.va-step{position:relative;padding:36px 30px 44px 0;border-right:1px solid var(--border)}
.va-step + .va-step{padding-left:30px}
.va-step:last-child{border-right:0}
@media(max-width:980px){
  .va-step:nth-child(2){border-right:0}
  .va-step:nth-child(n+3){border-top:1px solid var(--border)}
}
@media(max-width:680px){
  .va-step{border-right:0 !important;border-top:1px solid var(--border);padding:30px 0}
  .va-step + .va-step{padding-left:0}
  .va-step:first-child{border-top:0}
}
.va-step::before{content:'';position:absolute;top:-1px;left:0;height:2px;width:0;
  background:var(--green);transition:width .35s cubic-bezier(.22,1,.36,1)}
.va-step:hover::before{width:100%}
.va-step-num{font-family:var(--disp);font-weight:320;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(2.6rem,4.4vw,3.8rem);line-height:1;letter-spacing:-.03em;color:var(--border);
  transition:color .3s ease}
.va-step:hover .va-step-num{color:var(--green)}
.va-step h3{font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;font-size:20px;
  letter-spacing:-.01em;margin-top:20px}
.va-step p{margin-top:13px;font-size:14.5px;line-height:1.7;color:var(--sec)}
.va-step-note{margin-top:48px;padding-top:22px;border-top:1px solid var(--border);
  font-family:var(--mono);font-size:12.5px;line-height:1.7;color:var(--sec);max-width:62ch}
.va-step-note::before{content:'* ';color:var(--green)}

/* integrations cards */
.va-int-grid{display:grid;grid-template-columns:1fr;gap:20px;margin-top:48px}
@media(min-width:820px){.va-int-grid{grid-template-columns:repeat(3,1fr)}}
.va-int{background:var(--white);border:1px solid var(--border);border-radius:10px;
  padding:26px 26px 28px}
.va-int-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
.va-int-head h3{font-size:18px;font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  letter-spacing:-.01em}
.va-int-tag{font-family:var(--mono);font-size:9.5px;font-weight:500;letter-spacing:.1em;
  text-transform:uppercase;padding:3.5px 9px;border-radius:999px;white-space:nowrap}
.va-int-tag--live{background:var(--green-tint);color:var(--green-deep);
  border:1px solid rgba(31,107,58,.22)}
.va-int-tag--soon{background:transparent;color:var(--sec);border:1px solid var(--border-2)}
.va-int p{font-size:14.5px;line-height:1.65;color:var(--sec)}

/* security — datasheet list */
.va-spec{margin-top:48px;border-top:1px solid var(--border)}
.va-spec-row{display:grid;grid-template-columns:1fr;gap:8px;padding:26px 0;
  border-bottom:1px solid var(--border)}
@media(min-width:760px){.va-spec-row{grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);
  gap:clamp(24px,4vw,56px);align-items:baseline}}
.va-spec-row dt{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.05rem,1.5vw,1.25rem);color:var(--ink);display:flex;align-items:center;gap:12px}
.va-spec-row dd{margin:0;color:var(--sec);font-size:15px;line-height:1.6}

/* results — evidence ledger */
.va-ledger{margin-top:48px;display:grid;grid-template-columns:1fr;border-top:1px solid var(--border)}
@media(min-width:760px){.va-ledger{grid-template-columns:1fr 1fr}}
.va-ledger-row{display:grid;grid-template-columns:auto 1fr;gap:clamp(18px,3vw,30px);align-items:baseline;
  padding:clamp(24px,3vw,34px) 4px;border-bottom:1px solid var(--border)}
@media(min-width:760px){
  .va-ledger-row:nth-child(odd){border-right:1px solid var(--border);padding-right:clamp(26px,3vw,44px)}
  .va-ledger-row:nth-child(even){padding-left:clamp(26px,3vw,44px)}
}
.va-figure{font-family:var(--disp);font-weight:420;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(1.9rem,3.4vw,2.7rem);line-height:1;letter-spacing:-.02em;color:var(--green);
  white-space:nowrap}
.va-ledger-row h3{margin:0 0 6px;font-size:clamp(1.05rem,1.5vw,1.2rem);font-weight:560;
  font-variation-settings:'SOFT' 55,'WONK' 0}
.va-ledger-row p{margin:0;color:var(--sec);font-size:14.5px;line-height:1.6}

/* testimonials */
.va-quotes{display:grid;grid-template-columns:1fr;gap:20px;margin-top:48px}
@media(min-width:860px){.va-quotes{grid-template-columns:repeat(3,1fr)}}
.va-quote{margin:0;background:var(--white);border:1px solid var(--border);border-radius:10px;
  padding:26px;display:flex;flex-direction:column;gap:18px}
.va-quote blockquote{margin:0;font-family:var(--disp);font-weight:480;font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:clamp(1.05rem,1.5vw,1.2rem);line-height:1.4;
  color:var(--ink)}
.va-quote figcaption{display:flex;flex-direction:column;gap:2px;margin-top:auto;
  border-top:1px solid var(--border);padding-top:16px}
.va-quote-who{font-weight:600;color:var(--ink);font-size:14.5px}
.va-quote-org{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--sec)}

/* MCP code island */
.va-mcp-grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;margin-top:48px}
@media(min-width:860px){.va-mcp-grid{grid-template-columns:1fr 1fr;gap:56px}}
.va-mcp-body{font-size:16px;line-height:1.7;color:var(--sec);max-width:52ch}
.va-mcp-bullets{display:flex;flex-direction:column;gap:11px;margin-top:24px}
.va-bullet{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;color:var(--sec)}
.va-bullet svg{flex:none;margin-top:4px}
.va-mcp-grid .va-cta-row{justify-content:flex-start;margin-top:30px}
.va-code{background:var(--ink);color:rgba(251,250,248,.82);border-radius:4px;
  padding:28px 30px;font-family:var(--mono);font-size:12.5px;line-height:1.85;overflow-x:auto;
  box-shadow:0 24px 60px rgba(24,24,27,.18)}
.va-c-comment{color:rgba(251,250,248,.55)}
.va-c-key{color:#79B8FF}
.va-c-str{color:var(--green-dark)}
.va-c-plain{color:rgba(251,250,248,.82)}

/* FAQ */
.va-faq{max-width:760px;margin-top:48px;border-top:1px solid var(--border)}
.va-faq details{border-bottom:1px solid var(--border)}
.va-faq summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:16px;
  padding:22px 0;font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:17.5px;letter-spacing:-.01em;color:var(--ink);transition:color .15s ease}
.va-faq summary::-webkit-details-marker{display:none}
.va-faq summary:hover{color:var(--green)}
.va-q-sign{font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--green);flex:none}
.va-faq-a{padding:0 0 24px 34px;font-size:15px;line-height:1.7;color:var(--sec);max-width:62ch}

/* closer — dark ink band */
.va-closer-wrap{padding:clamp(64px,8vw,108px) 0}
.va-closer{background:var(--ink);color:var(--cream);border-radius:4px;padding:clamp(48px,6vw,72px);
  text-align:center}
.va-closer .va-kicker{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(251,250,248,.6)}
.va-closer .va-kicker .va-kdot{color:var(--green-dark)}
.va-closer h2{font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.9rem,4vw,3rem);line-height:1.12;letter-spacing:-.02em;color:var(--cream);
  margin-top:22px}
.va-closer h2 em{font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green-dark)}
.va-closer-sub{margin:22px auto 34px;font-size:16.5px;line-height:1.65;
  color:rgba(251,250,248,.72);max-width:46ch}
.va-closer .va-cta-row{justify-content:center}
.va-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);
  color:var(--ink);box-shadow:0 6px 22px rgba(126,211,155,.25)}
.va-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.va-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
.va-closer-note{margin-top:26px;font-family:var(--mono);font-size:11.5px;letter-spacing:.04em;
  color:rgba(251,250,248,.5)}
`

/* ----------------------------------------------------------- small glyph */

function Tick() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="#1F6B3A" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 15 11" fill="none" aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M1 5.5h12M9 1l4 4.5L9 10" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reg({ no, label }: { no: string; label: string }) {
  return (
    <div className="va-reg" aria-hidden="true">
      <span className="va-reg-no"><span className="va-reg-num">{no}</span> · {label}</span>
      <span className="va-reg-rule" />
    </div>
  )
}

/* ------------------------------------------------------------ hero exhibit */

function HeroExhibit() {
  return (
    <figure className="va-exhibit">
      <div role="img" aria-label="Knowcap inbox: three claims extracted from a live meeting — a verified decision an agent is acting on, a verified risk, and a task pending confirmation">
        <div className="va-exhibit-bar">
          <span className="va-bar-left"><Tick />Inbox · 3 claims</span>
          <span>1 awaiting review</span>
        </div>
        <div className="va-stack">
          <article className="va-card">
            <div className="va-card-head">
              <span className="va-card-ts">0:12:08</span>
              <span className="va-card-speaker">Sarah</span>
            </div>
            <p className="va-card-text">&ldquo;We&rsquo;re extending the warranty window to 90 days.&rdquo;</p>
            <div className="va-card-foot">
              <span className="va-tag va-tag--decision">Decision</span>
              <span className="va-state va-state--verified"><Tick />Verified</span>
            </div>
            <div className="va-card-action"><Arrow />Agent drafted the policy update — with receipts</div>
          </article>

          <article className="va-card">
            <div className="va-card-head">
              <span className="va-card-ts">0:21:33</span>
              <span className="va-card-speaker">Marcus</span>
            </div>
            <p className="va-card-text">&ldquo;Q3 budget came in 12% under plan — flag this for the board.&rdquo;</p>
            <div className="va-card-foot">
              <span className="va-tag va-tag--task">Task</span>
              <span className="va-state va-state--verified"><Tick />Verified</span>
            </div>
          </article>

          <article className="va-card">
            <div className="va-card-head">
              <span className="va-card-ts">0:27:14</span>
              <span className="va-card-speaker">Client</span>
            </div>
            <p className="va-card-text">&ldquo;The vendor missed the staging deadline.&rdquo;</p>
            <div className="va-card-foot">
              <span className="va-tag va-tag--risk">Risk</span>
              <span className="va-state"><span className="va-dot" />pending your confirm</span>
            </div>
          </article>
        </div>
      </div>
      <figcaption className="va-exhibit-cap">
        <span className="va-figno">Fig. 01</span>
        Human claims become evidence — and only confirmed facts reach your agents.
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------- hero */

function Hero() {
  return (
    <>
      <PageHero
        kicker="Verified work intelligence"
        title={<>Turn human claims into <em>evidence</em> your AI agents can trust.</>}
        sub={
          <>
            Capture the conversations that run the business — meetings, calls, screen recordings,
            documents, and Telegram. Promote the durable parts to confirmed facts. Let your agents
            act on what&rsquo;s verified, never on a guess.
          </>
        }
      />
      <div className="cl-wrap">
        <div className="va-cta-row">
          <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
          <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
        </div>
        <div className="va-trust">
          <span>Every fact confirmed by a named human</span>
          <span className="va-sep" aria-hidden="true">·</span>
          <span>Full audit trail on every AI action</span>
          <span className="va-sep" aria-hidden="true">·</span>
          <span>Built by an Odoo partner</span>
        </div>
        <p className="va-capture">
          Captures Meet · calls &amp; recordings · screen recordings · documents · URLs · Telegram
        </p>
        <HeroExhibit />
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- problem */

function Problem() {
  return (
    <section className="va-section va-section--ruled">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§01" label="The problem" />
          <h2 className="va-h2">
            Most AI acts on what the model <em>thinks</em> is true.
          </h2>
          <p className="va-lead">
            A model mishears one line in a meeting and your agent runs with it — the wrong scope in
            a PR, a task from a comment nobody confirmed, a &ldquo;decision&rdquo; that was really
            just discussion. When a client says <b>&ldquo;that&rsquo;s not what we agreed,&rdquo;</b>{' '}
            there&rsquo;s no record to point to.
          </p>
        </div>
        <p className="va-prob-turn">
          Knowcap agents act only on what a human said is true — every fact confirmed, timestamped
          to its source, and logged. <span className="va-green-it">That is the trust layer.</span>
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- process / loop */

const STEPS = [
  {
    no: '01', title: 'Capture',
    body: 'Knowcap captures the conversations your team is already having: meetings, calls, screen recordings, documents, URLs, and Telegram. Messages over WhatsApp, email, and Slack are next.',
  },
  {
    no: '02', title: 'Extract',
    body: 'AI pulls out every commitment, decision, task, and risk. Each one carries its speaker and a timestamp back to the exact second it was said.',
  },
  {
    no: '03', title: 'Confirm',
    body: 'A named human reviews each claim and promotes it to evidence with one tap. No bulk approve, no silent ingestion. The graph holds what your team confirmed, nothing else.',
  },
  {
    no: '04', title: 'Act',
    body: 'Agents work from confirmed facts: draft the change-order email, create the Odoo task, brief the next meeting. Every action carries its receipts.',
  },
]

function Process() {
  return (
    <section className="va-section va-section--white" id="loop">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§02" label="How it works · the loop" />
          <h2 className="va-h2">From capture to proof.</h2>
          <p className="va-lead">
            A simple loop that turns the conversations running the business into a single,
            verifiable memory your agents can rely on.
          </p>
        </div>
        <div className="va-steps">
          {STEPS.map((s) => (
            <div className="va-step" key={s.no}>
              <div className="va-step-num" aria-hidden="true">{s.no}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <p className="va-step-note">
          Confirmation takes about two minutes per meeting. The agent actions it unlocks run before
          the meeting ends.
        </p>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- integrations */

const INTEGRATIONS = [
  { k: 'MCP server', tag: 'Live', soon: false, v: 'Wire Claude, Codex, Gemini, or any MCP-compatible agent directly to your verified facts.' },
  { k: 'Odoo', tag: 'Live', soon: false, v: 'Built for Odoo implementation partners — confirmed scope decisions flow toward your Odoo work.' },
  { k: 'Jira · Asana · ClickUp', tag: 'On the roadmap', soon: true, v: 'Project-tool sync so confirmed actions land where your team already works.' },
]

function Integrations() {
  return (
    <section className="va-section va-section--ruled">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§03" label="Integrations" />
          <h2 className="va-h2">Wire it into the tools you already run.</h2>
          <p className="va-lead">
            Knowcap is infrastructure, not another silo. Your agents query verified facts; confirmed
            actions flow to your stack.
          </p>
        </div>
        <div className="va-int-grid">
          {INTEGRATIONS.map((it) => (
            <div className="va-int" key={it.k}>
              <div className="va-int-head">
                <h3>{it.k}</h3>
                <span className={`va-int-tag ${it.soon ? 'va-int-tag--soon' : 'va-int-tag--live'}`}>{it.tag}</span>
              </div>
              <p>{it.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- security */

const PILLARS = [
  { h: 'Your data is yours', s: 'We never train AI models on your private data.' },
  { h: 'Encrypted everywhere', s: 'AES-256 at rest, TLS in transit.' },
  { h: 'Granular access control', s: 'Role-based permissions for every source and every agent.' },
  { h: 'Auditable by design', s: 'Every confirmation logged: who, what, when, against which source. Built for Saudi PDPL and GDPR Article 22.' },
]

function Security() {
  return (
    <section className="va-section va-section--white" id="security">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§04" label="Security &amp; governance" />
          <h2 className="va-h2">Your work, secured and governed.</h2>
        </div>
        <dl className="va-spec">
          {PILLARS.map((p) => (
            <div className="va-spec-row" key={p.h}>
              <dt><Tick />{p.h}</dt>
              <dd>{p.s}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- results */

const RESULTS = [
  { fig: '1.4–1.8×', h: 'More projects delivered', s: 'Instant onboarding, automated docs, self-sufficient clients — more velocity from the same team.' },
  { fig: '50%', h: 'Less documentation time', s: 'Generate contracts, SOPs, and PRDs from your verified project memory.' },
  { fig: '40%', h: 'Fewer support tickets', s: 'Verifiable answers before clients create a ticket.' },
  { fig: '70%', h: 'Faster onboarding', s: 'Give new hires the entire project memory on day one.' },
]

function Results() {
  return (
    <section className="va-section va-section--ruled">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§05" label="Outcomes" />
          <h2 className="va-h2">Measurable results from day one.</h2>
        </div>
        <div className="va-ledger">
          {RESULTS.map((r) => (
            <div className="va-ledger-row" key={r.h}>
              <span className="va-figure">{r.fig}</span>
              <div>
                <h3>{r.h}</h3>
                <p>{r.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- testimonials */

const TESTIMONIALS = [
  { quote: 'Knowcap cut our support tickets by 40% after implementation.', who: 'Ibrahim Abed', org: 'Plementus (Egypt)' },
  { quote: 'AI-generated PRDs reduced documentation time by half.', who: 'Mohamed Jamal', org: 'BI Solutions (KSA)' },
  { quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.', who: 'Ariika Tech Team', org: 'Odoo Implementation Partner' },
]

function Testimonials() {
  return (
    <section className="va-section va-section--white">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§06" label="Social proof" />
          <h2 className="va-h2">What teams are saying.</h2>
        </div>
        <div className="va-quotes">
          {TESTIMONIALS.map((t) => (
            <figure className="va-quote" key={t.who}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="va-quote-who">{t.who}</span>
                <span className="va-quote-org">{t.org}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- MCP */

function Mcp() {
  return (
    <section className="va-section va-section--ruled" id="mcp">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§07" label="For your agents" />
          <h2 className="va-h2">Your agents, your tools, your verified facts.</h2>
        </div>
        <div className="va-mcp-grid">
          <div>
            <p className="va-mcp-body">
              Knowcap ships an MCP server. Connect it to Claude, Codex, or Gemini and your agents
              query your organization&rsquo;s confirmed knowledge instead of guessing from
              transcripts. Ask what was promised to a client, what risks are open against the
              launch, what changed since last week. The answers come with receipts: who said it,
              when, and who confirmed it.
            </p>
            <div className="va-mcp-bullets">
              <span className="va-bullet"><Tick />Works inside the AI tools you already use</span>
              <span className="va-bullet"><Tick />Agents read confirmed facts only — strictness enforced server-side, per agent</span>
              <span className="va-bullet"><Tick />Every fact links back to the second it was said</span>
            </div>
            <div className="va-cta-row">
              <a className="cl-btn cl-btn--solid" href="https://docs.knowcap.ai/#mcp-overview">
                Connect your Claude <Arrow />
              </a>
              <a className="cl-btn cl-btn--ghost" href={`${APP_URL}/register`}>Get your API key</a>
            </div>
          </div>
          <pre className="va-code" aria-label="Example MCP query">
            <span className="va-c-comment">{'// your agent, any MCP runtime'}</span>{'\n'}
            <span className="va-c-key">search_memories</span>
            <span className="va-c-plain">{'({'}</span>{'\n'}
            <span className="va-c-plain">{'  query: '}</span>
            <span className="va-c-str">&quot;what did we promise Ariika for phase 2?&quot;</span>
            <span className="va-c-plain">,</span>{'\n'}
            <span className="va-c-plain">{'  verification_strictness: '}</span>
            <span className="va-c-str">&quot;human_only&quot;</span>{'\n'}
            <span className="va-c-plain">{'})'}</span>{'\n\n'}
            <span className="va-c-comment">{'// → 3 commitments · each confirmed by a named human'}</span>{'\n'}
            <span className="va-c-comment">{'// → source: client call 2026-06-02 · 0:14:32'}</span>
          </pre>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- FAQ */

const FAQS = [
  {
    q: 'What is Knowcap?',
    a: 'Knowcap is verified work intelligence — the trust layer for AI agents. It captures the conversations that run the business (meetings, calls, screen recordings, documents, URLs, Telegram), extracts every commitment, decision, task, and risk, and lets a named human confirm each one. Only confirmed facts feed the agents that take action.',
  },
  {
    q: 'Isn’t this just another meeting notetaker?',
    a: 'Notetakers hand you a summary and stop. Meetings are only one input here. Knowcap is the layer after the summary: every extracted claim is confirmed by a named human, becomes part of your organization’s verified memory, and is served to your AI agents with a full audit trail. Summaries are the input. Kept commitments are the output.',
  },
  {
    q: 'Can Knowcap join confidential meetings?',
    a: 'Yes, with total control. Invite Knowcap as a full participant, audio-only, or transcript-only. Nothing reaches your agents until a named human confirms it.',
  },
  {
    q: 'Which tools does it work with?',
    a: 'Claude, Codex, and Gemini today via MCP. Capture from Google Meet, uploaded calls and recordings, screen recordings, documents, URLs, and Telegram. Odoo task creation is live for implementation teams; WhatsApp, email, and Slack capture are building before launch.',
  },
  {
    q: 'What about our data?',
    a: 'Your graph is scoped to your organization, and we never train models on your private data. Agents see only what their API key allows, at the strictness tier you set. Every confirmation is logged: who, what, when, against which source. Built for Saudi PDPL and GDPR Article 22 from day one.',
  },
]

function Faq() {
  return (
    <section className="va-section va-section--white" id="faq">
      <div className="cl-wrap">
        <div className="va-head">
          <Reg no="§08" label="Objections" />
          <h2 className="va-h2">Fair questions.</h2>
        </div>
        <div className="va-faq">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary><span className="va-q-sign">Q.</span>{f.q}</summary>
              <p className="va-faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- closer */

function Closer() {
  return (
    <section className="va-closer-wrap">
      <div className="cl-wrap">
        <div className="va-closer">
          <span className="va-kicker">Knowcap <span className="va-kdot">·</span> The difference</span>
          <h2>
            Run projects on proof,<br />
            <em>not memory.</em>
          </h2>
          <p className="va-closer-sub">Humans confirm. Agents act. Every fact carries its receipts.</p>
          <div className="va-cta-row">
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
          </div>
          <p className="va-closer-note">Free to start. Partner pricing on a quick call.</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- page */

export default function VersionA() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ABTracker variant="a" />
      <EditorialShell>
        <Hero />
        <Problem />
        <Process />
        <Integrations />
        <Security />
        <Results />
        <Testimonials />
        <Mcp />
        <Faq />
        <Closer />
      </EditorialShell>
    </>
  )
}
