import { compareUrl, type CompareSlug } from '@/lib/compare-seo'

/**
 * Emits FAQPage + SoftwareApplication + BreadcrumbList JSON-LD for a
 * /compare/* page. Rendered inside the (client) compare page body — client
 * components still server-render on first paint, so the script lands in the
 * initial HTML where crawlers read it.
 *
 * Closes the "no schema on compare pages" gap from the 2026-06-14 SEO audit.
 */
export default function CompareJsonLd({
  slug,
  competitor,
  faqs,
}: {
  slug: CompareSlug
  competitor: string
  faqs: { q: string; a: string }[]
}) {
  const url = compareUrl(slug)

  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Knowcap', item: 'https://knowcap.ai' },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://knowcap.ai/compare' },
        { '@type': 'ListItem', position: 3, name: `Knowcap vs ${competitor}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Knowcap',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://knowcap.ai',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ]

  if (faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
