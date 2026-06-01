'use client'

/**
 * Version C (role-first) — themed impeccable design.
 * Hero is generic; signature section is the three role tracks
 * (ERP/CRM Implementers, Agencies, Teams) + a governance band.
 * Tracks variant "c". Reachable at /c; not in the live / rotation.
 */

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemedShell from '@/components/impeccable/themed-shell'
import { APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal } from '@/components/impeccable/kit'

const ROLES = [
  {
    title: 'ERP / CRM Implementers',
    bullets: [
      'Enforce SOPs, flag skipped steps, and keep go-lives on track with cross-meeting memory.',
      'Generate client-ready artifacts — SOPs, PRDs, audits, KPI dashboards — with timestamp proof.',
      'Onboard replacements in minutes with a single project dashboard linking back to source meetings.',
      'Built with Odoo partners in mind. Mirrors the Odoo lifecycle from discovery to go-live.',
    ],
  },
  {
    title: 'Agencies',
    bullets: [
      'Turn calls and screen sessions into SOPs, PRDs, and annotated walkthroughs. No re-explaining.',
      'Verify decisions instantly via timestamped moments inside artifacts.',
      'Both you and your client confirm scope changes — disputes end before they start.',
    ],
  },
  {
    title: 'Teams',
    bullets: [
      'Project health, master action trackers, and decision recall across meetings.',
      'Built-in governance layer — flag deviations from methodology automatically.',
      'New hires get the full project memory on day one.',
    ],
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
            AI that turns meetings into project docs,{' '}
            <Mark ink>with proof.</Mark>
          </motion.h1>
          <motion.p className="ve-lead ve-prose" variants={rise}>
            Knowcap keeps teams focused by turning meetings and on-screen actions into
            timestamp-verified SOPs, PRDs, onboarding guides, audits, and KPIs.
          </motion.p>
          <motion.div className="ve-cta-row" variants={rise}>
            <a className="ve-btn ve-btn--primary" href={`${APP_URL}/register`}>Get Started Free <Arrow /></a>
            <Link className="ve-btn ve-btn--ghost" href="/book">Book a Demo</Link>
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

function Roles() {
  return (
    <section className="ve-section ve-on-paper ve-pad">
      <div className="ve-wrap">
        <SectionReveal className="ve-head">
          <h2 className="ve-h2">Tailored to how you actually work</h2>
          <p className="ve-lead ve-prose ve-dim">One verified memory, three ways to put it to work.</p>
        </SectionReveal>
        <div className="ve-process" style={{ maxWidth: 'none' }}>
          {ROLES.map((r, i) => (
            <SectionReveal key={r.title}>
              <div className="ve-step">
                <div className="ve-step-no">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="ve-h3" style={{ color: 'var(--t-heading)' }}>{r.title}</h3>
                  <ul style={{ listStyle: 'none', margin: '12px 0 0', padding: 0, display: 'grid', gap: '10px' }}>
                    {r.bullets.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ marginTop: '3px', flex: 'none' }}><Tick /></span>
                        <span className="ve-prose" style={{ color: 'var(--t-prose)' }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Governance() {
  return (
    <section className="ve-section ve-dark ve-pad-sm">
      <div className="ve-field" aria-hidden="true" />
      <div className="ve-wrap" style={{ position: 'relative' }}>
        <SectionReveal className="ve-head" >
          <h2 className="ve-h2">Governance + client-safe controls</h2>
          <p className="ve-lead ve-prose ve-dim">
            Flag missed approvals and skipped steps, then share through restricted client portals
            with redaction and access controls — always backed by verifiable timestamps.
          </p>
        </SectionReveal>
        <SectionReveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['Methodology flags: 2 pending', 'Client portal: restricted access', 'Every claim: timestamp-verifiable'].map((p) => (
              <span key={p} className="ve-mono" style={{
                border: '1px solid color-mix(in srgb, var(--t-ink-prose) 22%, transparent)',
                borderRadius: '999px', padding: '9px 16px', fontSize: '.72rem',
                color: 'var(--t-hero-heading)',
              }}>{p}</span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

export default function VersionC() {
  return (
    <ThemedShell
      variant="c"
      hero={<Hero />}
      signature={<><Roles /><Governance /></>}
      close={{
        title: <>Make every meeting produce <span className="ve-dim">valuable docs.</span></>,
        sub: 'AI-generated, proof-backed. Humans confirm. Agents act.',
      }}
    />
  )
}
