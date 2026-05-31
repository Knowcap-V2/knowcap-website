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
  ProblemSection, ProcessSection, IntegrationsSection, SecuritySection,
  ResultsSection, TestimonialsSection, FAQSection, CloseSection,
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

/* On near-black hero + dark sections the forest-green accent fails contrast, so
   dark-context accents use the bright "verified" green (same hue — verified-green
   stays the brand constant across themes). */
.ve-dark .ve-mark{color:var(--t-accent-bright);background-image:linear-gradient(color-mix(in srgb,var(--t-accent-bright) 26%,transparent),color-mix(in srgb,var(--t-accent-bright) 26%,transparent))}
.ve-dark .ve-mark--ink{color:var(--t-accent-bright);background-image:linear-gradient(color-mix(in srgb,var(--t-accent-bright) 22%,transparent),color-mix(in srgb,var(--t-accent-bright) 22%,transparent))}
.ve-dark .ve-step-no,.ve-dark .ve-step .ve-step-tag,.ve-docid .ve-mono,.ve-seal,.ve-dark .ve-faq .ve-q-sign{color:var(--t-accent-bright)}
.ve-dark .ve-step-no::before{background:linear-gradient(var(--t-accent-bright),transparent)}
.ve-dark .ve-navlink:hover,.ve-dark .ve-textlink:hover{color:var(--t-accent-bright)}

/* Two-column hero: the hero's two in-flow children (text block + framed exhibit)
   become side-by-side columns on desktop, filling the dead right space. The
   .ve-field is position:absolute so it stays out of the grid. Below 980px it
   falls back to the original stacked layout. */
@media(min-width:980px){
  .ve-hero .ve-wrap{display:grid;grid-template-columns:1.04fr .96fr;gap:clamp(32px,4vw,64px);align-items:center}
  .ve-hero .ve-hero-exhibit{margin-top:0}
  .ve-hero h1{max-width:none}
  .ve-hero .ve-lead{max-width:46ch}
  .ve-hero .ve-bullets{max-width:none}
}

/* Hero trust strip (honest social proof under the CTAs) */
.ve-trust{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:24px;
  font-family:var(--t-fmono);font-size:.72rem;letter-spacing:.04em;color:var(--t-ink-prose-dim)}
.ve-trust .ve-trust-dot{width:4px;height:4px;border-radius:999px;background:var(--t-accent-bright);flex:none}

/* Problem section */
.ve-prob{max-width:760px}
.ve-prob .ve-lead{color:var(--t-ink-prose-dim);margin:22px 0 0}
.ve-prob .ve-prob-turn{color:var(--t-ink-prose);margin-top:18px}

/* Integrations band */
.ve-integrations{display:grid;grid-template-columns:1fr;gap:18px}
@media(min-width:820px){.ve-integrations{grid-template-columns:repeat(3,1fr)}}
.ve-integration{border:1px solid var(--t-line);border-radius:6px;padding:clamp(22px,2.6vw,30px);background:var(--t-card)}
.ve-integration-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
.ve-integration-head h3{margin:0}
.ve-int-tag{font-family:var(--t-fmono);font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;
  padding:4px 9px;border-radius:999px;white-space:nowrap;border:1px solid color-mix(in srgb,var(--t-accent) 40%,transparent);color:var(--t-accent)}
.ve-integration p{margin:0;color:var(--t-prose-dim);font-size:1rem;line-height:1.55}

/* Testimonials */
.ve-quotes{display:grid;grid-template-columns:1fr;gap:18px}
@media(min-width:860px){.ve-quotes{grid-template-columns:repeat(3,1fr)}}
.ve-quote{margin:0;border:1px solid var(--t-line);border-radius:6px;padding:clamp(22px,2.6vw,30px);
  display:flex;flex-direction:column;gap:18px;background:color-mix(in srgb,var(--t-ink-prose) 4%,transparent)}
.ve-quote blockquote{margin:0;font-family:var(--t-fdisp);font-weight:600;letter-spacing:-.01em;
  font-size:clamp(1.05rem,1.5vw,1.22rem);line-height:1.4;color:var(--t-hero-heading);text-wrap:pretty}
.ve-quote figcaption{display:flex;flex-direction:column;gap:2px;margin-top:auto;border-top:1px solid var(--t-line);padding-top:16px}
.ve-quote-who{font-family:var(--t-fdisp);font-weight:600;color:var(--t-hero-heading);font-size:.96rem}
.ve-quote-org{font-family:var(--t-fmono);font-size:.7rem;letter-spacing:.06em;color:var(--t-ink-prose-dim)}

/* Close section pricing note */
.ve-close-note{margin:22px auto 0;font-family:var(--t-fmono);font-size:.72rem;letter-spacing:.04em;color:var(--t-ink-prose-dim)}
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
    // Bright "verified" green for dark sections (forest-green fails on near-black).
    // Constant across themes so the verified-green keeps one identity.
    '--t-accent-bright': '#4ade80',
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
      <ProblemSection />
      {signature}
      <ProcessSection />
      <IntegrationsSection />
      <SecuritySection />
      <ResultsSection />
      <TestimonialsSection />
      <FAQSection />
      <CloseSection title={close.title} sub={close.sub} />
      <ImpeccableFooter />
      <ImpeccableFloatingCTA />
    </main>
  )
}
