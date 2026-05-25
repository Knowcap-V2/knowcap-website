'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ArrowRight } from 'lucide-react'

const APP_URL = 'https://app.knowcap.ai'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] border border-white/[0.08] rounded-xl shadow-2xl max-w-sm animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative p-5">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 text-white/40 hover:text-white/70 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4">
          <h3 className="font-bold text-[15px] text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to try Knowcap?
          </h3>
          <p className="text-[13px] text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
            Free to start. No credit card required.
          </p>
        </div>

        <div className="space-y-2">
          <Button asChild className="w-full bg-white hover:bg-white/90 text-[#0A0A0A] font-medium transition-all">
            <a href={`${APP_URL}/register`}>
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full border-white/[0.12] text-white/70 hover:bg-white/[0.04] transition-all">
            <a href={`${APP_URL}/login`}>
              Log in
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
