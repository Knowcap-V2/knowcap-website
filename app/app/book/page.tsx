
'use client'
import { useEffect } from 'react'
import Footer from '@/components/footer'

const CALENDLY_URL = 'https://calendly.com/smetools/meeting-with-hassan'

export default function BookPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Book a Strategy Conversation - Knowcap.ai'

    // Load the Calendly inline widget (replaced Reclaim 2026-06-11)
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode === document.body) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-white" style={{  }}>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1d29]">
              Book a Strategy Conversation
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              In this session, we'll review your current project challenges and see how Knowcap.ai could help streamline documentation, follow-ups, and delivery.
            </p>
          </div>

          {/* Embedded Calendly Widget */}
          <div className="w-full">
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{ minWidth: '320px', height: '700px' }}
            />
            <noscript>
              <p className="text-center">
                <a href={CALENDLY_URL} className="underline text-[#1a1d29]">
                  Book a time on Calendly
                </a>
              </p>
            </noscript>
          </div>


        </div>
      </div>
      <Footer />
      </main>
    </>
  )
}
