'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const APP_URL = 'https://app.knowcap.ai'

export default function HeroSectionGeneral() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#18181B] to-[#0A0A0A]">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle gradient glow */}
      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-300px] left-[-200px] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 pt-28 pb-20 text-center relative z-10">
        <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[12px] text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
              Teams using Knowcap cut onboarding time by 70%
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Turn human claims into evidence{' '}
            <span className="text-white/50">your AI agents can learn from.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/50 max-w-[600px] mx-auto mb-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Capture meetings, voice notes, and chats. Promote the durable parts to evidence.
            Let agents act on what's verified — never on rumour.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] font-medium text-[14px] rounded-lg hover:bg-white/90 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.12] text-white/70 font-medium text-[14px] rounded-lg hover:border-white/[0.2] hover:text-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Log in
            </a>
          </div>

          {/* Bullet points */}
          <div className={`flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Bullet>Every fact confirmed by a named human</Bullet>
            <Bullet>Full audit trail for every AI action</Bullet>
            <Bullet>MCP server — wire Claude, Codex, or Gemini</Bullet>
          </div>
        </div>
      </div>
    </section>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <CheckCircle2 className="w-3.5 h-3.5 text-white/30 shrink-0" />
      <span>{children}</span>
    </div>
  )
}
