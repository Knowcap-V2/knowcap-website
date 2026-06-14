'use client'

/**
 * Home — V6b "Editorial Light × Product Window" (winning design, 2026-06-10).
 *
 * Copy: docs/content-pipeline/drafts/homepage-commitment-copy.md (Hassan-locked H1).
 * Design: docs/brand/design-explorations/shotgun-2026-06-10/v6b-editorial-product.html
 * — cream editorial page, Fraunces display (incl. green italics), Inter body,
 * JetBrains Mono marginalia, asymmetric hero, doctrine pull-quote band, CSS-drawn
 * app window (sidebar + 3 staggered claim cards) as the cover photo, editorial
 * problem columns, 01-04 loop strip, compact dark ink closer.
 * One design, no theme switcher (locked 2026-06-10).
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

/* ---------------------------------------------------------------- styles */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&family=Inter:wght@400;500;600&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap');

.cl-root{
  --cream:#FBFAF8; --white:#FFFFFF; --border:#E7E4DD; --border-2:#DCD7CB;
  --ink:#18181B; --ink-soft:#2A2A2F; --sec:#4A4F5A;
  --green:#1F6B3A; --green-deep:#17522C; --green-tint:#E8F5ED; --green-dark:#7ED39B;
  --amber:#B07C28;
  --disp:'Fraunces',Georgia,serif;
  --body:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  --mono:'JetBrains Mono','SFMono-Regular',monospace;
  background:var(--cream); color:var(--ink); font-family:var(--body);
  font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
}
.cl-root *,.cl-root *::before,.cl-root *::after{box-sizing:border-box}
.cl-root ::selection{background:var(--green-tint);color:var(--green-deep)}
.cl-root :where(h1,h2,h3){font-family:var(--disp);color:var(--ink);margin:0;text-wrap:balance}
.cl-root :where(p,blockquote,figure,figcaption,pre){margin:0;text-wrap:pretty}
.cl-root :where(a){color:inherit;text-decoration:none}
.cl-root a:focus-visible,.cl-root summary:focus-visible,.cl-root button:focus-visible{
  outline:2px solid var(--green);outline-offset:3px;border-radius:4px}
.cl-closer a:focus-visible,.cl-footer a:focus-visible{outline-color:var(--green-dark)}
.cl-wrap{max-width:1180px;margin:0 auto;padding:0 40px}
@media(max-width:720px){.cl-wrap{padding:0 22px}}
.cl-root :where(#loop,#mcp,#faq){scroll-margin-top:84px}

/* mono kicker */
.cl-kicker{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec)}
.cl-kicker .cl-kdot{color:var(--green)}

/* reveal — opacity/transform only */
.cl-reveal{opacity:0;transform:translateY(18px);
  transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.cl-reveal.is-in{opacity:1;transform:none}
/* staggered children (claim cards, problem cols, loop steps, proof items) */
.cl-claim,.cl-step,.cl-pcol,.cl-proof-item{opacity:0;transform:translateY(12px);
  transition:opacity .55s cubic-bezier(.21,.6,.35,1),transform .55s cubic-bezier(.21,.6,.35,1)}
.cl-reveal.is-in :where(.cl-claim,.cl-step,.cl-pcol,.cl-proof-item){opacity:1;transform:none}
.cl-reveal.is-in .cl-claim:nth-of-type(1){transition-delay:.35s}
.cl-reveal.is-in .cl-claim:nth-of-type(2){transition-delay:.51s}
.cl-reveal.is-in .cl-claim:nth-of-type(3){transition-delay:.67s}
.cl-reveal.is-in :where(.cl-step,.cl-pcol,.cl-proof-item):nth-child(2){transition-delay:.12s}
.cl-reveal.is-in :where(.cl-step,.cl-pcol,.cl-proof-item):nth-child(3){transition-delay:.24s}
.cl-reveal.is-in .cl-step:nth-child(4){transition-delay:.36s}
@media(prefers-reduced-motion:reduce){
  .cl-reveal,.cl-claim,.cl-step,.cl-pcol,.cl-proof-item{opacity:1;transform:none;transition:none}
}

/* header — light editorial masthead */
.cl-header{position:fixed;inset:0 0 auto 0;z-index:50;border-top:3px solid var(--ink);
  background:transparent;transition:background-color .25s,border-color .25s}
.cl-header[data-scrolled="true"]{background:rgba(251,250,248,.92);backdrop-filter:blur(8px);
  border-bottom:1px solid var(--border)}
.cl-nav{display:flex;align-items:center;justify-content:space-between;height:64px}
.cl-brand{display:flex;align-items:center;gap:10px;font-family:var(--disp);font-weight:600;
  font-size:19px;letter-spacing:-.01em;font-variation-settings:'SOFT' 40,'WONK' 0;color:var(--ink)}
.cl-brand img{border-radius:6px}
.cl-brand-cap{color:var(--green)}
.cl-navlinks{display:flex;gap:26px}
@media(max-width:760px){.cl-navlinks{display:none}}
.cl-navlink{font-size:13.5px;font-weight:500;color:var(--sec);transition:color .15s}
.cl-navlink:hover{color:var(--green)}
.cl-navauth{display:flex;align-items:center;gap:16px}
.cl-login{font-size:13.5px;font-weight:500;color:var(--sec);transition:color .15s}
.cl-login:hover{color:var(--ink)}

/* buttons */
.cl-btn{display:inline-block;font-family:var(--body);font-size:15px;font-weight:600;
  letter-spacing:.01em;padding:14px 28px;border-radius:3px;cursor:pointer;
  transition:background-color .18s ease,color .18s ease,border-color .18s ease,
    transform .18s ease,box-shadow .18s ease}
.cl-btn--solid{background:var(--green);color:#fff;border:1px solid var(--green)}
.cl-btn--solid:hover{background:var(--green-deep);border-color:var(--green-deep);
  transform:translateY(-1px);box-shadow:0 6px 18px rgba(31,107,58,.22)}
.cl-btn--ghost{background:transparent;color:var(--ink);border:1px solid var(--ink)}
.cl-btn--ghost:hover{background:var(--ink);color:var(--cream);transform:translateY(-1px)}
.cl-btn--sm{padding:9px 18px;font-size:13.5px}
.cl-cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:42px}

/* section register marginalia — V6b mono kicker style */
.cl-reg{display:flex;align-items:center;gap:16px;margin-bottom:26px}
.cl-reg-no{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec);white-space:nowrap}
.cl-reg-no .cl-reg-num{color:var(--green)}
.cl-reg-rule{height:1px;flex:1;background:var(--border)}

/* sections shared */
.cl-section{padding:110px 0}
@media(max-width:860px){.cl-section{padding:72px 0}}
.cl-section-head{max-width:760px}
.cl-h2{font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.9rem,3.6vw,3rem);line-height:1.12;letter-spacing:-.018em}
.cl-lead{margin-top:24px;font-size:17px;line-height:1.7;color:var(--sec);max-width:58ch}

/* hero — asymmetric editorial */
.cl-hero{padding:150px 0 0}
@media(max-width:720px){.cl-hero{padding:118px 0 0}}
.cl-hero-main{max-width:880px}
.cl-h1{font-weight:480;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2.5rem,5.4vw,4.7rem);line-height:1.05;letter-spacing:-.022em;
  margin-top:34px;max-width:24ch}
.cl-h1 em{font-style:italic;font-weight:540;font-variation-settings:'SOFT' 70,'WONK' 1;
  color:var(--green)}
.cl-sub{margin-top:32px;max-width:58ch;font-size:17.5px;line-height:1.7;color:var(--sec)}
.cl-sub b{color:var(--ink);font-weight:600}

/* rotating source word — kills the "meeting recorder" read.
   A hidden ghost holds the slot at the width of the longest word so a short
   word ("email") never reflows the line below it. */
.cl-rot{display:inline-block;position:relative;text-align:left;color:var(--green);
  font-style:italic;font-weight:540;font-variation-settings:'SOFT' 70,'WONK' 1;
  white-space:nowrap;border-bottom:2px solid rgba(31,107,58,.32);padding-bottom:2px}
.cl-rot-ghost{visibility:hidden}
.cl-rot-w{position:absolute;left:0;top:0;transition:opacity .34s ease,transform .34s ease}
.cl-rot[data-swap="true"] .cl-rot-w{opacity:0;transform:translateY(-7px)}
@media(prefers-reduced-motion:reduce){.cl-rot-w{transition:none}}

/* doctrine pull-quote band */
.cl-doctrine{margin-top:44px;padding:26px 0;border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);display:grid;grid-template-columns:120px 1fr;
  column-gap:40px;align-items:baseline}
@media(max-width:720px){.cl-doctrine{grid-template-columns:1fr;row-gap:14px}}
.cl-doctrine blockquote{font-family:var(--mono);font-size:clamp(.98rem,1.7vw,1.25rem);
  line-height:1.6;color:var(--ink);font-weight:400}
.cl-doctrine .cl-said-true{color:var(--green)}

/* trust lines */
.cl-trust{margin-top:44px;font-family:var(--mono);font-size:12px;letter-spacing:.04em;
  color:var(--sec);display:flex;flex-wrap:wrap;gap:8px 0}
.cl-trust--2{margin-top:12px}
.cl-trust .cl-sep{color:var(--border-2);padding:0 14px}

/* cover photo — the app window */
.cl-cover{padding:64px 0 0}
@media(max-width:720px){.cl-cover{padding:44px 0 0}}
.cl-cover-stage{position:relative;padding:56px 24px 0}
@media(max-width:720px){.cl-cover-stage{padding:36px 0 0}}
.cl-cover-stage::before{content:'';position:absolute;inset:0 -24px 64px;
  background-image:radial-gradient(circle,var(--border-2) 1px,transparent 1px);
  background-size:22px 22px;
  -webkit-mask-image:radial-gradient(ellipse 70% 75% at 50% 38%,rgba(0,0,0,.7) 0%,transparent 78%);
  mask-image:radial-gradient(ellipse 70% 75% at 50% 38%,rgba(0,0,0,.7) 0%,transparent 78%);
  pointer-events:none}
.cl-appwin{position:relative;z-index:1;max-width:1040px;margin:0 auto;background:var(--white);
  border:1px solid var(--border);border-radius:12px;overflow:hidden;text-align:left;
  box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 28px rgba(24,24,27,.06),0 30px 72px rgba(24,24,27,.09)}
.cl-chrome{display:flex;align-items:center;gap:16px;height:44px;padding:0 16px;
  background:#F7F5F0;border-bottom:1px solid var(--border)}
.cl-traffic{display:flex;gap:8px;flex-shrink:0}
.cl-traffic span{width:11px;height:11px;border-radius:50%}
.cl-t-red{background:#FF5F57}.cl-t-yellow{background:#FEBC2E}.cl-t-green{background:#28C840}
.cl-urlbar{flex:1;max-width:420px;margin:0 auto;display:flex;align-items:center;
  justify-content:center;gap:6px;height:26px;background:#F0EDE6;border:1px solid #EAE6DD;
  border-radius:7px;font-family:var(--mono);font-size:11.5px;color:var(--sec)}
.cl-urlbar .cl-lock{font-size:10px}
.cl-urlbar .cl-url-host{color:var(--ink);font-weight:500}
.cl-chrome-spacer{width:49px;flex-shrink:0}
@media(max-width:720px){.cl-chrome-spacer{display:none}}
.cl-appbody{display:flex;min-height:440px}
.cl-sidebar{width:208px;flex-shrink:0;border-right:1px solid var(--border);background:#FAF9F5;
  padding:16px 10px;display:flex;flex-direction:column;gap:2px}
@media(max-width:720px){.cl-sidebar{display:none}}
.cl-side-org{display:flex;align-items:center;gap:8px;padding:6px 10px 14px;font-size:13px;
  font-weight:600;letter-spacing:-.01em;color:var(--ink)}
.cl-org-avatar{width:18px;height:18px;border-radius:5px;background:var(--green);color:#fff;
  font-size:10px;font-weight:600;display:inline-flex;align-items:center;justify-content:center}
.cl-side-item{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:7px;
  font-size:13.5px;font-weight:500;color:var(--sec)}
.cl-side-item svg{width:15px;height:15px;flex-shrink:0}
.cl-side-item.is-active{background:#EFECE4;color:var(--ink);font-weight:600}
.cl-side-count{margin-left:auto;font-family:var(--mono);font-size:11px;color:var(--green-deep);
  background:var(--green-tint);border-radius:5px;padding:1px 6px;font-weight:500}
.cl-side-foot{margin-top:auto;padding:10px;font-family:var(--mono);font-size:10.5px;
  color:#8B867A;line-height:1.5}
.cl-mcp-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--green);
  margin-right:5px;animation:cl-pulse 2.2s ease-in-out infinite}
@keyframes cl-pulse{0%,100%{opacity:1}50%{opacity:.25}}
@media(prefers-reduced-motion:reduce){.cl-mcp-dot{animation:none}}
.cl-mainpane{flex:1;padding:20px 24px;min-width:0}
.cl-pane-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;
  margin-bottom:16px}
.cl-pane-title{font-size:15px;font-weight:600;letter-spacing:-.01em;color:var(--ink)}
.cl-pane-meta{font-family:var(--mono);font-size:11px;color:var(--sec)}

/* claim cards inside the app window */
.cl-claim{border:1px solid var(--border);border-radius:10px;background:var(--white);
  padding:14px 16px;margin-bottom:10px}
.cl-claim-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap}
.cl-tag{display:inline-block;font-family:var(--mono);padding:2.5px 8px;border-radius:2px;
  text-transform:uppercase;letter-spacing:.1em;font-size:9.5px;font-weight:500}
.cl-tag--commit{background:var(--green-tint);color:var(--green-deep)}
.cl-tag--risk{background:transparent;color:var(--sec);border:1px solid var(--border)}
.cl-tag--verified{background:var(--green-tint);color:var(--green-deep);
  border:1px solid rgba(31,107,58,.25)}
.cl-claim-speaker{font-size:12px;font-weight:600;color:var(--ink)}
.cl-claim-ts{font-family:var(--mono);font-size:11px;color:var(--sec)}
.cl-claim-quote{font-family:var(--disp);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:16.5px;line-height:1.45;
  color:var(--ink);margin-bottom:12px}
.cl-claim-quote.cl-plain{font-family:var(--body);font-style:normal;
  font-variation-settings:normal;font-size:14.5px;color:var(--ink-soft)}
.cl-claim-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.cl-claim-status{font-family:var(--mono);font-size:11px;color:var(--sec);
  display:inline-flex;align-items:center;gap:7px}
.cl-pending-dot{width:6px;height:6px;border-radius:50%;background:var(--amber)}
.cl-btn-confirm{display:inline-block;font-family:var(--body);font-size:12.5px;font-weight:600;
  color:#fff;background:var(--green);border:1px solid var(--green);border-radius:6px;
  padding:6px 16px;transition:background .15s ease,border-color .15s ease,box-shadow .15s ease}
.cl-btn-confirm:hover{background:var(--green-deep);border-color:var(--green-deep);
  box-shadow:0 2px 8px rgba(31,107,58,.28)}
.cl-btn-review{display:inline-block;font-family:var(--body);font-size:12.5px;font-weight:600;
  color:var(--sec);background:transparent;border:1px solid var(--border);border-radius:6px;
  padding:5px 15px;transition:border-color .15s ease,color .15s ease}
.cl-btn-review:hover{border-color:var(--sec);color:var(--ink)}
.cl-claim--verified{background:var(--green-tint);border-color:rgba(31,107,58,.28)}
.cl-verified-line{display:flex;align-items:center;gap:9px;font-size:13.5px;font-weight:600;
  color:var(--green-deep)}
.cl-verified-line .cl-check{width:18px;height:18px;border-radius:50%;background:var(--green);
  color:#fff;font-size:11px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.cl-verified-action{font-family:var(--mono);font-size:11.5px;color:var(--sec);margin-top:7px;
  padding-left:27px}
.cl-verified-action .cl-v-fn{color:var(--green)}

/* magazine caption under the window */
.cl-cover-cap{position:relative;z-index:1;margin:26px auto 0;max-width:64ch;text-align:center;
  font-family:var(--mono);font-style:italic;font-size:12px;line-height:1.7;
  letter-spacing:.02em;color:var(--sec);padding-bottom:88px}
.cl-figno{font-style:normal;font-weight:500;letter-spacing:.14em;text-transform:uppercase;
  color:var(--green);padding-right:10px}

/* problem — editorial columns */
.cl-problem{border-top:1px solid var(--border)}
.cl-pcols{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:72px;
  border-top:1px solid var(--border)}
@media(max-width:860px){.cl-pcols{grid-template-columns:1fr}}
.cl-pcol{padding:36px 36px 42px 0;border-right:1px solid var(--border)}
.cl-pcol:last-child{border-right:0;padding-right:0}
.cl-pcol + .cl-pcol{padding-left:36px}
@media(max-width:860px){
  .cl-pcol{border-right:0;border-bottom:1px solid var(--border);padding:32px 0}
  .cl-pcol + .cl-pcol{padding-left:0}
  .cl-pcol:last-child{border-bottom:0}
}
.cl-pk{font-family:var(--mono);font-size:10.5px;font-weight:500;letter-spacing:.16em;
  text-transform:uppercase;color:var(--green)}
.cl-pq{font-family:var(--disp);font-style:italic;font-weight:480;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:clamp(1.5rem,2.4vw,1.95rem);
  line-height:1.22;letter-spacing:-.01em;margin-top:18px;color:var(--ink)}
.cl-pb{margin-top:18px;font-size:15px;line-height:1.7;color:var(--sec)}
.cl-prob-close{margin-top:72px;padding-top:32px;border-top:1px solid var(--border);
  font-family:var(--disp);font-size:clamp(1.2rem,2vw,1.5rem);font-weight:460;
  font-variation-settings:'SOFT' 55,'WONK' 0;line-height:1.4;color:var(--ink);max-width:36ch}
.cl-prob-close .cl-green-it{color:var(--green);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1}

/* loop — 01-04 strip on white band */
.cl-loop{background:var(--white);border-top:1px solid var(--border);
  border-bottom:1px solid var(--border)}
.cl-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:64px;
  border-top:1px solid var(--border)}
@media(max-width:980px){.cl-steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:860px){.cl-steps{grid-template-columns:1fr}}
.cl-step{position:relative;padding:40px 32px 48px 0;border-right:1px solid var(--border)}
.cl-step + .cl-step{padding-left:32px}
.cl-step:last-child{border-right:0}
@media(max-width:980px){
  .cl-step:nth-child(2){border-right:0}
  .cl-step:nth-child(n+3){border-top:1px solid var(--border)}
}
@media(max-width:860px){
  .cl-step{border-right:0 !important;border-top:1px solid var(--border);padding:32px 0}
  .cl-step + .cl-step{padding-left:0}
  .cl-step:first-child{border-top:0}
}
.cl-step::before{content:'';position:absolute;top:-1px;left:0;height:2px;width:0;
  background:var(--green);transition:width .35s cubic-bezier(.22,1,.36,1)}
.cl-step:hover::before{width:100%}
.cl-step-num{font-family:var(--disp);font-weight:320;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(3rem,5vw,4.2rem);line-height:1;letter-spacing:-.03em;color:var(--border);
  transition:color .3s ease}
.cl-step:hover .cl-step-num{color:var(--green)}
.cl-step h3{font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;font-size:21px;
  letter-spacing:-.01em;margin-top:22px;display:inline-block;position:relative}
.cl-step h3::after{content:'';position:absolute;left:0;bottom:-4px;height:1.5px;width:0;
  background:var(--green);transition:width .3s cubic-bezier(.22,1,.36,1)}
.cl-step:hover h3::after{width:100%}
.cl-step p{margin-top:14px;font-size:14.5px;line-height:1.7;color:var(--sec)}
.cl-loop-note{margin-top:56px;padding-top:24px;border-top:1px solid var(--border);
  font-family:var(--mono);font-size:12.5px;line-height:1.7;color:var(--sec);max-width:62ch}
.cl-loop-note::before{content:'* ';color:var(--green)}

/* 80-second story */
.cl-story-grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;margin-top:64px}
@media(min-width:860px){.cl-story-grid{grid-template-columns:.9fr 1.1fr;gap:56px}}
.cl-figure{font-family:var(--disp);font-style:italic;font-weight:480;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:clamp(2.6rem,4.6vw,3.6rem);
  line-height:1;letter-spacing:-.02em;color:var(--green)}
.cl-story-h{font-weight:520;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.45rem,2.4vw,1.9rem);line-height:1.2;letter-spacing:-.015em;margin-top:18px}
.cl-story-body{margin-top:18px;font-size:15.5px;line-height:1.7;color:var(--sec);max-width:54ch}
.cl-story-caption{margin-top:26px;padding:16px 20px;border-left:2px solid var(--green);
  background:var(--green-tint);border-radius:0 4px 4px 0;font-size:14px;line-height:1.65;
  color:var(--green-deep)}
.cl-story-shot{position:relative;border:1px solid var(--border);border-radius:12px;
  overflow:hidden;background:var(--white);
  box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 28px rgba(24,24,27,.06),0 30px 72px rgba(24,24,27,.09)}
.cl-story-shot img{display:block;width:100%;height:auto}
.cl-stamp{position:absolute;top:18px;right:18px;transform:rotate(6deg);
  font-family:var(--mono);font-size:11px;letter-spacing:.18em;font-weight:500;
  color:var(--green);border:2px solid var(--green);border-radius:4px;padding:6px 12px;
  background:rgba(251,250,248,.9)}

/* failed tools */
.cl-failed{border-top:1px solid var(--border)}
.cl-failed-body{margin-top:24px;font-size:16.5px;line-height:1.75;color:var(--sec);max-width:64ch}
.cl-failed-body strong{color:var(--ink);font-weight:600}
.cl-proof{display:grid;grid-template-columns:1fr;gap:28px;margin-top:64px}
@media(min-width:860px){.cl-proof{grid-template-columns:repeat(3,1fr);gap:36px}}
.cl-proof-item{border-top:2px solid var(--green);padding-top:20px}
.cl-proof-num{font-family:var(--disp);font-weight:420;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(2.2rem,3.4vw,3rem);line-height:1;letter-spacing:-.02em;color:var(--ink)}
.cl-proof-label{margin-top:10px;font-size:14px;line-height:1.6;color:var(--sec)}

/* MCP — light editorial band, dark code island */
.cl-mcpband{background:var(--white);border-top:1px solid var(--border);
  border-bottom:1px solid var(--border)}
.cl-mcp-grid{display:grid;grid-template-columns:1fr;gap:48px;align-items:center;margin-top:56px}
@media(min-width:860px){.cl-mcp-grid{grid-template-columns:1fr 1fr;gap:56px}}
.cl-mcp-body{font-size:16px;line-height:1.7;color:var(--sec);max-width:52ch}
.cl-mcp-bullets{display:flex;flex-direction:column;gap:11px;margin-top:26px}
.cl-bullet{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;color:var(--sec)}
.cl-bullet svg{flex:none;margin-top:4px}
.cl-mcp-grid .cl-cta-row{margin-top:34px}
.cl-code{background:var(--ink);color:rgba(251,250,248,.82);border-radius:4px;
  padding:30px 32px;font-family:var(--mono);font-size:12.5px;line-height:1.85;overflow-x:auto;
  box-shadow:0 24px 60px rgba(24,24,27,.18)}
.cl-c-comment{color:rgba(251,250,248,.55)}
.cl-c-key{color:#79B8FF}
.cl-c-str{color:var(--green-dark)}
.cl-c-plain{color:rgba(251,250,248,.82)}

/* FAQ — editorial rules */
.cl-faq{max-width:760px;margin-top:56px;border-top:1px solid var(--border)}
.cl-faq details{border-bottom:1px solid var(--border)}
.cl-faq summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:16px;
  padding:22px 0;font-family:var(--disp);font-weight:560;
  font-variation-settings:'SOFT' 55,'WONK' 0;font-size:17.5px;letter-spacing:-.01em;
  color:var(--ink);transition:color .15s ease}
.cl-faq summary::-webkit-details-marker{display:none}
.cl-faq summary:hover{color:var(--green)}
.cl-q-sign{font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--green);flex:none}
.cl-faq-a{padding:0 0 24px 34px;font-size:15px;line-height:1.7;color:var(--sec);max-width:60ch}

/* latest writing — 3 newest posts */
.cl-latest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}
@media(max-width:860px){.cl-latest-grid{grid-template-columns:1fr}}
.cl-latest-card{display:flex;flex-direction:column;gap:10px;background:var(--white);
  border:1px solid var(--border);border-radius:12px;padding:24px;text-decoration:none;
  transition:border-color .15s,box-shadow .15s,transform .15s}
.cl-latest-card:hover{border-color:var(--border-2);box-shadow:0 2px 14px rgba(24,24,27,.06);transform:translateY(-2px)}
.cl-latest-date{font-family:var(--mono);font-size:11px;color:var(--sec)}
.cl-latest-card h3{font-weight:520;font-variation-settings:'SOFT' 55,'WONK' 0;font-size:17px;
  line-height:1.3;letter-spacing:-.01em;color:var(--ink)}
.cl-latest-card p{font-size:13.5px;line-height:1.6;color:var(--sec);flex:1}
.cl-latest-read{font-family:var(--mono);font-size:11.5px;color:var(--green)}
.cl-latest-all{margin-top:32px}

/* closer — compact dark ink band */
.cl-closer-wrap{padding:110px 0}
@media(max-width:860px){.cl-closer-wrap{padding:72px 0}}
.cl-closer{background:var(--ink);color:var(--cream);border-radius:4px;padding:72px 64px;
  display:grid;grid-template-columns:repeat(12,1fr);column-gap:48px;align-items:center}
@media(max-width:860px){.cl-closer{grid-template-columns:1fr;row-gap:40px;padding:56px 32px}}
.cl-closer-text{grid-column:1/span 8}
.cl-closer-ctas{grid-column:9/span 4;display:flex;flex-direction:column;align-items:stretch;gap:12px}
@media(max-width:860px){
  .cl-closer-text,.cl-closer-ctas{grid-column:1/-1}
  .cl-closer-ctas{flex-direction:row;flex-wrap:wrap}
}
.cl-closer .cl-kicker{color:rgba(251,250,248,.6)}
.cl-closer .cl-kdot{color:var(--green-dark)}
.cl-closer h2{font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2rem,4vw,3.2rem);line-height:1.1;letter-spacing:-.02em;color:var(--cream);
  margin-top:24px}
.cl-closer h2 em{font-style:italic;font-variation-settings:'SOFT' 70,'WONK' 1;
  color:var(--green-dark)}
.cl-closer-sub{margin-top:22px;font-size:16.5px;line-height:1.65;
  color:rgba(251,250,248,.72);max-width:44ch}
.cl-closer .cl-cta-row{margin-top:0}
.cl-closer .cl-btn{text-align:center}
.cl-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);
  color:var(--ink);box-shadow:0 6px 22px rgba(126,211,155,.25)}
.cl-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.cl-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}

/* footer — dark, 4-column sitemap */
.cl-footer{background:var(--ink);color:rgba(251,250,248,.65);padding:56px 0 44px;font-size:13.5px}
.cl-footer-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;
  gap:14px 28px;padding-bottom:30px;margin-bottom:32px;border-bottom:1px solid rgba(251,250,248,.12)}
.cl-footer-brand{display:flex;align-items:center;gap:10px;font-family:var(--disp);
  font-weight:600;font-size:16px;font-variation-settings:'SOFT' 40,'WONK' 0;color:var(--cream)}
.cl-footer-brand img{border-radius:5px}
.cl-footer-line{font-family:var(--mono);font-size:11.5px;letter-spacing:.03em;
  color:rgba(251,250,248,.65)}
.cl-footer-line .cl-fl-ink{color:var(--cream)}
.cl-footer-line .cl-fl-green{color:var(--green-dark)}
.cl-footer-cols{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:28px 36px}
@media(max-width:720px){.cl-footer-cols{grid-template-columns:repeat(2,1fr);gap:28px 24px}}
.cl-fcol{display:flex;flex-direction:column;gap:9px}
.cl-fcol-h{font-family:var(--mono);font-size:10.5px;font-weight:500;letter-spacing:.12em;
  text-transform:uppercase;color:var(--green-dark);margin-bottom:3px}
.cl-fcol a{color:rgba(251,250,248,.65);transition:color .15s;font-size:13px}
.cl-fcol a:hover{color:var(--cream)}
.cl-footer-bottom{margin-top:34px;padding-top:18px;border-top:1px solid rgba(251,250,248,.12)}
.cl-footer-copy{font-family:var(--mono);font-size:11.5px;letter-spacing:.03em;
  color:rgba(251,250,248,.55)}
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
      className={`cl-reveal ${inView ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

function Reg({ no, label }: { no: string; label: string }) {
  return (
    <div className="cl-reg" aria-hidden="true">
      <span className="cl-reg-no"><span className="cl-reg-num">{no}</span> · {label}</span>
      <span className="cl-reg-rule" />
    </div>
  )
}

/* --------------------------------------------------------------- header */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className="cl-header" data-scrolled={scrolled}>
      <div className="cl-wrap cl-nav">
        <Link href="/" className="cl-brand">
          <Image src="/logos/logo.jpg" alt="" width={28} height={28} priority />
          <span>Know<span className="cl-brand-cap">cap</span></span>
        </Link>
        <nav className="cl-navlinks" aria-label="Primary">
          <a className="cl-navlink" href="#loop">How it works</a>
          <a className="cl-navlink" href="#mcp">For your agents</a>
          <a className="cl-navlink" href="#faq">FAQ</a>
          <Link className="cl-navlink" href="/contact-us">Contact</Link>
        </nav>
        <div className="cl-navauth">
          <a className="cl-login" href={`${APP_URL}/login`}>Log in</a>
          <a className="cl-btn cl-btn--solid cl-btn--sm" href={`${APP_URL}/register`}>Get Started Free</a>
        </div>
      </div>
    </header>
  )
}

/* ----------------------------------------------- the app window (cover) */

function AppWindow() {
  return (
    <figure className="cl-cover">
      <div className="cl-cover-stage">
        <div
          className="cl-appwin"
          role="img"
          aria-label="Knowcap inbox showing an extracted client commitment, the risk against it, and a verified claim an agent is acting on"
        >
          <div className="cl-chrome">
            <div className="cl-traffic" aria-hidden="true">
              <span className="cl-t-red" /><span className="cl-t-yellow" /><span className="cl-t-green" />
            </div>
            <div className="cl-urlbar">
              <span className="cl-lock">&#128274;</span>
              <span><span className="cl-url-host">app.knowcap.ai</span>/inbox</span>
            </div>
            <div className="cl-chrome-spacer" aria-hidden="true" />
          </div>

          <div className="cl-appbody">
            <aside className="cl-sidebar" aria-hidden="true">
              <div className="cl-side-org"><span className="cl-org-avatar">A</span>Atlas-ERP</div>
              <div className="cl-side-item is-active">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 8.5h3l1.5 2h3l1.5-2h3M2 8.5V12a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 14 12V8.5M2 8.5l1.8-5A1.5 1.5 0 0 1 5.2 2.5h5.6a1.5 1.5 0 0 1 1.4 1l1.8 5" />
                </svg>
                Inbox <span className="cl-side-count">3</span>
              </div>
              <div className="cl-side-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 4.5h10M3 8h10M3 11.5h6" /><circle cx="13" cy="11.5" r="1.5" />
                </svg>
                Claims
              </div>
              <div className="cl-side-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="4" r="2" /><circle cx="3.5" cy="11.5" r="2" /><circle cx="12.5" cy="11.5" r="2" />
                  <path d="M7 5.6 4.5 9.8M9 5.6l2.5 4.2M5.5 11.5h5" />
                </svg>
                Atlas
              </div>
              <div className="cl-side-item">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.5 4A1.5 1.5 0 0 1 4 2.5h2.6l1.4 2h4A1.5 1.5 0 0 1 13.5 6v6A1.5 1.5 0 0 1 12 13.5H4A1.5 1.5 0 0 1 2.5 12V4Z" />
                </svg>
                Projects
              </div>
              <div className="cl-side-foot">
                <span className="cl-mcp-dot" />mcp connected<br />strictness: human_only
              </div>
            </aside>

            <div className="cl-mainpane">
              <div className="cl-pane-head">
                <span className="cl-pane-title">Inbox — Weekly sync · Atlas-ERP</span>
                <span className="cl-pane-meta">3 claims pending</span>
              </div>

              <article className="cl-claim">
                <div className="cl-claim-head">
                  <span className="cl-tag cl-tag--commit">Commitment</span>
                  <span className="cl-claim-speaker">Client</span>
                  <span className="cl-claim-ts">0:14:32</span>
                </div>
                <p className="cl-claim-quote">&ldquo;We need this live before Ramadan.&rdquo;</p>
                <div className="cl-claim-foot">
                  <span className="cl-claim-status"><span className="cl-pending-dot" />pending your confirm</span>
                  <span className="cl-btn-confirm">Confirm</span>
                </div>
              </article>

              <article className="cl-claim">
                <div className="cl-claim-head">
                  <span className="cl-tag cl-tag--risk">Risk</span>
                  <span className="cl-claim-speaker">Knowcap</span>
                  <span className="cl-claim-ts">0:14:33</span>
                </div>
                <p className="cl-claim-quote cl-plain">
                  Conflicts with the supplier lead time confirmed last week.
                </p>
                <div className="cl-claim-foot">
                  <span className="cl-claim-status"><span className="cl-pending-dot" />pending</span>
                  <span className="cl-btn-review">Review</span>
                </div>
              </article>

              <article className="cl-claim cl-claim--verified">
                <div className="cl-claim-head">
                  <span className="cl-tag cl-tag--verified">Verified</span>
                  <span className="cl-claim-speaker">You</span>
                  <span className="cl-claim-ts">0:14:35</span>
                </div>
                <div className="cl-verified-line">
                  <span className="cl-check">&#10003;</span>Verified · agent drafts the change-order email
                </div>
                <div className="cl-verified-action">
                  <span className="cl-v-fn">draft_email</span>(change_order) — running with receipts
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="cl-cover-cap">
        <span className="cl-figno">Fig. 01</span>
        The inbox — a client commitment, the risk against it, and the one tap that lets agents act.
      </figcaption>
    </figure>
  )
}

/* ----------------------------------------------------- rotating source */

const HERO_SOURCES = ['Meeting', 'Screen recording', 'Telegram', 'WhatsApp', 'Email']

function RotatingSource() {
  const [i, setI] = useState(0)
  const [swap, setSwap] = useState(false)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    let inner: ReturnType<typeof setTimeout>
    const outer = setInterval(() => {
      setSwap(true)
      inner = setTimeout(() => {
        setI((p) => (p + 1) % HERO_SOURCES.length)
        setSwap(false)
      }, 340)
    }, 2000)
    return () => {
      clearInterval(outer)
      clearTimeout(inner)
    }
  }, [])
  return (
    <span className="cl-rot" data-swap={swap ? 'true' : 'false'} aria-live="polite">
      {/* ghost = longest word; reserves the slot so the line never reflows */}
      <span className="cl-rot-ghost" aria-hidden="true">Screen recording</span>
      <span className="cl-rot-w">{HERO_SOURCES[i]}</span>
    </span>
  )
}

/* ----------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="cl-hero">
      <div className="cl-wrap">
        <div className="cl-hero-main">
          <Reveal>
            <p className="cl-kicker">Knowcap <span className="cl-kdot">·</span> Verified work intelligence</p>
            <h1 className="cl-h1">
              Knowcap turns every <RotatingSource /><br />
              into facts your agents can <em>trust</em>.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="cl-sub">
              Your <b>meetings, messages &amp; recordings</b> hold the commitments, decisions, and
              risks that run the business — Meet, screen recordings, Telegram, WhatsApp, Slack,
              and email. Knowcap extracts them, a named human confirms each one, and your AI agents
              act on what&rsquo;s verified — never on a guess.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="cl-doctrine">
              <span className="cl-kicker">Doctrine</span>
              <blockquote>
                Organizations aren&rsquo;t hierarchies. They&rsquo;re webs of commitments.{' '}
                <span className="cl-said-true">Knowcap makes sure they&rsquo;re kept.</span>
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div className="cl-cta-row">
              <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free</a>
              <Link className="cl-btn cl-btn--ghost" href="/contact-us">Talk to us</Link>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="cl-trust">
              <span>Built by an Odoo partner</span>
              <span className="cl-sep" aria-hidden="true">·</span>
              <span>MCP-native</span>
              <span className="cl-sep" aria-hidden="true">·</span>
              <span>Full audit trail on every action</span>
            </div>
            <div className="cl-trust cl-trust--2">
              <span>Captures Meet · recordings · screen recordings · documents · URLs · Telegram</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <AppWindow />
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- problem */

function Problem() {
  return (
    <section className="cl-section cl-problem">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <Reveal>
            <Reg no="§01" label="What dies in the conversation" />
            <h2 className="cl-h2">The deadline slipped because the promise never lived anywhere.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="cl-lead">
              A company makes hundreds of promises a week. To clients. To employees. To suppliers.
              None of them live in your project tool. They live in calls, messages, and chat
              threads. When one breaks, you find out last.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="cl-pcols">
            <div className="cl-pcol">
              <span className="cl-pk">№ 1 — The client promise</span>
              <p className="cl-pq">&ldquo;We&rsquo;ll deliver by June.&rdquo;</p>
              <p className="cl-pb">
                Said on a Zoom call. Never made it into the SOW. The scope grew, the date
                didn&rsquo;t move, and the margin paid for it.
              </p>
            </div>
            <div className="cl-pcol">
              <span className="cl-pk">№ 2 — The internal promise</span>
              <p className="cl-pq">&ldquo;It&rsquo;ll be ready for the demo.&rdquo;</p>
              <p className="cl-pb">
                Said in standup. Slipped out of standup three weeks ago. The demo found out
                for you.
              </p>
            </div>
            <div className="cl-pcol">
              <span className="cl-pk">№ 3 — The supplier promise</span>
              <p className="cl-pq">&ldquo;Lead time is four weeks.&rdquo;</p>
              <p className="cl-pb">
                Said on a phone call. Shipped in six. Your customer churned and your team never
                saw it coming.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="cl-prob-close">
            That is not a project-management problem. It is an open loop.{' '}
            <span className="cl-green-it">Knowcap closes it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- loop */

const STEPS = [
  {
    no: '01', title: 'Listen',
    body: 'Knowcap captures the conversations your team is already having: meetings, recordings, screen recordings, documents, Telegram. WhatsApp, email, and Slack are next.',
  },
  {
    no: '02', title: 'Extract',
    body: 'AI pulls out every commitment, decision, task, and risk. Each one carries its speaker and a timestamp back to the exact second it was said.',
  },
  {
    no: '03', title: 'Confirm',
    body: 'A named human reviews each claim and promotes it to evidence with one tap. No bulk approve. No silent ingestion. The graph holds what your team confirmed, nothing else.',
  },
  {
    no: '04', title: 'Act',
    body: 'Agents work from confirmed facts: draft the change-order email, create the Odoo task, brief the next meeting. Every action carries its receipts.',
  },
]

function Loop() {
  return (
    <section className="cl-section cl-loop" id="loop">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <Reveal>
            <Reg no="§02" label="How it works · the loop" />
            <h2 className="cl-h2">Listen. Extract. Confirm. Act.</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="cl-steps">
            {STEPS.map((s) => (
              <div className="cl-step" key={s.no}>
                <div className="cl-step-num" aria-hidden="true">{s.no}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="cl-loop-note">
            Confirmation takes about two minutes per meeting. The agent actions it unlocks run
            before the meeting ends.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ 80 seconds */

function Story() {
  return (
    <section className="cl-section">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§03" label="Exhibit" />
        </Reveal>
        <div className="cl-story-grid">
          <Reveal>
            <div>
              <div className="cl-figure">80 seconds</div>
              <h2 className="cl-story-h">Meeting → confirmed scope change → Odoo task.</h2>
              <p className="cl-story-body">
                Your client says &ldquo;add the warehouse module to phase two.&rdquo; Knowcap
                captures it, timestamps it, classifies it as a scope decision, and puts it in
                your inbox. You confirm with one tap. Before the meeting ends, the task is in
                your Odoo project with the client&rsquo;s exact words attached — and the
                change-order conversation is already drafted.
              </p>
              <p className="cl-story-caption">
                Scope creep is a request with no commitment backing it. Knowcap flags the gap
                while the client is still on the call.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="cl-story-shot">
              <Image
                src="/screenshot-confirm-action.png"
                alt="Knowcap inbox: a scope-change claim awaiting one-tap confirmation"
                width={1200} height={750}
              />
              <span className="cl-stamp">VERIFIED</span>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- failed tools */

function Failed() {
  return (
    <section className="cl-section cl-failed">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <Reveal>
            <Reg no="§04" label="Prior art" />
            <h2 className="cl-h2">RAID logs, action trackers, contract tools. They all died the same way.</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="cl-failed-body">
              <p>
                They captured the right things: commitments, risks, decisions, tasks. They all
                collapsed at the same point: a human had to maintain them by hand. The discipline
                lasted two sprints and then real work won.
              </p>
              <p style={{ marginTop: 16 }}>
                You can&rsquo;t add discipline on top of existing work. You have to remove the
                friction until the discipline becomes automatic.
              </p>
              <p style={{ marginTop: 16 }}>
                Knowcap inverts the old model. The capture is automatic. The judgment stays human:
                one tap that turns an AI extraction into a fact your agents can rely on.{' '}
                <strong>That confirm-then-act loop is not a UX detail. It is the product.</strong>
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="cl-proof">
            <div className="cl-proof-item">
              <div className="cl-proof-num">52%</div>
              <p className="cl-proof-label">of agency projects hit scope creep</p>
            </div>
            <div className="cl-proof-item">
              <div className="cl-proof-num">70%</div>
              <p className="cl-proof-label">of meeting decisions are forgotten within 24 hours</p>
            </div>
            <div className="cl-proof-item">
              <div className="cl-proof-num">15 → 0</div>
              <p className="cl-proof-label">
                competitor products examined. Zero verify facts with a named human.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ MCP */

function Mcp() {
  return (
    <section className="cl-section cl-mcpband" id="mcp">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <Reveal>
            <Reg no="§05" label="For your agents" />
            <h2 className="cl-h2">Your agents, your tools, your verified facts.</h2>
          </Reveal>
        </div>
        <div className="cl-mcp-grid">
          <Reveal>
            <div>
              <p className="cl-mcp-body">
                Knowcap ships as an MCP server. Connect it to Claude, Codex, or Gemini and your
                agents query your organization&rsquo;s confirmed knowledge instead of guessing
                from transcripts. Ask what was promised to a client, what risks are open against
                the launch, what changed since last week. The answers come with receipts: who
                said it, when, and who confirmed it.
              </p>
              <div className="cl-mcp-bullets">
                <span className="cl-bullet"><Tick />Works inside the AI tools you already use</span>
                <span className="cl-bullet"><Tick />Agents read confirmed facts only — strictness is enforced server-side, per agent</span>
                <span className="cl-bullet"><Tick />Every fact links back to the second it was said</span>
              </div>
              <div className="cl-cta-row">
                <a className="cl-btn cl-btn--solid" href="https://docs.knowcap.ai/#mcp-overview">
                  Connect Your Claude <span aria-hidden="true">→</span>
                </a>
                <a className="cl-btn cl-btn--ghost" href={`${APP_URL}/register`}>
                  Get your API key
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <pre className="cl-code" aria-label="Example MCP query">
              <span className="cl-c-comment">{'// your agent, any MCP runtime'}</span>{'\n'}
              <span className="cl-c-key">search_memories</span>
              <span className="cl-c-plain">{'({'}</span>{'\n'}
              <span className="cl-c-plain">{'  query: '}</span>
              <span className="cl-c-str">&quot;what did we promise Ariika for phase 2?&quot;</span>
              <span className="cl-c-plain">,</span>{'\n'}
              <span className="cl-c-plain">{'  verification_strictness: '}</span>
              <span className="cl-c-str">&quot;human_only&quot;</span>{'\n'}
              <span className="cl-c-plain">{'})'}</span>{'\n\n'}
              <span className="cl-c-comment">{'// → 3 commitments · each confirmed by a named human'}</span>{'\n'}
              <span className="cl-c-comment">{'// → source: client call 2026-06-02 · 0:14:32'}</span>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ FAQ */

const FAQS = [
  {
    q: 'Isn’t this another meeting notetaker?',
    a: 'Notetakers hand you a summary and stop. Knowcap is the layer after the summary: every extracted claim is confirmed by a named human, becomes part of your organization’s verified memory, and is served to your AI agents with an audit trail. Summaries are the input. Kept commitments are the output.',
  },
  {
    q: 'Confirming every claim sounds like work.',
    a: 'It is about two minutes per meeting, one tap per claim. That is the entire human cost of agents that act on truth instead of guesses. And there is no “confirm all” button — by design. One bulk approve would poison the whole graph.',
  },
  {
    q: 'What about our data?',
    a: 'Your graph is scoped to your organization. Agents see only what their API key allows, at the strictness tier you set. Every confirmation is logged: who, what, when, against which source. Built for Saudi PDPL and GDPR Article 22 from day one.',
  },
  {
    q: 'Which tools does it work with?',
    a: 'Claude, Codex, and Gemini today via MCP. Capture from Google Meet, uploaded recordings, screen recordings, documents, URLs, and Telegram. Odoo task creation for implementation teams.',
  },
]

function Faq() {
  return (
    <section className="cl-section" id="faq">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <Reveal>
            <Reg no="§06" label="Objections" />
            <h2 className="cl-h2">Fair questions.</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="cl-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary><span className="cl-q-sign">Q.</span>{f.q}</summary>
                <p className="cl-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- closer */

type PostMeta = { slug: string; title: string; date: string; description: string; readMinutes: number }

function LatestWriting({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="cl-section">
      <div className="cl-wrap">
        <div className="cl-section-head">
          <Reveal>
            <Reg no="§07" label="From the field" />
            <h2 className="cl-h2">Latest writing.</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="cl-latest-grid">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="cl-latest-card">
                <span className="cl-latest-date">{p.date}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="cl-latest-read">{p.readMinutes} min read →</span>
              </Link>
            ))}
          </div>
          <div className="cl-latest-all">
            <Link className="cl-btn cl-btn--ghost" href="/blog">Read the blog →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Closer() {
  return (
    <section className="cl-closer-wrap">
      <div className="cl-wrap">
        <Reveal>
          <div className="cl-closer">
            <div className="cl-closer-text">
              <span className="cl-kicker">Knowcap <span className="cl-kdot">·</span> The difference</span>
              <h2>
                Most AI acts on what it <em>thinks</em> is true.<br />
                Knowcap acts on what a human <em>said</em> is true.
              </h2>
              <p className="cl-closer-sub">Capture. Confirm. Let your agents act on verified facts.</p>
            </div>
            <div className="cl-closer-ctas">
              <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free</a>
              <Link className="cl-btn cl-btn--ghost" href="/contact-us">Talk to us</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-wrap">
        <div className="cl-footer-top">
          <div className="cl-footer-brand">
            <Image src="/logos/logo.jpg" alt="" width={22} height={22} />
            Knowcap
          </div>
          <p className="cl-footer-line">
            <span className="cl-fl-ink">Knowcap</span> is verified work intelligence for AI agents.{' '}
            <span className="cl-fl-green">Humans confirm. Agents act.</span>
          </p>
        </div>
        <nav className="cl-footer-cols" aria-label="Footer">
          <div className="cl-fcol">
            <div className="cl-fcol-h">Product</div>
            <a href="#loop">How it works</a>
            <a href="#mcp">For your agents</a>
            <a href="#faq">FAQ</a>
            <Link href="/for/odoo-partners">For Odoo partners</Link>
          </div>
          <div className="cl-fcol">
            <div className="cl-fcol-h">Compare</div>
            <Link href="/compare/knowcap-vs-otter">Knowcap vs Otter</Link>
            <Link href="/compare/knowcap-vs-fireflies">Knowcap vs Fireflies</Link>
            <Link href="/compare/knowcap-vs-granola">Knowcap vs Granola</Link>
            <Link href="/compare/knowcap-vs-fellow">Knowcap vs Fellow</Link>
            <Link href="/compare/knowcap-vs-read-ai">Knowcap vs Read.ai</Link>
          </div>
          <div className="cl-fcol">
            <div className="cl-fcol-h">Company</div>
            <Link href="/blog">Blog</Link>
            <Link href="/team">Team</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/meet-us">Meet us</Link>
            <Link href="/contact-us">Contact</Link>
          </div>
          <div className="cl-fcol">
            <div className="cl-fcol-h">Get started</div>
            <a href={`${APP_URL}/register`}>Get Started Free</a>
            <a href={`${APP_URL}/login`}>Log in</a>
            <Link href="/policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </nav>
        <div className="cl-footer-bottom">
          <span className="cl-footer-copy">© 2026 Knowcap</span>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------- page */

export default function HomeCommitment({ recentPosts = [] }: { recentPosts?: PostMeta[] }) {
  return (
    <main className="cl-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <noscript>
        <style>{`.cl-reveal,.cl-claim,.cl-step,.cl-pcol,.cl-proof-item{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
      <ABTracker variant="e" />
      <Header />
      <Hero />
      <Problem />
      <Loop />
      <Story />
      <Failed />
      <Mcp />
      <Faq />
      {recentPosts.length > 0 && <LatestWriting posts={recentPosts} />}
      <Closer />
      <Footer />
    </main>
  )
}
