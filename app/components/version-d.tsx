'use client'

/**
 * Version D (show-the-magic) — re-skinned onto the V6b "Editorial Light" system.
 *
 * Full landing variant. Hero leads with a dramatic scenario; the signature
 * section is the L1 → L2 → L3 agent-action escalation. Re-skin (not a rewrite):
 * every real copy block, CTA, and FAQ from the old themed page is preserved.
 * Old systems (ThemedShell / ve-* / impeccable kit / framer-motion / theme
 * switcher) are fully removed. Chrome comes from <EditorialShell>; page CSS is
 * scoped under the unique `vd-` prefix and references .cl-root tokens.
 *
 * Positioning fixes applied inline:
 *  - Knowcap = verified work intelligence, the trust layer for AI agents
 *    (NOT an "AI meeting tool"); meetings are ONE input.
 *  - Live capture = meetings (Meet), calls/recordings, screen recordings,
 *    documents/URLs, Telegram. Messages (WhatsApp/email/Slack) are BUILDING.
 *  - MCP framed as a supporting capability, not the headline identity.
 */

import Link from 'next/link'
import EditorialShell from '@/components/editorial/shell'

const APP_URL = 'https://app.knowcap.ai'

/* ----------------------------------------------------------------- styles */

const CSS = `
.vd-body{padding:24px 0 0}

/* hero — cream editorial scenario (NEVER a dark gradient under the header) */
.vd-hero{padding:148px 0 12px;text-align:center}
@media(max-width:720px){.vd-hero{padding:120px 0 8px}}
.vd-hero .cl-kicker{display:inline-flex;align-items:center;gap:8px;margin-bottom:20px}
.vd-h1{font-family:var(--disp);font-weight:470;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(2.05rem,4.4vw,3.35rem);line-height:1.08;letter-spacing:-.02em;
  max-width:18ch;margin:0 auto}
.vd-before{margin:18px auto 0;font-family:var(--mono);font-size:clamp(1rem,2vw,1.35rem);
  letter-spacing:.01em;color:var(--green);font-weight:500}
.vd-sub{margin:24px auto 0;max-width:60ch;font-size:17.5px;line-height:1.7;color:var(--sec)}
.vd-sub b{color:var(--ink);font-weight:600}
.vd-cta-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px;
  margin-top:36px}
.vd-trust{margin-top:34px;font-family:var(--mono);font-size:12px;letter-spacing:.04em;
  color:var(--sec);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;
  gap:8px 0}
.vd-trust .vd-dot{width:4px;height:4px;border-radius:999px;background:var(--green);margin:0 14px}

/* claims exhibit — the on-brand "agents acting" mockup */
.vd-exhibit-wrap{margin:56px auto 0;max-width:600px}
@media(max-width:720px){.vd-exhibit-wrap{margin-top:40px}}
.vd-exhibit{background:var(--white);border:1px solid var(--border);border-radius:12px;
  text-align:left;padding:18px 18px 20px;
  box-shadow:0 1px 2px rgba(24,24,27,.04),0 10px 28px rgba(24,24,27,.06),0 30px 72px rgba(24,24,27,.09)}
.vd-exhibit-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--sec);padding-bottom:14px;margin-bottom:14px;border-bottom:1px solid var(--border)}
.vd-exhibit-bar .vd-live{display:inline-flex;align-items:center;gap:8px;color:var(--green-deep);font-weight:500}
.vd-live-dot{width:6px;height:6px;border-radius:50%;background:var(--green);
  animation:vd-pulse 2.2s ease-in-out infinite}
@keyframes vd-pulse{0%,100%{opacity:1}50%{opacity:.25}}
@media(prefers-reduced-motion:reduce){.vd-live-dot{animation:none}}
.vd-claim{border:1px solid var(--border);border-radius:10px;background:var(--white);
  padding:14px 16px}
.vd-claim + .vd-claim{margin-top:10px}
.vd-claim-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:9px}
.vd-claim-ts{font-family:var(--mono);font-size:11px;color:var(--sec)}
.vd-claim-speaker{font-size:12px;font-weight:600;color:var(--ink)}
.vd-claim-quote{font-family:var(--disp);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1;font-size:15.5px;line-height:1.42;
  color:var(--ink);margin-bottom:11px}
.vd-claim-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
.vd-tag{display:inline-block;font-family:var(--mono);padding:2.5px 8px;border-radius:2px;
  text-transform:uppercase;letter-spacing:.1em;font-size:9.5px;font-weight:500}
.vd-tag--risk{background:transparent;color:var(--sec);border:1px solid var(--border)}
.vd-tag--task{background:var(--green-tint);color:var(--green-deep)}
.vd-tag--decision{background:var(--green-tint);color:var(--green-deep);
  border:1px solid rgba(31,107,58,.25)}
.vd-claim-state{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);
  font-size:11px;letter-spacing:.04em;color:var(--green-deep);font-weight:500}
.vd-claim-state .vd-check{width:15px;height:15px;border-radius:50%;background:var(--green);
  color:#fff;font-size:9px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.vd-claim-action{margin-top:11px;padding:8px 12px;border-radius:6px;background:var(--green-tint);
  border:1px solid rgba(31,107,58,.22);font-family:var(--mono);font-size:11px;letter-spacing:.04em;
  color:var(--green-deep);display:flex;align-items:center;gap:9px;font-weight:500}
.vd-exhibit-cap{margin:18px auto 0;max-width:56ch;text-align:center;font-family:var(--mono);
  font-style:italic;font-size:11.5px;line-height:1.7;letter-spacing:.02em;color:var(--sec)}
.vd-exhibit-cap .vd-figno{font-style:normal;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--green);padding-right:10px}

/* section register marginalia */
.vd-reg{display:flex;align-items:center;gap:16px;margin-bottom:26px}
.vd-reg-no{font-family:var(--mono);font-size:11px;font-weight:500;letter-spacing:.14em;
  text-transform:uppercase;color:var(--sec);white-space:nowrap}
.vd-reg-no .vd-reg-num{color:var(--green)}
.vd-reg-rule{height:1px;flex:1;background:var(--border)}

/* shared section scaffolding */
.vd-section{padding:104px 0}
@media(max-width:860px){.vd-section{padding:68px 0}}
.vd-band{background:var(--white);border-top:1px solid var(--border);
  border-bottom:1px solid var(--border)}
.vd-section-head{max-width:760px}
.vd-h2{font-family:var(--disp);font-weight:460;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.8rem,3.4vw,2.7rem);line-height:1.12;letter-spacing:-.018em}
.vd-h2 .vd-dim{color:var(--sec);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1}
.vd-lead{margin-top:22px;font-size:17px;line-height:1.7;color:var(--sec);max-width:60ch}
.vd-prob-turn{margin-top:18px;font-size:17px;line-height:1.7;color:var(--ink-soft);max-width:62ch}
.vd-prob-turn .vd-mark{color:var(--green);font-weight:600;
  box-shadow:inset 0 -.42em 0 var(--green-tint)}

/* escalation rail — numbered L1/L2/L3 steps with a drawn connector */
.vd-rail{display:grid;grid-template-columns:1fr;gap:0;max-width:820px;margin-top:56px}
.vd-step{display:grid;grid-template-columns:auto 1fr;gap:clamp(18px,3vw,34px);
  padding:clamp(26px,3.4vw,38px) 0;position:relative}
.vd-step + .vd-step{border-top:1px solid var(--border)}
.vd-step-no{font-family:var(--mono);font-weight:600;font-size:15px;color:var(--green);
  letter-spacing:.04em;padding-top:.2em;position:relative;white-space:nowrap}
.vd-step-no::before{content:'';position:absolute;left:.6ch;top:2.6em;
  bottom:calc(-1 * clamp(26px,3.4vw,38px));width:1px;
  background:linear-gradient(var(--green),transparent)}
.vd-step:last-child .vd-step-no::before{display:none}
.vd-step-tag{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--green);display:block;margin-bottom:7px}
.vd-step h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.15rem,1.7vw,1.45rem);letter-spacing:-.012em;margin:0 0 9px;color:var(--ink)}
.vd-step p{margin:0;font-size:15px;line-height:1.7;color:var(--sec);max-width:62ch}
.vd-step-note{margin-top:clamp(34px,4vw,46px);padding-top:24px;border-top:1px solid var(--border);
  font-family:var(--mono);font-size:12.5px;line-height:1.7;letter-spacing:.02em;color:var(--sec);max-width:62ch}
.vd-step-note::before{content:'* ';color:var(--green)}

/* process — 01-04 capture loop, white band */
.vd-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:56px;
  border-top:1px solid var(--border)}
@media(max-width:980px){.vd-steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:720px){.vd-steps{grid-template-columns:1fr}}
.vd-pstep{position:relative;padding:36px 28px 42px 0;border-right:1px solid var(--border)}
.vd-pstep + .vd-pstep{padding-left:28px}
.vd-pstep:last-child{border-right:0}
@media(max-width:980px){
  .vd-pstep:nth-child(2){border-right:0}
  .vd-pstep:nth-child(n+3){border-top:1px solid var(--border)}
}
@media(max-width:720px){
  .vd-pstep{border-right:0 !important;border-top:1px solid var(--border);padding:30px 0}
  .vd-pstep + .vd-pstep{padding-left:0}
  .vd-pstep:first-child{border-top:0}
}
.vd-pstep-num{font-family:var(--disp);font-weight:320;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(2.6rem,4.4vw,3.6rem);line-height:1;letter-spacing:-.03em;color:var(--border)}
.vd-pstep h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:18px;letter-spacing:-.01em;margin:18px 0 0;color:var(--ink)}
.vd-pstep p{margin-top:12px;font-size:14px;line-height:1.65;color:var(--sec)}

/* integrations — three-card grid */
.vd-cards{display:grid;grid-template-columns:1fr;gap:18px;margin-top:48px}
@media(min-width:820px){.vd-cards{grid-template-columns:repeat(3,1fr)}}
.vd-card{border:1px solid var(--border);border-radius:10px;background:var(--white);
  padding:clamp(22px,2.6vw,28px)}
.vd-card-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.vd-card-head h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:1.15rem;letter-spacing:-.01em;margin:0;color:var(--ink)}
.vd-card p{margin:0;color:var(--sec);font-size:14.5px;line-height:1.6}
.vd-tagpill{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
  padding:4px 9px;border-radius:999px;white-space:nowrap;font-weight:500}
.vd-tagpill--live{border:1px solid rgba(31,107,58,.32);color:var(--green-deep);background:var(--green-tint)}
.vd-tagpill--soon{border:1px solid var(--border-2);color:var(--sec)}

/* security — datasheet rows */
.vd-spec{display:grid;grid-template-columns:1fr;border-top:1px solid var(--border);margin-top:48px}
.vd-spec-row{display:grid;grid-template-columns:1fr;gap:6px;padding:clamp(22px,2.8vw,28px) 0;
  border-bottom:1px solid var(--border)}
@media(min-width:760px){.vd-spec-row{grid-template-columns:minmax(0,.9fr) minmax(0,1.5fr);
  gap:clamp(24px,4vw,56px);align-items:baseline}}
.vd-spec-row dt{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.05rem,1.5vw,1.25rem);color:var(--ink);display:flex;align-items:center;gap:11px;margin:0}
.vd-spec-row dd{margin:0;color:var(--sec);font-size:15px;line-height:1.6}

/* results — evidence ledger */
.vd-ledger{display:grid;grid-template-columns:1fr;border-top:1px solid var(--border);margin-top:48px}
@media(min-width:760px){.vd-ledger{grid-template-columns:1fr 1fr}}
.vd-ledger-row{display:grid;grid-template-columns:auto 1fr;gap:clamp(18px,3vw,30px);align-items:baseline;
  padding:clamp(26px,3.4vw,34px) 0;border-bottom:1px solid var(--border)}
@media(min-width:760px){
  .vd-ledger-row:nth-child(odd){border-right:1px solid var(--border);padding-right:clamp(26px,3vw,44px)}
  .vd-ledger-row:nth-child(even){padding-left:clamp(26px,3vw,44px)}
}
.vd-figure{font-family:var(--disp);font-weight:420;font-variation-settings:'SOFT' 40,'WONK' 0;
  font-size:clamp(1.9rem,3.4vw,2.7rem);line-height:1;letter-spacing:-.02em;color:var(--green);white-space:nowrap}
.vd-ledger-row h3{font-family:var(--disp);font-weight:560;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.05rem,1.5vw,1.2rem);margin:0 0 6px;color:var(--ink)}
.vd-ledger-row p{margin:0;color:var(--sec);font-size:14.5px;line-height:1.55}

/* testimonials — three quotes */
.vd-quotes{display:grid;grid-template-columns:1fr;gap:18px;margin-top:48px}
@media(min-width:860px){.vd-quotes{grid-template-columns:repeat(3,1fr)}}
.vd-quote{margin:0;border:1px solid var(--border);border-radius:10px;
  padding:clamp(22px,2.6vw,28px);display:flex;flex-direction:column;gap:18px;background:var(--white)}
.vd-quote blockquote{margin:0;font-family:var(--disp);font-weight:520;letter-spacing:-.01em;
  font-variation-settings:'SOFT' 55,'WONK' 0;font-size:clamp(1.05rem,1.5vw,1.2rem);
  line-height:1.4;color:var(--ink)}
.vd-quote figcaption{display:flex;flex-direction:column;gap:3px;margin-top:auto;
  border-top:1px solid var(--border);padding-top:16px}
.vd-quote-who{font-family:var(--disp);font-weight:600;color:var(--ink);font-size:.96rem}
.vd-quote-org{font-family:var(--mono);font-size:10.5px;letter-spacing:.06em;color:var(--sec)}

/* FAQ — editorial rules */
.vd-faq{max-width:760px;margin:48px auto 0;border-top:1px solid var(--border)}
.vd-faq details{border-bottom:1px solid var(--border)}
.vd-faq summary{cursor:pointer;list-style:none;display:flex;align-items:baseline;gap:16px;
  padding:22px 0;font-family:var(--disp);font-weight:560;
  font-variation-settings:'SOFT' 55,'WONK' 0;font-size:17px;letter-spacing:-.01em;
  color:var(--ink);transition:color .15s ease}
.vd-faq summary::-webkit-details-marker{display:none}
.vd-faq summary:hover{color:var(--green)}
.vd-faq summary::after{content:'+';margin-left:auto;font-family:var(--mono);font-size:18px;
  color:var(--sec);flex-shrink:0}
.vd-faq details[open] summary::after{content:'−'}
.vd-faq-a{padding:0 0 24px;font-size:15px;line-height:1.7;color:var(--sec);max-width:64ch}

/* closer — compact dark ink band */
.vd-closer-wrap{padding:104px 0}
@media(max-width:860px){.vd-closer-wrap{padding:68px 0}}
.vd-closer{background:var(--ink);color:var(--cream);border-radius:4px;padding:64px 56px;text-align:center}
@media(max-width:720px){.vd-closer{padding:48px 26px}}
.vd-closer h2{font-family:var(--disp);font-weight:440;font-variation-settings:'SOFT' 55,'WONK' 0;
  font-size:clamp(1.9rem,3.6vw,2.9rem);line-height:1.12;letter-spacing:-.02em;color:var(--cream);
  margin:0 auto;max-width:20ch}
.vd-closer h2 .vd-dim{color:var(--green-dark);font-style:italic;
  font-variation-settings:'SOFT' 70,'WONK' 1}
.vd-closer-sub{margin:20px auto 0;font-size:16.5px;line-height:1.65;
  color:rgba(251,250,248,.72);max-width:44ch}
.vd-closer-cta{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:34px}
.vd-closer-note{margin-top:22px;font-family:var(--mono);font-size:11.5px;letter-spacing:.04em;
  color:rgba(251,250,248,.55)}
.vd-closer .cl-btn--solid:hover{background:var(--green-dark);border-color:var(--green-dark);
  color:var(--ink);box-shadow:0 6px 22px rgba(126,211,155,.25)}
.vd-closer .cl-btn--ghost{color:var(--cream);border-color:rgba(251,250,248,.45)}
.vd-closer .cl-btn--ghost:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
`

/* ----------------------------------------------------------------- data */

const LEVELS = [
  {
    no: 'L1',
    tag: 'Level 1',
    title: 'Get notified',
    body: 'A supplier mentions a probable delay in the meeting. By the time it ends you already know — Knowcap flagged the risk, classified it, and put it in your inbox. You confirm with one tap.',
  },
  {
    no: 'L2',
    tag: 'Level 2',
    title: 'Get a research report',
    body: 'Knowcap spins up a research agent. It finds how similar risks were mitigated across comparable projects and comes back with a formatted report — delivered as a PDF or to Telegram today, with email, WhatsApp, and Slack delivery building. You review before it sends.',
  },
  {
    no: 'L3',
    tag: 'Level 3',
    title: 'The agent handles it',
    body: 'The agent contacts alternative suppliers, checks lead times, compares prices, drafts a purchase-order amendment on your ERP, and opens a PR with the scope change quoted in the body. You approve before anything goes out.',
  },
]

const CAPTURE_STEPS = [
  { n: '01', h: 'Capture every input', s: 'Meetings on Google Meet, calls and recordings, screen recordings, documents, URLs, and Telegram. WhatsApp, email, and Slack are building.' },
  { n: '02', h: 'Build project memory', s: 'Knowcap interlinks every source into a persistent, searchable memory — each claim carrying its speaker and the second it was said.' },
  { n: '03', h: 'Confirm with proof', s: 'A named human promotes each extraction to a verified fact with one tap. No bulk approve. The graph holds what your team confirmed, nothing else.' },
  { n: '04', h: 'Act & share', s: 'Agents work from confirmed facts: draft the email, open the PR, brief the next meeting. Every action carries its receipts.' },
]

const INTEGRATIONS = [
  { k: 'MCP server', tag: 'Live', live: true, v: 'A supporting capability: wire Claude, Codex, Gemini, or any MCP-compatible agent directly to your verified facts.' },
  { k: 'Odoo', tag: 'Live', live: true, v: 'Built by an Odoo implementation partner — confirmed scope decisions flow toward your Odoo work.' },
  { k: 'Jira · Asana · ClickUp', tag: 'On the roadmap', live: false, v: 'Project-tool sync so confirmed actions land where your team already works.' },
]

const PILLARS = [
  { h: 'Your Data is Yours', s: 'We never train AI models on your private data.' },
  { h: 'Encrypted Everywhere', s: 'AES-256 at rest, TLS in transit.' },
  { h: 'Granular Access Control', s: 'Role-based permissions for every asset.' },
  { h: 'Auditable Sharing', s: 'Permission-controlled links with audit logs.' },
]

const RESULTS = [
  { fig: '1.4–1.8×', h: 'More Projects Delivered', s: 'Instant onboarding, automated docs, self-sufficient clients — more velocity from the same team.' },
  { fig: '50%', h: 'Less Documentation Time', s: 'Generate contracts, SOPs, and PRDs from your project memory.' },
  { fig: '40%', h: 'Fewer Support Tickets', s: 'Verifiable answers before clients create a ticket.' },
  { fig: '70%', h: 'Faster Onboarding', s: 'Give new hires the entire project memory on day one.' },
]

const TESTIMONIALS = [
  { quote: 'Knowcap cut our support tickets by 40% after implementation.', who: 'Ibrahim Abed', org: 'Plementus (Egypt)' },
  { quote: 'AI-generated PRDs reduced documentation time by half.', who: 'Mohamed Jamal', org: 'BI Solutions (KSA)' },
  { quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.', who: 'Ariika Tech Team', org: 'Odoo Implementation Partner' },
]

const FAQS = [
  { q: 'What is Knowcap?', a: 'Knowcap is verified work intelligence — the trust layer for AI agents. It captures the inputs that run your business (meetings, calls, screen recordings, documents, and Telegram), extracts every commitment, decision, task, and risk, and turns them into a single verifiable, searchable project memory your agents can rely on.' },
  { q: 'Can Knowcap join confidential meetings?', a: 'Yes, and you have total control. Meetings are one input among many — you can invite Knowcap as a full participant, audio-only, or transcript-only mode.' },
  { q: 'What tools does Knowcap integrate with?', a: 'Knowcap includes an MCP server out of the box — wire Claude, Codex, Gemini, or any MCP-compatible agent directly. Odoo integration is live, with Jira, Asana, and ClickUp on our roadmap.' },
  { q: 'Can I share projects with clients?', a: 'Yes. Share entire projects or specific assets, all managed by role-based permissions with full audit logs.' },
]

/* --------------------------------------------------------------- glyphs */

function Arrow() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 6 }}>
      <path d="M1 5.5h12M9 1l4 4.5L9 10" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Tick() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="var(--green)" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reg({ no, label }: { no: string; label: string }) {
  return (
    <div className="vd-reg" aria-hidden="true">
      <span className="vd-reg-no"><span className="vd-reg-num">{no}</span> · {label}</span>
      <span className="vd-reg-rule" />
    </div>
  )
}

/* --------------------------------------------------------------- hero */

const EXHIBIT = [
  { time: '0:34:08', speaker: 'Supplier', quote: '“Lead time slipping by two weeks — port congestion.”', tag: 'risk', action: 'Research agent dispatched' },
  { time: '0:34:09', speaker: 'Knowcap', quote: 'Drafted three mitigation options — alternate suppliers, expedited freight, partial fulfilment.', tag: 'task', action: 'Report queued for review' },
  { time: '0:34:11', speaker: 'Knowcap', quote: 'Contacted Vendor A, Vendor B, Vendor C. Two responded within five minutes.', tag: 'decision', action: 'PO amendment drafted' },
] as const

function Hero() {
  return (
    <section className="vd-hero">
      <div className="cl-wrap">
        <span className="cl-kicker">
          Knowcap <span className="cl-kdot">·</span> Verified work intelligence
        </span>
        <h1 className="vd-h1">
          Your meeting just flagged a risk, drafted mitigations, and contacted an alternate supplier.
        </h1>
        <p className="vd-before">Before it ended.</p>
        <p className="vd-sub">
          Knowcap is the <b>trust layer for AI agents</b>. It captures the inputs that run your
          business — meetings, calls, screen recordings, documents, and Telegram — extracts every
          decision, task, and risk, and lets your agents act on <b>confirmed facts</b>. You approve
          each step.
        </p>
        <div className="vd-cta-row">
          <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
          <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
        </div>
        <div className="vd-trust">
          <span>Built by an Odoo partner</span>
          <span className="vd-dot" aria-hidden="true" />
          <span>MCP-native</span>
          <span className="vd-dot" aria-hidden="true" />
          <span>Full audit trail on every action</span>
        </div>

        <figure className="vd-exhibit-wrap">
          <div className="vd-exhibit" role="img"
            aria-label="A live meeting where Knowcap flagged a supplier risk and agents are acting on confirmed facts">
            <div className="vd-exhibit-bar">
              <span className="vd-live"><span className="vd-live-dot" />Live · agents acting</span>
              <span>0:48:12</span>
            </div>
            {EXHIBIT.map((c) => (
              <article className="vd-claim" key={c.time}>
                <div className="vd-claim-head">
                  <span className="vd-claim-ts">{c.time}</span>
                  <span className="vd-claim-speaker">· {c.speaker}</span>
                </div>
                <p className="vd-claim-quote">{c.quote}</p>
                <div className="vd-claim-foot">
                  <span className={`vd-tag vd-tag--${c.tag}`}>{c.tag}</span>
                  <span className="vd-claim-state"><span className="vd-check">&#10003;</span>verified</span>
                </div>
                <div className="vd-claim-action"><Arrow />{c.action}</div>
              </article>
            ))}
          </div>
          <figcaption className="vd-exhibit-cap">
            <span className="vd-figno">Fig. 01</span>
            One confirmed risk — and the agents already working it, each action logged with receipts.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- the problem */

function Problem() {
  return (
    <section className="vd-section">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§01" label="The gap" />
          <h2 className="vd-h2">
            Most AI agents act on what the AI <span className="vd-dim">thinks</span> is true.
          </h2>
          <p className="vd-lead">
            A model mishears one line in a meeting and your agent runs with it — the wrong scope in
            a PR, a task from a comment nobody confirmed, a &ldquo;decision&rdquo; that was really
            just discussion. When a client says &ldquo;that&rsquo;s not what we agreed,&rdquo;
            there&rsquo;s no record to point to.
          </p>
          <p className="vd-prob-turn">
            Knowcap agents act only on what a <span className="vd-mark">human</span> said is true —
            every fact confirmed, timestamped to its source, and logged.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------- escalation (sig) */

function Escalation() {
  return (
    <section className="vd-section vd-band">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§02" label="Show the magic" />
          <h2 className="vd-h2">Three levels of agent action</h2>
          <p className="vd-lead">What happens after your meeting — you choose how far it goes.</p>
        </div>
        <div className="vd-rail">
          {LEVELS.map((l) => (
            <div className="vd-step" key={l.tag}>
              <div className="vd-step-no" aria-hidden="true">{l.no}</div>
              <div>
                <span className="vd-step-tag">{l.tag}</span>
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="vd-step-note">
          Every level requires your confirmation. The AI proposes. You approve. Nothing goes out unchecked.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- capture loop */

function Process() {
  return (
    <section className="vd-section">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§03" label="How it works" />
          <h2 className="vd-h2">From capture to proof</h2>
          <p className="vd-lead">A simple loop that turns every input into a single, verifiable memory.</p>
        </div>
        <div className="vd-steps">
          {CAPTURE_STEPS.map((s) => (
            <div className="vd-pstep" key={s.n}>
              <div className="vd-pstep-num" aria-hidden="true">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.s}</p>
            </div>
          ))}
        </div>
        <div className="vd-cta-row" style={{ justifyContent: 'flex-start', marginTop: 48 }}>
          <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Try it free <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- integrations */

function Integrations() {
  return (
    <section className="vd-section vd-band">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§04" label="For your agents" />
          <h2 className="vd-h2">Wire it into the tools you already run</h2>
          <p className="vd-lead">
            Knowcap is infrastructure, not another silo. Your agents query verified facts over MCP;
            confirmed actions flow to your stack.
          </p>
        </div>
        <div className="vd-cards">
          {INTEGRATIONS.map((it) => (
            <div className="vd-card" key={it.k}>
              <div className="vd-card-head">
                <h3>{it.k}</h3>
                <span className={`vd-tagpill ${it.live ? 'vd-tagpill--live' : 'vd-tagpill--soon'}`}>{it.tag}</span>
              </div>
              <p>{it.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- security */

function Security() {
  return (
    <section className="vd-section">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§05" label="Trust" />
          <h2 className="vd-h2">Your projects, secured and governed</h2>
        </div>
        <dl className="vd-spec">
          {PILLARS.map((p) => (
            <div className="vd-spec-row" key={p.h}>
              <dt><Tick />{p.h}</dt>
              <dd>{p.s}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- results */

function Results() {
  return (
    <section className="vd-section vd-band">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§06" label="Outcomes" />
          <h2 className="vd-h2">Measurable results from day one</h2>
        </div>
        <div className="vd-ledger">
          {RESULTS.map((r) => (
            <div className="vd-ledger-row" key={r.h}>
              <span className="vd-figure">{r.fig}</span>
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

/* ------------------------------------------------------ testimonials */

function Testimonials() {
  return (
    <section className="vd-section">
      <div className="cl-wrap">
        <div className="vd-section-head">
          <Reg no="§07" label="Social proof" />
          <h2 className="vd-h2">What teams are saying</h2>
        </div>
        <div className="vd-quotes">
          {TESTIMONIALS.map((t) => (
            <figure className="vd-quote" key={t.who}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="vd-quote-who">{t.who}</span>
                <span className="vd-quote-org">{t.org}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- FAQ */

function Faq() {
  return (
    <section className="vd-section vd-band">
      <div className="cl-wrap">
        <div className="vd-section-head" style={{ maxWidth: '100%', textAlign: 'center' }}>
          <h2 className="vd-h2">FAQ</h2>
        </div>
        <div className="vd-faq">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <div className="vd-faq-a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- closer */

function Closer() {
  return (
    <section className="vd-closer-wrap">
      <div className="cl-wrap">
        <div className="vd-closer">
          <h2>
            Your AI should act on truth, <span className="vd-dim">not guesses.</span>
          </h2>
          <p className="vd-closer-sub">Humans confirm. Agents act.</p>
          <div className="vd-closer-cta">
            <a className="cl-btn cl-btn--solid" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="cl-btn cl-btn--ghost" href="/book">Book a Demo</Link>
          </div>
          <p className="vd-closer-note">Free to start. Partner pricing on a quick call.</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- page */

export default function VersionD() {
  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Hero />
      <div className="vd-body">
        <Problem />
        <Escalation />
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
