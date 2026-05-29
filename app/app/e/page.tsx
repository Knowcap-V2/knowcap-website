import { Bricolage_Grotesque, Source_Serif_4, Spline_Sans_Mono } from 'next/font/google'
import VersionE from '@/components/version-e'

// Version E loads its own type system on this route only. These three families
// are intentionally NOT in the global layout (which ships Inter / Space Grotesk
// for versions A–D). Version E exists to test an independent design POV, so it
// must not share the hand-built system's fonts.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--ve-display', display: 'swap' })
const body = Source_Serif_4({ subsets: ['latin'], variable: '--ve-body', display: 'swap' })
const mono = Spline_Sans_Mono({ subsets: ['latin'], variable: '--ve-mono', display: 'swap' })

export default function VersionEPage() {
  return <VersionE fontVars={`${display.variable} ${body.variable} ${mono.variable}`} />
}
