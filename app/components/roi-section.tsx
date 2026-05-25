'use client'

import { motion } from 'framer-motion'
import { TrendingUp, FileText, MessageSquareOff, Users } from 'lucide-react'

export default function ROISection() {
  const stats = [
    {
      icon: TrendingUp,
      metric: '1.4–1.8×',
      headline: 'More Projects Delivered',
      subtext: 'When onboarding is instant, docs are automated, and clients are self-sufficient — you get more velocity from the same team.',
    },
    {
      icon: FileText,
      metric: '50%',
      headline: 'Less Documentation Time',
      subtext: 'Stop writing, start governing. Generate contracts, SOPs, and PRDs from your project memory. Experts focus on delivery.',
    },
    {
      icon: MessageSquareOff,
      metric: '40%',
      headline: 'Fewer Support Tickets',
      subtext: 'Verifiable answers before clients create a ticket. Proactive governance, not reactive support.',
    },
    {
      icon: Users,
      metric: '70%',
      headline: 'Faster Onboarding',
      subtext: 'Give new hires the entire project memory on day one. AI agents answer their questions with timestamped proof.',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] mb-4">
            <span className="text-[12px] font-medium text-white/50 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            Measurable results from day one
          </h2>
          <p className="text-[15px] text-white/40 max-w-[520px] mx-auto" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
            See how teams are changing the way they deliver projects with AI-powered governance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-[800px] mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 h-full hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon className="w-4 h-4 text-white/30" />
                  <span className="text-[24px] font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.metric}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.headline}
                </h3>
                <p className="text-[13px] text-white/40 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
