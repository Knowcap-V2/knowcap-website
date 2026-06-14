import { compareMetadata } from '@/lib/compare-seo'

export const metadata = compareMetadata('fireflies')

export default function CompareFirefliesLayout({ children }: { children: React.ReactNode }) {
  return children
}
