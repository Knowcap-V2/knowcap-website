'use client'

import { Upload, Database, FileCheck, MessageSquare, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const APP_URL = 'https://app.knowcap.ai'

export default function HowItWorksSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const steps = [
    {
      number: 1,
      icon: Upload,
      headline: 'Ingest Every Project Asset',
      subtext: 'Connect Knowcap to your project. Upload PDFs, link websites, add YouTube videos, record your screen, or send a bot to your meetings. Every asset is ingested as a verifiable source.',
    },
    {
      number: 2,
      icon: Database,
      headline: 'Build Your Project Memory',
      subtext: 'Knowcap automatically interlinks all these sources. Meetings, documents, videos, and workflows are connected into a persistent, searchable memory, with decisions cross-referenced instantly.',
    },
    {
      number: 3,
      icon: FileCheck,
      headline: 'Generate & Govern with Proof',
      subtext: 'Instantly create any project document — from contracts and SOPs to PRDs and gap analyses — all backed by your verifiable project memory.',
    },
    {
      number: 4,
      icon: MessageSquare,
      headline: 'Ask & Share Instantly',
      subtext: 'Spin up client-facing Smart Agents trained on your complete project memory. Every answer comes backed by the exact clip, doc, or website source.',
    },
  ]

  return (
    <section id="how-it-works" className="relative py-24 bg-[#111114] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] mb-4">
            <span className="text-[12px] font-medium text-white/50 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            From capture to proof
          </h2>
          <p className="text-[15px] text-white/40 max-w-[560px] mx-auto" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
            A simple loop that turns all your project assets into a single, verifiable memory.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5 max-w-[700px] mx-auto mb-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.05] transition-colors">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-white/40" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-bold text-white/20 tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        0{step.number}
                      </span>
                      <h3 className="text-[16px] font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {step.headline}
                      </h3>
                    </div>
                    <p className="text-[13.5px] text-white/40 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {step.subtext}
                    </p>
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-white/[0.06]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] font-medium text-[14px] rounded-lg hover:bg-white/90 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Try it free
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
