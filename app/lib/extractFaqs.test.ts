// Run: npm test  (node:test via tsx)
// #4852: the FAQ heading matcher required the exact Arabic "الأسئلة الشائعة", so a post
// written "أسئلة شائعة" (no article) silently lost its FAQPage JSON-LD.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractFaqs } from './extractFaqs'

const body = (heading: string) =>
  `intro\n\n## ${heading}\n\n### What is it?\nA thing.\n\n### Why?\nBecause.\n\n## Next\nrest`

for (const heading of ['FAQ', 'الأسئلة الشائعة', 'أسئلة شائعة', 'الاسئلة الشائعة', 'اسئلة شائعة']) {
  test(`extracts FAQs under "## ${heading}"`, () => {
    const faqs = extractFaqs(body(heading))
    assert.equal(faqs.length, 2)
    assert.deepEqual(faqs[0], { q: 'What is it?', a: 'A thing.' })
  })
}

test('ignores unrelated headings', () => {
  assert.deepEqual(extractFaqs(body('Conclusion')), [])
})
