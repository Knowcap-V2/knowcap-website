'use client'

import Link from 'next/link'

const APP_URL = 'https://app.knowcap.ai'

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-[#0A0A0A] border-t border-white/[0.06]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-white text-[#0A0A0A] rounded-md grid place-items-center text-[12px] font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>K</span>
              <span className="text-white font-bold text-[15px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Knowcap</span>
            </div>
            <p className="text-[14px] text-white/40 max-w-[360px]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
              The trust layer for AI agents. Every fact confirmed by a named human, with a full audit trail.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`${APP_URL}/register`} className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Get Started
                </a>
              </li>
              <li>
                <a href={`${APP_URL}/login`} className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Log in
                </a>
              </li>
              <li>
                <Link href="/book" className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[13px] font-semibold text-white/60 uppercase tracking-wider mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact-us" className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[14px] text-white/40 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
              © {new Date().getFullYear()} Knowcap. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/policy" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Terms</Link>
              <Link href="/contact-us" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
