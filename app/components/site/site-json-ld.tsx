import {
  ORGANIZATION_JSONLD,
  WEBSITE_JSONLD,
  SOFTWAREAPP_JSONLD,
  SPEAKABLE_JSONLD,
  faqJsonLd,
  type Faq,
} from '@/lib/site-schema'

/**
 * Renders the site-wide entity JSON-LD (Organization + WebSite +
 * SoftwareApplication), optionally with FAQPage and Speakable blocks.
 * One script tag, server-rendered into the initial HTML where AI crawlers read it.
 */
export default function SiteJsonLd({
  faqs,
  speakable = false,
}: {
  faqs?: Faq[]
  speakable?: boolean
}) {
  const blocks: Record<string, unknown>[] = [
    ORGANIZATION_JSONLD,
    WEBSITE_JSONLD,
    SOFTWAREAPP_JSONLD,
  ]
  if (speakable) blocks.push(SPEAKABLE_JSONLD)
  if (faqs && faqs.length > 0) blocks.push(faqJsonLd(faqs))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blocks) }}
    />
  )
}
