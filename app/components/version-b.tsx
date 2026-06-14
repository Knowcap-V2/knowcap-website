'use client'

/**
 * Version B (outcome-first) — V6b "Editorial Light" re-skin.
 *
 * Full landing variant, rebuilt self-contained on EditorialShell (cream fixed
 * header + dark-ink footer). Same message as the old /b page, now on the winning
 * V6b design language (Fraunces display, Inter body, JetBrains Mono marginalia,
 * green #1F6B3A accent) — cream editorial hero, no theme switcher, no dark
 * gradient hero.
 *
 * Positioning fixes applied:
 *  - Knowcap = verified work intelligence, the trust layer for AI agents.
 *    Meetings are ONE input, not the identity. No "meeting recorder" framing.
 *  - No audio-memo phrasing for capture sources.
 *  - Live capture = Meet, calls/recordings, screen recordings, documents/URLs,
 *    Telegram. Messages (WhatsApp / email / Slack) are marked as building.
 *  - MCP is a supporting capability, not the headline.
 *
 * Tracks variant "b". Served at /b and in the live / rotation (outcome).
 */

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import EditorialShell from '@/components/editorial/shell'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

/* ---------------------------------------------------------------- styles */

const CSS = `
.vb-page{padding-bottom:0}

/* mono register marginalia (matches home-commitment) */
.vb-reg{display:flex;align-items:center;gap:16px;margin-bottom:26px}
.vb-reg-no{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec);white-space:nowrap}
.vb-reg-no .vb-reg-num{color:var(--green)}
.vb-reg-rule{height:1px;flex:1;background:var(--border)}

/* sections shared */
.vb-section{padding:104px 0}
@media(max-width:860px){.vb-section{padding:68px 0}}
.vb-band{background:var(--white);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.vb-section-head{max-width:760px}
.vb-h2{font-family:var(--disp);font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.9rem,3.6vw,3rem);line-height:1.12;letter-spacing:-.018em;color:var(--ink)}
.vb-lead{margin-top:22px;font-size:17px;line-height:1.7;color:var(--sec);max-width:60ch}
.vb-lead b{color:var(--ink);font-weight:600}
.vb-green-it{color:var(--green);font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1}

/* buttons row */
.vb-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:40px}
.vb-cta-row--center{justify-content:center}

/* ── hero — cream editorial, two-column ── */
.vb-hero{padding:150px 0 96px}
@media(max-width:860px){.vb-hero{padding:118px 0 64px}}
.vb-hero-grid{display:grid;grid-template-columns:1fr;gap:clamp(40px,5vw,64px);align-items:center}
@media(min-width:980px){.vb-hero-grid{grid-template-columns:1.05fr .95fr}}
.vb-docid{display:flex;align-items:center;gap:10px;margin-bottom:26px}
.vb-docid .vb-kick{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec)}
.vb-docid .vb-kdot{color:var(--green)}
.vb-h1{font-family:var(--disp);font-weight:480;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2.4rem,5vw,4.3rem);line-height:1.05;letter-spacing:-.022em;color:var(--ink);
  max-width:22ch}
.vb-h1 em{font-style:italic;font-weight:540;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green)}
.vb-h1 .vb-dim{color:var(--sec)}
.vb-sub{margin-top:30px;max-width:54ch;font-size:17.5px;line-height:1.7;color:var(--sec)}
.vb-sub b{color:var(--ink);font-weight:600}
.vb-bullets{display:flex;flex-direction:column;gap:13px;margin-top:30px;padding-top:26px;
  border-top:1px solid var(--border);max-width:620px}
.vb-bullet{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;line-height:1.55;color:var(--sec)}
.vb-bullet svg{flex:none;margin-top:3px}
.vb-bullet em{font-style:normal;font-family:var(--mono);font-size:11px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--amber);margin-left:6px}
.vb-trust{margin-top:30px;font-family:var(--mono);font-size:12px;letter-spacing:.04em;
  color:var(--sec);display:flex;flex-wrap:wrap;align-items:center;gap:10px 0}
.vb-trust .vb-sep{color:var(--border-2);padding:0 14px}

/* ── claim stack exhibit (the hero cover) ── */
.vb-stack-wrap{position:relative;padding:36px 0}
.vb-stack-wrap::before{content:'';position:absolute;inset:0 -16px;
  background-image:radial-gradient(circle,var(--border-2) 1px,transparent 1px);
  background-size:22px 22px;
  -webkit-mask-image:radial-gradient(ellipse 75% 78% at 55% 42%,rgba(0,0,0,.65) 0%,transparent 80%);
  mask-image:radial-gradient(ellipse 75% 78% at 55% 42%,rgba(0,0,0,.65) 0%,transparent 80%);
  pointer-events:none}
.vb-stack{position:relative;z-index:1;display:flex;flex-direction:column;gap:13px;
  width:100%;max-width:520px;margin-left:auto}
.vb-stack-bar{display:flex;align-items:center;justify-content:space-between;
  font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--sec);padding-bottom:13px;border-bottom:1px solid var(--border)}
.vb-stack-bar-meta{display:inline-flex;align-items:center;gap:8px;color:var(--green-deep)}
.vb-card{background:var(--white);border:1px solid var(--border);border-radius:10px;
  padding:15px 17px;box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 26px rgba(24,24,27,.07)}
.vb-card-head{display:flex;align-items:center;gap:9px;margin-bottom:9px;font-family:var(--mono);
  font-size:11px;letter-spacing:.04em;color:var(--sec)}
.vb-card-ts{color:var(--green-deep);font-weight:500}
.vb-card-speaker{color:var(--ink);font-weight:600;letter-spacing:0}
.vb-card-text{font-family:var(--disp);font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;
  font-size:16px;line-height:1.42;color:var(--ink);margin:0 0 12px}
.vb-card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
  padding-top:11px;border-top:1px dashed var(--border)}
.vb-tag{font-family:var(--mono);font-size:9.5px;font-weight:500;letter-spacing:.1em;
  text-transform:uppercase;padding:3px 9px;border-radius:2px}
.vb-tag--decision{background:var(--green-tint);color:var(--green-deep)}
.vb-tag--risk{background:transparent;color:var(--sec);border:1px solid var(--border)}
.vb-tag--task{background:transparent;color:var(--sec);border:1px solid var(--border)}
.vb-state{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;
  letter-spacing:.06em;text-transform:uppercase;color:var(--sec);font-weight:500}
.vb-state svg{flex:none}
.vb-state--verified{color:var(--green-deep)}
.vb-state--pending .vb-dot{width:6px;height:6px;border-radius:50%;background:var(--amber)}
.vb-card-action{margin-top:11px;padding:8px 12px;border-radius:6px;background:var(--green-tint);
  border:1px solid rgba(31,107,58,.22);font-family:var(--mono);font-size:11px;letter-spacing:.04em;
  color:var(--green-deep);display:flex;align-items:center;gap:8px;font-weight:500}
.vb-card-action svg{flex:none}
.vb-cover-cap{position:relative;z-index:1;margin:22px auto 0;max-width:60ch;text-align:center;
  font-family:var(--mono);font-style:italic;font-size:12px;line-height:1.7;letter-spacing:.02em;
  color:var(--sec)}
.vb-figno{font-style:normal;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
  color:var(--green);padding-right:10px}

/* ── problem beat ── */
.vb-prob{border-top:1px solid var(--border)}
.vb-prob .vb-turn{margin-top:18px;font-size:17px;line-height:1.7;color:var(--ink);max-width:60ch}
.vb-prob .vb-turn .vb-mark{color:var(--green-deep);font-weight:600;
  background:var(--green-tint);padding:0 .14em;border-radius:2px}

/* ── 80-second signature (split: narrative + exhibit) ── */
.vb-split{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;margin-top:8px}
@media(min-width:880px){.vb-split{grid-template-columns:.92fr 1.08fr;gap:56px}}
.vb-split-rule{width:36px;height:2px;background:var(--green);margin-bottom:20px}
.vb-figure-xl{font-family:var(--disp);font-style:italic;font-weight:480;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:clamp(2.6rem,4.6vw,3.6rem);line-height:1;
  letter-spacing:-.02em;color:var(--green);display:block}
.vb-story-h{font-family:var(--disp);font-weight:520;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.45rem,2.4vw,1.95rem);line-height:1.2;letter-spacing:-.015em;color:var(--ink);
  margin-top:16px}
.vb-story-body{margin-top:18px;font-size:15.5px;line-height:1.7;color:var(--sec);max-width:54ch}
.vb-story-body b{color:var(--ink);font-weight:600}
.vb-story-dim{margin-top:16px;font-size:14.5px;line-height:1.7;color:var(--sec);max-width:54ch}
.vb-shot{position:relative;border:1px solid var(--border);border-radius:12px;overflow:hidden;
  background:var(--white);
  box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 28px rgba(24,24,27,.06),0 30px 72px rgba(24,24,27,.09)}
.vb-shot-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:11px 16px;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:11px;
  letter-spacing:.06em;text-transform:uppercase;color:var(--sec)}
.vb-shot-seal{display:inline-flex;align-items:center;gap:7px;color:var(--green-deep)}
.vb-shot img{display:block;width:100%;height:auto}

/* ── process loop — 01-04 strip on white band ── */
.vb-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:60px;
  border-top:1px solid var(--border)}
@media(max-width:980px){.vb-steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){.vb-steps{grid-template-columns:1fr}}
.vb-step{position:relative;padding:38px 28px 46px 0;border-right:1px solid var(--border)}
.vb-step + .vb-step{padding-left:28px}
.vb-step:last-child{border-right:0}
@media(max-width:980px){
  .vb-step:nth-child(2){border-right:0}
  .vb-step:nth-child(n+3){border-top:1px solid var(--border)}
}
@media(max-width:680px){
  .vb-step{border-right:0 !important;border-top:1px solid var(--border);padding:30px 0}
  .vb-step + .vb-step{padding-left:0}
  .vb-step:first-child{border-top:0}
}
.vb-step::before{content:'';position:absolute;top:-1px;left:0;height:2px;width:0;background:var(--green);
  transition:width .35s cubic-bezier(.22,1,.36,1)}
.vb-step:hover::before{width:100%}
.vb-step-num{font-family:var(--disp);font-weight:320;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(2.8rem,5vw,4rem);line-height:1;letter-spacing:-.03em;color:var(--border);
  transition:color .3s ease}
.vb-step:hover .vb-step-num{color:var(--green)}
.vb-step h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:19px;letter-spacing:-.01em;color:var(--ink);margin-top:20px}
.vb-step p{margin-top:13px;font-size:14px;line-height:1.65;color:var(--sec)}
.vb-loop-note{margin-top:48px;padding-top:22px;border-top:1px solid var(--border);
  font-family:var(--mono);font-size:12.5px;line-height:1.7;color:var(--sec);max-width:62ch}
.vb-loop-note::before{content:'* ';color:var(--green)}

/* ── integrations band ── */
.vb-int-grid{display:grid;grid-template-columns:1fr;gap:18px;margin-top:52px}
@media(min-width:820px){.vb-int-grid{grid-template-columns:repeat(3,1fr)}}
.vb-int{background:var(--cream);border:1px solid var(--border);border-radius:10px;padding:26px 24px}
.vb-int-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.vb-int-head h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:18px;letter-spacing:-.01em;color:var(--ink)}
.vb-int-tag{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
  padding:4px 9px;border-radius:999px;white-space:nowrap;font-weight:500}
.vb-int-tag--live{border:1px solid rgba(31,107,58,.3);color:var(--green-deep);background:var(--green-tint)}
.vb-int-tag--soon{border:1px solid var(--border-2);color:var(--sec)}
.vb-int p{font-size:14.5px;line-height:1.6;color:var(--sec)}

/* ── security datasheet ── */
.vb-spec{display:grid;grid-template-columns:1fr;border-top:1px solid var(--border);margin-top:52px}
.vb-spec-row{display:grid;grid-template-columns:1fr;gap:6px;padding:26px 4px;
  border-bottom:1px solid var(--border)}
@media(min-width:760px){.vb-spec-row{grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);
  gap:clamp(24px,4vw,56px);align-items:baseline}}
.vb-spec-row dt{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.05rem,1.5vw,1.28rem);color:var(--ink);display:flex;align-items:center;gap:12px}
.vb-spec-row dd{margin:0;color:var(--sec);font-size:15px;line-height:1.55}

/* ── results ledger ── */
.vb-ledger{display:grid;grid-template-columns:1fr;border-top:1px solid var(--border);margin-top:52px}
@media(min-width:760px){.vb-ledger{grid-template-columns:1fr 1fr}}
.vb-ledger-row{display:grid;grid-template-columns:auto 1fr;gap:clamp(18px,3vw,30px);align-items:baseline;
  padding:30px 4px;border-bottom:1px solid var(--border)}
@media(min-width:760px){
  .vb-ledger-row:nth-child(odd){border-right:1px solid var(--border);padding-right:clamp(26px,3vw,44px)}
  .vb-ledger-row:nth-child(even){padding-left:clamp(26px,3vw,44px)}
}
.vb-figure{font-family:var(--disp);font-weight:420;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(1.9rem,3.4vw,2.7rem);line-height:1;letter-spacing:-.02em;color:var(--ink);
  white-space:nowrap}
.vb-ledger-row h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.05rem,1.5vw,1.2rem);color:var(--ink);letter-spacing:-.01em}
.vb-ledger-row p{margin-top:6px;color:var(--sec);font-size:14.5px;line-height:1.55}

/* ── testimonials ── */
.vb-quotes{display:grid;grid-template-columns:1fr;gap:18px;margin-top:52px}
@media(min-width:860px){.vb-quotes{grid-template-columns:repeat(3,1fr)}}
.vb-quote{margin:0;background:var(--white);border:1px solid var(--border);border-radius:10px;
  padding:28px 26px;display:flex;flex-direction:column;gap:18px}
.vb-quote blockquote{font-family:var(--disp);font-weight:500;font-variation-settings:'SOFT' 55,'WONK' 0;
  letter-spacing:-.01em;font-size:clamp(1.05rem,1.5vw,1.2rem);line-height:1.4;color:var(--ink)}
.vb-quote figcaption{display:flex;flex-direction:column;gap:3px;margin-top:auto;
  border-top:1px solid var(--border);padding-top:16px}
.vb-quote-who{font-family:var(--disp);font-weight:600;color:var(--ink);font-size:.96rem}
.vb-quote-org{font-family:var(--mono);font-size:11px;letter-spacing:.06em;color:var(--sec)}

/* ── faq — editorial rules ── */
.vb-faq{max-width:780px;margin:52px auto 0;border-top:1px solid var(--border)}
.vb-faq details{border-bottom:1px solid var(--border)}
.vb-faq summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:16px;padding:22px 0;
  font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;font-size:17.5px;
  letter-spacing:-.01em;color:var(--ink);transition:color .15s ease}
.vb-faq summary::-webkit-details-marker{display:none}
.vb-faq summary:hover{color:var(--green)}
.vb-q-sign{font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--green);flex:none}
.vb-faq-a{padding:0 0 24px 34px;font-size:15px;line-height:1.7;color:var(--sec);max-width:66ch}

/* ── close band — dark ink ── */
.vb-closer-wrap{padding:104px 0}
@media(max-width:860px){.vb-closer-wrap{padding:68px 0}}
.vb-closer{background:var(--ink);color:var(--cream);border-radius:4px;padding:72px 64px;text-align:center}
@media(max-width:860px){.vb-closer{padding:56px 28px}}
.vb-closer .vb-kick{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(251,250,248,.6)}
.vb-closer .vb-kdot{color:var(--green-dark)}
.vb-closer h2{font-family:var(--disp);font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2rem,4vw,3.2rem);line-height:1.1;letter-spacing:-.02em;color:var(--cream);margin-top:22px}
.vb-closer h2 .vb-dim{color:rgba(251,250,248,.55)}
.vb-closer h2 em{font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;color:var(--green-dark)}
.vb-closer-sub{margin:22px auto 0;font-size:16.5px;line-height:1.65;color:rgba(251,250,248,.72);
  max-width:46ch}
.vb-closer .vb-cta-row{justify-content:center;margin-top:38px}
.vb-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);
  color:var(--ink);box-shadow:0 6px 22px rgba(126,211,155,.25)}
.vb-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.vb-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
.vb-closer-note{margin:22px auto 0;font-family:var(--mono);font-size:12px;letter-spacing:.04em;
  color:rgba(251,250,248,.55)}

/* reveal */
@media(prefers-reduced-motion:reduce){
  .vb-reveal{opacity:1 !important;transform:none !important}
}
`

/* --------------------------------------------------------------- glyphs */

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
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true"
      style={{ marginLeft: 6, verticalAlign: 'middle' }}>
      <path d="M1 5.5h12M9 1l4 4.5L9 10" stroke="currentColor" strokeWidth="1.5"
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
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`vb-reveal ${className}`}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}

function Reg({ no, label }: { no: string; label: string }) {
  return (
    <div className="vb-reg" aria-hidden="true">
      <span className="vb-reg-no"><span className="vb-reg-num">{no}</span> · {label}</span>
      <span className="vb-reg-rule" />
    </div>
  )
}

/* --------------------------------------------------- claims exhibit (cover) */

function ClaimsExhibit() {
  return (
    <figure className="vb-stack-wrap" style={{ margin: 0 }}>
      <div
        className="vb-stack"
        role="img"
        aria-label="Verified claims from a live meeting: a confirmed scope decision opening an Odoo PR, a verified risk filed with the client notified, and a task pending confirmation"
      >
        <div className="vb-stack-bar">
          <span className="vb-stack-bar-meta"><Tick />Inbox · 3 claims</span>
          <span>Live · 0:31:04</span>
        </div>

        <article className="vb-card">
          <div className="vb-card-head">
            <span className="vb-card-ts">0:14:22</span>
            <span className="vb-card-speaker">· Client</span>
          </div>
          <p className="vb-card-text">&ldquo;Add the warehouse module to phase 2.&rdquo;</p>
          <div className="vb-card-foot">
            <span className="vb-tag vb-tag--decision">decision</span>
            <span className="vb-state vb-state--verified"><Tick />verified</span>
          </div>
          <div className="vb-card-action"><Arrow />Odoo SH PR opened</div>
        </article>

        <article className="vb-card">
          <div className="vb-card-head">
            <span className="vb-card-ts">0:18:07</span>
            <span className="vb-card-speaker">· Eng lead</span>
          </div>
          <p className="vb-card-text">
            &ldquo;Lead time for the API integration is two weeks longer than scoped.&rdquo;
          </p>
          <div className="vb-card-foot">
            <span className="vb-tag vb-tag--risk">risk</span>
            <span className="vb-state vb-state--verified"><Tick />verified</span>
          </div>
          <div className="vb-card-action"><Arrow />Risk filed · client notified</div>
        </article>

        <article className="vb-card">
          <div className="vb-card-head">
            <span className="vb-card-ts">0:24:51</span>
            <span className="vb-card-speaker">· PM</span>
          </div>
          <p className="vb-card-text">&ldquo;Send the revised SOW for sign-off by Friday.&rdquo;</p>
          <div className="vb-card-foot">
            <span className="vb-tag vb-tag--task">task</span>
            <span className="vb-state vb-state--pending"><span className="vb-dot" />pending</span>
          </div>
        </article>
      </div>
    </figure>
  )
}

/* ----------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="vb-hero">
      <div className="cl-wrap">
        <div className="vb-hero-grid">
          <div>
            <Reveal>
              <div className="vb-docid">
                <Tick />
                <span className="vb-kick">
                  Knowcap <span className="vb-kdot">·</span> Verified work intelligence
                </span>
              </div>
              <h1 className="vb-h1">
                Your work becomes <em>verified actions.</em>{' '}
                <span className="vb-dim">Automatically.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="vb-sub">
                Knowcap is the trust layer for AI agents. Capture the conversations and files where
                the real decisions live, extract every commitment and risk, let a named human confirm
                each one — then let your agents act on <b>verified facts only</b>.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="vb-cta-row">
                <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>
                  Get Started Free <Arrow />
                </a>
                <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="vb-bullets">
                <span className="vb-bullet">
                  <Tick />Captures Meet, calls &amp; recordings, screen recordings, documents, URLs,
                  and Telegram <em>messages soon</em>
                </span>
                <span className="vb-bullet">
                  <Tick />AI extracts decisions, tasks, risks, facts, and people — each timestamped
                  to its source
                </span>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <div className="vb-trust">
                <span>Built by an Odoo partner</span>
                <span className="vb-sep" aria-hidden="true">·</span>
                <span>MCP-native</span>
                <span className="vb-sep" aria-hidden="true">·</span>
                <span>Full audit trail on every action</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <ClaimsExhibit />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- problem */

function Problem() {
  return (
    <section className="vb-section vb-prob">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§01" label="The gap" />
            <h2 className="vb-h2">
              Most AI agents act on what the AI <span className="vb-green-it">thinks</span> is true.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="vb-lead">
              A model mishears one line in a meeting and your agent runs with it — the wrong scope in
              a PR, a task from a comment nobody confirmed, a &ldquo;decision&rdquo; that was really just
              discussion. When a client says &ldquo;that&rsquo;s not what we agreed,&rdquo; there&rsquo;s no record
              to point to.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="vb-turn">
              Knowcap agents act only on what a <span className="vb-mark">human</span> said is true —
              every fact confirmed, timestamped to its source, and logged.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------- 80-second signature */

function OdooDemo() {
  return (
    <section className="vb-section">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§02" label="Exhibit · the 80-second loop" />
        </Reveal>
        <div className="vb-split">
          <Reveal>
            <div>
              <div className="vb-split-rule" />
              <span className="vb-figure-xl">80 seconds</span>
              <h3 className="vb-story-h">Meeting → confirmed scope change → Odoo PR.</h3>
              <p className="vb-story-body">
                Your client says &ldquo;add the warehouse module to phase 2.&rdquo; Knowcap captures it,
                timestamps it, classifies it as a scope decision, and puts it in your inbox.
                You <b>confirm with one tap</b>. Before the meeting ends, an agent opens a PR on your
                Odoo SH repo — with the client&rsquo;s exact words quoted in the PR body.
              </p>
              <p className="vb-story-dim">
                This is one workflow. Knowcap agents can draft emails, generate SOPs, update CRMs,
                and build reports — all from verified work content.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="vb-shot" style={{ margin: 0 }}>
              <div className="vb-shot-bar">
                <span>Exhibit · the one-tap confirm</span>
                <span className="vb-shot-seal"><Tick />Verified source</span>
              </div>
              <Image
                src="/screenshot-confirm-action.png"
                alt="The exact moment a claim is promoted to evidence — the trigger that turns a meeting into an Odoo PR"
                width={1920}
                height={1080}
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- process loop */

const STEPS = [
  {
    n: '01', h: 'Ingest Every Project Asset',
    s: 'Add documents and URLs, link websites and YouTube videos, record your screen, upload a call recording, or send a bot to your meetings.',
  },
  {
    n: '02', h: 'Build Your Project Memory',
    s: 'Knowcap automatically interlinks all sources into a persistent, searchable memory — every claim carrying its speaker and the exact second it was said.',
  },
  {
    n: '03', h: 'Confirm with Proof',
    s: 'A named human reviews each extracted claim and promotes it to evidence with one tap. No bulk approve. The graph holds what your team confirmed, nothing else.',
  },
  {
    n: '04', h: 'Generate, Act & Share',
    s: 'Spin up contracts, SOPs, PRDs, and gap analyses — and let agents open PRs, create Odoo tasks, and draft emails. Every output backed by the exact source.',
  },
]

function Process() {
  return (
    <section className="vb-section vb-band">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§03" label="How it works · the loop" />
            <h2 className="vb-h2">From capture to proof.</h2>
            <p className="vb-lead">
              A simple loop that turns all your project assets into a single, verifiable memory your
              agents can trust.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="vb-steps">
            {STEPS.map((s) => (
              <div className="vb-step" key={s.n}>
                <div className="vb-step-num" aria-hidden="true">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.s}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="vb-loop-note">
            Confirmation takes about two minutes per meeting. The agent actions it unlocks run before
            the meeting ends.
          </p>
        </Reveal>
        <Reveal>
          <div className="vb-cta-row">
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Try it free <Arrow /></a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- integrations */

const INTEGRATIONS = [
  {
    k: 'MCP server', tag: 'Live', live: true,
    v: 'Wire Claude, Codex, Gemini, or any MCP-compatible agent directly to your verified facts.',
  },
  {
    k: 'Odoo', tag: 'Live', live: true,
    v: 'Built for Odoo implementation partners — confirmed scope decisions flow toward your Odoo work.',
  },
  {
    k: 'Jira · Asana · ClickUp', tag: 'On the roadmap', live: false,
    v: 'Project-tool sync so confirmed actions land where your team already works.',
  },
]

function Integrations() {
  return (
    <section className="vb-section">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§04" label="For your agents" />
            <h2 className="vb-h2">Wire it into the tools you already run.</h2>
            <p className="vb-lead">
              Knowcap is infrastructure, not another silo. Your agents query verified facts over MCP;
              confirmed actions flow to your stack.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="vb-int-grid">
            {INTEGRATIONS.map((it) => (
              <div className="vb-int" key={it.k}>
                <div className="vb-int-head">
                  <h3>{it.k}</h3>
                  <span className={`vb-int-tag ${it.live ? 'vb-int-tag--live' : 'vb-int-tag--soon'}`}>
                    {it.tag}
                  </span>
                </div>
                <p>{it.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- security */

const PILLARS = [
  { h: 'Your Data is Yours', s: 'We never train AI models on your private data.' },
  { h: 'Encrypted Everywhere', s: 'AES-256 at rest, TLS in transit.' },
  { h: 'Granular Access Control', s: 'Role-based permissions for every asset.' },
  { h: 'Auditable Sharing', s: 'Permission-controlled links with audit logs.' },
]

function Security() {
  return (
    <section className="vb-section vb-band">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§05" label="Trust · security" />
            <h2 className="vb-h2">Your projects, secured and governed.</h2>
          </Reveal>
        </div>
        <Reveal>
          <dl className="vb-spec">
            {PILLARS.map((p) => (
              <div className="vb-spec-row" key={p.h}>
                <dt><Tick />{p.h}</dt>
                <dd>{p.s}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- results */

const RESULTS = [
  { fig: '1.4–1.8×', h: 'More Projects Delivered', s: 'Instant onboarding, automated docs, self-sufficient clients — more velocity from the same team.' },
  { fig: '50%', h: 'Less Documentation Time', s: 'Generate contracts, SOPs, and PRDs from your project memory.' },
  { fig: '40%', h: 'Fewer Support Tickets', s: 'Verifiable answers before clients create a ticket.' },
  { fig: '70%', h: 'Faster Onboarding', s: 'Give new hires the entire project memory on day one.' },
]

function Results() {
  return (
    <section className="vb-section">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§06" label="Outcomes" />
            <h2 className="vb-h2">Measurable results from day one.</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="vb-ledger">
            {RESULTS.map((r) => (
              <div className="vb-ledger-row" key={r.h}>
                <span className="vb-figure">{r.fig}</span>
                <div>
                  <h3>{r.h}</h3>
                  <p>{r.s}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ testimonials */

const TESTIMONIALS = [
  { quote: 'Knowcap cut our support tickets by 40% after implementation.', who: 'Ibrahim Abed', org: 'Plementus (Egypt)' },
  { quote: 'AI-generated PRDs reduced documentation time by half.', who: 'Mohamed Jamal', org: 'BI Solutions (KSA)' },
  { quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.', who: 'Ariika Tech Team', org: 'Odoo Implementation Partner' },
]

function Testimonials() {
  return (
    <section className="vb-section vb-band">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§07" label="Proof" />
            <h2 className="vb-h2">What teams are saying.</h2>
          </Reveal>
        </div>
        <div className="vb-quotes">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.who}>
              <figure className="vb-quote">
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <span className="vb-quote-who">{t.who}</span>
                  <span className="vb-quote-org">{t.org}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ FAQ */

const FAQS = [
  {
    q: 'What is Knowcap?',
    a: 'Knowcap is the trust layer for AI agents — verified work intelligence. It ingests the work where decisions actually live (meetings, calls and recordings, screen recordings, documents, and URLs) to create a single, verifiable, and searchable project memory your agents can act on.',
  },
  {
    q: 'Can Knowcap join confidential meetings?',
    a: 'Yes, and you have total control. You can invite Knowcap as a full participant, audio-only, or transcript-only mode.',
  },
  {
    q: 'What tools does Knowcap integrate with?',
    a: 'Knowcap includes an MCP server out of the box — wire Claude, Codex, Gemini, or any MCP-compatible agent directly. Odoo integration is live, with Jira, Asana, and ClickUp on our roadmap.',
  },
  {
    q: 'Can I share projects with clients?',
    a: 'Yes. Share entire projects or specific assets, all managed by role-based permissions with full audit logs.',
  },
]

function Faq() {
  return (
    <section className="vb-section">
      <div className="cl-wrap">
        <div className="vb-section-head">
          <Reveal>
            <Reg no="§08" label="Objections" />
            <h2 className="vb-h2">Fair questions.</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="vb-faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary><span className="vb-q-sign">Q.</span>{f.q}</summary>
                <div className="vb-faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- closer */

function Closer() {
  return (
    <div className="vb-closer-wrap">
      <div className="cl-wrap">
        <Reveal>
          <div className="vb-closer">
            <span className="vb-kick">Knowcap <span className="vb-kdot">·</span> The difference</span>
            <h2>
              Stop letting your agents act on work <span className="vb-dim">nobody checked.</span>
            </h2>
            <p className="vb-closer-sub">Humans confirm. Agents act.</p>
            <div className="vb-cta-row">
              <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>
                Get Started Free <Arrow />
              </a>
              <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
            </div>
            <p className="vb-closer-note">Free to start. Partner pricing on a quick call.</p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- page */

export default function VersionB() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ABTracker variant="b" />
      <div className="vb-page">
        <Hero />
        <Problem />
        <OdooDemo />
        <Process />
        <Integrations />
        <Security />
        <Results />
        <Testimonials />
        <Faq />
        <Closer />
      </div>
    </EditorialShell>
  )
}
