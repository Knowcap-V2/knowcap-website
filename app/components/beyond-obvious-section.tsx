'use client'

import { motion } from 'framer-motion'

export default function BeyondObviousSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[#F5F4F1] border border-[#e5e5e5] rounded-xl p-10 text-center max-w-[700px] mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
            Knowcap doesn&apos;t just help you control projects.
          </h3>
          <p className="text-[16px] text-[#666]">
            It helps you build a smarter, more profitable team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
