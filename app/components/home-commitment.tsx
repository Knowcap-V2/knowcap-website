'use client'

/**
 * Home — Commitment Ledger edition (full homepage replacement, 2026-06-10).
 *
 * Copy: docs/content-pipeline/drafts/homepage-commitment-copy.md (Hassan-locked H1).
 * Design: docs/DESIGN.md tokens (cream/ink/green, Space Grotesk + JetBrains Mono),
 * "commitment ledger" language — ruled rows, mono marginalia, §-numbered sections,
 * VERIFIED stamp. One design, no theme switcher (locked 2026-06-10).
 * Replaces the B/D middleware rotation; /a /b /c /d remain for reference.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ABTracker from '@/components/ab-tracker'

const APP_URL = 'https://app.knowcap.ai'

/* ---------------------------------------------------------------- styles */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

.cl-root{
  --paper:#FBFAF8; --card:#FFFFFF; --paper-2:#F5F4F1;
  --line:#E7E4DD; --line-2:#D9D5CC;
  --ink:#18181B; --ink-2:#4A4F5A; --ink-3:#8A8F99;
  --green:#1F6B3A; --green-bright:#4ade80; --green-tint:#E8F5ED;
  --red:#9B1D1D; --red-tint:#FEF2F2;
  --dark-from:#18181B; --dark-to:#0A0A0A;
  --disp:'Space Grotesk',sans-serif;
  --body:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  --mono:'JetBrains Mono',monospace;
  background:var(--paper); color:var(--ink-2); font-family:var(--body);
  font-size:15px; line-height:1.6; -webkit-font-smoothing:antialiased;
}
.cl-root *,.cl-root *::before,.cl-root *::after{box-sizing:border-box}
.cl-root ::selection{background:var(--green);color:#fff}
.cl-root :where(h1,h2,h3){font-family:var(--disp);color:var(--ink);margin:0;text-wrap:balance}
.cl-root :where(p){margin:0;text-wrap:pretty}
.cl-root :where(a){color:inherit;text-decoration:none}
.cl-root a:focus-visible,.cl-root summary:focus-visible,.cl-root button:focus-visible{
  outline:2px solid var(--green);outline-offset:3px;border-radius:4px}
.cl-dark-ctx a:focus-visible{outline-color:var(--green-bright)}
.cl-wrap{max-width:1100px;margin:0 auto;padding:0 40px}
@media(max-width:640px){.cl-wrap{padding:0 22px}}
.cl-section{padding:92px 0}
@media(max-width:640px){.cl-section{padding:64px 0}}

/* marginalia — the ledger register number on each section */
.cl-reg{display:flex;align-items:center;gap:14px;margin-bottom:26px}
.cl-reg-no{font-family:var(--mono);font-size:11px;letter-spacing:.12em;color:var(--green);font-weight:600}
.cl-reg-rule{height:1px;flex:1;background:var(--line)}
.cl-dark .cl-reg-no{color:var(--green-bright)}
.cl-dark .cl-reg-rule{background:rgba(255,255,255,.1)}

/* reveal */
.cl-reveal{opacity:0;transform:translateY(14px);transition:opacity .6s ease-out,transform .6s ease-out}
.cl-reveal.is-in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.cl-reveal{opacity:1;transform:none;transition:none}}

/* header */
.cl-header{position:fixed;inset:0 0 auto 0;z-index:50;transition:background .25s,border-color .25s}
.cl-header[data-scrolled="true"]{background:rgba(251,250,248,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.cl-nav{display:flex;align-items:center;justify-content:space-between;height:64px}
.cl-brand{display:flex;align-items:center;gap:10px;font-family:var(--disp);font-weight:700;font-size:17px;color:#fff}
.cl-brand img{border-radius:6px}
.cl-header[data-scrolled="true"] .cl-brand{color:var(--ink)}
.cl-navlinks{display:flex;gap:26px}
@media(max-width:760px){.cl-navlinks{display:none}}
.cl-navlink{font-size:13.5px;color:rgba(255,255,255,.65);transition:color .15s}
.cl-header[data-scrolled="true"] .cl-navlink{color:var(--ink-2)}
.cl-navlink:hover{color:var(--green-bright)}
.cl-header[data-scrolled="true"] .cl-navlink:hover{color:var(--green)}
.cl-navauth{display:flex;align-items:center;gap:16px}
.cl-login{font-size:13.5px;color:rgba(255,255,255,.65)}
.cl-login:hover{color:#fff}
.cl-header[data-scrolled="true"] .cl-login{color:var(--ink-2)}
.cl-header[data-scrolled="true"] .cl-login:hover{color:var(--ink)}

/* buttons */
.cl-btn{display:inline-flex;align-items:center;gap:8px;border-radius:8px;font-weight:600;
  font-size:14px;padding:11px 20px;transition:transform .15s,filter .15s,border-color .15s;cursor:pointer}
.cl-btn--primary{background:var(--green);color:#fff}
.cl-btn--primary:hover{filter:brightness(1.08);transform:translateY(-1px)}
.cl-btn--ghost-dark{border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.85)}
.cl-btn--ghost-dark:hover{border-color:rgba(255,255,255,.45);color:#fff}
.cl-btn--ghost{border:1px solid var(--line);color:var(--ink)}
.cl-btn--ghost:hover{border-color:var(--ink)}
.cl-btn--sm{padding:8px 14px;font-size:13px}

/* hero */
.cl-hero{background:linear-gradient(135deg,var(--dark-from),var(--dark-to));color:rgba(255,255,255,.78);
  padding:150px 0 96px;position:relative;overflow:hidden}
.cl-hero-field{position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.055) 1px,transparent 1px);background-size:26px 26px;
  mask-image:radial-gradient(ellipse 80% 70% at 50% 20%,black,transparent)}
.cl-hero .cl-wrap{position:relative}
@media(min-width:980px){
  .cl-hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(36px,4.5vw,68px);align-items:center}
}
.cl-kicker{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:12px;
  letter-spacing:.04em;color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.05);border-radius:999px;padding:7px 14px;margin-bottom:30px}
.cl-kicker .cl-dot{width:5px;height:5px;border-radius:999px;background:var(--green-bright)}
.cl-h1{font-size:clamp(1.7rem,3.2vw,2.45rem);line-height:1.16;letter-spacing:-.02em;font-weight:700;
  color:rgba(255,255,255,.92);max-width:21ch}
.cl-h1 .cl-h1-accent{display:block;margin-top:10px;color:var(--green-bright);
  font-size:clamp(2rem,3.9vw,2.95rem);letter-spacing:-.025em}
.cl-hero-sub{font-size:clamp(.98rem,1.4vw,1.08rem);line-height:1.68;color:rgba(255,255,255,.66);
  max-width:46ch;margin:26px 0 0}
.cl-doctrine{margin:30px 0 0;border-left:2px solid var(--green-bright);
  background:rgba(255,255,255,.04);border-radius:0 8px 8px 0;padding:13px 17px;
  font-family:var(--mono);font-size:12.5px;line-height:1.7;color:rgba(255,255,255,.8);max-width:50ch}
.cl-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
.cl-bullets{display:flex;flex-direction:column;gap:9px;margin-top:28px}
.cl-bullet{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;color:rgba(255,255,255,.6)}
.cl-bullet svg{flex:none;margin-top:3px}
.cl-trust{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:30px;
  font-family:var(--mono);font-size:11.5px;letter-spacing:.04em;color:rgba(255,255,255,.56)}
.cl-trust-dot{width:4px;height:4px;border-radius:999px;background:var(--green-bright);flex:none}

/* hero ledger exhibit — the visual anchor of the fold */
.cl-ledger-wrap{position:relative}
.cl-ledger-wrap::before{content:'';position:absolute;inset:-12% -10%;pointer-events:none;
  background:radial-gradient(ellipse 60% 55% at 60% 40%,rgba(74,222,128,.13),transparent 70%)}
.cl-ledger{position:relative;background:rgba(20,22,21,.88);border:1px solid rgba(74,222,128,.22);
  border-radius:14px;overflow:hidden;
  box-shadow:0 1px 0 rgba(255,255,255,.06) inset,0 36px 90px rgba(0,0,0,.55),0 0 60px rgba(74,222,128,.07)}
.cl-row{animation:cl-row-in .55s ease-out both}
.cl-row:nth-child(2){animation-delay:.25s}
.cl-row:nth-child(3){animation-delay:.85s}
.cl-row:nth-child(4){animation-delay:1.6s}
@keyframes cl-row-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.cl-row{animation:none}}
.cl-ledger-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;
  border-bottom:1px solid rgba(255,255,255,.08);font-family:var(--mono);font-size:11px;
  letter-spacing:.06em;color:rgba(255,255,255,.5)}
.cl-ledger-live{display:inline-flex;align-items:center;gap:7px}
.cl-ledger-live .cl-dot{width:6px;height:6px;border-radius:999px;background:var(--green-bright);
  animation:cl-pulse 2s infinite}
@keyframes cl-pulse{0%,100%{opacity:1}50%{opacity:.35}}
@media(prefers-reduced-motion:reduce){.cl-ledger-live .cl-dot{animation:none}}
.cl-row{display:grid;grid-template-columns:auto 1fr;gap:14px;padding:16px 18px;
  border-bottom:1px solid rgba(255,255,255,.06)}
.cl-row:last-child{border-bottom:none}
.cl-row-time{font-family:var(--mono);font-size:11px;color:rgba(255,255,255,.52);padding-top:3px}
.cl-row-speaker{font-family:var(--disp);font-weight:600;font-size:13px;color:#fff;margin-bottom:3px}
.cl-row-text{font-size:13px;line-height:1.55;color:rgba(255,255,255,.7)}
.cl-row-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:9px}
.cl-tag{font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;
  padding:3px 8px;border-radius:999px;border:1px solid}
.cl-tag--commitment{color:var(--green-bright);border-color:rgba(74,222,128,.4)}
.cl-tag--risk{color:#f87171;border-color:rgba(248,113,113,.4)}
.cl-tag--verified{color:var(--green-bright);border-color:rgba(74,222,128,.4);background:rgba(74,222,128,.08)}
.cl-tag--pending{color:rgba(255,255,255,.55);border-color:rgba(255,255,255,.2)}
.cl-row-action{font-family:var(--mono);font-size:11px;color:rgba(255,255,255,.56)}

/* problem section */
.cl-h2{font-size:clamp(1.55rem,2.9vw,2.15rem);line-height:1.2;letter-spacing:-.015em;font-weight:700}
.cl-lead{font-size:16px;line-height:1.65;color:var(--ink-2);max-width:62ch;margin-top:18px}
.cl-cards{display:grid;grid-template-columns:1fr;gap:18px;margin-top:44px}
@media(min-width:860px){.cl-cards{grid-template-columns:repeat(3,1fr)}}
.cl-card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:26px;
  transition:border-color .2s,box-shadow .2s}
.cl-card:hover{border-color:var(--line-2);box-shadow:0 8px 28px rgba(24,24,27,.05)}
.cl-card-kicker{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ink-3);margin-bottom:13px}
.cl-card h3{font-size:15.5px;font-weight:600;margin-bottom:9px}
.cl-card p{font-size:13.5px;line-height:1.62;color:var(--ink-2)}
.cl-card .cl-quote{font-family:var(--disp);font-weight:600;color:var(--ink);font-size:15px;
  margin-bottom:9px;display:block}
.cl-prob-close{margin-top:36px;font-family:var(--disp);font-weight:600;font-size:17px;color:var(--ink)}
.cl-prob-close .cl-green{color:var(--green)}

/* loop section */
.cl-steps{display:grid;grid-template-columns:1fr;gap:0;margin-top:44px;border-top:1px solid var(--line)}
@media(min-width:860px){.cl-steps{grid-template-columns:repeat(4,1fr);border-top:none}}
.cl-step{padding:26px 22px 26px 0;border-bottom:1px solid var(--line)}
@media(min-width:860px){.cl-step{border-bottom:none;border-top:2px solid var(--line);padding-top:22px}
  .cl-step:hover{border-top-color:var(--green)}}
.cl-step-no{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--green);font-weight:600}
.cl-step h3{font-size:17px;font-weight:600;margin:10px 0 8px}
.cl-step p{font-size:13.5px;line-height:1.62;color:var(--ink-2)}
.cl-loop-note{margin-top:34px;font-family:var(--mono);font-size:12px;letter-spacing:.02em;color:var(--ink-3)}

/* 80-second story */
.cl-story{background:var(--paper-2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.cl-story-grid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center}
@media(min-width:920px){.cl-story-grid{grid-template-columns:.9fr 1.1fr}}
.cl-figure{font-family:var(--mono);font-weight:600;font-size:clamp(2rem,4vw,2.9rem);color:var(--green);
  letter-spacing:-.02em}
.cl-story-h{font-size:clamp(1.3rem,2.2vw,1.7rem);line-height:1.25;letter-spacing:-.015em;
  font-weight:700;margin:14px 0 16px}
.cl-story-body{font-size:15px;line-height:1.7;color:var(--ink-2);max-width:54ch}
.cl-story-caption{margin-top:22px;padding:14px 18px;border-left:2px solid var(--green);
  background:var(--green-tint);border-radius:0 8px 8px 0;font-size:13.5px;line-height:1.6;color:var(--ink)}
.cl-story-shot{position:relative;border:1px solid var(--line);border-radius:12px;overflow:hidden;
  background:var(--card);box-shadow:0 18px 50px rgba(24,24,27,.08)}
.cl-story-shot img{display:block;width:100%;height:auto}
.cl-stamp{position:absolute;top:18px;right:18px;transform:rotate(6deg);
  font-family:var(--mono);font-size:11px;letter-spacing:.18em;font-weight:600;color:var(--green);
  border:2px solid var(--green);border-radius:6px;padding:6px 12px;background:rgba(251,250,248,.88)}

/* failed tools */
.cl-failed-body{font-size:16px;line-height:1.72;color:var(--ink-2);max-width:64ch;margin-top:18px}
.cl-failed-body strong{color:var(--ink);font-weight:600}
.cl-proof{display:grid;grid-template-columns:1fr;gap:18px;margin-top:46px}
@media(min-width:820px){.cl-proof{grid-template-columns:repeat(3,1fr)}}
.cl-proof-item{border-top:2px solid var(--green);padding-top:18px}
.cl-proof-num{font-family:var(--mono);font-weight:600;font-size:26px;color:var(--ink);letter-spacing:-.01em}
.cl-proof-label{font-size:13px;line-height:1.55;color:var(--ink-2);margin-top:7px}

/* MCP section */
.cl-mcp{background:linear-gradient(135deg,var(--dark-from),var(--dark-to));color:rgba(255,255,255,.75)}
.cl-mcp .cl-h2{color:#fff}
.cl-mcp-grid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center;margin-top:8px}
@media(min-width:920px){.cl-mcp-grid{grid-template-columns:1fr 1fr}}
.cl-mcp-body{font-size:15px;line-height:1.7;color:rgba(255,255,255,.72);max-width:52ch;margin-top:18px}
.cl-mcp-bullets{display:flex;flex-direction:column;gap:10px;margin-top:24px}
.cl-mcp .cl-bullet{color:rgba(255,255,255,.65)}
.cl-code{background:#0D0D10;border:1px solid rgba(255,255,255,.08);border-radius:12px;
  padding:30px 32px;font-family:var(--mono);font-size:12.5px;line-height:1.85;overflow-x:auto}
.cl-code .cl-c-comment{color:rgba(255,255,255,.28)}
.cl-code .cl-c-key{color:#58A6FF}
.cl-code .cl-c-str{color:var(--green-bright)}
.cl-code .cl-c-plain{color:rgba(255,255,255,.78)}

/* FAQ */
.cl-faq{max-width:760px}
.cl-faq details{border-bottom:1px solid var(--line);padding:4px 0}
.cl-faq summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:14px;
  padding:18px 0;font-family:var(--disp);font-weight:600;font-size:16px;color:var(--ink)}
.cl-faq summary::-webkit-details-marker{display:none}
.cl-faq .cl-q-sign{font-family:var(--mono);color:var(--green);font-size:13px;flex:none}
.cl-faq summary:hover{color:var(--green)}
.cl-faq-a{padding:0 0 20px 30px;font-size:14px;line-height:1.7;color:var(--ink-2);max-width:60ch}

/* closer */
.cl-close{background:linear-gradient(135deg,var(--dark-from),var(--dark-to));text-align:center;
  color:rgba(255,255,255,.7);position:relative;overflow:hidden}
.cl-close .cl-hero-field{mask-image:radial-gradient(ellipse 70% 80% at 50% 100%,black,transparent)}
.cl-close .cl-wrap{position:relative}
.cl-close-h2{font-size:clamp(1.7rem,3.4vw,2.5rem);line-height:1.18;letter-spacing:-.02em;
  font-weight:700;color:#fff;max-width:21ch;margin:0 auto}
.cl-close-h2 .cl-h1-accent{color:var(--green-bright)}
.cl-close-sub{font-size:16px;color:rgba(255,255,255,.6);margin:18px auto 0;max-width:44ch}
.cl-close .cl-cta-row{justify-content:center}

/* footer */
.cl-footer{background:var(--dark-to);border-top:1px solid rgba(255,255,255,.07);
  padding:44px 0;color:rgba(255,255,255,.56);font-size:13px}
.cl-footer-grid{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px}
.cl-footer-brand{display:flex;align-items:center;gap:9px;font-family:var(--disp);font-weight:700;
  font-size:15px;color:#fff}
.cl-footer-line{font-family:var(--mono);font-size:11.5px;letter-spacing:.03em}
.cl-footer-links{display:flex;flex-wrap:wrap;gap:18px}
.cl-footer-links a:hover{color:#fff}
`

/* ------------------------------------------------------------- utilities */

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" stroke={dark ? '#4ade80' : '#1F6B3A'} strokeWidth="2"
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
    <div ref={ref} className={`cl-reveal ${inView ? 'is-in' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Reg({ no, label, dark = false }: { no: string; label: string; dark?: boolean }) {
  return (
    <div className="cl-reg" aria-hidden="true">
      <span className="cl-reg-no">{no} · {label}</span>
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
          Knowcap
        </Link>
        <nav className="cl-navlinks" aria-label="Primary">
          <a className="cl-navlink" href="#loop">How it works</a>
          <a className="cl-navlink" href="#mcp">For your agents</a>
          <a className="cl-navlink" href="#faq">FAQ</a>
          <Link className="cl-navlink" href="/contact-us">Contact</Link>
        </nav>
        <div className="cl-navauth">
          <a className="cl-login" href={`${APP_URL}/login`}>Log in</a>
          <a className="cl-btn cl-btn--primary cl-btn--sm" href={`${APP_URL}/register`}>Get Started Free</a>
        </div>
      </div>
    </header>
  )
}

/* ----------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="cl-hero">
      <div className="cl-hero-field" aria-hidden="true" />
      <div className="cl-wrap">
        <div className="cl-hero-grid">
          <div>
            <div className="cl-kicker">
              <span className="cl-dot" />
              Knowcap · MCP server for Claude, Codex &amp; Gemini
            </div>
            <h1 className="cl-h1">
              Your company&rsquo;s deepest knowledge is its commitments and the risks against them.
              <span className="cl-h1-accent">Knowcap makes sure they&rsquo;re kept.</span>
            </h1>
            <p className="cl-hero-sub">
              Your client was promised delivery by June. Your team lead promised the demo would
              work. Those promises live in conversations, and they die there. Knowcap captures
              every commitment spoken aloud, flags every risk against it, and lets your AI agents
              act on it — after a named human confirms it.
            </p>
            <p className="cl-doctrine">
              Most AI agents act on what the AI thinks is true. Knowcap agents act only on what
              a human said is true.
            </p>
            <div className="cl-cta-row">
              <a className="cl-btn cl-btn--primary" href={`${APP_URL}/register`}>
                Get Started Free <span aria-hidden="true">→</span>
              </a>
              <Link className="cl-btn cl-btn--ghost-dark" href="/book">Book a Demo</Link>
            </div>
            <div className="cl-trust">
              <span>Built by an Odoo partner</span>
              <span className="cl-trust-dot" aria-hidden="true" />
              <span>MCP-native</span>
              <span className="cl-trust-dot" aria-hidden="true" />
              <span>Full audit trail on every action</span>
            </div>
            <div className="cl-trust" style={{ marginTop: 10 }}>
              <span>Captures Meet · recordings · voice notes · documents · URLs · Telegram</span>
            </div>
          </div>

          <div className="cl-ledger-wrap">
          <div className="cl-ledger" role="img"
            aria-label="Live commitment ledger: a client commitment is captured, a conflicting risk is flagged, and a human confirms it in one tap.">
            <div className="cl-ledger-bar">
              <span className="cl-ledger-live"><span className="cl-dot" />Live · client call</span>
              <span>0:14:35</span>
            </div>
            <div className="cl-row">
              <span className="cl-row-time">0:14:32</span>
              <div>
                <div className="cl-row-speaker">Client</div>
                <p className="cl-row-text">&ldquo;We need this live before Ramadan.&rdquo;</p>
                <div className="cl-row-meta">
                  <span className="cl-tag cl-tag--commitment">commitment</span>
                  <span className="cl-tag cl-tag--pending">pending your confirm</span>
                </div>
              </div>
            </div>
            <div className="cl-row">
              <span className="cl-row-time">0:14:33</span>
              <div>
                <div className="cl-row-speaker">Knowcap</div>
                <p className="cl-row-text">
                  Linked to project Atlas-ERP. Conflicts with the supplier lead time confirmed last week.
                </p>
                <div className="cl-row-meta">
                  <span className="cl-tag cl-tag--risk">risk</span>
                  <span className="cl-tag cl-tag--pending">pending</span>
                </div>
              </div>
            </div>
            <div className="cl-row">
              <span className="cl-row-time">0:14:35</span>
              <div>
                <div className="cl-row-speaker">You</div>
                <p className="cl-row-text">One tap.</p>
                <div className="cl-row-meta">
                  <span className="cl-tag cl-tag--verified">✓ verified</span>
                  <span className="cl-row-action">→ agent drafts the change-order email</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- problem */

function Problem() {
  return (
    <section className="cl-section">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§01" label="The open loop" />
          <h2 className="cl-h2">The deadline slipped because the promise never lived anywhere.</h2>
          <p className="cl-lead">
            A company makes hundreds of promises a week. To clients. To employees. To suppliers.
            None of them live in your project tool. They live in calls, voice notes, and chat
            threads. When one breaks, you find out last.
          </p>
        </Reveal>
        <div className="cl-cards">
          <Reveal>
            <div className="cl-card">
              <div className="cl-card-kicker">The client promise</div>
              <span className="cl-quote">&ldquo;We&rsquo;ll deliver by June.&rdquo;</span>
              <p>
                Said on a Zoom call. Never made it into the SOW. The scope grew, the date
                didn&rsquo;t move, and the margin paid for it.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="cl-card">
              <div className="cl-card-kicker">The internal promise</div>
              <span className="cl-quote">&ldquo;It&rsquo;ll be ready for the demo.&rdquo;</span>
              <p>
                Said in standup. Slipped out of standup three weeks ago. The demo found out
                for you.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="cl-card">
              <div className="cl-card-kicker">The supplier promise</div>
              <span className="cl-quote">&ldquo;Lead time is four weeks.&rdquo;</span>
              <p>
                Said on a phone call. Shipped in six. Your customer churned and your team never
                saw it coming.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="cl-prob-close">
            That is not a project-management problem. It is an open loop.{' '}
            <span className="cl-green">Knowcap closes it.</span>
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
    body: 'Knowcap captures the conversations your team is already having: meetings, recordings, voice notes, documents, Telegram.',
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
    <section className="cl-section" id="loop">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§02" label="The loop" />
          <h2 className="cl-h2">Listen. Extract. Confirm. Act.</h2>
        </Reveal>
        <div className="cl-steps">
          {STEPS.map((s) => (
            <Reveal key={s.no}>
              <div className="cl-step">
                <span className="cl-step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
    <section className="cl-section cl-story">
      <div className="cl-wrap">
        <Reg no="§03" label="Exhibit" />
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
          <Reveal>
            <div className="cl-story-shot">
              <Image
                src="/screenshot-confirm-action.png"
                alt="Knowcap inbox: a scope-change claim awaiting one-tap confirmation"
                width={1200} height={750}
              />
              <span className="cl-stamp">VERIFIED</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- failed tools */

function Failed() {
  return (
    <section className="cl-section">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§04" label="Prior art" />
          <h2 className="cl-h2">RAID logs, action trackers, contract tools — they all died the same way.</h2>
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
        <div className="cl-proof">
          <Reveal>
            <div className="cl-proof-item">
              <div className="cl-proof-num">52%</div>
              <p className="cl-proof-label">of agency projects hit scope creep</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="cl-proof-item">
              <div className="cl-proof-num">70%</div>
              <p className="cl-proof-label">of meeting decisions are forgotten within 24 hours</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="cl-proof-item">
              <div className="cl-proof-num">15 → 0</div>
              <p className="cl-proof-label">
                competitor products examined. Zero verify facts with a named human.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ MCP */

function Mcp() {
  return (
    <section className="cl-section cl-mcp" id="mcp">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§05" label="For your agents" dark />
          <h2 className="cl-h2">Your agents, your tools, your verified facts.</h2>
        </Reveal>
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
                <span className="cl-bullet"><Tick dark />Works inside the AI tools you already use</span>
                <span className="cl-bullet"><Tick dark />Agents read confirmed facts only — strictness is enforced server-side, per agent</span>
                <span className="cl-bullet"><Tick dark />Every fact links back to the second it was said</span>
              </div>
              <div className="cl-cta-row">
                <a className="cl-btn cl-btn--primary" href={`${APP_URL}/register`}>
                  Connect Your Claude <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal>
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
    a: 'Claude, Codex, and Gemini today via MCP. Capture from Google Meet, uploaded recordings, voice notes, documents, URLs, and Telegram. Odoo task creation for implementation teams.',
  },
]

function Faq() {
  return (
    <section className="cl-section" id="faq">
      <div className="cl-wrap">
        <Reveal>
          <Reg no="§06" label="Objections" />
          <h2 className="cl-h2">Fair questions.</h2>
        </Reveal>
        <Reveal>
          <div className="cl-faq" style={{ marginTop: 30 }}>
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

function Closer() {
  return (
    <section className="cl-section cl-close">
      <div className="cl-hero-field" aria-hidden="true" />
      <div className="cl-wrap">
        <Reveal>
          <h2 className="cl-close-h2">
            Organizations aren&rsquo;t hierarchies.{' '}
            <span className="cl-h1-accent">They&rsquo;re webs of commitments.</span>
          </h2>
          <p className="cl-close-sub">AI is finally able to make sure they&rsquo;re kept.</p>
          <div className="cl-cta-row">
            <a className="cl-btn cl-btn--primary" href={`${APP_URL}/register`}>
              Get Started Free <span aria-hidden="true">→</span>
            </a>
            <Link className="cl-btn cl-btn--ghost-dark" href="/book">Book a Demo</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-wrap cl-footer-grid">
        <div className="cl-footer-brand">
          <Image src="/logos/logo.jpg" alt="" width={22} height={22} />
          Knowcap
        </div>
        <p className="cl-footer-line">
          Knowcap is verified knowledge for AI agents. Humans confirm. Agents act.
        </p>
        <nav className="cl-footer-links" aria-label="Footer">
          <a href={`${APP_URL}/register`}>Get Started</a>
          <a href={`${APP_URL}/login`}>Log in</a>
          <Link href="/book">Book a Demo</Link>
          <Link href="/policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------- page */

export default function HomeCommitment() {
  return (
    <main className="cl-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <noscript>
        <style>{`.cl-reveal{opacity:1 !important;transform:none !important}`}</style>
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
      <Closer />
      <Footer />
    </main>
  )
}
