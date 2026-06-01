'use client'

/**
 * /for/odoo-partners — Phase 1 beachhead conversion page.
 *
 * Audience: Odoo implementation partners (the StratDev Meta-Ads target).
 * Pattern: closest to Version B — themed impeccable design with a hero + a
 * single signature section. Signature here is "The 80-second loop", a vertical
 * 4-card timeline using the kit's numbered rail (ve-process) with small inline
 * mockup chips. FAQ section is overridden via ThemedShell's `faq` prop with
 * Odoo-partner-specific questions.
 *
 * Tracks variant "odoo-partners".
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import {
  APP_URL,
  Tick,
  Arrow,
  Mark,
  useReveal,
  SectionReveal,
  ClaimsExhibit,
} from '@/components/impeccable/kit'

const REGISTER_URL = `${APP_URL}/register?utm_source=odoo_partners_page`

/* ----------------------------------------------------------------------- */
/* Page-scoped CSS — small additions on top of the kit for the 80s loop     */
/* timeline mockup chips. No global selectors; all scoped under .ve-odoop.  */
/* ----------------------------------------------------------------------- */

const PAGE_CSS = `
.ve-odoop .ve-step{position:relative}
.ve-odoop .ve-step .ve-step-time{font-family:var(--t-fmono);font-size:.7rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--t-accent-bright);display:inline-block;margin-bottom:6px}
.ve-odoop .ve-mockup{margin-top:18px;border:1px solid var(--t-line);border-radius:6px;overflow:hidden;
  background:color-mix(in srgb,var(--t-ink-prose) 4%,transparent)}
.ve-odoop .ve-mockup-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:9px 14px;border-bottom:1px solid var(--t-line);font-family:var(--t-fmono);
  font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--t-ink-prose-dim)}
.ve-odoop .ve-mockup-bar .ve-mockup-tag{color:var(--t-accent-bright);display:inline-flex;
  align-items:center;gap:6px}
.ve-odoop .ve-mockup-body{padding:14px 16px;font-family:var(--t-fbody);color:var(--t-ink-prose);
  font-size:.95rem;line-height:1.5}
.ve-odoop .ve-mockup-body code{font-family:var(--t-fmono);font-size:.82rem;background:rgba(255,255,255,.06);
  padding:1px 6px;border-radius:3px;color:var(--t-accent-bright)}
.ve-odoop .ve-mockup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:8px 0;border-bottom:1px dashed color-mix(in srgb,var(--t-ink-prose) 12%,transparent)}
.ve-odoop .ve-mockup-row:last-child{border-bottom:0}
.ve-odoop .ve-mockup-k{font-family:var(--t-fmono);font-size:.66rem;letter-spacing:.1em;
  text-transform:uppercase;color:var(--t-ink-prose-dim)}
.ve-odoop .ve-mockup-v{font-family:var(--t-fbody);color:var(--t-ink-prose);font-size:.92rem}
.ve-odoop .ve-strip{margin-top:clamp(40px,5vw,60px);padding:clamp(20px,2.4vw,28px) clamp(22px,2.6vw,30px);
  border:1px solid var(--t-line);border-left:3px solid var(--t-accent);border-radius:4px;
  background:color-mix(in srgb,var(--t-ink-prose) 3%,transparent);
  font-family:var(--t-fbody);color:var(--t-prose);font-size:1rem;line-height:1.55;max-width:820px}
.ve-odoop .ve-strip strong{color:var(--t-heading);font-weight:600}
`

/* ----------------------------------------------------------------------- */
/* Hero                                                                     */
/* ----------------------------------------------------------------------- */

function Hero() {
  const { reduce, rise, container } = useReveal()
  return (
    <section className="ve-section ve-dark ve-hero">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <motion.div variants={container} initial={reduce ? false : 'hidden'} animate={reduce ? undefined : 'show'}>
          <motion.div className="ve-hbadge" variants={rise}>
            <Tick />
            <span className="ve-mono" style={{ fontSize: '.7rem' }}>For Odoo implementation partners</span>
          </motion.div>
          <motion.h1 className="ve-h1" variants={rise}>
            From client meeting to Odoo SH PR.{' '}
            <Mark ink>Before the meeting ends.</Mark>
          </motion.h1>
          <motion.p className="ve-lead ve-prose" variants={rise}>
            Your client mentions a bug or asks for a feature mid-meeting. Knowcap captures it,
            classifies it as a scope decision or bug, and waits for one tap from you. Then an Odoo SH
            ticket opens, a GitHub PR appears, and your project tracker advances — all before the call
            wraps.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={REGISTER_URL}>Start free for Odoo partners <Arrow /></a>
            <a className="ve-btn ve-btn--ghost" href="#demo">Watch the 2-minute demo</a>
          </motion.div>
          <motion.div className="ve-trust" variants={rise}>
            <span>Built by an Odoo partner</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>MCP-native</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Native Odoo SH integration</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="ve-hero-exhibit" style={{ margin: 0 }}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <ClaimsExhibit
            bar={{ left: 'Inbox · 2 claims', right: 'Live · 0:31:04' }}
            cards={[
              { time: '0:14:22', speaker: 'Client', text: '"The warehouse module crashes when we receive a partial shipment."', tag: 'risk', state: 'verified', action: 'Odoo SH ticket #4821 opened' },
              { time: '0:17:49', speaker: 'Client', text: '"Can we add a barcode scanner to the picking flow?"', tag: 'decision', state: 'verified', action: 'PR opened on stock_barcode module' },
              { time: '0:24:51', speaker: 'PM', text: '"Send the revised SOW for sign-off by Friday."', tag: 'task', state: 'pending' },
            ]}
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------- */
/* Signature: "The 80-second loop" — vertical 4-card timeline               */
/* ----------------------------------------------------------------------- */

function EightySecondLoop() {
  return (
    <section id="demo" className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <div className="ve-split-rule" />
          <span className="ve-figure-xl">80 seconds</span>
          <h2 className="ve-h2">The 80-second loop.</h2>
          <p className="ve-lead ve-prose ve-dim">
            One client conversation. One tap from you. Four agents working in parallel. By the time the
            call ends, your Odoo SH ticket is in code review.
          </p>
        </SectionReveal>

        <div className="ve-process">
          <SectionReveal>
            <div className="ve-step">
              <div className="ve-step-no">01</div>
              <div>
                <span className="ve-step-time">0:00 — Client records the bug</span>
                <h3 className="ve-h3">Your client opens Knowcap and records a 30-second screen capture.</h3>
                <p>
                  No ticket form. No &ldquo;please file a bug report&rdquo; email. The reproduction is
                  captured live, in the client&apos;s own words, with the screen as evidence.
                </p>
                <div className="ve-mockup" aria-hidden="true">
                  <div className="ve-mockup-bar">
                    <span>Knowcap · screen recording</span>
                    <span className="ve-mockup-tag"><Tick />Recording · 0:24</span>
                  </div>
                  <div className="ve-mockup-body">
                    &ldquo;Watch — I click receive, pick partial, and the warehouse module just...
                    reloads. No error, no ticket, it just dumps the picking.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="ve-step">
              <div className="ve-step-no">02</div>
              <div>
                <span className="ve-step-time">0:30 — Knowcap extracts the claim</span>
                <h3 className="ve-h3">AI identifies the affected module, severity, and reproduction steps.</h3>
                <p>
                  Categorized as a Risk, ready for one-tap human review. The claim sits in your inbox
                  with the exact 24-second clip attached and the words quoted verbatim.
                </p>
                <div className="ve-mockup" aria-hidden="true">
                  <div className="ve-mockup-bar">
                    <span>Inbox · claim extracted</span>
                    <span className="ve-mockup-tag">Risk · pending</span>
                  </div>
                  <div className="ve-mockup-body">
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Module</span><span className="ve-mockup-v"><code>stock.picking</code></span></div>
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Severity</span><span className="ve-mockup-v">High · data loss</span></div>
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Repro</span><span className="ve-mockup-v">Receive → partial → reload</span></div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="ve-step">
              <div className="ve-step-no">03</div>
              <div>
                <span className="ve-step-time">1:00 — You confirm</span>
                <h3 className="ve-h3">One tap promotes the claim to evidence.</h3>
                <p>
                  An agent reads it, creates a ticket in YOUR Odoo SH instance (Customer: Demo Client A,
                  Module: Warehouse), moves it from New → In Progress, and notifies your dev team in
                  Telegram.
                </p>
                <div className="ve-mockup" aria-hidden="true">
                  <div className="ve-mockup-bar">
                    <span>Odoo SH · ticket #4821 created</span>
                    <span className="ve-mockup-tag"><Tick />In Progress</span>
                  </div>
                  <div className="ve-mockup-body">
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Customer</span><span className="ve-mockup-v">Demo Client A</span></div>
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Module</span><span className="ve-mockup-v">Warehouse</span></div>
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Assigned</span><span className="ve-mockup-v">@dev-team · Telegram pinged</span></div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="ve-step">
              <div className="ve-step-no">04</div>
              <div>
                <span className="ve-step-time">2:00 — GitHub PR opened</span>
                <h3 className="ve-h3">A second agent reads your client&apos;s repo and generates the fix.</h3>
                <p>
                  It identifies the unindexed loop in <code>stock.picking.bulk_receive</code>, generates
                  the patch, opens a PR. Ticket auto-moves to Code Review with the PR linked.
                </p>
                <div className="ve-mockup" aria-hidden="true">
                  <div className="ve-mockup-bar">
                    <span>GitHub · PR #312 opened</span>
                    <span className="ve-mockup-tag"><Tick />Code Review</span>
                  </div>
                  <div className="ve-mockup-body">
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Title</span><span className="ve-mockup-v">fix(stock): index bulk_receive loop</span></div>
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Files</span><span className="ve-mockup-v"><code>stock/models/stock_picking.py</code></span></div>
                    <div className="ve-mockup-row"><span className="ve-mockup-k">Ticket</span><span className="ve-mockup-v">#4821 → Code Review</span></div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal>
          <p className="ve-strip">
            <strong>Same loop for features.</strong> Client describes the feature on a call → Task in
            project → PR scaffold ready. You only ever review what a named human already confirmed.
          </p>
        </SectionReveal>

        <SectionReveal className="ve-process-cta">
          <a className="ve-btn ve-btn--primary" href={REGISTER_URL}>Start free for Odoo partners <Arrow /></a>
        </SectionReveal>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------- */
/* FAQ override — Odoo-partner-specific                                     */
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

function OdooFAQSection() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal>
          <h2 className="ve-h2" style={{ textAlign: 'center', marginBottom: 'clamp(36px,5vw,56px)' }}>FAQ</h2>
        </SectionReveal>
        <SectionReveal>
          <div className="ve-faq">
            {ODOO_FAQS.map((f, i) => (
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

/* ----------------------------------------------------------------------- */
/* Page export                                                              */
/* ----------------------------------------------------------------------- */

export default function VersionOdooPartners() {
  return (
    <div className="ve-odoop">
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <ThemedShell
        variant="odoo-partners"
        hero={<Hero />}
        signature={<EightySecondLoop />}
        faq={<OdooFAQSection />}
        close={{
          title: <>Stop manually triaging tickets.</>,
          sub: 'Your client records. Knowcap extracts. Agents act. You merge.',
        }}
      />
    </div>
  )
}
