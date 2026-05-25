'use client'

import { Upload, Database, FileCheck, MessageSquare, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { ThemeColors } from '@/components/theme-switcher'

const APP_URL = 'https://app.knowcap.ai'

export default function HowItWorksSection({ colors }: { colors: ThemeColors }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const steps = [
    { number: 1, icon: Upload, headline: 'Ingest Every Project Asset', subtext: 'Upload PDFs, link websites, add YouTube videos, record your screen, or send a bot to your meetings.' },
    { number: 2, icon: Database, headline: 'Build Your Project Memory', subtext: 'Knowcap automatically interlinks all sources into a persistent, searchable memory.' },
    { number: 3, icon: FileCheck, headline: 'Generate & Govern with Proof', subtext: 'Instantly create contracts, SOPs, PRDs, and gap analyses — all backed by verifiable project memory.' },
    { number: 4, icon: MessageSquare, headline: 'Ask & Share Instantly', subtext: 'Spin up client-facing Smart Agents trained on your project memory. Every answer backed by the exact source.' },
  ]

  return (
    <section id="how-it-works" className="relative py-24 transition-colors duration-300" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
            <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: colors.mutedColor, fontFamily: "'Space Grotesk', sans-serif" }}>How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', color: colors.headingColor }}>From capture to proof</h2>
          <p className="text-[15px] max-w-[560px] mx-auto" style={{ lineHeight: 1.7, color: colors.bodyColor }}>A simple loop that turns all your project assets into a single, verifiable memory.</p>
        </div>

        <div className="space-y-4 max-w-[700px] mx-auto mb-14">
          {steps.map((step, i) => (
            <div key={step.number} className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="rounded-xl p-6 hover:shadow-md transition-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
                    <step.icon className="w-5 h-5" style={{ color: colors.bodyColor }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-bold tabular-nums" style={{ color: colors.mutedColor, fontFamily: "'Space Grotesk', sans-serif" }}>0{step.number}</span>
                      <h3 className="text-[16px] font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>{step.headline}</h3>
                    </div>
                    <p className="text-[13.5px] leading-relaxed" style={{ color: colors.bodyColor }}>{step.subtext}</p>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && <div className="flex justify-center py-1"><div className="w-px h-4" style={{ backgroundColor: colors.cardBorder }} /></div>}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href={`${APP_URL}/register`} className="inline-flex items-center gap-2 px-6 py-3 font-medium text-[14px] rounded-lg transition-colors" style={{ backgroundColor: colors.accentColor, color: 'white' }}>
            Try it free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
