'use client'

/**
 * Version A (control / mechanism-first) — themed impeccable design.
 * Hero leads with the core concept (human claims -> verified evidence).
 * No special signature section; the shared kit body carries the rest.
 * Tracks variant "a". Reachable at /a; not in the live / rotation.
 */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, Mark, useReveal } from '@/components/impeccable/kit'

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
            Turn human claims into <Mark ink>evidence</Mark>{' '}
            <span className="ve-dim">your AI agents can learn from.</span>
          </motion.h1>
          <motion.p className="ve-lead ve-prose" variants={rise}>
            Capture meetings, voice notes, and chats. Promote the durable parts to evidence.
            Let agents act on what&apos;s verified — never on rumour.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a Demo</Link>
          </motion.div>
          <motion.div className="ve-bullets" variants={rise}>
            <span className="ve-bullet"><Tick />Every fact confirmed by a named human</span>
            <span className="ve-bullet"><Tick />Full audit trail for every AI action</span>
            <span className="ve-bullet"><Tick />MCP server — wire Claude, Codex, or Gemini</span>
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
            <Image src="/screenshot-inbox.png" alt="Knowcap dashboard: project sources, AI chat, and verified artifacts" width={1920} height={1080} priority />
          </div>
        </motion.figure>
      </div>
    </section>
  )
}

export default function VersionA() {
  return (
    <ThemedShell
      variant="a"
      hero={<Hero />}
      close={{
        title: <>Run projects on proof, <span className="ve-dim">not memory.</span></>,
        sub: 'Humans confirm. Agents act.',
      }}
    />
  )
}
