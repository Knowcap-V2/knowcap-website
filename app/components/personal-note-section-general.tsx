'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const APP_URL = 'https://app.knowcap.ai'

export default function PersonalNoteSectionGeneral() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#18181B] to-[#0A0A0A]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-[700px] mx-auto px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
            Ready to build on evidence,{' '}
            <span className="text-white/40">not memory?</span>
          </h2>
          <p className="text-[15px] text-white/40 mb-10 max-w-[500px] mx-auto" style={{ lineHeight: 1.7 }}>
            Free to start. No credit card. Your team's knowledge becomes verified, searchable, and actionable.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a href={`${APP_URL}/register`} className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#0A0A0A] font-medium text-[14px] rounded-lg hover:bg-white/90 transition-colors">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/book" className="inline-flex items-center gap-2 px-7 py-3 border border-white/[0.12] text-white/60 font-medium text-[14px] rounded-lg hover:border-white/[0.2] hover:text-white transition-colors">
              Book a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
