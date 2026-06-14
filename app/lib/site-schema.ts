/**
 * Site-wide JSON-LD building blocks (GEO / AI-search layer).
 *
 * Centralizes the Knowcap entity so every surface emits a consistent,
 * disambiguated Organization — the 2026-06-14 GEO audit found AI engines
 * confusing Knowcap with unrelated "Knowcap" entities and quoting a stale
 * product definition. Founder, founding location, area served, languages,
 * and a contact point pin the entity down for AI knowledge graphs.
 */

export type Faq = { q: string; a: string }

export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Knowcap',
  url: 'https://knowcap.ai',
  logo: 'https://knowcap.ai/knowcap-logo.png',
  description:
    'Knowcap is verified work intelligence — the trust layer for AI agents. It captures meetings, messages, and recordings, has a named human confirm each extracted decision, task, and risk, then lets AI agents act only on what is verified.',
  founder: {
    '@type': 'Person',
    name: 'Hassan Arslan',
    url: 'https://www.linkedin.com/in/hassan-arslan-66a023142/',
    sameAs: ['https://www.linkedin.com/in/hassan-arslan-66a023142/'],
  },
  foundingLocation: {
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
  },
  areaServed: ['Middle East', 'North Africa', 'MENA'],
  knowsLanguage: ['en', 'ar'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hsa@knowcap.ai',
    areaServed: 'MENA',
    availableLanguage: ['English', 'Arabic'],
  },
}

export const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Knowcap',
  url: 'https://knowcap.ai',
  inLanguage: 'en',
  publisher: { '@type': 'Organization', name: 'Knowcap', url: 'https://knowcap.ai' },
}

export const SOFTWAREAPP_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Knowcap',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AI meeting assistant',
  operatingSystem: 'Web',
  url: 'https://knowcap.ai',
  description:
    'AI meeting and message intelligence with a human verification step and agents that act on confirmed facts — opening Odoo tickets, drafting GitHub PRs, and sending follow-ups. Multilingual (Arabic/English), built for MENA teams.',
  featureList: [
    'Capture meetings, messages, and recordings',
    'Human verification of every extracted claim',
    'AI agents act only on confirmed facts',
    'Arabic/English mid-meeting code-switching',
    'Odoo ticket and GitHub PR creation',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

/** Speakable hints for voice / AI-summary surfaces. */
export const SPEAKABLE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://knowcap.ai',
  name: 'Knowcap — The Trust Layer for AI Agents',
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Entity-defining FAQ for the homepage — the exact questions AI assistants
 *  get asked about Knowcap, answered in self-contained, citable sentences. */
export const HOME_FAQ: Faq[] = [
  {
    q: 'What is Knowcap?',
    a: 'Knowcap is verified work intelligence — the trust layer for AI agents. It captures the work your team already does across meetings, voice notes, messages, and recordings (Google Meet, calls, screen recordings, documents, and links), then extracts every decision, task, and risk as a claim card pinned to the exact timestamp and speaker quote. A named human confirms or rejects each claim with one tap. Only confirmed claims feed the AI agents that take real-world action — opening Odoo SH tickets, drafting GitHub PRs, and sending follow-ups. Because every agent action traces back to a human-confirmed claim and its source, you get an audit trail instead of a black box. Knowcap is built for MENA teams and handles Arabic/English code-switching mid-meeting.',
  },
  {
    q: 'Is Knowcap an alternative to Otter, Fireflies, or Read AI?',
    a: 'Yes. Tools like Otter, Fireflies, Read AI, Fellow, and Granola transcribe meetings and generate AI summaries, and several auto-push action items into your stack with no human gate. Knowcap is the layer after the transcript: it adds a one-tap human verification step on every extracted claim, then runs AI agents that act only on confirmed facts — opening Odoo SH tickets, drafting GitHub PRs, and sending follow-ups. It also detects language per utterance, so a sales call that switches between Arabic and English mid-sentence is captured intact, which single-language-per-recording tools miss. Every action keeps a full audit trail back to the timestamp and the named person who confirmed it. Same destinations as the other tools; a very different liability surface.',
  },
  {
    q: 'Does Knowcap support Arabic and multilingual meetings?',
    a: 'Yes. Most meeting-AI tools force you to pick one language per recording, so the moment a meeting switches between Arabic and English (or English and Hindi, Tagalog, or French) mid-sentence, the transcript drops lines and the summary loses context. Knowcap detects language per utterance, so bilingual and code-switching meetings — the everyday reality of MENA, Gulf, and South Asian teams — are captured intact. The confirmed claims, agent actions, and audit trail all work the same way regardless of which languages were spoken, and Knowcap can run in EU/MENA regions for data residency. It is built for MENA SMEs, Odoo partners, agencies, and audit firms first, not retrofitted for them.',
  },
  {
    q: 'Who is Knowcap for?',
    a: 'Knowcap is built for MENA SMEs, Odoo implementation partners, agencies, and audit firms — teams that need a verified, auditable record of what was decided before any AI agent acts on it. Odoo partners use it to turn a client call into an Odoo SH ticket and a GitHub PR before the meeting ends. Agencies use it to capture scope and approvals with receipts. Audit and professional-services firms use it because every agent action is tied to a human-confirmed claim with a timestamp and speaker quote, which matters when a regulator or client asks who decided something and when. If your work happens in meetings and messages and the cost of acting on a misheard fact is high, Knowcap is for you.',
  },
]

/** Conversion-page FAQ for /for/odoo-partners. */
export const ODOO_FAQ: Faq[] = [
  {
    q: 'How does Knowcap help Odoo implementation partners?',
    a: 'Knowcap captures your client meetings, voice notes, and recordings, then extracts every scope decision, bug report, and feature request as a claim card pinned to the timestamp and speaker quote. You confirm each one with a single tap. On confirmation, Knowcap can open the matching Odoo SH ticket, draft a GitHub PR, and advance your project tracker — turning meeting talk into traceable work before the call even ends. Because the agent only acts on what a named human confirmed, you avoid the classic failure where an AI summary mishears scope and the wrong task lands in your sprint. And when a client later says "that is not what we agreed," you have the exact recording, timestamp, and confirmation on record. It is built by an Odoo partner, for Odoo partners.',
  },
  {
    q: 'Can Knowcap open an Odoo SH ticket from a meeting?',
    a: 'Yes. When a human confirms a captured claim — a bug, a scope change, a follow-up — Knowcap can create the matching Odoo SH ticket automatically, linked back to the exact timestamp and speaker quote in the recording. The ticket carries its provenance, so anyone reviewing it can jump straight to the moment in the meeting where the client asked for it, instead of trusting a paraphrased summary.',
  },
  {
    q: 'Does Knowcap create GitHub PRs from client calls?',
    a: 'Yes. A confirmed bug report or change request can trigger a GitHub PR, so the fix is staged for review with the client conversation as its provenance. The developer sees what was asked, by whom, and when — tied to the recording — rather than a second-hand ticket. Combined with Odoo SH ticket creation, this is how Knowcap turns a single client call into reviewable, traceable work before the meeting wraps.',
  },
]
