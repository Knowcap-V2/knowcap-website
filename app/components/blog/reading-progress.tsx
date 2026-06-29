'use client'

import { useEffect, useState } from 'react'

/** Thin green scroll-progress bar pinned to the top of the article. */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="kb-progress" aria-hidden="true">
      <div className="kb-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  )
}
