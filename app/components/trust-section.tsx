'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Users, FileCheck } from 'lucide-react'

const trustPillars = [
  { icon: Shield, headline: 'Your Data is Yours', subtext: 'We never train our AI models on your private project data. All assets and artifacts are yours alone.' },
  { icon: Lock, headline: 'Encrypted Everywhere', subtext: 'AES-256 encryption at rest, TLS in transit. Industry-standard protection for every file.' },
  { icon: Users, headline: 'Granular Access Control', subtext: 'Role-based permissions. Manage who can see, edit, or share — from a single file to an entire project.' },
  { icon: FileCheck, headline: 'Auditable Sharing', subtext: 'Permission-controlled links with full audit logs. See who accessed what, and when.' },
]

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F5F4F1]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#1a1a1a]/[0.04] border border-[#1a1a1a]/[0.06] mb-4">
            <span className="text-[12px] font-medium text-[#666] uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Security</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#1a1a1a] mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            Your projects, secured and governed
          </h2>
          <p className="text-[15px] text-[#666] max-w-[480px] mx-auto" style={{ lineHeight: 1.7 }}>
            Security and control aren&apos;t features — they&apos;re our foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((pillar, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="text-center">
              <div className="bg-white border border-[#e5e5e5] rounded-xl p-6 h-full hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#F5F4F1] border border-[#e5e5e5] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <pillar.icon className="w-5 h-5 text-[#666]" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#1a1a1a] mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pillar.headline}</h3>
                <p className="text-[12.5px] text-[#666] leading-relaxed">{pillar.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
