'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function BetaTestimonialsSection() {
  const testimonials = [
    {
      quote: 'Knowcap cut our support tickets by 40% after implementation.',
      author: 'Ibrahim Abed',
      title: 'Plementus (Egypt)',
    },
    {
      quote: 'AI-generated PRDs reduced documentation time by half.',
      author: 'Mohamed Jamal',
      title: 'BI Solutions (KSA)',
    },
    {
      quote: 'Our teams stopped re-explaining projects to new members. Onboarding now takes minutes.',
      author: 'Ariika Tech Team',
      title: 'Odoo Implementation Partner',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-[#111114]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>
            What teams are saying
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-[900px] mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 h-full flex flex-col hover:bg-white/[0.05] transition-colors">
                <Quote className="w-5 h-5 text-white/20 mb-4" />
                <p className="text-[14px] text-white/70 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "'Inter', sans-serif" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-[13px] font-medium text-white/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{t.author}</p>
                  <p className="text-[12px] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
