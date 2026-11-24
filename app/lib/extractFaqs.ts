/**
 * Extract FAQ q/a pairs (### headings under a "## FAQ" / Arabic section) for FAQPage JSON-LD.
 * #4852: the Arabic article ("ال") and the hamza on "أسئلة" are optional, so
 * "الأسئلة الشائعة", "أسئلة شائعة" and "اسئلة شائعة" all match; a post written
 * without the article no longer silently loses its FAQPage markup.
 */
export function extractFaqs(md: string): { q: string; a: string }[] {
  const faqMatch = md.match(/^##\s+(?:FAQ|(?:ال)?[أا]سئلة\s+(?:ال)?شائعة)\s*$/m)
  if (!faqMatch || faqMatch.index === undefined) return []
  const after = md.slice(faqMatch.index)
  const section = after.split(/\r?\n##\s+(?!#)/)[0]
  const faqs: { q: string; a: string }[] = []
  const parts = section.split(/^###\s+/m).slice(1)
  for (const part of parts) {
    const [qLine, ...rest] = part.split(/\r?\n/)
    const a = rest.join(' ').replace(/\s+/g, ' ').trim()
    if (qLine && a) faqs.push({ q: qLine.trim(), a })
  }
  return faqs
}
