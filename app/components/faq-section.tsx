'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { ThemeColors } from '@/components/theme-switcher'

const faqs = [
  { question: 'What is Knowcap?', answer: 'Knowcap is the trust layer for AI agents. It ingests all your project assets — meetings, screen recordings, documents, and websites — to create a single, verifiable, and searchable project memory.' },
  { question: 'Can Knowcap join confidential meetings?', answer: 'Yes, and you have total control. You can invite Knowcap as a full participant, audio-only, or transcript-only mode.' },
  { question: 'What tools does Knowcap integrate with?', answer: 'Knowcap includes an MCP server out of the box — wire Claude, Codex, Gemini, or any MCP-compatible agent directly. Odoo integration is live, with Jira, Asana, and ClickUp on our roadmap.' },
  { question: 'Can I share projects with clients?', answer: 'Yes. Share entire projects or specific assets, all managed by role-based permissions with full audit logs.' },
]

export default function FAQSection({ colors }: { colors: ThemeColors }) {
  return (
    <section className="py-20 md:py-28 transition-colors duration-300" style={{ backgroundColor: colors.cardBg }}>
      <div className="max-w-[700px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em', color: colors.headingColor }}>FAQ</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl px-5 overflow-hidden" style={{ backgroundColor: colors.pageBg, border: `1px solid ${colors.cardBorder}` }}>
                <AccordionTrigger className="text-left text-[15px] font-medium hover:no-underline py-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[13.5px] pb-5 leading-relaxed" style={{ color: colors.bodyColor }}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
