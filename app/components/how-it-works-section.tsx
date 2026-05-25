'use client'

import { Upload, Database, FileCheck, MessageSquare, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const APP_URL = 'https://app.knowcap.ai'

export default function HowItWorksSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const steps = [
    { number: 1, icon: Upload, headline: 'Ingest Every Project Asset', subtext: 'Upload PDFs, link websites, add YouTube videos, record your screen, or send a bot to your meetings. Every asset is ingested as a verifiable source.' },
    { number: 2, icon: Database, headline: 'Build Your Project Memory', subtext: 'Knowcap automatically interlinks all sources. Meetings, documents, videos, and workflows connected into a persistent, searchable memory.' },
    { number: 3, icon: FileCheck, headline: 'Generate & Govern with Proof', subtext: 'Instantly create any project document — from contracts and SOPs to PRDs and gap analyses — all backed by your verifiable project memory.' },
    { number: 4, icon: MessageSquare, headline: 'Ask & Share Instantly', subtext: 'Spin up client-facing Smart Agents trained on your complete project memory. Every answer backed by the exact clip, doc, or website source.' },
  ]

  return (
    <section id="how-it-works" className="relative py-24 bg-[#F5F4F1]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a]/[0.04] border border-[#1a1a1a]/[0.06] mb-4">
            <span className="text-[12px] font-medium text-[#666] uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#1a1a1a] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            From capture to proof
          </h2>
          <p className="text-[15px] text-[#666] max-w-[560px] mx-auto" style={{ lineHeight: 1.7 }}>
            A simple loop that turns all your project assets into a single, verifiable memory.
          </p>
        </div>

        <div className="space-y-4 max-w-[700px] mx-auto mb-14">
          {steps.map((step, index) => (
            <div key={step.number} className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F4F1] border border-[#e5e5e5] flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-[#666]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-bold text-[#ccc] tabular-nums" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0{step.number}</span>
                      <h3 className="text-[16px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{step.headline}</h3>
                    </div>
                    <p className="text-[13.5px] text-[#666] leading-relaxed">{step.subtext}</p>
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && <div className="flex justify-center py-1"><div className="w-px h-4 bg-[#e5e5e5]" /></div>}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href={`${APP_URL}/register`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white font-medium text-[14px] rounded-lg hover:bg-[#333] transition-colors">
            Try it free <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
