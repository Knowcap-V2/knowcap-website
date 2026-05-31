'use client'

/**
 * Version B-themed (/bt) — PROOF: impeccable's CRAFT (spacing, type scale,
 * layout patterns, sections) re-skinned onto Knowcap's existing 4-theme system.
 *
 * It reuses the impeccable kit's structural CSS + color-agnostic section
 * components VERBATIM (so the "size of stuff" is byte-identical to /bi), then
 * appends a theme-override layer that re-points every color + font to the
 * theme tokens from theme-switcher.tsx — and brings back the 4-theme switcher.
 *
 * Net: same craft as /bi, but in baseline / operator-dark / operator-light /
 * library instead of the fixed brass-midnight skin. Copy = Version B.
 * Tracks variant "bt" so it never pollutes the live b/d test.
 */

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ABTracker from '@/components/ab-tracker'
import ThemeSwitcher, { useThemeColors } from '@/components/theme-switcher'
import {
  IMPECCABLE_CSS, APP_URL, Tick, Arrow, Mark, useReveal, SectionReveal,
  ImpeccableFooter, ImpeccableFloatingCTA,
  ProcessSection, ResultsSection, SecuritySection, FAQSection, CloseSection,
} from '@/components/impeccable/kit'

/* Pull the missing theme fonts (Space Grotesk + Inter already load in globals).
   Prepended to the style string so the @import is valid. */
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');`

/* Re-skin layer: craft from IMPECCABLE_CSS is untouched; only color/font
   carriers are re-pointed at the inline --t-* theme vars set on the root. */
const THEME_OVERRIDES = `
.ve-root{
  --ink:var(--t-ink); --ink-2:var(--t-ink-2); --ink-3:var(--t-ink-2);
  --paper:var(--t-paper); --paper-2:var(--t-card);
  --line:var(--t-line); --line-strong:var(--t-line);
  --prose:var(--t-prose); --prose-dim:var(--t-prose-dim);
  --ink-prose:var(--t-ink-prose); --ink-prose-dim:var(--t-ink-prose-dim);
  --brass:var(--t-accent); --brass-bright:var(--t-accent); --brass-ink:var(--t-accent);
  --fdisp:var(--t-fdisp); --fbody:var(--t-fbody); --fmono:var(--t-fmono);
}
.ve-root ::selection{background:var(--t-accent);color:var(--t-paper)}
.ve-dark{background:linear-gradient(135deg,var(--t-hero-from),var(--t-hero-to));color:var(--t-ink-prose)}
.ve-dark .ve-h1,.ve-dark .ve-h2,.ve-dark .ve-h3{color:var(--t-hero-heading)}
.ve-on-paper{color:var(--t-prose)}
.ve-on-paper .ve-h2,.ve-on-paper .ve-h3,.ve-on-paper .ve-display{color:var(--t-heading)}
.ve-header[data-scrolled="true"]{background:color-mix(in srgb,var(--t-paper) 90%,transparent);border-bottom:1px solid var(--t-line)}
.ve-header[data-scrolled="true"] .ve-brand{color:var(--t-heading)}
.ve-header[data-scrolled="true"] .ve-navlink,.ve-header[data-scrolled="true"] .ve-textlink{color:var(--t-prose-dim)}
.ve-navlink:hover,.ve-textlink:hover,.ve-foot-col a:hover,.ve-foot-bottom a:hover,.ve-faq summary:hover{color:var(--t-accent)}
.ve-mark{color:var(--t-accent);background-image:linear-gradient(color-mix(in srgb,var(--t-accent) 26%,transparent),color-mix(in srgb,var(--t-accent) 26%,transparent))}
.ve-mark--ink{color:var(--t-accent);background-image:linear-gradient(color-mix(in srgb,var(--t-accent) 24%,transparent),color-mix(in srgb,var(--t-accent) 24%,transparent))}
.ve-btn--primary,.ve-on-paper .ve-btn--primary{background:var(--t-accent);color:var(--t-accent-contrast)}
.ve-btn--primary:hover,.ve-on-paper .ve-btn--primary:hover{background:var(--t-accent);filter:brightness(1.07);transform:translateY(-1px)}
.ve-exhibit,.ve-on-paper .ve-exhibit{background:var(--t-card);border-color:var(--t-line)}
.ve-figure{color:var(--t-heading)}
.ve-figure-xl,.ve-split-rule,.ve-step-no,.ve-step .ve-step-tag,.ve-docid .ve-mono,.ve-seal,.ve-faq .ve-q-sign{color:var(--t-accent)}
.ve-split-rule{background:var(--t-accent)}
.ve-step-no::before{background:linear-gradient(var(--t-accent),transparent)}
.ve-spec-row dt{color:var(--t-hero-heading)}
/* theme switcher dots live in the nav */
.ve-themes{display:flex;align-items:center;gap:14px}
@media(max-width:640px){.ve-themes .ve-textlink{display:none}}
`

const STYLE = FONT_IMPORT + IMPECCABLE_CSS + THEME_OVERRIDES

function ThemedHeader({ theme, colors, onThemeChange }: any) {
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
          <Image src="/logos/logo.jpg" alt="" width={28} height={28} priority />
          Knowcap
        </Link>
        <nav className="ve-navlinks" aria-label="Primary">
          <a className="ve-navlink" href="#how-it-works">How it works</a>
          <a className="ve-navlink" href="#security">Security</a>
          <Link className="ve-navlink" href="/contact-us">Contact</Link>
        </nav>
        <div className="ve-navauth ve-themes">
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />
          <a className="ve-textlink" href={`${APP_URL}/login`}>Log in</a>
          <a className="ve-btn ve-btn--primary ve-btn--sm" href={`${APP_URL}/register`}>Get Started Free</a>
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

export default function VersionBThemed() {
  const [theme, colors, setTheme] = useThemeColors()

  const themeVars = {
    '--t-ink': colors.heroFrom,
    '--t-ink-2': colors.heroTo,
    '--t-paper': colors.pageBg,
    '--t-card': colors.cardBg,
    '--t-line': colors.cardBorder,
    '--t-prose': colors.bodyColor,
    '--t-prose-dim': colors.mutedColor,
    '--t-ink-prose': colors.heroSub,
    '--t-ink-prose-dim': colors.heroBullet,
    '--t-accent': colors.accentColor,
    '--t-accent-contrast': colors.heroBtnText,
    '--t-heading': colors.headingColor,
    '--t-hero-from': colors.heroFrom,
    '--t-hero-to': colors.heroTo,
    '--t-hero-heading': colors.heroHeading,
    '--t-fdisp': colors.titleFont,
    '--t-fbody': colors.bodyFont,
    '--t-fmono': colors.monoFont,
  } as React.CSSProperties

  return (
    <main className="ve-root" style={themeVars}>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <ABTracker variant="bt" />
      <ThemedHeader theme={theme} colors={colors} onThemeChange={setTheme} />
      <Hero />
      <OdooDemo />
      <ProcessSection />
      <ResultsSection />
      <SecuritySection />
      <FAQSection />
      <CloseSection
        title={<>Stop letting your agents act on meeting notes <span className="ve-dim">nobody checked.</span></>}
        sub="Humans confirm. Agents act."
      />
      <ImpeccableFooter />
      <ImpeccableFloatingCTA />
    </main>
  )
}
