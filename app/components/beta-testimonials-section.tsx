'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { ThemeColors } from '@/components/theme-switcher'

export default function BetaTestimonialsSection({ colors }: { colors: ThemeColors }) {
  const testimonials = [
    { quote: 'Knowcap cut our support tickets by 40% after implementation.', author: 'Ibrahim Abed', title: 'Plementus (Egypt)' },
    { quote: 'AI-generated PRDs reduced documentation time by half.', author: 'Mohamed Jamal', title: 'BI Solutions (KSA)' },
    { quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.', author: 'Ariika Tech Team', title: 'Odoo Implementation Partner' },
  ]

  return (
    <section className="py-20 md:py-28 transition-colors duration-300" style={{ backgroundColor: colors.pageBg }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', color: colors.headingColor }}>What teams are saying</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="rounded-xl p-6 h-full flex flex-col hover:shadow-md transition-shadow" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
                <Quote className="w-5 h-5 mb-4" style={{ color: colors.mutedColor }} />
                <p className="text-[14px] leading-relaxed mb-6 flex-grow" style={{ color: colors.bodyColor }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-4" style={{ borderTop: `1px solid ${colors.cardBorder}` }}>
                  <p className="text-[13px] font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>{t.author}</p>
                  <p className="text-[12px]" style={{ color: colors.mutedColor }}>{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
