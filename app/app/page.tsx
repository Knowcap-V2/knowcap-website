import VersionB from '@/components/version-b'

// Homepage. The middleware rewrites `/` to `/b` or `/d` (the live B-vs-D copy
// test), so this component only renders as a fallback if middleware is bypassed.
// We render Version B (outcome) as the sensible default.
export default function Home() {
  return <VersionB />
}
