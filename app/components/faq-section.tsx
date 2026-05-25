'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  { question: 'What is Knowcap?', answer: 'Knowcap is the trust layer for AI agents. It ingests all your project assets — meetings, screen recordings, documents, and websites — to create a single, verifiable, and searchable project memory. Every fact is confirmed by a named human before agents can act on it.' },
  { question: 'Can Knowcap join confidential meetings?', answer: 'Yes, and you have total control. You can invite Knowcap as a full participant (video + audio), as an audio-only bot, or restrict it to transcript-only mode. You set the rules.' },
  { question: 'What tools does Knowcap integrate with?', answer: 'Knowcap includes an MCP server out of the box — wire Claude, Codex, Gemini, or any MCP-compatible agent directly. One-click integrations with Odoo are live, with Jira, Asana, and ClickUp on our roadmap.' },
  { question: 'Can I share projects with clients?', answer: 'Yes. Share entire projects or specific assets with internal teams and external clients, all managed by role-based permissions with full audit logs.' },
]

export default function FAQSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[700px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#1a1a1a]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '-0.02em' }}>FAQ</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-[#F5F4F1] border border-[#e5e5e5] rounded-xl px-5 overflow-hidden">
                <AccordionTrigger className="text-left text-[15px] font-medium text-[#1a1a1a] hover:no-underline py-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[13.5px] text-[#666] pb-5 leading-relaxed">
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
