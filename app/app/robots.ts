import type { MetadataRoute } from 'next'

/**
 * Origin robots.txt — overrides Cloudflare's managed "Block AI Bots" robots.txt.
 *
 * Why this exists: Cloudflare's zone-level AI Audit feature auto-injects a robots.txt
 * that Disallow's GPTBot, ClaudeBot, Google-Extended, Bytespider, CCBot, Applebot-Extended,
 * Amazonbot, and meta-externalagent. For an AI product positioned as the trust layer for
 * AI agents, blocking the very AI assistants we want to be cited by is self-defeating.
 *
 * Shipping a robots.txt from the Next.js origin (this file) makes Cloudflare bypass its
 * managed injection — the origin response wins.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly allow all AI assistants and search engines.
      // We WANT to be indexed and cited.
      { userAgent: '*', allow: '/' },

      // Explicitly allow each named AI crawler Cloudflare was blocking.
      // Redundant with the wildcard above, but tools like ChatGPT crawler respect
      // explicit user-agent stanzas more reliably.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
    ],
    sitemap: 'https://knowcap.ai/sitemap.xml',
    host: 'https://knowcap.ai',
  }
}
