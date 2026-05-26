'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { ThemeColors } from '@/components/theme-switcher'

const APP_URL = 'https://app.knowcap.ai'

function Eyebrow({ children, colors }: { children: React.ReactNode; colors: ThemeColors }) {
  return <p className="text-[10.5px] uppercase tracking-[0.08em] font-bold mb-3" style={{ fontFamily: colors.titleFont, color: colors.mutedColor }}>{children}</p>
}

function SectionTitle({ children, colors }: { children: React.ReactNode; colors: ThemeColors }) {
  return <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.02em] mb-4" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{children}</h2>
}

/* ── How It Works (4 steps) ── */
export function HowItWorksSection({ colors }: { colors: ThemeColors }) {
  const steps = [
    { n: '01', t: 'Record', d: 'Send Knowcap to your Google Meet, Zoom, or Teams call. Or upload a recording, a WhatsApp voice note, a Telegram chat, a Slack thread, a PDF, or a URL. Everything gets timestamped to the second.' },
    { n: '02', t: 'Extract', d: 'AI reads the full source and pulls out five categories: decisions made, tasks assigned, risks flagged, facts stated, and people involved. Each one arrives in your inbox as a claim — extracted but not yet verified.' },
    { n: '03', t: 'Confirm', d: 'Your inbox shows every claim from every source. One tap to confirm, one tap to reject. The ones you confirm become evidence — the verified knowledge your team and agents can trust.' },
    { n: '04', t: 'Act', d: 'Your agents draft emails, generate reports, update your CRM, or open code PRs — using only the facts a human confirmed. Every output links back to a name and a timestamp.' },
  ]
  const imgs = ['/screenshot-source-view.png', '/screenshot-inbox-claims.png', '/screenshot-confirm-action.png', '/screenshot-artifacts.png']
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[1100px] mx-auto">
        <Eyebrow colors={colors}>How It Works</Eyebrow>
        <SectionTitle colors={colors}>Record. Extract. Confirm. Act.</SectionTitle>
        <p className="text-[15px] leading-relaxed mb-14 max-w-[560px]" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>By the time a meeting ends, every important statement is ready for your review.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s, i) => (
            <div key={s.n} className="rounded-xl border overflow-hidden hover:shadow-md transition-shadow" style={{ backgroundColor: colors.pageBg, borderColor: colors.cardBorder }}>
              <Image src={imgs[i]} alt={s.t} width={1440} height={900} className="w-full h-auto" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[13px] font-semibold" style={{ fontFamily: colors.monoFont, color: colors.accentColor }}>{s.n}</span>
                  <h3 className="text-[15px] font-semibold" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{s.t}</h3>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── What Makes Knowcap Different (3 cards) ── */
export function DifferenceSection({ colors }: { colors: ThemeColors }) {
  const cards = [
    { t: 'Human-confirmed facts', d: 'Every statement extracted from a meeting stays a "claim" until a named human confirms it. Only then does it become evidence your agents can use.', img: '/screenshot-confirm-action.png' },
    { t: 'Timestamped to the second', d: 'Every fact links to the exact moment in the recording. Click the timestamp, hear what was actually said. No more "I think someone mentioned..."', img: '/screenshot-source-view.png' },
    { t: 'Cross-org confirmation', d: 'When your client confirms a scope decision from their own Knowcap account, you have a two-sided receipt. Both parties attested. Scope disputes end before they start.', img: '/screenshot-project-memories.png' },
  ]
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[1100px] mx-auto">
        <Eyebrow colors={colors}>Why Knowcap</Eyebrow>
        <SectionTitle colors={colors}>Other tools record meetings. Knowcap makes sure what comes out of them is true.</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {cards.map(c => (
            <div key={c.t} className="rounded-xl border overflow-hidden hover:shadow-md transition-shadow" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
              <Image src={c.img} alt={c.t} width={1440} height={900} className="w-full h-auto" />
              <div className="p-6">
                <h3 className="text-[15px] font-semibold mb-3" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{c.t}</h3>
                <p className="text-[13px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Built For (3 personas) ── */
export function BuiltForSection({ colors }: { colors: ThemeColors }) {
  const personas = [
    { label: 'Odoo Partners', t: 'Stop scope creep at the source', d: 'Every scope decision confirmed by both sides. When there\'s a dispute, there\'s a receipt — timestamped, signed by both parties. The PR writes itself.' },
    { label: 'Agencies', t: 'Half of scope creep starts with "but we agreed to..."', d: 'Knowcap gives both sides a shared record of every decision — confirmed, signed, searchable. No more digging through meeting notes.' },
    { label: 'Founders', t: 'One brain across all your companies', d: 'Monday\'s decision at Company A contradicts Thursday\'s promise at Company B. Knowcap tracks every decision across every org, each confirmed and searchable.' },
  ]
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[1100px] mx-auto">
        <Eyebrow colors={colors}>Built For</Eyebrow>
        <SectionTitle colors={colors}>Teams where getting it wrong costs real money</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {personas.map(p => (
            <div key={p.label} className="p-6 rounded-xl border hover:shadow-md transition-shadow" style={{ backgroundColor: colors.pageBg, borderColor: colors.cardBorder }}>
              <span className="inline-block text-[10px] uppercase tracking-[0.06em] font-bold px-2.5 py-1 rounded-full mb-4" style={{ fontFamily: colors.monoFont, color: colors.accentColor, backgroundColor: colors.iconBg, border: `1px solid ${colors.accentColor}30` }}>{p.label}</span>
              <h3 className="text-[15px] font-semibold mb-3" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{p.t}</h3>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Security (constant across all versions) ── */
export function SecuritySection({ colors }: { colors: ThemeColors }) {
  const pillars = [
    { t: 'Your data stays yours', d: 'We never train AI models on your recordings or documents.' },
    { t: 'Encrypted everywhere', d: 'AES-256 at rest, TLS in transit. Every byte protected.' },
    { t: 'Role-based access', d: 'Granular permissions for every source, project, and artifact.' },
    { t: 'Full audit trail', d: 'Every confirmed fact and every agent action is logged with a name and timestamp.' },
  ]
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[1100px] mx-auto">
        <Eyebrow colors={colors}>Security</Eyebrow>
        <SectionTitle colors={colors}>Built for teams that answer to regulators</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pillars.map(p => (
            <div key={p.t} className="p-6 rounded-xl border text-center hover:shadow-md transition-shadow" style={{ backgroundColor: colors.cardBg, borderColor: colors.cardBorder }}>
              <h3 className="text-[14px] font-semibold mb-2" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{p.t}</h3>
              <p className="text-[12.5px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Five Categories ── */
export function CategoriesSection({ colors }: { colors: ThemeColors }) {
  const cats = [
    { dot: '#1F6B3A', label: 'Facts', d: 'Verifiable statements — numbers, names, dates, specifications' },
    { dot: '#9B1D1D', label: 'Risks', d: 'Threats, delays, blockers, objections — flagged before the meeting ends' },
    { dot: '#4A2FA8', label: 'Decisions', d: 'Choices made, directions locked, commitments given — with who said it' },
    { dot: '#1B4F8F', label: 'Tasks', d: 'Work assigned, actions required, deadlines — with owner and due date' },
    { dot: '#8A5A12', label: 'People', d: 'Individuals and organizations referenced — sentiment tracked across meetings' },
  ]
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[1100px] mx-auto">
        <Eyebrow colors={colors}>What Knowcap Extracts</Eyebrow>
        <SectionTitle colors={colors}>Every statement classified into five categories</SectionTitle>
        <p className="text-[15px] leading-relaxed mb-10 max-w-[560px]" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>From every meeting, recording, chat, or document — AI pulls out what matters.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cats.map(c => (
            <div key={c.label} className="p-5 rounded-xl border" style={{ backgroundColor: colors.pageBg, borderColor: colors.cardBorder }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.dot }} />
                <span className="text-[13px] font-semibold" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{c.label}</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-xl overflow-hidden border shadow-lg" style={{ borderColor: colors.cardBorder }}>
          <Image src="/screenshot-project-memories.png" alt="Claims with category pills" width={1440} height={900} className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}

/* ── MCP / Developer ── */
export function MCPSection({ colors }: { colors: ThemeColors }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[780px] mx-auto">
        <Eyebrow colors={colors}>For Developers</Eyebrow>
        <SectionTitle colors={colors}>Give your agents a source of truth</SectionTitle>
        <p className="text-[15px] leading-relaxed mb-10" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>
          Every Knowcap org gets an MCP server. Your AI agents — Claude, Codex, Gemini, or anything MCP-compatible — query verified facts instead of raw transcripts.
        </p>
        <div className="rounded-xl p-8 overflow-x-auto" style={{ backgroundColor: colors.isDark ? colors.cardBg : '#18181B', border: colors.isDark ? `1px solid ${colors.cardBorder}` : 'none' }}>
          <pre className="text-[13px] leading-[1.8]" style={{ fontFamily: colors.monoFont }}>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>{'// Only returns facts a human confirmed'}</span>{'\n'}
            <span style={{ color: '#58A6FF' }}>search_memories</span>{'({'}{'\n'}
            {'  '}<span style={{ color: '#58A6FF' }}>query</span>{': '}<span style={{ color: '#4ade80' }}>{'"What scope changes did the client agree to?"'}</span>{','}{'\n'}
            {'  '}<span style={{ color: '#58A6FF' }}>verification_strictness</span>{': '}<span style={{ color: '#4ade80' }}>{'"human_only"'}</span>{'\n'}
            {'})'}
          </pre>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ── */
export function FAQSection({ colors }: { colors: ThemeColors }) {
  const faqs = [
    { q: 'Is this just another meeting note-taker?', a: 'No. Typical tools are audio-only and session-based. Knowcap understands what\'s on your screen, links every claim to its timestamp, and maintains memory across the project. Your agents act on confirmed facts — not raw transcripts.' },
    { q: 'How do you prevent hallucinations?', a: 'Every AI extraction starts as a "claim." It stays a claim until a human confirms it. Your agents never touch unverified data. The one-tap review makes this fast, not painful.' },
    { q: 'What integrations do you support?', a: 'Google Meet, Zoom, Teams for live meetings. WhatsApp, Telegram, Slack for async. Upload PDFs, URLs, or any recording. MCP server for Claude, Codex, and Gemini.' },
    { q: 'Can my client see the project?', a: 'Yes. Share restricted client portals with redacted access. They see only what you allow, always backed by timestamps. Both sides can confirm shared decisions.' },
  ]
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[700px] mx-auto">
        <Eyebrow colors={colors}>FAQ</Eyebrow>
        <SectionTitle colors={colors}>Proof-first product, straightforward answers.</SectionTitle>
        <div className="mt-10 space-y-4">
          {faqs.map(f => (
            <div key={f.q} className="rounded-xl border p-6" style={{ backgroundColor: colors.pageBg, borderColor: colors.cardBorder }}>
              <h3 className="text-[14px] font-semibold mb-3" style={{ fontFamily: colors.titleFont, color: colors.headingColor }}>{f.q}</h3>
              <p className="text-[13px] leading-relaxed" style={{ fontFamily: colors.bodyFont, color: colors.bodyColor }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Launch Perks ── */
export function LaunchPerksSection({ colors }: { colors: ThemeColors }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[600px] mx-auto">
        <Eyebrow colors={colors}>Early Access</Eyebrow>
        <SectionTitle colors={colors}>Launch perks (limited)</SectionTitle>
        <div className="mt-8 p-8 rounded-xl border-l-4" style={{ backgroundColor: colors.cardBg, borderColor: colors.accentColor, borderRight: `1px solid ${colors.cardBorder}`, borderTop: `1px solid ${colors.cardBorder}`, borderBottom: `1px solid ${colors.cardBorder}` }}>
          <div className="space-y-5">
            {['Bonus credits for early users', 'Founding plan price hold through beta', 'Priority onboarding for ERP/CRM implementers'].map(p => (
              <p key={p} className="text-[15px] font-semibold" style={{ fontFamily: colors.titleFont, color: colors.accentColor }}>{p}</p>
            ))}
          </div>
          <p className="text-[12px] mt-6" style={{ color: colors.mutedColor }}>*Pricing subject to change during PMF.</p>
        </div>
      </div>
    </section>
  )
}

/* ── Bottom CTA ── */
export function CTASection({ colors, title, sub }: { colors: ThemeColors; title: string; sub: string }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.heroFrom}, ${colors.heroTo})` }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative max-w-[680px] mx-auto text-center">
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.02em] mb-4" style={{ fontFamily: colors.titleFont, color: colors.heroHeading }}>{title}</h2>
        <p className="text-[15px] mb-10" style={{ fontFamily: colors.monoFont, color: colors.heroSub }}>{sub}</p>
        <div className="flex items-center justify-center gap-4">
          <a href={`${APP_URL}/register`} className="px-6 py-3 text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.heroBtnBg, color: colors.heroBtnText }}>Get Started Free →</a>
          <Link href="/book" className="px-6 py-3 text-[14px] font-medium rounded-lg border transition-colors" style={{ borderColor: colors.heroGhostBorder, color: colors.heroGhostText }}>Book a Demo</Link>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
export function FooterSection({ colors }: { colors: ThemeColors }) {
  return (
    <footer className="py-8 px-6" style={{ backgroundColor: colors.isDark ? colors.cardBg : '#0A0A0A', borderTop: `1px solid ${colors.isDark ? colors.cardBorder : 'rgba(255,255,255,0.06)'}` }}>
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: colors.monoFont }}>Knowcap © 2026</p>
        <div className="flex gap-6">
          <Link href="/policy" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Terms</Link>
          <a href="https://docs.knowcap.ai" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Docs</a>
        </div>
      </div>
    </footer>
  )
}
