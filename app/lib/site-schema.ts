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
  founder: { '@type': 'Person', name: 'Hassan Arslan' },
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
    a: 'Knowcap is verified work intelligence — the trust layer for AI agents. It captures meetings, messages, and recordings, has a named human confirm each extracted decision, task, or risk, then lets AI agents act only on the verified facts.',
  },
  {
    q: 'Is Knowcap an alternative to Otter, Fireflies, or Read AI?',
    a: 'Yes. Those tools transcribe and summarize meetings. Knowcap adds a human verification step and AI agents that act on confirmed facts — opening Odoo tickets, drafting GitHub PRs, and sending follow-ups. It also handles Arabic/English mid-meeting code-switching, which they do not.',
  },
  {
    q: 'Does Knowcap support Arabic and multilingual meetings?',
    a: 'Yes. Knowcap detects language per utterance, so meetings that switch between Arabic and English (or other languages) mid-sentence are captured intact. It is built for MENA teams.',
  },
  {
    q: 'Who is Knowcap for?',
    a: 'MENA SMEs, Odoo implementation partners, agencies, and audit firms that need verified, auditable records of decisions before AI agents act on them.',
  },
]

/** Conversion-page FAQ for /for/odoo-partners. */
export const ODOO_FAQ: Faq[] = [
  {
    q: 'How does Knowcap help Odoo implementation partners?',
    a: 'Knowcap captures client meetings, extracts every scope decision, bug, and feature request, and waits for one human tap. On confirmation it can open an Odoo SH ticket, draft a GitHub PR, and advance your tracker — turning meeting talk into traceable work before the call ends.',
  },
  {
    q: 'Can Knowcap open an Odoo SH ticket from a meeting?',
    a: 'Yes. When a human confirms a captured claim, Knowcap can create the matching Odoo SH ticket automatically, linked back to the exact timestamp and speaker quote in the recording.',
  },
  {
    q: 'Does Knowcap create GitHub PRs from client calls?',
    a: 'Yes. A confirmed bug or change request can trigger a GitHub PR, so the fix is staged for review with the client conversation as its provenance.',
  },
]
