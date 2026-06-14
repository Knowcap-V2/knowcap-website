import VersionOdooPartners from '@/components/version-odoo-partners'
import SiteJsonLd from '@/components/site/site-json-ld'
import { ODOO_FAQ } from '@/lib/site-schema'

// /for/odoo-partners — Phase 1 beachhead conversion page.
// Audience: Odoo implementation partners (StratDev Meta-Ads target).
// Tracks variant "odoo-partners".
export const metadata = {
  title: 'Knowcap for Odoo implementation partners — From client meeting to Odoo SH PR before the meeting ends',
  description:
    'Your client mentions a bug mid-meeting. Knowcap captures it, waits for one human tap, then opens an Odoo SH ticket and drafts a GitHub PR — before the call ends.',
  alternates: { canonical: 'https://knowcap.ai/for/odoo-partners' },
}

export default function PageForOdooPartners() {
  return (
    <>
      <SiteJsonLd faqs={ODOO_FAQ} />
      <VersionOdooPartners />
    </>
  )
}
