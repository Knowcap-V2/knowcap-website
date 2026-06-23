import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono, Fraunces } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from 'sonner'
import PostHogProvider from '@/components/posthog-provider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
// Display font for the homepage headings (the LCP element). Self-hosted via
// next/font (preloaded, no render-blocking third-party @import). Variable font:
// full wght range + opsz/SOFT/WONK axes + italic, matching the prior @import.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://knowcap.ai'),
  title: 'Knowcap — The Trust Layer for AI Agents',
  description: 'The trust layer for AI agents. Capture meetings, messages, and recordings; a named human verifies each claim; agents act only on what\'s confirmed.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    siteName: 'Knowcap',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}>
      <head>
        {/* Warm the Google Fonts connections early — globals.css + the homepage
            still load Inter / Space Grotesk / JetBrains Mono via CSS @import, which
            is render-blocking; preconnect shaves the connection setup off the path.
            (Fraunces now self-hosts via next/font — no longer in the @import.) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ucq62z2e5n");
            `,
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-70G60W1TDK"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-70G60W1TDK');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#F5F4F1] text-[#1a1a1a] antialiased`}>
        <PostHogProvider />
        {children}
        <Toaster />
        <Sonner />
      </body>
    </html>
  )
}
