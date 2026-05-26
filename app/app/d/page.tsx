'use client'

import Navbar from '@/components/navbar'
import { useThemeColors } from '@/components/theme-switcher'
import ABTracker from '@/components/ab-tracker'
import Image from 'next/image'
import Link from 'next/link'
import { HowItWorksSection, DifferenceSection, BuiltForSection, SecuritySection, CategoriesSection, MCPSection, FAQSection, LaunchPerksSection, CTASection, FooterSection } from '@/components/sections/shared'

const APP_URL = 'https://app.knowcap.ai'

export default function VersionD() {
  const [theme, colors, setTheme] = useThemeColors()
  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.pageBg, fontFamily: colors.bodyFont }}>
      <ABTracker variant="d" />
      <Navbar theme={theme} colors={colors} onThemeChange={setTheme} />

      {/* HERO — show-the-magic */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.heroFrom}, ${colors.heroTo})` }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-[800px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ backgroundColor: colors.heroBadgeBg, border: `1px solid ${colors.heroBadgeBorder}` }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px]" style={{ fontFamily: colors.monoFont, color: colors.heroBadgeText }}>MCP server for Claude, Codex & Gemini</span>
          </div>
          <h1 className="text-[clamp(2rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-3" style={{ fontFamily: colors.titleFont, color: colors.heroHeading }}>
            Your meeting just flagged a risk, drafted 3 mitigations, and contacted an alternate supplier.
          </h1>
          <p className="text-[clamp(1.4rem,3vw,2rem)] font-bold mb-8" style={{ fontFamily: colors.monoFont, color: colors.accentColor }}>Before it ended.</p>
          <p className="text-[15px] max-w-[580px] mx-auto mb-10 leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.heroSub }}>
            Knowcap records your meetings, extracts every decision, task, and risk — then your agents take action on confirmed facts. Automatically.
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

      {/* ESCALATION DEMO — L1/L2/L3 */}
      <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
        <div className="max-w-[780px] mx-auto">
          <p className="text-[10.5px] uppercase tracking-[0.08em] font-bold mb-3" style={{ fontFamily: colors.titleFont, color: colors.mutedColor }}>What Happens After Your Meeting</p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.02em] mb-12" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>Three levels of agent action</h2>
          <div className="space-y-4">
            {[
              { level: 'Level 1', label: 'Get notified', color: '#1F6B3A', d: 'A supplier mentions a probable delay in the meeting. By the time the meeting ends, you already know — Knowcap flagged the risk, classified it, and put it in your inbox. You confirmed it with one tap.' },
              { level: 'Level 2', label: 'Get a research report', color: '#1B4F8F', d: 'Knowcap spins up a research agent. It goes online, finds how similar risks were mitigated across comparable projects, and comes back with a formatted report — PDF, email, Telegram, WhatsApp, Slack. Your choice. You review before it sends.' },
              { level: 'Level 3', label: 'The agent handles it', color: '#4A2FA8', d: 'The agent contacts 5 alternative suppliers via WhatsApp. Checks lead times. Compares prices. Drafts a purchase order amendment on your ERP. Opens a PR with the scope change quoted in the body. All before you approve the final action.' },
            ].map((l, i) => (
              <div key={l.level} className="rounded-xl border-l-4 p-6" style={{ marginLeft: i * 16, borderColor: l.color, backgroundColor: colors.cardBg, borderRight: `1px solid ${colors.cardBorder}`, borderTop: `1px solid ${colors.cardBorder}`, borderBottom: `1px solid ${colors.cardBorder}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: colors.monoFont, color: l.color }}>{l.level}</span>
                  <span className="text-[15px] font-semibold" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{l.label}</span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{l.d}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] mt-6 text-center" style={{ color: colors.mutedColor }}>Every level requires your confirmation. The AI proposes. You approve. Nothing goes out unchecked.</p>
        </div>
      </section>

      <CategoriesSection colors={colors} />
      <HowItWorksSection colors={colors} />
      <DifferenceSection colors={colors} />
      <BuiltForSection colors={colors} />
      <MCPSection colors={colors} />
      <SecuritySection colors={colors} />
      <FAQSection colors={colors} />
      <LaunchPerksSection colors={colors} />
      <CTASection colors={colors} title="Your AI should act on truth, not guesses." sub="Humans confirm. Agents act." />
      <FooterSection colors={colors} />
    </main>
  )
}
