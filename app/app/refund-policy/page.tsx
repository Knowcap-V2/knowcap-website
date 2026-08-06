'use client'

import { useEffect } from 'react'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

// Odoo #7729 — the written refund policy. Reconciles the two refund
// statements that were live at once before this page existed: the Terms of
// Service's general "fees are non-refundable" clause, and the /offer page's
// conditional 30-day performance guarantee. This page states both, plainly,
// and does not invent a broader promise than either already makes.
const sections = [
  { id: 'general', title: 'Paid Plans' },
  { id: 'guarantee', title: 'Pilot Guarantee' },
  { id: 'how-to-ask', title: 'How to Ask' },
]

const h2Anchor = { scrollMarginTop: '90px' } as const

export default function RefundPolicyPage() {
  useEffect(() => {
    document.title = 'Refund Policy - Knowcap.ai'
  }, [])

  return (
    <EditorialShell>
      <PageHero
        kicker="Legal Information"
        title="Refund Policy"
        sub={<>What happens if you want your money back &bull; Last updated: August 6, 2026</>}
      />
      <div className="cl-page-body">
        <div className="cl-wrap">
          <nav
            aria-label="Refund policy sections"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 28 }}
          >
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="cl-btn cl-btn--ghost cl-btn--sm">
                {section.title}
              </a>
            ))}
          </nav>

          <div className="cl-prose">
            <p>
              This page states what actually happens if you ask for a refund today. It does not promise
              anything beyond what is written here or in our{' '}
              <a href="/terms">Terms of Service</a>.
            </p>

            <h2 id="general" style={h2Anchor}>Standard paid plans</h2>
            <p>
              Regular monthly and annual subscriptions are <strong>non-refundable</strong>, except where
              required by law or where a specific guarantee applies (see below). You can cancel at any
              time — cancellation stops future billing, and you keep access to paid features until the
              end of the billing period you already paid for. Cancelling does not refund the current
              period.
            </p>

            <h2 id="guarantee" style={h2Anchor}>The pilot performance guarantee</h2>
            <p>
              Customers who purchase Knowcap through the <strong>Odoo Partner Edition pilot offer</strong>{' '}
              (the pricing shown on our <a href="/offer">pilot offer page</a>) are covered by a specific,
              conditional guarantee. It reads exactly as it does on that page:
            </p>
            <p>
              <em>If within the first 30 days, Knowcap does not:</em>
            </p>
            <ul>
              <li>Generate one complex SOP from a captured walkthrough, instantly</li>
              <li>Resolve a scope-creep dispute using the confirmed record of what was said</li>
              <li>Demonstrate a path to saving 50 hours per 500-hour project</li>
            </ul>
            <p>
              <em>We will refund 100% of your subscription.</em>
            </p>
            <p>
              This guarantee applies to the pilot offer only. If you did not sign up through that offer,
              the standard-plan terms above apply instead.
            </p>

            <h2 id="how-to-ask" style={h2Anchor}>How to ask for a refund</h2>
            <p>
              <strong>If you have an account:</strong> sign in, open the account menu in the sidebar, and
              choose <strong>Contact support</strong> &rarr; <strong>Refund Request</strong>. Your request
              reaches our team directly from inside the product.
            </p>
            <p>
              <strong>If you have not signed up yet, or can&apos;t sign in:</strong> email{' '}
              <a href="mailto:hsa@smetools.io">hsa@smetools.io</a> and we will get back to you.
            </p>
            <p>
              Approved refunds are processed back to your original payment method. Once a refund is
              issued, any credits or usage granted for that billing period are reversed at the same time
              — this happens automatically and does not require a separate step from you.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cl-btn cl-btn--ghost cl-btn--sm"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </EditorialShell>
  )
}
