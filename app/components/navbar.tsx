'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import ThemeSwitcher from '@/components/theme-switcher'
import type { ThemeKey, ThemeColors } from '@/components/theme-switcher'

const APP_URL = 'https://app.knowcap.ai'

export default function Navbar({
  theme,
  colors,
  onThemeChange,
}: {
  theme: ThemeKey
  colors: ThemeColors
  onThemeChange: (key: ThemeKey) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        backgroundColor: `${colors.cardBg}ee`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.cardBorder}`,
      } : { backgroundColor: 'transparent' }}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-[15px]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: scrolled ? colors.headingColor : 'white' }}>
          <Image
            src="/logos/logo.jpg"
            alt="Knowcap"
            width={28}
            height={28}
            className="rounded-md"
          />
          Knowcap
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-[13px] transition-colors" style={{ color: scrolled ? colors.bodyColor : 'rgba(255,255,255,0.6)' }}>Features</Link>
          <Link href="#how-it-works" className="text-[13px] transition-colors" style={{ color: scrolled ? colors.bodyColor : 'rgba(255,255,255,0.6)' }}>How it works</Link>
          <Link href="/contact-us" className="text-[13px] transition-colors" style={{ color: scrolled ? colors.bodyColor : 'rgba(255,255,255,0.6)' }}>Contact</Link>
        </div>

        {/* Theme switcher + Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />
          <a href={`${APP_URL}/login`} className="text-[13px] transition-colors px-3 py-1.5" style={{ color: scrolled ? colors.bodyColor : 'rgba(255,255,255,0.7)' }}>
            Log in
          </a>
          <a
            href={`${APP_URL}/register`}
            className="text-[13px] font-medium transition-colors px-4 py-1.5 rounded-lg"
            style={scrolled ? {
              color: theme === 'operator-dark' ? '#0B0E14' : 'white',
              backgroundColor: colors.accentColor,
            } : {
              color: '#0A0A0A',
              backgroundColor: 'white',
            }}
          >
            Get Started Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ color: scrolled ? colors.bodyColor : 'rgba(255,255,255,0.7)' }}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-6 space-y-4 shadow-lg" style={{ backgroundColor: colors.cardBg, borderTop: `1px solid ${colors.cardBorder}` }}>
          <Link href="#features" onClick={() => setMobileOpen(false)} className="block text-[14px]" style={{ color: colors.bodyColor }}>Features</Link>
          <Link href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-[14px]" style={{ color: colors.bodyColor }}>How it works</Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="block text-[14px]" style={{ color: colors.bodyColor }}>Contact</Link>
          <div className="pt-4 flex items-center gap-3" style={{ borderTop: `1px solid ${colors.cardBorder}` }}>
            <ThemeSwitcher theme={theme} onChange={onThemeChange} />
          </div>
          <div className="flex flex-col gap-3">
            <a href={`${APP_URL}/login`} className="text-[14px] text-center py-2" style={{ color: colors.bodyColor }}>Log in</a>
            <a href={`${APP_URL}/register`} className="text-[14px] font-medium text-center py-2.5 rounded-lg" style={{ color: 'white', backgroundColor: colors.accentColor }}>Get Started Free</a>
          </div>
        </div>
      )}
    </nav>
  )
}
