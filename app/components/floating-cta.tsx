'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, ArrowRight } from 'lucide-react'
import type { ThemeColors } from '@/components/theme-switcher'

const APP_URL = 'https://app.knowcap.ai'

export default function FloatingCTA({ colors }: { colors: ThemeColors }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl shadow-2xl max-w-sm animate-in slide-in-from-bottom-4 duration-500" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.cardBorder}` }}>
      <div className="relative p-5">
        <button onClick={() => setIsDismissed(true)} className="absolute top-3 right-3 transition-colors" style={{ color: colors.mutedColor }}>
          <X className="w-4 h-4" />
        </button>
        <div className="mb-4">
          <h3 className="font-bold text-[15px] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: colors.headingColor }}>Ready to try Knowcap?</h3>
          <p className="text-[13px]" style={{ color: colors.bodyColor }}>Free to start. No credit card required.</p>
        </div>
        <div className="space-y-2">
          <Button asChild className="w-full font-medium" style={{ backgroundColor: colors.accentColor, color: 'white' }}>
            <a href={`${APP_URL}/register`}>Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></a>
          </Button>
          <Button asChild variant="outline" className="w-full" style={{ borderColor: colors.cardBorder, color: colors.bodyColor }}>
            <a href={`${APP_URL}/login`}>Log in</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
