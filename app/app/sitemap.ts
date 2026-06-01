import type { MetadataRoute } from 'next'

/**
 * Sitemap for knowcap.ai — covers main, /for/* sub-pages, /compare/* comparison pages,
 * and the blog index. Lists known routes; future programmatic SEO pages should be
 * appended here or generated dynamically from a content source.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://knowcap.ai'
  const now = new Date()

  return [
    // Main
    { url: `${base}/`,           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },

    // Conversion sub-pages (paid traffic destinations)
    { url: `${base}/for/odoo-partners`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Comparison pages (SEO bait)
    { url: `${base}/compare/knowcap-vs-otter`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/compare/knowcap-vs-read-ai`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/compare/knowcap-vs-fireflies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/compare/knowcap-vs-fellow`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/compare/knowcap-vs-granola`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // A/B variants (canonicalized in metadata, but still indexable)
    { url: `${base}/a`, lastModified: now, changeFrequency: 'weekly', priority: 0.3 },
    { url: `${base}/b`, lastModified: now, changeFrequency: 'weekly', priority: 0.3 },
    { url: `${base}/c`, lastModified: now, changeFrequency: 'weekly', priority: 0.3 },
    { url: `${base}/d`, lastModified: now, changeFrequency: 'weekly', priority: 0.3 },

    // Legal / utility
    { url: `${base}/policy`,      lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/contact-us`,  lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/book`,        lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/careers`,     lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]
}
