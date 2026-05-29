import { Bricolage_Grotesque, Source_Serif_4, Spline_Sans_Mono } from 'next/font/google'
import VersionE from '@/components/version-e'

// The `/` route (A/control slot) now renders the impeccable-designed page.
// It keeps Version A's copy but uses its own type system — Bricolage Grotesque
// (display) / Source Serif 4 (body) / Spline Sans Mono (meta) — loaded here and
// route-scoped so it doesn't touch the shared Inter/Space-Grotesk system that
// versions B/C/D still use. (This component file is named version-e.tsx for
// historical reasons; it is the A/control variant.)
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--ve-display', display: 'swap' })
const body = Source_Serif_4({ subsets: ['latin'], variable: '--ve-body', display: 'swap' })
const mono = Spline_Sans_Mono({ subsets: ['latin'], variable: '--ve-mono', display: 'swap' })

export default function Home() {
  return <VersionE fontVars={`${display.variable} ${body.variable} ${mono.variable}`} />
}
