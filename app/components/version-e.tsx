'use client'

/**
 * Version E — "The Record"
 * A landing variant whose copy and section order are identical to Version A
 * (app/app/page.tsx + its section components), but whose entire visual system
 * is designed from scratch with the impeccable skill. It does NOT use the
 * shared theme-switcher / cream + Space Grotesk system (versions A–D); the
 * point is to judge an independent design POV against the hand-built one.
 *
 * Aesthetic: brass-and-midnight forensic dossier. Gold marks = "verified".
 * Type: Bricolage Grotesque (display) / Source Serif 4 (body) / Spline Sans Mono (meta).
 * Fonts are loaded on the /e route only (see app/app/e/page.tsx) and exposed
 * as the CSS vars --ve-display / --ve-body / --ve-mono.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

/* ----------------------------------------------------------------------- */
/* Scoped styles                                                            */
/* ----------------------------------------------------------------------- */

const CSS = `
.ve-root{
  --ink:#14161D; --ink-2:#1B1E27; --ink-3:#242833;
  --paper:#F4F5F7; --paper-2:#EBECF0;
  --line:#DCDEE4; --line-strong:#C7CAD2;
  --line-dark:rgba(255,255,255,.10); --line-dark-2:rgba(255,255,255,.20);
  --prose:#2B303B; --prose-dim:#565C68;
  --ink-prose:#E7E9EE; --ink-prose-dim:#A7ACB8;
  --brass:#C79A3A; --brass-bright:#E2B557; --brass-ink:#8A6516;
  --maxw:1120px; --gutter:clamp(20px,5vw,40px);
  --fdisp:var(--ve-display,'Trebuchet MS',sans-serif);
  --fbody:var(--ve-body,Georgia,'Times New Roman',serif);
  --fmono:var(--ve-mono,ui-monospace,'SFMono-Regular',monospace);
  --ease:cubic-bezier(.16,1,.3,1);
  background:var(--paper); color:var(--prose);
  font-family:var(--fbody);
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
  font-size:17px; line-height:1.6;
  overflow-x:hidden;
}
.ve-root *{box-sizing:border-box}
.ve-root ::selection{background:var(--brass-bright);color:var(--ink)}
.ve-wrap{max-width:var(--maxw);margin:0 auto;padding-left:var(--gutter);padding-right:var(--gutter)}
.ve-narrow{max-width:760px}

/* type */
.ve-display{font-family:var(--fdisp);font-weight:700;letter-spacing:-.025em;line-height:1.04;text-wrap:balance}
.ve-h1{font-family:var(--fdisp);font-weight:700;letter-spacing:-.03em;line-height:1.02;
  font-size:clamp(2.55rem,6vw,4.9rem);text-wrap:balance}
.ve-h2{font-family:var(--fdisp);font-weight:700;letter-spacing:-.025em;line-height:1.05;
  font-size:clamp(2rem,4vw,3.05rem);text-wrap:balance}
.ve-h3{font-family:var(--fdisp);font-weight:600;letter-spacing:-.015em;line-height:1.12;
  font-size:clamp(1.18rem,1.7vw,1.5rem)}
.ve-lead{font-family:var(--fbody);font-size:clamp(1.06rem,1.5vw,1.25rem);line-height:1.62;text-wrap:pretty}
.ve-prose{text-wrap:pretty;max-width:68ch}
.ve-mono{font-family:var(--fmono);font-weight:500;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase}

/* the verified mark — highlighter band painted as a background, no z-index games */
.ve-mark{color:var(--brass-ink);font-weight:inherit;padding:0 .05em;border-radius:1px;
  background-image:linear-gradient(rgba(226,181,87,.30),rgba(226,181,87,.30));
  background-repeat:no-repeat;background-position:0 88%;background-size:100% .38em}
.ve-mark--ink{color:var(--brass-bright);
  background-image:linear-gradient(rgba(226,181,87,.20),rgba(226,181,87,.20))}

/* sections */
.ve-section{position:relative}
.ve-dark{background:var(--ink);color:var(--ink-prose)}
.ve-dark .ve-h1,.ve-dark .ve-h2,.ve-dark .ve-h3{color:#fff}
.ve-pad{padding-block:clamp(72px,11vw,140px)}
.ve-pad-sm{padding-block:clamp(56px,8vw,96px)}
.ve-rule{height:1px;background:var(--line);border:0;margin:0}
.ve-dark .ve-rule{background:var(--line-dark)}

/* dot field on dark */
.ve-field{position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:26px 26px;
  -webkit-mask-image:radial-gradient(120% 80% at 50% 0%,#000,transparent 75%);
  mask-image:radial-gradient(120% 80% at 50% 0%,#000,transparent 75%)}

/* header */
.ve-header{position:fixed;top:0;left:0;right:0;z-index:60;transition:background .3s var(--ease),border-color .3s var(--ease),backdrop-filter .3s}
.ve-header[data-scrolled="true"]{background:rgba(244,245,247,.86);backdrop-filter:blur(14px) saturate(1.2);border-bottom:1px solid var(--line)}
.ve-nav{display:flex;align-items:center;justify-content:space-between;height:66px;gap:24px}
.ve-brand{display:inline-flex;align-items:center;gap:10px;font-family:var(--fdisp);font-weight:700;
  letter-spacing:-.02em;font-size:1.06rem;color:var(--ink-prose);text-decoration:none}
.ve-header[data-scrolled="true"] .ve-brand{color:var(--ink)}
.ve-brand img{border-radius:6px;display:block}
.ve-navlinks{display:none;align-items:center;gap:30px}
.ve-navlink{font-family:var(--fmono);font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--ink-prose-dim);text-decoration:none;transition:color .2s}
.ve-header[data-scrolled="true"] .ve-navlink{color:var(--prose-dim)}
.ve-navlink:hover{color:var(--brass)}
.ve-navauth{display:flex;align-items:center;gap:14px}
.ve-navauth .ve-textlink{display:none}
@media(min-width:900px){.ve-navlinks{display:flex}.ve-navauth .ve-textlink{display:inline}}

/* buttons */
.ve-btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--fmono);font-weight:600;
  font-size:.8rem;letter-spacing:.04em;padding:13px 22px;border-radius:3px;text-decoration:none;
  border:1px solid transparent;cursor:pointer;transition:transform .18s var(--ease),background .2s,border-color .2s,color .2s;
  white-space:nowrap}
.ve-btn svg{transition:transform .22s var(--ease)}
.ve-btn:hover svg{transform:translateX(3px)}
.ve-btn--primary{background:#fff;color:var(--ink)}
.ve-btn--primary:hover{transform:translateY(-1px);background:var(--brass-bright)}
.ve-on-paper .ve-btn--primary{background:var(--ink);color:#fff}
.ve-on-paper .ve-btn--primary:hover{background:var(--ink-2)}
.ve-btn--ghost{border-color:var(--line-dark-2);color:var(--ink-prose)}
.ve-btn--ghost:hover{border-color:#fff;color:#fff}
.ve-on-paper .ve-btn--ghost{border-color:var(--line-strong);color:var(--prose)}
.ve-on-paper .ve-btn--ghost:hover{border-color:var(--ink);color:var(--ink)}
.ve-btn--sm{padding:9px 15px;font-size:.74rem}
.ve-textlink{font-family:var(--fmono);font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-prose-dim);text-decoration:none;transition:color .2s}
.ve-header[data-scrolled="true"] .ve-textlink{color:var(--prose-dim)}
.ve-textlink:hover{color:var(--brass)}

/* focus */
.ve-root a:focus-visible,.ve-root button:focus-visible,.ve-root summary:focus-visible{
  outline:2px solid var(--brass);outline-offset:3px;border-radius:2px}

/* hero */
.ve-hero{padding-top:clamp(120px,17vh,168px);padding-bottom:clamp(64px,8vw,104px)}
.ve-docid{display:flex;align-items:center;gap:12px;color:var(--ink-prose-dim);margin-bottom:34px}
.ve-docid .ve-mono{color:var(--brass)}
.ve-docid .ve-tick{flex:none}
.ve-hbadge{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--line-dark);
  border-radius:999px;padding:7px 15px 7px 11px;margin-bottom:30px;background:rgba(255,255,255,.025)}
.ve-hbadge span{font-family:var(--fbody);font-size:.92rem;color:var(--ink-prose-dim)}
.ve-hero h1{margin:0 0 26px;max-width:16ch}
.ve-hero .ve-lead{color:var(--ink-prose-dim);max-width:54ch;margin:0 0 38px}
.ve-cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:46px}
.ve-bullets{display:flex;flex-direction:column;gap:14px;border-top:1px solid var(--line-dark);padding-top:28px;max-width:640px}
@media(min-width:720px){.ve-bullets{flex-direction:row;gap:28px}}
.ve-bullet{display:flex;align-items:flex-start;gap:10px;font-family:var(--fmono);font-size:.8rem;
  letter-spacing:.01em;line-height:1.5;color:var(--ink-prose-dim)}
.ve-bullet .ve-tick{margin-top:1px;flex:none}

/* exhibit (framed screenshots) */
.ve-exhibit{position:relative;border:1px solid var(--line-dark-2);border-radius:5px;overflow:hidden;
  background:var(--ink-2);box-shadow:0 40px 80px -40px rgba(0,0,0,.7)}
.ve-on-paper .ve-exhibit{border-color:var(--line-strong);background:#fff;box-shadow:0 30px 60px -34px rgba(20,22,29,.32)}
.ve-exhibit img{display:block;width:100%;height:auto}
.ve-exhibit-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:10px 16px;border-bottom:1px solid var(--line-dark);color:var(--ink-prose-dim)}
.ve-on-paper .ve-exhibit-bar{border-color:var(--line);color:var(--prose-dim)}
.ve-exhibit-bar .ve-mono{font-size:.66rem}
.ve-seal{display:inline-flex;align-items:center;gap:7px;color:var(--brass)}
.ve-hero-exhibit{margin-top:clamp(54px,7vw,86px)}

/* generic section head */
.ve-head{max-width:720px;margin-bottom:clamp(44px,6vw,72px)}
.ve-head .ve-lead{color:inherit;opacity:.82;margin:18px 0 0}
.ve-dim{color:var(--prose-dim)}
.ve-dark .ve-dim{color:var(--ink-prose-dim)}

/* features — alternating exhibits */
.ve-feature{display:grid;grid-template-columns:1fr;gap:clamp(28px,4vw,64px);align-items:center;
  padding-block:clamp(44px,6vw,76px)}
.ve-feature + .ve-feature{border-top:1px solid var(--line)}
@media(min-width:880px){
  .ve-feature{grid-template-columns:1fr 1fr}
  .ve-feature--flip .ve-feature-media{order:-1}
}
.ve-feature-rule{width:34px;height:2px;background:var(--brass);margin-bottom:20px}
.ve-feature h3{margin:0 0 14px}
.ve-feature p{margin:0;color:var(--prose-dim)}

/* process — true numbered sequence with drawn rail */
.ve-process{display:grid;grid-template-columns:1fr;gap:0;position:relative;max-width:780px}
.ve-step{display:grid;grid-template-columns:auto 1fr;gap:clamp(18px,3vw,34px);
  padding-block:clamp(26px,3.4vw,40px);position:relative}
.ve-step + .ve-step{border-top:1px solid var(--line-dark)}
.ve-step-no{font-family:var(--fmono);font-weight:600;font-size:1rem;color:var(--brass);
  letter-spacing:.04em;padding-top:.18em;position:relative}
.ve-step-no::before{content:"";position:absolute;left:.5ch;top:2.4em;bottom:-clamp(26px,3.4vw,40px);
  width:1px;background:linear-gradient(var(--brass),transparent)}
.ve-step:last-child .ve-step-no::before{display:none}
.ve-step h3{margin:0 0 9px}
.ve-step p{margin:0;color:var(--ink-prose-dim);max-width:60ch}
.ve-process-cta{margin-top:clamp(40px,5vw,60px)}

/* results — evidence ledger, not stat cards */
.ve-ledger{display:grid;grid-template-columns:1fr;border-top:1px solid var(--line)}
@media(min-width:760px){.ve-ledger{grid-template-columns:1fr 1fr}}
.ve-ledger-row{display:grid;grid-template-columns:auto 1fr;gap:clamp(18px,3vw,30px);align-items:baseline;
  padding:clamp(26px,3.4vw,38px) 4px;border-bottom:1px solid var(--line)}
@media(min-width:760px){
  .ve-ledger-row:nth-child(odd){border-right:1px solid var(--line);padding-right:clamp(26px,3vw,44px)}
  .ve-ledger-row:nth-child(even){padding-left:clamp(26px,3vw,44px)}
}
.ve-figure{font-family:var(--fmono);font-weight:600;letter-spacing:-.02em;line-height:1;color:var(--ink);
  font-size:clamp(1.9rem,3.6vw,2.7rem);white-space:nowrap}
.ve-ledger-row h3{margin:0 0 6px;font-size:clamp(1.05rem,1.5vw,1.22rem)}
.ve-ledger-row p{margin:0;color:var(--prose-dim);font-size:1rem;line-height:1.55}

/* testimony — hairline-separated, no cards */
.ve-voice{padding-block:clamp(34px,4.4vw,52px);display:grid;grid-template-columns:1fr;gap:18px}
.ve-voice + .ve-voice{border-top:1px solid var(--line-dark)}
@media(min-width:820px){.ve-voice{grid-template-columns:minmax(0,2.6fr) minmax(0,1fr);gap:48px;align-items:start}}
.ve-voice blockquote{margin:0;font-family:var(--fdisp);font-weight:500;letter-spacing:-.018em;
  font-size:clamp(1.4rem,2.6vw,2rem);line-height:1.22;color:#fff;text-wrap:balance}
.ve-voice .ve-attr{font-family:var(--fmono);font-size:.74rem;letter-spacing:.08em;line-height:1.7;
  text-transform:uppercase;color:var(--ink-prose-dim);padding-top:.4em}
.ve-voice .ve-attr b{display:block;color:var(--brass);font-weight:600;letter-spacing:.06em}

/* interstitial */
.ve-inter{text-align:center;max-width:760px;margin:0 auto}
.ve-inter h2{margin:0}
.ve-inter p{margin:20px auto 0;font-size:clamp(1.1rem,1.8vw,1.4rem);color:var(--prose-dim);max-width:34ch}
.ve-inter-rule{width:54px;height:2px;background:var(--brass);margin:0 auto 30px;border:0}

/* security — datasheet list */
.ve-spec{display:grid;grid-template-columns:1fr;border-top:1px solid var(--line-dark)}
.ve-spec-row{display:grid;grid-template-columns:1fr;gap:6px;padding-block:clamp(22px,2.8vw,30px);
  border-bottom:1px solid var(--line-dark)}
@media(min-width:760px){.ve-spec-row{grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);gap:clamp(24px,4vw,56px);align-items:baseline}}
.ve-spec-row dt{font-family:var(--fdisp);font-weight:600;font-size:clamp(1.05rem,1.5vw,1.28rem);color:#fff;
  display:flex;align-items:center;gap:12px}
.ve-spec-row dd{margin:0;color:var(--ink-prose-dim);font-size:1.04rem;line-height:1.55}

/* faq */
.ve-faq{max-width:780px;margin:0 auto;border-top:1px solid var(--line)}
.ve-faq details{border-bottom:1px solid var(--line)}
.ve-faq summary{list-style:none;cursor:pointer;display:flex;align-items:flex-start;gap:18px;
  padding:clamp(20px,2.6vw,28px) 2px;font-family:var(--fdisp);font-weight:600;
  font-size:clamp(1.08rem,1.6vw,1.32rem);color:var(--ink);letter-spacing:-.01em}
.ve-faq summary::-webkit-details-marker{display:none}
.ve-faq summary:hover{color:var(--brass-ink)}
.ve-faq .ve-q-sign{flex:none;width:18px;height:18px;margin-top:.18em;position:relative;color:var(--brass-ink);transition:transform .3s var(--ease)}
.ve-faq .ve-q-sign::before,.ve-faq .ve-q-sign::after{content:"";position:absolute;background:currentColor;border-radius:2px}
.ve-faq .ve-q-sign::before{left:0;right:0;top:8px;height:2px}
.ve-faq .ve-q-sign::after{top:0;bottom:0;left:8px;width:2px;transition:transform .3s var(--ease)}
.ve-faq details[open] .ve-q-sign::after{transform:scaleY(0)}
.ve-faq-a{padding:0 2px clamp(22px,2.8vw,30px) 36px;color:var(--prose-dim);font-size:1.06rem;
  line-height:1.62;max-width:66ch}

/* close */
.ve-close{text-align:center;max-width:720px;margin:0 auto}
.ve-close h2{margin:0 0 22px;font-size:clamp(2.1rem,4.6vw,3.6rem)}
.ve-close p{margin:0 auto 38px;color:var(--ink-prose-dim);max-width:46ch;font-size:clamp(1.05rem,1.6vw,1.25rem)}
.ve-close .ve-cta-row{justify-content:center}

/* footer */
.ve-footer{background:var(--ink);color:var(--ink-prose-dim);padding-block:clamp(56px,7vw,84px) 36px}
.ve-foot-grid{display:grid;grid-template-columns:1fr;gap:40px}
@media(min-width:760px){.ve-foot-grid{grid-template-columns:2fr 1fr 1fr}}
.ve-foot-brand p{margin:16px 0 0;max-width:38ch;color:var(--ink-prose-dim);font-size:1rem;line-height:1.6}
.ve-foot-col h4{font-family:var(--fmono);font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--ink-prose);margin:0 0 18px;font-weight:600}
.ve-foot-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.ve-foot-col a{color:var(--ink-prose-dim);text-decoration:none;font-size:1rem;transition:color .2s}
.ve-foot-col a:hover{color:var(--brass)}
.ve-foot-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;align-items:center;
  margin-top:clamp(44px,6vw,68px);padding-top:28px;border-top:1px solid var(--line-dark)}
.ve-foot-bottom p{margin:0;font-family:var(--fmono);font-size:.7rem;letter-spacing:.08em;color:#7C828F}
.ve-foot-bottom nav{display:flex;gap:22px}
.ve-foot-bottom a{color:#7C828F;text-decoration:none;font-family:var(--fmono);font-size:.7rem;letter-spacing:.08em;transition:color .2s}
.ve-foot-bottom a:hover{color:var(--brass)}

/* floating cta */
.ve-float{position:fixed;right:clamp(16px,3vw,28px);bottom:clamp(16px,3vw,28px);z-index:55;
  width:min(330px,calc(100vw - 32px));background:var(--ink-2);border:1px solid var(--line-dark-2);
  border-radius:6px;padding:20px;box-shadow:0 24px 60px -24px rgba(0,0,0,.7)}
.ve-float h3{margin:0 0 6px;font-family:var(--fdisp);font-weight:600;font-size:1.08rem;color:#fff}
.ve-float p{margin:0 0 16px;color:var(--ink-prose-dim);font-size:.96rem;line-height:1.5}
.ve-float-btns{display:flex;flex-direction:column;gap:9px}
.ve-float-btns .ve-btn{justify-content:center;width:100%}
.ve-float-close{position:absolute;top:12px;right:12px;background:none;border:0;color:var(--ink-prose-dim);
  cursor:pointer;padding:4px;line-height:0;transition:color .2s}
.ve-float-close:hover{color:#fff}

@media (prefers-reduced-motion: reduce){
  .ve-root *{animation-duration:.001ms !important;transition-duration:.001ms !important}
}
`

/* ----------------------------------------------------------------------- */
/* Small inline glyphs (custom — no icon library, keeps E's own identity)   */
/* ----------------------------------------------------------------------- */

function Tick({ className = '' }: { className?: string }) {
  return (
    <svg className={`ve-tick ${className}`} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6.2" stroke="var(--brass)" strokeWidth="1.2" />
      <path d="M4.2 7.1 6.1 9l3.7-4" stroke="var(--brass)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true">
      <path d="M1 5.5h12M9 1l4 4.5L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Mark({ children, ink = false }: { children: React.ReactNode; ink?: boolean }) {
  return <span className={ink ? 've-mark ve-mark--ink' : 've-mark'}>{children}</span>
}

/* ----------------------------------------------------------------------- */
/* Motion helpers                                                           */
/* ----------------------------------------------------------------------- */

function useReveal() {
  const reduce = useReducedMotion()
  const rise: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.085, delayChildren: 0.04 } },
  }
  return { reduce, rise, container }
}

/* ----------------------------------------------------------------------- */
/* Content (verbatim from Version A)                                        */
/* ----------------------------------------------------------------------- */

const FEATURES = [
  {
    name: 'Capture with Context',
    desc: 'Send Knowcap to any meeting or screen session. It listens, watches, and understands — automatically linking every spoken word and on-screen action to its source.',
    img: '/screenshot-inbox.png',
    alt: 'Knowcap inbox: captured meeting moments queued for human confirmation',
  },
  {
    name: 'Answer with Proof',
    desc: 'Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording.',
    img: '/screenshot-dashboard.png',
    alt: 'Knowcap answer view linking a reply back to the exact recorded moment',
  },
  {
    name: 'Audit Any Deliverable',
    desc: 'All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted and verified.',
    img: '/screenshot-projects.png',
    alt: 'Knowcap project deliverables with timestamp citations on every claim',
  },
]

const STEPS = [
  { n: '01', h: 'Ingest Every Project Asset', s: 'Upload PDFs, link websites, add YouTube videos, record your screen, or send a bot to your meetings.' },
  { n: '02', h: 'Build Your Project Memory', s: 'Knowcap automatically interlinks all sources into a persistent, searchable memory.' },
  { n: '03', h: 'Generate & Govern with Proof', s: 'Instantly create contracts, SOPs, PRDs, and gap analyses — all backed by verifiable project memory.' },
  { n: '04', h: 'Ask & Share Instantly', s: 'Spin up client-facing Smart Agents trained on your project memory. Every answer backed by the exact source.' },
]

const RESULTS = [
  { fig: '1.4–1.8×', h: 'More Projects Delivered', s: 'Instant onboarding, automated docs, self-sufficient clients — more velocity from the same team.' },
  { fig: '50%', h: 'Less Documentation Time', s: 'Generate contracts, SOPs, and PRDs from your project memory.' },
  { fig: '40%', h: 'Fewer Support Tickets', s: 'Verifiable answers before clients create a ticket.' },
  { fig: '70%', h: 'Faster Onboarding', s: 'Give new hires the entire project memory on day one.' },
]

const VOICES = [
  { q: 'Knowcap cut our support tickets by 40% after implementation.', a: 'Ibrahim Abed', t: 'Plementus (Egypt)' },
  { q: 'AI-generated PRDs reduced documentation time by half.', a: 'Mohamed Jamal', t: 'BI Solutions (KSA)' },
  { q: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.', a: 'Ariika Tech Team', t: 'Odoo Implementation Partner' },
]

const PILLARS = [
  { h: 'Your Data is Yours', s: 'We never train AI models on your private data.' },
  { h: 'Encrypted Everywhere', s: 'AES-256 at rest, TLS in transit.' },
  { h: 'Granular Access Control', s: 'Role-based permissions for every asset.' },
  { h: 'Auditable Sharing', s: 'Permission-controlled links with audit logs.' },
]

const FAQS = [
  { q: 'What is Knowcap?', a: 'Knowcap is the trust layer for AI agents. It ingests all your project assets — meetings, screen recordings, documents, and websites — to create a single, verifiable, and searchable project memory.' },
  { q: 'Can Knowcap join confidential meetings?', a: 'Yes, and you have total control. You can invite Knowcap as a full participant, audio-only, or transcript-only mode.' },
  { q: 'What tools does Knowcap integrate with?', a: 'Knowcap includes an MCP server out of the box — wire Claude, Codex, Gemini, or any MCP-compatible agent directly. Odoo integration is live, with Jira, Asana, and ClickUp on our roadmap.' },
  { q: 'Can I share projects with clients?', a: 'Yes. Share entire projects or specific assets, all managed by role-based permissions with full audit logs.' },
]

/* ----------------------------------------------------------------------- */
/* Sub-components                                                           */
/* ----------------------------------------------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className="ve-header" data-scrolled={scrolled}>
      <div className="ve-wrap ve-nav">
        <Link href="/" className="ve-brand">
          <Image src="/logos/logo.jpg" alt="Knowcap" width={28} height={28} priority />
          Knowcap
        </Link>
        <nav className="ve-navlinks" aria-label="Primary">
          <a className="ve-navlink" href="#features">Features</a>
          <a className="ve-navlink" href="#how-it-works">How it works</a>
          <Link className="ve-navlink" href="/contact-us">Contact</Link>
        </nav>
        <div className="ve-navauth">
          <a className="ve-textlink" href={`${APP_URL}/login`}>Log in</a>
          <a className="ve-btn ve-btn--primary ve-btn--sm" href={`${APP_URL}/register`}>
            Get Started Free
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const { reduce, rise, container } = useReveal()
  return (
    <section className="ve-section ve-dark ve-hero">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <motion.div
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? undefined : 'show'}
        >
          <motion.div className="ve-docid" variants={rise}>
            <Tick className="ve-tick" />
            <span className="ve-mono">Knowcap · Trust layer for AI agents</span>
          </motion.div>

          <motion.div className="ve-hbadge" variants={rise}>
            <Tick />
            <span>Teams using Knowcap cut onboarding time by 70%</span>
          </motion.div>

          <motion.h1 className="ve-h1" variants={rise}>
            Turn human claims into <Mark ink>evidence</Mark>{' '}
            <span className="ve-dim">your AI agents can learn from.</span>
          </motion.h1>

          <motion.p className="ve-lead ve-prose" variants={rise}>
            Capture meetings, voice notes, and chats. Promote the durable parts to evidence.
            Let agents act on what&apos;s verified — never on rumour.
          </motion.p>

          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>
              Get Started Free <Arrow />
            </a>
            <a className="ve-btn ve-btn--ghost" href={`${APP_URL}/login`}>Log in</a>
          </motion.div>

          <motion.div className="ve-bullets" variants={rise}>
            <span className="ve-bullet"><Tick />Every fact confirmed by a named human</span>
            <span className="ve-bullet"><Tick />Full audit trail for every AI action</span>
            <span className="ve-bullet"><Tick />MCP server — wire Claude, Codex, or Gemini</span>
          </motion.div>
        </motion.div>

        <motion.figure
          className="ve-hero-exhibit"
          style={{ margin: 0 }}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="ve-exhibit">
            <div className="ve-exhibit-bar">
              <span className="ve-mono">Exhibit · Inbox</span>
              <span className="ve-seal ve-mono"><Tick />Verified source</span>
            </div>
            <Image
              src="/screenshot-inbox.png"
              alt="Knowcap dashboard: project sources, AI chat, and artifacts, each traced to its recording"
              width={1920}
              height={1080}
              priority
            />
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { reduce } = useReveal()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Features() {
  return (
    <section id="features" className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Run projects on proof, <span className="ve-dim">not memory</span></h2>
          <p className="ve-lead ve-prose">Every insight linked to its source. Validate, audit, and share with timestamped proof.</p>
        </SectionReveal>

        <div>
          {FEATURES.map((f, i) => (
            <SectionReveal key={f.name}>
              <div className={`ve-feature ${i % 2 === 1 ? 've-feature--flip' : ''}`}>
                <div>
                  <div className="ve-feature-rule" />
                  <h3 className="ve-h3">{f.name}</h3>
                  <p className="ve-prose">{f.desc}</p>
                </div>
                <figure className="ve-feature-media" style={{ margin: 0 }}>
                  <div className="ve-exhibit">
                    <Image src={f.img} alt={f.alt} width={1920} height={1080} />
                  </div>
                </figure>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="how-it-works" className="ve-section ve-dark ve-pad">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">From capture to proof</h2>
          <p className="ve-lead ve-prose ve-dim">A simple loop that turns all your project assets into a single, verifiable memory.</p>
        </SectionReveal>

        <div className="ve-process">
          {STEPS.map((s) => (
            <SectionReveal key={s.n}>
              <div className="ve-step">
                <div className="ve-step-no">{s.n}</div>
                <div>
                  <h3 className="ve-h3">{s.h}</h3>
                  <p>{s.s}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="ve-process-cta">
          <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Try it free <Arrow /></a>
        </SectionReveal>
      </div>
    </section>
  )
}

function Results() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Measurable results from day one</h2>
        </SectionReveal>
        <SectionReveal>
          <div className="ve-ledger">
            {RESULTS.map((r) => (
              <div className="ve-ledger-row" key={r.h}>
                <span className="ve-figure">{r.fig}</span>
                <div>
                  <h3 className="ve-display">{r.h}</h3>
                  <p>{r.s}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function Voices() {
  return (
    <section className="ve-section ve-dark ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">What teams are saying</h2>
        </SectionReveal>
        <div>
          {VOICES.map((v) => (
            <SectionReveal key={v.a}>
              <figure className="ve-voice" style={{ margin: 0 }}>
                <blockquote>“{v.q}”</blockquote>
                <figcaption className="ve-attr">
                  <b>{v.a}</b>
                  {v.t}
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Interstitial() {
  return (
    <section className="ve-section ve-on-paper ve-pad-sm">
      <div className="ve-wrap">
        <SectionReveal className="ve-inter">
          <hr className="ve-inter-rule" />
          <h2 className="ve-h2">Knowcap doesn&apos;t just help you control projects.</h2>
          <p>It helps you build a smarter, more profitable team.</p>
        </SectionReveal>
      </div>
    </section>
  )
}

function Security() {
  return (
    <section className="ve-section ve-dark ve-pad">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Your projects, secured and governed</h2>
        </SectionReveal>
        <SectionReveal>
          <dl className="ve-spec">
            {PILLARS.map((p) => (
              <div className="ve-spec-row" key={p.h}>
                <dt><Tick />{p.h}</dt>
                <dd>{p.s}</dd>
              </div>
            ))}
          </dl>
        </SectionReveal>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal>
          <h2 className="ve-h2" style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>FAQ</h2>
        </SectionReveal>
        <SectionReveal>
          <div className="ve-faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  <span className="ve-q-sign" aria-hidden="true" />
                  {f.q}
                </summary>
                <div className="ve-faq-a">{f.a}</div>
              </details>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="ve-section ve-dark ve-pad">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <SectionReveal className="ve-close">
          <h2 className="ve-h2">Ready to build on <Mark ink>evidence</Mark>, <span className="ve-dim">not memory?</span></h2>
          <p>Free to start. No credit card. Your team&apos;s knowledge becomes verified, searchable, and actionable.</p>
          <div className="ve-cta-row">
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a Demo</Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="ve-footer">
      <div className="ve-wrap">
        <div className="ve-foot-grid">
          <div className="ve-foot-brand">
            <Link href="/" className="ve-brand" style={{ color: '#fff' }}>
              <Image src="/logos/logo.jpg" alt="Knowcap" width={26} height={26} />
              Knowcap
            </Link>
            <p>The trust layer for AI agents. Every fact confirmed by a named human, with a full audit trail.</p>
          </div>
          <div className="ve-foot-col">
            <h4>Product</h4>
            <ul>
              <li><a href={`${APP_URL}/register`}>Get Started</a></li>
              <li><a href={`${APP_URL}/login`}>Log in</a></li>
              <li><Link href="/book">Book a Demo</Link></li>
            </ul>
          </div>
          <div className="ve-foot-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="ve-foot-bottom">
          <p>© {year} Knowcap. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact-us">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

function FloatingCTA() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 5000)
    return () => clearTimeout(t)
  }, [])
  if (!show || dismissed) return null
  return (
    <motion.aside
      className="ve-float"
      role="complementary"
      aria-label="Get started with Knowcap"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <button className="ve-float-close" onClick={() => setDismissed(true)} aria-label="Dismiss">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <h3>Ready to try Knowcap?</h3>
      <p>Free to start. No credit card required.</p>
      <div className="ve-float-btns">
        <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
        <a className="ve-btn ve-btn--ghost" href={`${APP_URL}/login`}>Log in</a>
      </div>
    </motion.aside>
  )
}

/* ----------------------------------------------------------------------- */
/* Page                                                                     */
/* ----------------------------------------------------------------------- */

export default function VersionE({ fontVars = '' }: { fontVars?: string }) {
  return (
    <main className={`ve-root ${fontVars}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <ABTracker variant="e" />
      <Header />
      <Hero />
      <Features />
      <Process />
      <Results />
      <Voices />
      <Interstitial />
      <Security />
      <FAQ />
      <Close />
      <SiteFooter />
      <FloatingCTA />
    </main>
  )
}
