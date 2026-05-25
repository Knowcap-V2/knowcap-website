'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Users, FileCheck } from 'lucide-react'
import type { ThemeColors } from '@/components/theme-switcher'

const pillars = [
  { icon: Shield, headline: 'Your Data is Yours', subtext: 'We never train AI models on your private data.' },
  { icon: Lock, headline: 'Encrypted Everywhere', subtext: 'AES-256 at rest, TLS in transit.' },
  { icon: Users, headline: 'Granular Access Control', subtext: 'Role-based permissions for every asset.' },
  { icon: FileCheck, headline: 'Auditable Sharing', subtext: 'Permission-controlled links with audit logs.' },
]

export default function TrustSection({ colors }: { colors: ThemeColors }) {
  return (
    <section className="py-20 md:py-28 transition-colors duration-300" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
            <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: colors.mutedColor, fontFamily: "'Space Grotesk', sans-serif" }}>Security</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', color: colors.headingColor }}>Your projects, secured and governed</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
              <div className="rounded-xl p-6 h-full hover:shadow-md transition-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
                  <p.icon className="w-5 h-5" style={{ color: colors.bodyColor }} />
                </div>
                <h3 className="text-[14px] font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>{p.headline}</h3>
                <p className="text-[12.5px] leading-relaxed" style={{ color: colors.bodyColor }}>{p.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
