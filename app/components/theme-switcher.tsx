'use client'

import { useState, useEffect, useCallback } from 'react'

const THEMES = [
  { key: 'baseline', label: 'Baseline', bg: '#F5F4F1', accent: '#1a1a1a', border: '#e5e5e5' },
  { key: 'operator-dark', label: 'Operator', bg: '#0B0E14', accent: '#58A6FF', border: '#1F2530' },
  { key: 'operator-light', label: 'Operator Light', bg: '#FAFAF7', accent: '#1F6B3A', border: '#DDD8CC' },
  { key: 'library', label: 'Library', bg: '#F5EBDC', accent: '#8B3E2F', border: '#D9C9A8' },
] as const

type ThemeKey = typeof THEMES[number]['key']

interface ThemeColors {
  pageBg: string
  cardBg: string
  cardBorder: string
  headingColor: string
  bodyColor: string
  mutedColor: string
  accentColor: string
  iconBg: string
  heroFrom: string
  heroTo: string
  heroBadgeBg: string
  heroBadgeBorder: string
  heroBadgeText: string
  heroHeading: string
  heroHeadingDim: string
  heroSub: string
  heroBullet: string
  heroBtnBg: string
  heroBtnText: string
  heroGhostBorder: string
  heroGhostText: string
  titleFont: string
  bodyFont: string
  monoFont: string
  isDark: boolean
}

const THEME_MAP: Record<ThemeKey, ThemeColors> = {
  baseline: {
    pageBg: '#FBFAF8', cardBg: '#FFFFFF', cardBorder: '#E7E4DD',
    headingColor: '#18181B', bodyColor: '#4A4F5A', mutedColor: '#6E737D',
    accentColor: '#1F6B3A', iconBg: '#F5F4F1',
    heroFrom: '#18181B', heroTo: '#0A0A0A',
    heroBadgeBg: 'rgba(255,255,255,0.06)', heroBadgeBorder: 'rgba(255,255,255,0.08)', heroBadgeText: 'rgba(255,255,255,0.6)',
    heroHeading: '#FFFFFF', heroHeadingDim: 'rgba(255,255,255,0.45)',
    heroSub: 'rgba(255,255,255,0.4)', heroBullet: 'rgba(255,255,255,0.35)',
    heroBtnBg: '#1F6B3A', heroBtnText: '#FFFFFF',
    heroGhostBorder: 'rgba(255,255,255,0.12)', heroGhostText: 'rgba(255,255,255,0.7)',
    titleFont: "'Space Grotesk', sans-serif",
    bodyFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    isDark: false,
  },
  'operator-dark': {
    pageBg: '#0B0E14', cardBg: '#11151D', cardBorder: '#1F2530',
    headingColor: '#C9D1D9', bodyColor: '#8B949E', mutedColor: '#767E8A',
    accentColor: '#58A6FF', iconBg: '#1F2530',
    heroFrom: '#060810', heroTo: '#0B0E14',
    heroBadgeBg: 'rgba(88,166,255,0.08)', heroBadgeBorder: 'rgba(88,166,255,0.15)', heroBadgeText: '#58A6FF',
    heroHeading: '#E6EDF3', heroHeadingDim: 'rgba(201,209,217,0.5)',
    heroSub: 'rgba(139,148,158,0.7)', heroBullet: 'rgba(139,148,158,0.5)',
    heroBtnBg: '#58A6FF', heroBtnText: '#0B0E14',
    heroGhostBorder: '#1F2530', heroGhostText: '#8B949E',
    titleFont: "'JetBrains Mono', monospace",
    bodyFont: "'JetBrains Mono', monospace",
    monoFont: "'JetBrains Mono', monospace",
    isDark: true,
  },
  'operator-light': {
    pageBg: '#FAFAF7', cardBg: '#F2F0EA', cardBorder: '#DDD8CC',
    headingColor: '#18181B', bodyColor: '#5B5B62', mutedColor: '#6E6E73',
    accentColor: '#1F6B3A', iconBg: '#EAE7DF',
    heroFrom: '#18181B', heroTo: '#0A0A0A',
    heroBadgeBg: 'rgba(31,107,58,0.08)', heroBadgeBorder: 'rgba(31,107,58,0.2)', heroBadgeText: '#4ade80',
    heroHeading: '#FFFFFF', heroHeadingDim: 'rgba(255,255,255,0.45)',
    heroSub: 'rgba(255,255,255,0.4)', heroBullet: 'rgba(255,255,255,0.35)',
    heroBtnBg: '#1F6B3A', heroBtnText: '#FFFFFF',
    heroGhostBorder: 'rgba(255,255,255,0.12)', heroGhostText: 'rgba(255,255,255,0.7)',
    titleFont: "'JetBrains Mono', monospace",
    bodyFont: "'JetBrains Mono', monospace",
    monoFont: "'JetBrains Mono', monospace",
    isDark: false,
  },
  library: {
    pageBg: '#F5EBDC', cardBg: '#FBF4E5', cardBorder: '#D9C9A8',
    headingColor: '#2D1F18', bodyColor: '#6B584A', mutedColor: '#7E6E59',
    accentColor: '#8B3E2F', iconBg: '#EFE3CF',
    heroFrom: '#2D1F18', heroTo: '#1A110D',
    heroBadgeBg: 'rgba(139,62,47,0.08)', heroBadgeBorder: 'rgba(139,62,47,0.2)', heroBadgeText: 'rgba(255,255,255,0.6)',
    heroHeading: '#F5EBDC', heroHeadingDim: 'rgba(245,235,220,0.5)',
    heroSub: 'rgba(245,235,220,0.4)', heroBullet: 'rgba(245,235,220,0.35)',
    heroBtnBg: '#8B3E2F', heroBtnText: '#FBF4E5',
    heroGhostBorder: 'rgba(245,235,220,0.15)', heroGhostText: 'rgba(245,235,220,0.7)',
    titleFont: "'EB Garamond', 'Georgia', serif",
    bodyFont: "'Inter', sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    isDark: false,
  },
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

export function useThemeColors(): [ThemeKey, ThemeColors, (key: ThemeKey) => void] {
  const [theme, setTheme] = useState<ThemeKey>('baseline')

  useEffect(() => {
    const saved = localStorage.getItem('knowcap-landing-theme') as ThemeKey | null
    if (saved && THEME_MAP[saved]) {
      setTheme(saved)
    } else {
      const assigned = getCookie('kc-landing-theme') as ThemeKey | null
      if (assigned && THEME_MAP[assigned]) setTheme(assigned)
    }
  }, [])

  const setAndSave = useCallback((key: ThemeKey) => {
    setTheme(key)
    localStorage.setItem('knowcap-landing-theme', key)
  }, [])

  return [theme, THEME_MAP[theme], setAndSave]
}

export default function ThemeSwitcher({
  theme,
  onChange,
}: {
  theme: ThemeKey
  onChange: (key: ThemeKey) => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          title={t.label}
          className={`w-5 h-5 rounded-full border-2 transition-all ${
            theme === t.key ? 'scale-110 ring-2 ring-offset-1' : 'hover:scale-105'
          }`}
          style={{
            backgroundColor: t.bg,
            borderColor: t.border,
            ['--tw-ring-color' as any]: t.accent,
          }}
        />
      ))}
    </div>
  )
}

export { THEMES, THEME_MAP }
export type { ThemeKey, ThemeColors }
