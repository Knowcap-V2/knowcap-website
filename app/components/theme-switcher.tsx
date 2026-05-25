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
}

const THEME_MAP: Record<ThemeKey, ThemeColors> = {
  baseline: {
    pageBg: '#F5F4F1', cardBg: '#ffffff', cardBorder: '#e5e5e5',
    headingColor: '#1a1a1a', bodyColor: '#666666', mutedColor: '#999999',
    accentColor: '#1a1a1a', iconBg: '#F5F4F1',
  },
  'operator-dark': {
    pageBg: '#0B0E14', cardBg: '#11151D', cardBorder: '#1F2530',
    headingColor: '#C9D1D9', bodyColor: '#8B949E', mutedColor: '#484F58',
    accentColor: '#58A6FF', iconBg: '#1F2530',
  },
  'operator-light': {
    pageBg: '#FAFAF7', cardBg: '#F2F0EA', cardBorder: '#DDD8CC',
    headingColor: '#18181B', bodyColor: '#5B5B62', mutedColor: '#999999',
    accentColor: '#1F6B3A', iconBg: '#EAE7DF',
  },
  library: {
    pageBg: '#F5EBDC', cardBg: '#FBF4E5', cardBorder: '#D9C9A8',
    headingColor: '#2D1F18', bodyColor: '#6B584A', mutedColor: '#9A8A78',
    accentColor: '#8B3E2F', iconBg: '#EFE3CF',
  },
}

export function useThemeColors(): [ThemeKey, ThemeColors, (key: ThemeKey) => void] {
  const [theme, setTheme] = useState<ThemeKey>('baseline')

  useEffect(() => {
    const saved = localStorage.getItem('knowcap-landing-theme') as ThemeKey | null
    if (saved && THEME_MAP[saved]) setTheme(saved)
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
            ringColor: t.accent,
          }}
        />
      ))}
    </div>
  )
}

export { THEMES, THEME_MAP }
export type { ThemeKey, ThemeColors }
