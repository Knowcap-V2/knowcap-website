'use client'

import { Radio, FileCheck, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FeaturesContextSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: Radio,
      title: 'Capture with Context',
      description: 'Send Knowcap to any meeting or screen session. It listens, watches, and understands — automatically linking every spoken word and on-screen action to its source.',
      image: '/dashboard1.png',
    },
    {
      icon: Search,
      title: 'Answer with Proof',
      description: 'Ask any question and get an instant answer with a direct link to the exact, verified moment in the recording.',
      image: '/dashboard2.png',
    },
    {
      icon: FileCheck,
      title: 'Audit Any Deliverable',
      description: 'All generated PRDs, SOPs, and guides include timestamp citations and embedded clips, so every deliverable can be trusted and verified.',
      image: '/dashboard3.png',
    },
  ]

  return (
    <section id="features" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a]/[0.04] border border-[#1a1a1a]/[0.06] mb-4">
            <span className="text-[12px] font-medium text-[#666] uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#1a1a1a] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            Run projects on proof,{' '}
            <span className="text-[#999]">not memory</span>
          </h2>
          <p className="text-[15px] text-[#666] max-w-[560px] mx-auto" style={{ lineHeight: 1.7 }}>
            Every insight linked to its source. Validate, audit, and share with timestamped proof.
          </p>
        </div>

        {/* Feature rows */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="relative rounded-xl overflow-hidden border border-[#e5e5e5] shadow-lg">
                    <Image src={feature.image} alt={`${feature.title} — Knowcap UI`} width={1920} height={1080} className="w-full h-auto" />
                  </div>
                  <FeatureContent icon={feature.icon} title={feature.title} description={feature.description} />
                </>
              ) : (
                <>
                  <FeatureContent icon={feature.icon} title={feature.title} description={feature.description} />
                  <div className="relative rounded-xl overflow-hidden border border-[#e5e5e5] shadow-lg">
                    <Image src={feature.image} alt={`${feature.title} — Knowcap UI`} width={1920} height={1080} className="w-full h-auto" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureContent({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-[#F5F4F1] rounded-lg flex items-center justify-center border border-[#e5e5e5]">
          <Icon className="w-4 h-4 text-[#666]" />
        </div>
        <h3 className="text-[20px] font-bold text-[#1a1a1a]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h3>
      </div>
      <p className="text-[14px] text-[#666] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
