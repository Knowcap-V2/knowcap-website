import { compareMetadata } from '@/lib/compare-seo'

export const metadata = compareMetadata('otter')

export default function CompareOtterLayout({ children }: { children: React.ReactNode }) {
  return children
}
