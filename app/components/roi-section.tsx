'use client'

import { motion } from 'framer-motion'
import { TrendingUp, FileText, MessageSquareOff, Users } from 'lucide-react'
import type { ThemeColors } from '@/components/theme-switcher'

export default function ROISection({ colors }: { colors: ThemeColors }) {
  const stats = [
    { icon: TrendingUp, metric: '1.4–1.8×', headline: 'More Projects Delivered', subtext: 'Instant onboarding, automated docs, self-sufficient clients — more velocity from the same team.' },
    { icon: FileText, metric: '50%', headline: 'Less Documentation Time', subtext: 'Generate contracts, SOPs, and PRDs from your project memory.' },
    { icon: MessageSquareOff, metric: '40%', headline: 'Fewer Support Tickets', subtext: 'Verifiable answers before clients create a ticket.' },
    { icon: Users, metric: '70%', headline: 'Faster Onboarding', subtext: 'Give new hires the entire project memory on day one.' },
  ]

  return (
    <section className="py-20 md:py-28 transition-colors duration-300" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ backgroundColor: colors.iconBg, border: `1px solid ${colors.cardBorder}` }}>
            <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: colors.mutedColor, fontFamily: "'Space Grotesk', sans-serif" }}>Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', color: colors.headingColor }}>Measurable results from day one</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-[800px] mx-auto">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <div className="rounded-xl p-6 h-full hover:shadow-md transition-shadow" style={{ backgroundColor: colors.pageBg, border: `1px solid ${colors.cardBorder}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <s.icon className="w-4 h-4" style={{ color: colors.mutedColor }} />
                  <span className="text-[24px] font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>{s.metric}</span>
                </div>
                <h3 className="text-[15px] font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>{s.headline}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: colors.bodyColor }}>{s.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
