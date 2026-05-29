import { Bricolage_Grotesque, Source_Serif_4, Spline_Sans_Mono } from 'next/font/google'
import VersionBImpeccable from '@/components/version-bi'

// Impeccable type system, route-scoped (kept off the global layout so versions
// A/B/C/D in the cream design are untouched).
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--ve-display', display: 'swap' })
const body = Source_Serif_4({ subsets: ['latin'], variable: '--ve-body', display: 'swap' })
const mono = Spline_Sans_Mono({ subsets: ['latin'], variable: '--ve-mono', display: 'swap' })

export default function VersionBImpeccablePage() {
  return <VersionBImpeccable fontVars={`${display.variable} ${body.variable} ${mono.variable}`} />
}
