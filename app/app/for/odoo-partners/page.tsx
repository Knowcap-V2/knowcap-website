import VersionOdooPartners from '@/components/version-odoo-partners'

// /for/odoo-partners — Phase 1 beachhead conversion page.
// Audience: Odoo implementation partners (StratDev Meta-Ads target).
// Tracks variant "odoo-partners".
export const metadata = {
  title: 'Knowcap for Odoo implementation partners — From client meeting to Odoo SH PR before the meeting ends',
  description:
    'Your client mentions a bug or asks for a feature mid-meeting. Knowcap captures it, classifies it, and waits for one tap. Then an Odoo SH ticket opens, a GitHub PR appears, and your tracker advances — before the call wraps.',
  alternates: { canonical: 'https://knowcap.ai/for/odoo-partners' },
}

export default function PageForOdooPartners() {
  return <VersionOdooPartners />
}
