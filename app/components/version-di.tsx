'use client'

/**
 * Version D-imp — Version D's copy (show-the-magic, L1/L2/L3 escalation) in the
 * impeccable "forensic dossier" design. Lives at /di. Tracks as variant "d".
 *
 * Constant (shared with B-imp via the kit): chrome, Process, Results, Security,
 * FAQ, Close, Footer. Variable (D's bet): the hero + the escalation section.
 */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ABTracker from '@/components/ab-tracker'
import {
  IMPECCABLE_CSS, APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal,
  ImpeccableHeader, ImpeccableFooter, ImpeccableFloatingCTA,
  ProcessSection, ResultsSection, SecuritySection, FAQSection, CloseSection,
} from '@/components/impeccable/kit'

const LEVELS = [
  {
    level: 'Level 1', label: 'Get notified',
    d: 'A supplier mentions a probable delay in the meeting. By the time the meeting ends, you already know — Knowcap flagged the risk, classified it, and put it in your inbox. You confirmed it with one tap.',
  },
  {
    level: 'Level 2', label: 'Get a research report',
    d: 'Knowcap spins up a research agent. It goes online, finds how similar risks were mitigated across comparable projects, and comes back with a formatted report — PDF, email, Telegram, WhatsApp, Slack. Your choice. You review before it sends.',
  },
  {
    level: 'Level 3', label: 'The agent handles it',
    d: 'The agent contacts alternative suppliers, checks lead times, compares prices, drafts a purchase-order amendment on your ERP, and opens a PR with the scope change quoted in the body. All before you approve the final action.',
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

          <motion.h1 className="ve-h1" variants={rise}>
            Your meeting just flagged a risk, drafted mitigations, and contacted an alternate supplier.{' '}
            <Mark ink>Before it ended.</Mark>
          </motion.h1>

          <motion.p className="ve-lead ve-prose" variants={rise}>
            Knowcap records your meetings, extracts every decision, task, and risk — then your agents
            take action on confirmed facts. You approve before anything goes out.
          </motion.p>

          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a Demo</Link>
          </motion.div>

          <motion.div className="ve-bullets" variants={rise}>
            <span className="ve-bullet"><Tick />Every fact confirmed by a named human</span>
            <span className="ve-bullet"><Tick />The AI proposes — you approve — then it acts</span>
            <span className="ve-bullet"><Tick />Full audit trail for every action</span>
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
              src="/screenshot-inbox-claims.png"
              alt="Knowcap inbox: a flagged risk extracted from a meeting, awaiting confirmation"
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

/* D's signature section: the three escalation levels, on the numbered rail. */
function Escalation() {
  return (
    <section className="ve-section ve-dark ve-pad">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Three levels of agent action</h2>
          <p className="ve-lead ve-prose ve-dim">What happens after your meeting — you decide how far the agent goes.</p>
        </SectionReveal>
        <div className="ve-process">
          {LEVELS.map((l, i) => (
            <SectionReveal key={l.level}>
              <div className="ve-step">
                <div className="ve-step-no">{`L${i + 1}`}</div>
                <div>
                  <span className="ve-step-tag">{l.level}</span>
                  <h3 className="ve-h3">{l.label}</h3>
                  <p>{l.d}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal>
          <p className="ve-process-note">Every level requires your confirmation. The AI proposes. You approve. Nothing goes out unchecked.</p>
        </SectionReveal>
      </div>
    </section>
  )
}

export default function VersionDImpeccable({ fontVars = '' }: { fontVars?: string }) {
  return (
    <main className={`ve-root ${fontVars}`}>
      <style dangerouslySetInnerHTML={{ __html: IMPECCABLE_CSS }} />
      <ABTracker variant="d" />
      <ImpeccableHeader />
      <Hero />
      <Escalation />
      <ProcessSection />
      <ResultsSection />
      <SecuritySection />
      <FAQSection />
      <CloseSection
        title={<>Your AI should act on <Mark ink>truth,</Mark> <span className="ve-dim">not guesses.</span></>}
        sub="Humans confirm. Agents act."
      />
      <ImpeccableFooter />
      <ImpeccableFloatingCTA />
    </main>
  )
}
