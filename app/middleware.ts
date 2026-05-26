import { NextRequest, NextResponse } from 'next/server'

const VARIANTS = ['a', 'b', 'c', 'd'] as const
const THEMES = ['baseline', 'operator-dark', 'operator-light', 'library'] as const
const VARIANT_COOKIE = 'kc-landing-variant'
const THEME_COOKIE = 'kc-landing-theme'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname !== '/') return NextResponse.next()

  const existingVariant = request.cookies.get(VARIANT_COOKIE)?.value
  const existingTheme = request.cookies.get(THEME_COOKIE)?.value

  const variant = VARIANTS.includes(existingVariant as any)
    ? existingVariant!
    : VARIANTS[Math.floor(Math.random() * VARIANTS.length)]

  const theme = THEMES.includes(existingTheme as any)
    ? existingTheme!
    : THEMES[Math.floor(Math.random() * THEMES.length)]

  const maxAge = 60 * 60 * 24 * 30

  if (variant === 'a') {
    const response = NextResponse.next()
    if (!existingVariant) response.cookies.set(VARIANT_COOKIE, variant, { maxAge, path: '/' })
    if (!existingTheme) response.cookies.set(THEME_COOKIE, theme, { maxAge, path: '/' })
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${variant}`
  const response = NextResponse.rewrite(url)

  if (!existingVariant) response.cookies.set(VARIANT_COOKIE, variant, { maxAge, path: '/' })
  if (!existingTheme) response.cookies.set(THEME_COOKIE, theme, { maxAge, path: '/' })

  return response
}

export const config = {
  matcher: ['/'],
}
