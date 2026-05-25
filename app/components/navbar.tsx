'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const APP_URL = 'https://app.knowcap.ai'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={`flex items-center gap-2 font-bold text-[15px] transition-colors ${scrolled ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span className={`w-7 h-7 rounded-md grid place-items-center text-[12px] font-bold transition-colors ${scrolled ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#0A0A0A]'}`}>K</span>
          Knowcap
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className={`text-[13px] transition-colors ${scrolled ? 'text-[#666] hover:text-[#1a1a1a]' : 'text-white/60 hover:text-white'}`}>Features</Link>
          <Link href="#how-it-works" className={`text-[13px] transition-colors ${scrolled ? 'text-[#666] hover:text-[#1a1a1a]' : 'text-white/60 hover:text-white'}`}>How it works</Link>
          <Link href="/contact-us" className={`text-[13px] transition-colors ${scrolled ? 'text-[#666] hover:text-[#1a1a1a]' : 'text-white/60 hover:text-white'}`}>Contact</Link>
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}/login`}
            className={`text-[13px] transition-colors px-3 py-1.5 ${scrolled ? 'text-[#666] hover:text-[#1a1a1a]' : 'text-white/70 hover:text-white'}`}
          >
            Log in
          </a>
          <a
            href={`${APP_URL}/register`}
            className={`text-[13px] font-medium transition-colors px-4 py-1.5 rounded-lg ${
              scrolled
                ? 'text-white bg-[#1a1a1a] hover:bg-[#333]'
                : 'text-[#0A0A0A] bg-white hover:bg-white/90'
            }`}
          >
            Get Started Free
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden transition-colors ${scrolled ? 'text-[#666]' : 'text-white/70'}`}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e5e5] px-6 py-6 space-y-4 shadow-lg">
          <Link href="#features" onClick={() => setMobileOpen(false)} className="block text-[14px] text-[#666] hover:text-[#1a1a1a]">Features</Link>
          <Link href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-[14px] text-[#666] hover:text-[#1a1a1a]">How it works</Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="block text-[14px] text-[#666] hover:text-[#1a1a1a]">Contact</Link>
          <div className="pt-4 border-t border-[#e5e5e5] flex flex-col gap-3">
            <a href={`${APP_URL}/login`} className="text-[14px] text-[#666] text-center py-2">Log in</a>
            <a href={`${APP_URL}/register`} className="text-[14px] font-medium text-white bg-[#1a1a1a] text-center py-2.5 rounded-lg">Get Started Free</a>
          </div>
        </div>
      )}
    </nav>
  )
}
