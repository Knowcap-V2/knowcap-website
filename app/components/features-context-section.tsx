'use client'

import { Radio, FileCheck, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { ThemeColors } from '@/components/theme-switcher'

export default function FeaturesContextSection({ colors }: { colors: ThemeColors }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const features = [
    { icon: Radio, title: 'Capture with Context', description: 'Send Knowcap to any meeting or screen session. It listens, watches, and understands — automatically linking every spoken word and on-screen action to its source.', image: '/screenshot-inbox.png' },
    { icon: Search, title: 'Answer with Proof', description: 'Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording.', image: '/screenshot-dashboard.png' },
    { icon: FileCheck, title: 'Audit Any Deliverable', description: 'All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted and verified.', image: '/screenshot-projects.png' },
  ]

  return (
    <section id="features" className="relative py-24 md:py-32 transition-colors duration-300" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
            <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: colors.mutedColor, fontFamily: "'Space Grotesk', sans-serif" }}>Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', color: colors.headingColor }}>
            Run projects on proof, <span style={{ color: colors.mutedColor }}>not memory</span>
          </h2>
          <p className="text-[15px] max-w-[560px] mx-auto" style={{ lineHeight: 1.7, color: colors.bodyColor }}>
            Every insight linked to its source. Validate, audit, and share with timestamped proof.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((f, i) => (
            <div key={f.title} className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              {i % 2 === 0 ? (<><Img src={f.image} alt={f.title} border={colors.cardBorder} /><Content icon={f.icon} title={f.title} desc={f.description} colors={colors} /></>) : (<><Content icon={f.icon} title={f.title} desc={f.description} colors={colors} /><Img src={f.image} alt={f.title} border={colors.cardBorder} /></>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Img({ src, alt, border }: { src: string; alt: string; border: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ border: `1px solid ${border}` }}>
      <Image src={src} alt={`${alt} — Knowcap UI`} width={1920} height={1080} className="w-full h-auto" />
    </div>
  )
}

function Content({ icon: Icon, title, desc, colors }: { icon: any; title: string; desc: string; colors: ThemeColors }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
          <Icon className="w-4 h-4" style={{ color: colors.bodyColor }} />
        </div>
        <h3 className="text-[20px] font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>{title}</h3>
      </div>
      <p className="text-[14px] leading-relaxed" style={{ color: colors.bodyColor }}>{desc}</p>
    </div>
  )
}
