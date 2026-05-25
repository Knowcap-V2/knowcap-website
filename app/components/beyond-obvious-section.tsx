'use client'

import { motion } from 'framer-motion'

export default function BeyondObviousSection() {
  return (
    <section className="py-16 md:py-20 bg-[#0A0A0A]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-10 text-center max-w-[700px] mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
            Knowcap doesn&apos;t just help you control projects.
          </h3>
          <p className="text-[16px] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
            It helps you build a smarter, more profitable team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
