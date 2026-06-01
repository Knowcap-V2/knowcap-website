'use client'

/**
 * Version B (outcome-first) — themed impeccable design.
 * Hero sells the result; signature section is the 80-second Odoo demo.
 * Tracks variant "b". Served at /b and in the live / rotation (outcome).
 */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal } from '@/components/impeccable/kit'

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
            Your meetings become <Mark ink>verified actions.</Mark>{' '}
            <span className="ve-dim">Automatically.</span>
          </motion.h1>
          <motion.p className="ve-lead ve-prose" variants={rise}>
            Record meetings. Extract the important parts. Let a human confirm each one.
            Then let your agents act — on verified facts only.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a Demo</Link>
          </motion.div>
          <motion.div className="ve-bullets" variants={rise}>
            <span className="ve-bullet"><Tick />Record from Meet, Zoom, Teams, WhatsApp, Telegram, or Slack</span>
            <span className="ve-bullet"><Tick />AI extracts decisions, tasks, risks, facts, and people</span>
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
            <Image src="/screenshot-inbox-claims.png" alt="Knowcap inbox: extracted meeting claims queued for human confirmation" width={1920} height={1080} priority />
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

function OdooDemo() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal>
          <div className="ve-split">
            <div>
              <div className="ve-split-rule" />
              <span className="ve-figure-xl">80 seconds</span>
              <h3 className="ve-h2">Meeting → confirmed scope change → Odoo PR.</h3>
              <p className="ve-prose">
                Your client says &ldquo;add the warehouse module to phase 2.&rdquo; Knowcap captures it,
                timestamps it, classifies it as a scope decision, and puts it in your inbox.
                You confirm with one tap. Before the meeting ends, an agent opens a PR on your
                Odoo SH repo — with the client&apos;s exact words quoted in the PR body.
              </p>
              <p className="ve-prose ve-dim">
                This is one workflow. Knowcap agents can draft emails, generate SOPs, update CRMs,
                and build reports — all from verified meeting content.
              </p>
            </div>
            <figure className="ve-split-media" style={{ margin: 0 }}>
              <div className="ve-exhibit">
                <div className="ve-exhibit-bar">
                  <span className="ve-mono">Exhibit · Artifact</span>
                  <span className="ve-seal ve-mono"><Tick />Verified source</span>
                </div>
                <Image src="/screenshot-artifacts.png" alt="Auto-generated project artifact with the client's quoted scope change" width={1920} height={1080} />
              </div>
            </figure>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

export default function VersionB() {
  return (
    <ThemedShell
      variant="b"
      hero={<Hero />}
      signature={<OdooDemo />}
      close={{
        title: <>Stop letting your agents act on meeting notes <span className="ve-dim">nobody checked.</span></>,
        sub: 'Humans confirm. Agents act.',
      }}
    />
  )
}
