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
    <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#e5e5e5] rounded-xl shadow-2xl max-w-sm animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative p-5">
        <button onClick={() => setIsDismissed(true)} className="absolute top-3 right-3 text-[#999] hover:text-[#666] transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="mb-4">
          <h3 className="font-bold text-[15px] text-[#1a1a1a] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Ready to try Knowcap?</h3>
          <p className="text-[13px] text-[#666]">Free to start. No credit card required.</p>
        </div>
        <div className="space-y-2">
          <Button asChild className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white font-medium">
            <a href={`${APP_URL}/register`}>Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></a>
          </Button>
          <Button asChild variant="outline" className="w-full border-[#e5e5e5] text-[#666] hover:bg-[#F5F4F1]">
            <a href={`${APP_URL}/login`}>Log in</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
