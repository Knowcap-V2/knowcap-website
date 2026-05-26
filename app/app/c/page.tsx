'use client'

import Navbar from '@/components/navbar'
import { useThemeColors } from '@/components/theme-switcher'
import ABTracker from '@/components/ab-tracker'
import Image from 'next/image'
import Link from 'next/link'
import { HowItWorksSection, DifferenceSection, BuiltForSection, SecuritySection, CategoriesSection, MCPSection, FAQSection, LaunchPerksSection, CTASection, FooterSection } from '@/components/sections/shared'

const APP_URL = 'https://app.knowcap.ai'

const ROLES = [
  { title: 'ERP/CRM Implementers', border: '#1F6B3A', bullets: [
    'Enforce SOPs, flag skipped steps, and keep go-lives on track with cross-meeting memory.',
    'Generate client-ready artifacts — SOPs, PRDs, audits, KPI dashboards — with timestamp proof.',
    'Onboard replacements in minutes with a single project dashboard linking back to source meetings.',
    'Built with Odoo partners in mind. Mirrors the Odoo lifecycle from discovery to go-live.',
  ]},
  { title: 'Agencies', border: '#4A2FA8', bullets: [
    'Turn calls and screen sessions into SOPs, PRDs, and annotated walkthroughs. No re-explaining.',
    'Verify decisions instantly via timestamped moments inside artifacts.',
    'Both you and your client confirm scope changes — disputes end before they start.',
  ]},
  { title: 'Teams', border: '#1B4F8F', bullets: [
    'Project health, master action trackers, and decision recall across meetings.',
    'Built-in governance layer — flag deviations from methodology automatically.',
    'New hires get the full project memory on day one.',
  ]},
]

export default function VersionC() {
  const [theme, colors, setTheme] = useThemeColors()
  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.pageBg, fontFamily: colors.bodyFont }}>
      <ABTracker variant="c" />
      <Navbar theme={theme} colors={colors} onThemeChange={setTheme} />

      {/* HERO — role-first */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.heroFrom}, ${colors.heroTo})` }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-[780px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ backgroundColor: colors.heroBadgeBg, border: `1px solid ${colors.heroBadgeBorder}` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px]" style={{ fontFamily: colors.monoFont, color: colors.heroBadgeText }}>MCP server for Claude, Codex & Gemini</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-6" style={{ fontFamily: colors.titleFont, color: colors.heroHeading }}>
            AI that turns meetings into project docs,{' '}
            <span style={{ fontFamily: colors.monoFont, color: colors.accentColor }}>with proof.</span>
          </h1>
          <p className="text-[15px] max-w-[640px] mx-auto mb-10 leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.heroSub }}>
            Knowcap keeps teams focused by turning meetings and on-screen actions into timestamp-verified SOPs, PRDs, onboarding guides, audits, and KPIs.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <a href={`${APP_URL}/register`} className="px-6 py-3 text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.heroBtnBg, color: colors.heroBtnText }}>Get Started Free →</a>
            <Link href="/book" className="px-6 py-3 text-[14px] font-medium rounded-lg border transition-colors" style={{ borderColor: colors.heroGhostBorder, color: colors.heroGhostText }}>Book a Demo</Link>
          </div>
        </div>
        <div className="relative max-w-[900px] mx-auto mt-4 px-6">
          <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl">
            <Image src="/screenshot-inbox-claims.png" alt="Knowcap Inbox" width={1440} height={900} className="w-full h-auto" priority />
          </div>
        </div>
      </section>

      {/* ROLE CARDS */}
      <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10.5px] uppercase tracking-[0.08em] font-bold mb-3" style={{ fontFamily: colors.titleFont, color: colors.mutedColor }}>Built for your role</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.02em] mb-12" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>Tailored to how you actually work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map(r => (
              <div key={r.title} className="rounded-xl border-l-4 overflow-hidden" style={{ borderColor: r.border, backgroundColor: colors.cardBg, borderRight: `1px solid ${colors.cardBorder}`, borderTop: `1px solid ${colors.cardBorder}`, borderBottom: `1px solid ${colors.cardBorder}` }}>
                <div className="p-6">
                  <h3 className="text-[16px] font-bold mb-5" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{r.title}</h3>
                  <div className="space-y-3">
                    {r.bullets.map((b, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: r.border }} />
                        <p className="text-[13px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorksSection colors={colors} />
      <DifferenceSection colors={colors} />
      <CategoriesSection colors={colors} />

      {/* GOVERNANCE (dark section) */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.heroFrom}, ${colors.heroTo})` }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-[700px] mx-auto text-center">
          <p className="text-[10.5px] uppercase tracking-[0.08em] font-bold mb-3" style={{ fontFamily: colors.titleFont, color: colors.heroBullet }}>Governance</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.02em] mb-6" style={{ fontFamily: colors.titleFont, color: colors.heroHeading }}>
            Governance + client-safe controls
          </h2>
          <p className="text-[15px] leading-relaxed mb-10" style={{ fontFamily: colors.bodyFont, color: colors.heroSub }}>
            Flag missed approvals and skipped steps, then share through restricted client portals with redaction and access controls, always backed by verifiable timestamps.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Methodology flags: 2 pending', 'Client portal: restricted access', 'Every claim: timestamp-verifiable'].map(p => (
              <span key={p} className="px-4 py-2 text-[12px] rounded-full border" style={{ fontFamily: colors.monoFont, color: colors.heroHeading, borderColor: colors.heroGhostBorder, backgroundColor: colors.heroBadgeBg }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      <BuiltForSection colors={colors} />
      <MCPSection colors={colors} />
      <SecuritySection colors={colors} />
      <FAQSection colors={colors} />
      <LaunchPerksSection colors={colors} />
      <CTASection colors={colors} title="Make every meeting produce valuable docs — AI-generated, proof-backed." sub="Humans confirm. Agents act." />
      <FooterSection colors={colors} />
    </main>
  )
}
