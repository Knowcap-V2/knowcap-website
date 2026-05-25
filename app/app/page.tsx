'use client'

import Navbar from '@/components/navbar'
import HeroSectionGeneral from '@/components/hero-section-general'
import FeaturesContextSection from '@/components/features-context-section'
import HowItWorksSection from '@/components/how-it-works-section'
import ROISection from '@/components/roi-section'
import BetaTestimonialsSection from '@/components/beta-testimonials-section'
import BeyondObviousSection from '@/components/beyond-obvious-section'
import TrustSection from '@/components/trust-section'
import FAQSection from '@/components/faq-section'
import PersonalNoteSectionGeneral from '@/components/personal-note-section-general'
import FloatingCTA from '@/components/floating-cta'
import Footer from '@/components/footer'
import { useThemeColors } from '@/components/theme-switcher'

export default function Home() {
  const [theme, colors, setTheme] = useThemeColors()

  return (
    <main className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.pageBg, fontFamily: "'Inter', sans-serif" }}>
      <Navbar theme={theme} colors={colors} onThemeChange={setTheme} />
      <HeroSectionGeneral />
      <FeaturesContextSection colors={colors} />
      <HowItWorksSection colors={colors} />
      <ROISection colors={colors} />
      <BetaTestimonialsSection colors={colors} />
      <BeyondObviousSection colors={colors} />
      <TrustSection colors={colors} />
      <FAQSection colors={colors} />
      <PersonalNoteSectionGeneral />
      <FloatingCTA colors={colors} />
      <Footer />
    </main>
  )
}
