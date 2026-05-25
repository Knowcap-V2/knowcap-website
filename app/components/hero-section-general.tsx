'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const APP_URL = 'https://app.knowcap.ai'

export default function HeroSectionGeneral() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#18181B] to-[#0A0A0A]">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 pt-28 pb-16 relative z-10">
        <div className={`text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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

          <p
            className="text-white/50 max-w-[600px] mx-auto mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            Capture meetings, voice notes, and chats. Promote the durable parts to evidence.
            Let agents act on what's verified — never on rumour.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] font-medium text-[14px] rounded-lg hover:bg-white/90 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.12] text-white/70 font-medium text-[14px] rounded-lg hover:border-white/[0.2] hover:text-white transition-colors"
            >
              Log in
            </a>
          </div>

          {/* Bullet points */}
          <div className={`flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 mb-12 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Bullet>Every fact confirmed by a named human</Bullet>
            <Bullet>Full audit trail for every AI action</Bullet>
            <Bullet>MCP server — wire Claude, Codex, or Gemini</Bullet>
          </div>
        </div>

        {/* App screenshot */}
        <div className={`max-w-[900px] mx-auto transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl">
            <Image
              src="/screenshot-inbox.png"
              alt="Knowcap Dashboard — Project sources, AI chat, and artifacts"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] text-white/50">
      <CheckCircle2 className="w-3.5 h-3.5 text-white/30 shrink-0" />
      <span>{children}</span>
    </div>
  )
}
