'use client'

/**
 * ThemedShell — the shared wrapper for all four themed landing copies (A/B/C/D).
 *
 * It carries impeccable's CRAFT (the kit's structural CSS + sections) and
 * re-skins it onto Knowcap's 4-theme system (theme-switcher.tsx tokens), with
 * the theme switcher live in the nav. Each copy variant supplies only its hero
 * + signature section as children; everything else (chrome, theme plumbing,
 * the constant body sections, footer, floating CTA) lives here so the four
 * pages can't drift apart.
 */

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ABTracker from '@/components/ab-tracker'
import ThemeSwitcher, { useThemeColors } from '@/components/theme-switcher'
import {
  IMPECCABLE_CSS, APP_URL,
  ProcessSection, ResultsSection, SecuritySection, FAQSection, CloseSection,
  ImpeccableFooter, ImpeccableFloatingCTA,
} from '@/components/impeccable/kit'

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');`

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
.ve-btn--ghost{border-color:color-mix(in srgb,var(--t-ink-prose) 30%,transparent);color:var(--t-ink-prose)}
.ve-btn--ghost:hover{border-color:var(--t-ink-prose);color:var(--t-hero-heading)}
.ve-on-paper .ve-btn--ghost{border-color:var(--t-line);color:var(--t-prose)}
.ve-on-paper .ve-btn--ghost:hover{border-color:var(--t-heading);color:var(--t-heading)}
.ve-exhibit,.ve-on-paper .ve-exhibit{background:var(--t-card);border-color:var(--t-line)}
.ve-figure{color:var(--t-heading)}
.ve-figure-xl,.ve-split-rule,.ve-step-no,.ve-step .ve-step-tag,.ve-docid .ve-mono,.ve-seal,.ve-faq .ve-q-sign{color:var(--t-accent)}
.ve-split-rule{background:var(--t-accent)}
.ve-step-no::before{background:linear-gradient(var(--t-accent),transparent)}
.ve-spec-row dt{color:var(--t-hero-heading)}
.ve-themes{display:flex;align-items:center;gap:14px}
@media(max-width:640px){.ve-themes .ve-textlink{display:none}}
`

export const THEMED_STYLE = FONT_IMPORT + IMPECCABLE_CSS + THEME_OVERRIDES

function ThemedHeader({ theme, onThemeChange }: { theme: any; onThemeChange: (k: any) => void }) {
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

/**
 * @param variant  PostHog/Clarity A-B key (e.g. 'a','b','c','d')
 * @param hero     the copy-specific hero section
 * @param signature optional copy-specific section rendered right after the hero
 * @param close    the closing CTA block (title + sub)
 */
export default function ThemedShell({
  variant,
  hero,
  signature,
  close,
}: {
  variant: string
  hero: React.ReactNode
  signature?: React.ReactNode
  close: { title: React.ReactNode; sub: string }
}) {
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
      <style dangerouslySetInnerHTML={{ __html: THEMED_STYLE }} />
      <ABTracker variant={variant} />
      <ThemedHeader theme={theme} onThemeChange={setTheme} />
      {hero}
      {signature}
      <ProcessSection />
      <ResultsSection />
      <SecuritySection />
      <FAQSection />
      <CloseSection title={close.title} sub={close.sub} />
      <ImpeccableFooter />
      <ImpeccableFloatingCTA />
    </main>
  )
}
