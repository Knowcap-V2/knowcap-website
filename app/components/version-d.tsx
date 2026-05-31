'use client'

/**
 * Version D (show-the-magic) — themed impeccable design.
 * Hero leads with a dramatic scenario; signature section is the L1/L2/L3
 * agent-action escalation on the numbered rail.
 * Tracks variant "d". Served at /d and in the live / rotation (magic).
 */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, useReveal, SectionReveal } from '@/components/impeccable/kit'

const LEVELS = [
  {
    tag: 'Level 1',
    title: 'Get notified',
    body: 'A supplier mentions a probable delay in the meeting. By the time it ends you already know — Knowcap flagged the risk, classified it, and put it in your inbox. You confirm with one tap.',
  },
  {
    tag: 'Level 2',
    title: 'Get a research report',
    body: 'Knowcap spins up a research agent. It finds how similar risks were mitigated across comparable projects and comes back with a formatted report — PDF, email, Telegram, WhatsApp, or Slack. You review before it sends.',
  },
  {
    tag: 'Level 3',
    title: 'The agent handles it',
    body: 'The agent contacts alternative suppliers, checks lead times, compares prices, drafts a purchase-order amendment on your ERP, and opens a PR with the scope change quoted in the body. You approve before anything goes out.',
  },
]

function Hero() {
  const { reduce, rise, container } = useReveal()
  return (
    <section className="ve-section ve-dark ve-hero">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <motion.div variants={container} initial={reduce ? false : 'hidden'} animate={reduce ? undefined : 'show'}>
          <motion.div className="ve-docid" variants={rise}>
            <Tick className="ve-tick" />
            <span className="ve-mono">Knowcap · MCP server for Claude, Codex &amp; Gemini</span>
          </motion.div>
          <motion.h1
            className="ve-h1" variants={rise}
            style={{ fontSize: 'clamp(1.85rem,3.4vw,2.9rem)', lineHeight: 1.1, maxWidth: '22ch' }}
          >
            Your meeting just flagged a risk, drafted mitigations, and contacted an alternate supplier.
          </motion.h1>
          <motion.p
            className="ve-display" variants={rise}
            style={{ fontFamily: 'var(--t-fmono)', color: 'var(--t-accent)', fontSize: 'clamp(1.2rem,2.4vw,1.65rem)', margin: '0 0 22px' }}
          >
            Before it ended.
          </motion.p>
          <motion.p className="ve-lead ve-prose" variants={rise}>
            Knowcap records your meetings, extracts every decision, task, and risk — then your
            agents take action on confirmed facts. You approve each step.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a Demo</Link>
          </motion.div>
          <motion.div className="ve-trust" variants={rise}>
            <span>Built by an Odoo partner</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>MCP-native</span>
            <span className="ve-trust-dot" aria-hidden="true" />
            <span>Full audit trail on every action</span>
          </motion.div>
        </motion.div>

        <motion.figure
          className="ve-hero-exhibit" style={{ margin: 0 }}
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
            <Image src="/screenshot-inbox-claims.png" alt="Knowcap inbox: a flagged risk queued for human confirmation" width={1920} height={1080} priority />
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

function Escalation() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Three levels of agent action</h2>
          <p className="ve-lead ve-prose ve-dim">What happens after your meeting — you choose how far it goes.</p>
        </SectionReveal>
        <div className="ve-process">
          {LEVELS.map((l) => (
            <SectionReveal key={l.tag}>
              <div className="ve-step">
                <div className="ve-step-no">{l.tag.replace('Level ', 'L')}</div>
                <div>
                  <span className="ve-step-tag">{l.tag}</span>
                  <h3 className="ve-h3" style={{ color: 'var(--t-heading)' }}>{l.title}</h3>
                  <p style={{ color: 'var(--t-prose-dim)' }}>{l.body}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal>
          <p className="ve-process-note" style={{ color: 'var(--t-prose-dim)' }}>
            Every level requires your confirmation. The AI proposes. You approve. Nothing goes out unchecked.
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}

export default function VersionD() {
  return (
    <ThemedShell
      variant="d"
      hero={<Hero />}
      signature={<Escalation />}
      close={{
        title: <>Your AI should act on truth, <span className="ve-dim">not guesses.</span></>,
        sub: 'Humans confirm. Agents act.',
      }}
    />
  )
}
