'use client'

import Navbar from '@/components/navbar'
import { useThemeColors } from '@/components/theme-switcher'
import ABTracker from '@/components/ab-tracker'
import Image from 'next/image'
import Link from 'next/link'
import { HowItWorksSection, DifferenceSection, BuiltForSection, SecuritySection, CategoriesSection, MCPSection, FAQSection, LaunchPerksSection, CTASection, FooterSection } from '@/components/sections/shared'

const APP_URL = 'https://app.knowcap.ai'

export default function VersionB() {
  const [theme, colors, setTheme] = useThemeColors()
  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.pageBg, fontFamily: colors.bodyFont }}>
      <ABTracker variant="b" />
      <Navbar theme={theme} colors={colors} onThemeChange={setTheme} />

      {/* HERO — outcome-first */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.heroFrom}, ${colors.heroTo})` }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-[780px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ backgroundColor: colors.heroBadgeBg, border: `1px solid ${colors.heroBadgeBorder}` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px]" style={{ fontFamily: colors.monoFont, color: colors.heroBadgeText }}>MCP server for Claude, Codex & Gemini</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4.5vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-6" style={{ fontFamily: colors.titleFont, color: colors.heroHeadingDim }}>
            Your meetings become <span style={{ color: colors.accentColor }}>verified actions.</span>{' '}
            <span style={{ color: colors.heroHeading }}>Automatically.</span>
          </h1>
          <p className="text-[15px] max-w-[600px] mx-auto mb-10 leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.heroSub }}>
            Record meetings. Extract the important parts. Let a human confirm each one. Then let your agents act — on verified facts only.
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
            <a href={`${APP_URL}/register`} className="px-6 py-3 text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.heroBtnBg, color: colors.heroBtnText }}>Get Started Free →</a>
            <Link href="/book" className="px-6 py-3 text-[14px] font-medium rounded-lg border transition-colors" style={{ borderColor: colors.heroGhostBorder, color: colors.heroGhostText }}>Book a Demo</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[12px]" style={{ color: colors.heroBullet }}>
            <span>Record from Meet, Zoom, Teams, WhatsApp, Telegram, or Slack</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <span>AI extracts decisions, tasks, risks, facts, and people</span>
          </div>
        </div>
        <div className="relative max-w-[900px] mx-auto mt-16 px-6">
          <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl">
            <Image src="/screenshot-inbox-claims.png" alt="Knowcap Inbox" width={1440} height={900} className="w-full h-auto" priority />
          </div>
        </div>
      </section>

      {/* DEMO — Odoo PR in 80 seconds */}
      <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.08em] font-bold mb-3" style={{ fontFamily: colors.titleFont, color: colors.mutedColor }}>See It Work</p>
            <h2 className="text-[clamp(1.6rem,3vw,2rem)] font-bold leading-tight tracking-[-0.02em] mb-6" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>
              Meeting → confirmed scope change → Odoo PR. <span style={{ fontFamily: colors.monoFont, color: colors.accentColor }}>80 seconds.</span>
            </h2>
            <p className="text-[14px] leading-relaxed mb-4" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>
              Your client says "add the warehouse module to phase 2." Knowcap captures it, timestamps it, classifies it as a scope decision, and puts it in your inbox. You confirm with one tap. Before the meeting ends, an agent opens a PR on your Odoo SH repo — with the client's exact words quoted in the PR body.
            </p>
            <p className="text-[12px] leading-relaxed" style={{ color: colors.mutedColor }}>
              This is one workflow. Knowcap agents can draft emails, generate SOPs, update CRMs, build reports — all from verified meeting content.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: colors.cardBorder }}>
            <Image src="/screenshot-artifacts.png" alt="Auto-generated project artifacts" width={1440} height={900} className="w-full h-auto" />
          </div>
        </div>
      </section>

      <HowItWorksSection colors={colors} />
      <DifferenceSection colors={colors} />
      <CategoriesSection colors={colors} />
      <BuiltForSection colors={colors} />
      <MCPSection colors={colors} />
      <SecuritySection colors={colors} />
      <FAQSection colors={colors} />
      <LaunchPerksSection colors={colors} />
      <CTASection colors={colors} title="Stop letting your agents act on meeting notes nobody checked." sub="Humans confirm. Agents act." />
      <FooterSection colors={colors} />
    </main>
  )
}
