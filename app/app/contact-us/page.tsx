'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

export default function ContactUsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    document.title = 'Contact Us | Knowcap.ai'
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        // Redirect to thank you page
        router.push('/thank-you?type=contact')
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <EditorialShell>
      <PageHero
        kicker="Get In Touch"
        title={<>Let&apos;s Start a Conversation</>}
        sub="Have questions about Knowcap? Want to discuss how we can help your team? We are here to help."
      />
      <div className="cl-page-body">
        <div className="cl-wrap">
          <div className="cl-card" style={{ maxWidth: 720, margin: '0 auto', padding: 40 }}>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Knowcap">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="cl-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="cl-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="cl-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="cl-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="cl-label">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="cl-input"
                />
              </div>

              <div>
                <label htmlFor="subject" className="cl-label">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="cl-input"
                />
              </div>

              <div>
                <label htmlFor="message" className="cl-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="cl-input"
                  style={{ resize: 'vertical' }}
                  placeholder="Tell us how we can help..."
                />
              </div>

              <div role="status" aria-live="polite">
                {status === 'error' && (
                  <div style={{ padding: '12px 16px', background: '#FBEFEA', border: '1px solid #E4C3B7', borderRadius: 6 }}>
                    <p style={{ color: '#9A3B26', fontSize: 14 }}>{errorMessage}</p>
                  </div>
                )}

                {status === 'success' && (
                  <div style={{ padding: '12px 16px', background: 'var(--green-tint)', border: '1px solid var(--green)', borderRadius: 6 }}>
                    <p style={{ color: 'var(--green-deep)', fontSize: 14, fontWeight: 600 }}>
                      Message sent successfully! We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className="cl-btn cl-btn--solid"
                style={{
                  width: '100%',
                  opacity: status === 'submitting' || status === 'success' ? 0.6 : 1,
                  cursor: status === 'submitting' || status === 'success' ? 'not-allowed' : 'pointer'
                }}
              >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </EditorialShell>
  )
}
