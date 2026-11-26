import Link from 'next/link'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

export const metadata = {
  title: 'Page not found | Knowcap',
  robots: { index: false, follow: false },
}

// Shown for any address that does not exist: the normal header and footer,
// one plain line, and the three places a visitor most likely wanted.
export default function NotFound() {
  return (
    <EditorialShell>
      <PageHero kicker="404" title="This page is not here." sub="The address may have changed or never existed." />
      <div className="cl-wrap" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, paddingBottom: 110 }}>
        <Link className="cl-btn cl-btn--solid" href="/">Home</Link>
        <Link className="cl-btn cl-btn--ghost" href="/pricing">Pricing</Link>
        <Link className="cl-btn cl-btn--ghost" href="/beta">Join the beta</Link>
      </div>
    </EditorialShell>
  )
}
