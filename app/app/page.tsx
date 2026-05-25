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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <HeroSectionGeneral />
      <FeaturesContextSection />
      <HowItWorksSection />
      <ROISection />
      <BetaTestimonialsSection />
      <BeyondObviousSection />
      <TrustSection />
      <FAQSection />
      <PersonalNoteSectionGeneral />
      <FloatingCTA />
      <Footer />
    </main>
  )
}
