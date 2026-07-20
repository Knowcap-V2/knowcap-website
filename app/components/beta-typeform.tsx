'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ArrowRight, Loader2, ChevronUp, ChevronDown, Mic, Disc3, FileUp, Link2, Send, Clock } from 'lucide-react'
import Image from 'next/image'
import { identifyLead, trackEvent } from '@/components/posthog-provider'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/* ─── Question definitions ─────────────────────────────────── */

const SEGMENTS = [
  'Odoo / ERP implementation partner',
  'Consulting, audit, or law firm',
  'Regulated business (finance, health, edtech)',
  'I build with AI agents',
  'Agency / marketing',
  'Something else',
]

const PAINS = [
  'Scope creep — "we agreed X" but there\'s no record',
  'Our AI agents act on assumptions, not verified facts',
  'No audit trail of who agreed what, and when',
  'Follow-ups scatter across email, WhatsApp, and chat',
]

const CHANNELS = [
  'Meetings (Zoom / Meet / Teams)', 'WhatsApp', 'Phone calls',
  'Email', 'Telegram', 'Inside Odoo / a CRM',
]

const AI_USAGE = [
  'Yes — daily (Claude, ChatGPT, Cursor...)',
  'Sometimes, still exploring',
  'Not yet, but I want to',
]

const REGIONS = ['Egypt', 'Saudi Arabia', 'UAE', 'Elsewhere in MENA', 'Outside MENA']

type Step =
  | 'welcome'
  | 'segment'
  | 'pain'
  | 'channels'
  | 'aiUsage'
  | 'region'
  | 'contact'
  | 'motivation'
  | 'consent'
  | 'success'

/* the five Knowcap capture sources shown as floating icons on the welcome screen */
const SOURCES = [
  { Icon: Mic, label: 'Meetings' },
  { Icon: Disc3, label: 'Recordings' },
  { Icon: FileUp, label: 'Uploads' },
  { Icon: Link2, label: 'URLs' },
  { Icon: Send, label: 'Telegram' },
]

/* letter key badges (kinso-style A/B/C shortcuts) */
const KEYS = 'ABCDEFGH'

const STEP_ORDER: Step[] = [
  'segment', 'pain', 'channels', 'aiUsage', 'region', 'contact', 'motivation', 'consent',
]

const STEP_LABELS: Record<Step, string> = {
  welcome: 'welcome',
  segment: 'Which best describes your work?',
  pain: 'When something gets "agreed" in a meeting or chat, what goes wrong?',
  channels: 'Where do your important conversations actually live?',
  aiUsage: 'Do you already run AI agents?',
  region: 'Where\'s your team based?',
  contact: 'Share your contact details',
  motivation: 'What would make Knowcap a must-have for you?',
  consent: 'One last thing',
  success: 'success',
}

/* ─── Helpers ──────────────────────────────────────────────── */

function OkButton({ onClick, disabled, loading }: { onClick: () => void; disabled?: boolean; loading?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
      style={{ backgroundColor: disabled ? '#334155' : '#1F6B3A', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
        <>
          OK <Check className="w-3.5 h-3.5" />
        </>
      )}
    </button>
  )
}

function KeyHint({ label = 'press Enter' }: { label?: string }) {
  return (
    <span className="ml-3 text-xs text-gray-500">{label} ↵</span>
  )
}

/* ─── Individual step renderers ────────────────────────────── */

function KeyBadge({ k, active }: { k: string; active: boolean }) {
  return (
    <span className={`ml-auto w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[11px] font-semibold transition-all ${
      active ? 'bg-[#1F6B3A] text-white' : 'bg-gray-800 text-gray-500'
    }`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {k}
    </span>
  )
}

function SingleChoice({
  stepNum, question, choices, value, onChange, onNext,
}: {
  stepNum: number; question: string; choices: string[];
  value: string; onChange: (v: string) => void; onNext: () => void;
}) {
  /* kinso-style: A/B/C selects a choice, Enter advances */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && value) { e.preventDefault(); onNext(); return }
      const idx = KEYS.indexOf(e.key.toUpperCase())
      if (idx >= 0 && idx < choices.length) { e.preventDefault(); onChange(choices[idx]) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [choices, value, onChange, onNext])

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question={question} />
      <p className="text-xs text-gray-500 -mt-4">Choose 1</p>
      <div className="flex flex-col gap-3">
        {choices.map((c, i) => (
          <button
            key={c}
            onClick={() => { onChange(c); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${
              value === c
                ? 'border-[#1F6B3A] bg-[#1F6B3A]/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
              value === c ? 'bg-[#1F6B3A] border-[#1F6B3A]' : 'border-gray-600'
            }`}>
              {value === c && <Check className="w-3 h-3 text-white" />}
            </span>
            {c}
            <KeyBadge k={KEYS[i]} active={value === c} />
          </button>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <OkButton onClick={onNext} disabled={!value} />
        <KeyHint />
      </div>
    </div>
  )
}

function MultiChoice({
  stepNum, question, choices, hint, max, value, onChange, onNext,
}: {
  stepNum: number; question: string; choices: string[];
  hint?: string; max?: number; value: string[];
  onChange: (v: string[]) => void; onNext: () => void;
}) {
  const toggle = useCallback((c: string) => {
    if (value.includes(c)) {
      onChange(value.filter((x) => x !== c))
    } else if (!max || value.length < max) {
      onChange([...value, c])
    }
  }, [value, max, onChange])

  /* kinso-style: A/B/C toggles a choice, Enter advances */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && value.length > 0) { e.preventDefault(); onNext(); return }
      const idx = KEYS.indexOf(e.key.toUpperCase())
      if (idx >= 0 && idx < choices.length) { e.preventDefault(); toggle(choices[idx]) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [choices, value, toggle, onNext])

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question={question} />
      {hint && <p className="text-xs text-gray-500 -mt-4">{hint}</p>}
      <div className="flex flex-col gap-3">
        {choices.map((c, i) => (
          <button
            key={c}
            onClick={() => toggle(c)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${
              value.includes(c)
                ? 'border-[#1F6B3A] bg-[#1F6B3A]/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
              value.includes(c) ? 'bg-[#1F6B3A] border-[#1F6B3A]' : 'border-gray-600'
            }`}>
              {value.includes(c) && <Check className="w-3 h-3 text-white" />}
            </span>
            {c}
            <KeyBadge k={KEYS[i]} active={value.includes(c)} />
          </button>
        ))}
      </div>
      <div className="flex items-center mt-2">
        <OkButton onClick={onNext} disabled={value.length === 0} />
        <KeyHint />
      </div>
    </div>
  )
}

function TextInput({
  stepNum, question, placeholder, value, onChange, onNext,
}: {
  stepNum: number; question: string; placeholder: string;
  value: string; onChange: (v: string) => void; onNext: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question={question} />
      <div className="border-b border-gray-600 focus-within:border-[#1F6B3A] transition-colors">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) onNext() }}
          placeholder={placeholder}
          className="w-full bg-transparent text-white text-lg py-2 outline-none placeholder:text-gray-600"
        />
      </div>
      <div className="flex items-center">
        <OkButton onClick={onNext} disabled={!value.trim()} />
        <KeyHint />
      </div>
    </div>
  )
}

function ContactStep({
  stepNum, values, onChange, onNext, loading,
}: {
  stepNum: number;
  values: { name: string; email: string; company: string };
  onChange: (k: 'name' | 'email' | 'company', v: string) => void;
  onNext: () => void;
  loading?: boolean;
}) {
  const nameRef = useRef<HTMLInputElement>(null)
  useEffect(() => { setTimeout(() => nameRef.current?.focus(), 100) }, [])

  const valid = values.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) && values.company.trim()

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question="Share your contact details" />
      <p className="text-xs text-gray-500 -mt-4">So we can reach you when your spot opens</p>
      {(['name', 'email', 'company'] as const).map((field, i) => (
        <div key={field} className="border-b border-gray-600 focus-within:border-[#1F6B3A] transition-colors">
          <input
            ref={field === 'name' ? nameRef : undefined}
            type={field === 'email' ? 'email' : 'text'}
            value={values[field]}
            onChange={(e) => onChange(field, e.target.value)}
            placeholder={field === 'name' ? 'Your full name' : field === 'email' ? 'name@company.com' : 'Company name'}
            className="w-full bg-transparent text-white py-2 outline-none placeholder:text-gray-600"
          />
        </div>
      ))}
      <div className="flex items-center mt-2">
        <OkButton onClick={onNext} disabled={!valid} loading={loading} />
        <KeyHint />
      </div>
    </div>
  )
}

function MotivationStep({
  stepNum, value, onChange, onNext,
}: {
  stepNum: number; value: string; onChange: (v: string) => void; onNext: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { setTimeout(() => ref.current?.focus(), 100) }, [])

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question="What would make Knowcap a must-have for you?" />
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us about your meeting challenges, what you're building, or what you hope to achieve..."
        rows={4}
        className="w-full bg-transparent border border-gray-700 focus:border-[#1F6B3A] rounded-lg text-white p-3 outline-none placeholder:text-gray-600 resize-none transition-colors text-sm"
      />
      <div className="flex items-center">
        <OkButton onClick={onNext} disabled={!value.trim()} />
        <KeyHint />
      </div>
    </div>
  )
}

function ConsentStep({ onSubmit, loading }: { onSubmit: () => void; loading: boolean }) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          One last thing
        </p>
        <p className="text-sm text-gray-400 leading-relaxed">
          By submitting this form, you agree to receive emails and occasional updates from Knowcap.
          You can unsubscribe at any time.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {(['I accept', "I don't accept"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setAccepted(opt === 'I accept')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${
              (opt === 'I accept' ? accepted : !accepted && accepted !== undefined)
                ? 'border-[#1F6B3A] bg-[#1F6B3A]/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
              (opt === 'I accept' && accepted) ? 'bg-[#1F6B3A] border-[#1F6B3A]' : 'border-gray-600'
            }`}>
              {opt === 'I accept' && accepted && <Check className="w-3 h-3 text-white" />}
            </span>
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={onSubmit}
        disabled={!accepted || loading}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all w-40"
        style={{ backgroundColor: !accepted || loading ? '#334155' : '#1F6B3A', cursor: !accepted || loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
      </button>
    </div>
  )
}

function SuccessStep() {
  return (
    <div className="flex flex-col items-start gap-6 w-full max-w-xl">
      <div className="flex flex-col gap-3">
        <p className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          You&apos;re officially in line for<br />early access to Knowcap.
        </p>
        <p className="text-gray-400 text-base leading-relaxed">
          We&apos;ll review your application and reach out when your spot opens.
          Keep an eye on your inbox.
        </p>
      </div>
      <a
        href="https://knowcap.ai"
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90"
        style={{ backgroundColor: '#1F6B3A' }}
      >
        Explore Knowcap <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}

function WelcomeStep({ onStart }: { onStart: () => void }) {
  /* Enter starts the form (kinso-style) */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); onStart() } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onStart])

  return (
    <div className="flex flex-col items-center text-center gap-7 w-full max-w-xl mx-auto">
      {/* floating source icons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {SOURCES.map(({ Icon, label }, i) => (
          <div
            key={label}
            title={label}
            className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-[#1F6B3A] shadow-lg"
            style={{ animation: `float 3s ease-in-out ${i * 0.2}s infinite` }}
          >
            <Icon className="w-5 h-5" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Apply for Knowcap Invite-Only Access
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
          We&apos;re rolling out Knowcap gradually starting June 2026.
          Join the queue for exclusive, invite-only access.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onStart}
          className="flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: '#1F6B3A' }}
        >
          Start <ArrowRight className="w-4 h-4" />
        </button>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" /> Takes 30 sec
        </span>
      </div>

      <style>{`@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }`}</style>
    </div>
  )
}

function QuestionLabel({ stepNum, question }: { stepNum: number; question: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#1F6B3A] text-sm font-semibold mt-1 flex-shrink-0">{stepNum}</span>
      <p className="text-xl font-semibold text-white leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {question} <span className="text-[#1F6B3A]">*</span>
      </p>
    </div>
  )
}

/* ─── Main component ───────────────────────────────────────── */

export default function BetaTypeform() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [animating, setAnimating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [segment, setSegment] = useState('')
  const [pain, setPain] = useState('')
  const [channels, setChannels] = useState<string[]>([])
  const [aiUsage, setAiUsage] = useState('')
  const [region, setRegion] = useState('')
  const [contact, setContact] = useState({ name: '', email: '', company: '' })
  const [motivation, setMotivation] = useState('')

  const stepIndex = STEP_ORDER.indexOf(currentStep)
  const totalVisible = STEP_ORDER.length

  const goTo = useCallback((step: Step) => {
    setAnimating(true)
    setTimeout(() => {
      setCurrentStep(step)
      setAnimating(false)
    }, 200)
  }, [])

  const next = useCallback(() => {
    const idx = STEP_ORDER.indexOf(currentStep)
    if (idx < STEP_ORDER.length - 1) {
      goTo(STEP_ORDER[idx + 1])
    }
  }, [currentStep, goTo])

  const prev = useCallback(() => {
    const idx = STEP_ORDER.indexOf(currentStep)
    if (idx > 0) goTo(STEP_ORDER[idx - 1])
  }, [currentStep, goTo])

  // Lead capture (Jun 2026 incident: backend submits failed silently and 2
  // completed applications were unrecoverable — no email anywhere). Identify
  // the lead in PostHog the moment they advance past the contact step, so a
  // later backend failure can never lose their contact info again.
  const prevStepRef = useRef(currentStep)
  useEffect(() => {
    const leftContact = prevStepRef.current === 'contact' && currentStep !== 'contact'
    prevStepRef.current = currentStep
    if (!leftContact) return
    const email = contact.email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    identifyLead(email, { name: contact.name, company: contact.company })
    trackEvent('beta_contact_entered', {
      name: contact.name,
      email,
      company: contact.company,
    })
  }, [currentStep, contact])

  const submit = async () => {
    setLoading(true)
    setError('')
    const payload = {
      name: contact.name,
      email: contact.email,
      company: contact.company,
      role: segment,
      motivation,
      topChallenge: pain,
      meetingPlatforms: channels.join(', '),
      aiUsage,
      region,
    }
    // Capture BEFORE the network call: the lead + full answers live in
    // PostHog even if the API dies mid-flight.
    identifyLead(contact.email, { name: contact.name, company: contact.company })
    trackEvent('beta_form_submitted', payload)
    try {
      const res = await fetch('/api/submit-beta-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      goTo('success') // navigate first — a capture hiccup must never mask a saved application
      trackEvent('beta_form_success', { email: contact.email })
      // Mirror to GA4 (PostHog has the rich person/journey data; this makes the
      // conversion visible in Google's own dashboard too, e.g. for channel reports
      // that only read GA4 natively). No PII beyond what GA4 already collects.
      window.gtag?.('event', 'beta_form_success', { event_category: 'beta' })
      // Google Ads conversion — beta signup is the lead event campaigns optimize toward.
      window.gtag?.('event', 'conversion', {
        send_to: 'AW-18263083552/T8BkCM-svMMcEKCUwoRE',
        value: 1.0,
        currency: 'EGP',
      })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Something went wrong. Try again.'
      trackEvent('beta_form_error', { email: contact.email, error: message })
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  /* keyboard: Enter advances, Escape goes back */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev])

  const progress = currentStep === 'success' ? 100 : ((stepIndex + 1) / totalVisible) * 100

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D0F14', fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5">
        <a href="https://knowcap.ai" className="flex items-center gap-2">
          <img src="/knowcap-logo.png" alt="Knowcap" className="h-7" />
        </a>
        {currentStep !== 'success' && currentStep !== 'welcome' && (
          <span className="text-gray-500 text-sm">
            {stepIndex + 1} / {totalVisible}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {currentStep !== 'success' && currentStep !== 'welcome' && (
        <div className="h-0.5 bg-gray-800 mx-0">
          <div
            className="h-full bg-[#1F6B3A] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div
          className="w-full max-w-xl mx-auto transition-all duration-200"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(12px)' : 'translateY(0)' }}
        >
          {currentStep === 'welcome' && (
            <WelcomeStep onStart={() => goTo('segment')} />
          )}
          {currentStep === 'segment' && (
            <SingleChoice
              stepNum={1}
              question={STEP_LABELS.segment}
              choices={SEGMENTS}
              value={segment}
              onChange={setSegment}
              onNext={next}
            />
          )}
          {currentStep === 'pain' && (
            <SingleChoice
              stepNum={2}
              question={STEP_LABELS.pain}
              choices={PAINS}
              value={pain}
              onChange={setPain}
              onNext={next}
            />
          )}
          {currentStep === 'channels' && (
            <MultiChoice
              stepNum={3}
              question={STEP_LABELS.channels}
              hint="Select all that apply"
              choices={CHANNELS}
              value={channels}
              onChange={setChannels}
              onNext={next}
            />
          )}
          {currentStep === 'aiUsage' && (
            <SingleChoice
              stepNum={4}
              question={STEP_LABELS.aiUsage}
              choices={AI_USAGE}
              value={aiUsage}
              onChange={setAiUsage}
              onNext={next}
            />
          )}
          {currentStep === 'region' && (
            <SingleChoice
              stepNum={5}
              question={STEP_LABELS.region}
              choices={REGIONS}
              value={region}
              onChange={setRegion}
              onNext={next}
            />
          )}
          {currentStep === 'contact' && (
            <ContactStep
              stepNum={6}
              values={contact}
              onChange={(k, v) => setContact((c) => ({ ...c, [k]: v }))}
              onNext={next}
              loading={false}
            />
          )}
          {currentStep === 'motivation' && (
            <MotivationStep
              stepNum={7}
              value={motivation}
              onChange={setMotivation}
              onNext={next}
            />
          )}
          {currentStep === 'consent' && (
            <ConsentStep onSubmit={submit} loading={loading} />
          )}
          {currentStep === 'success' && <SuccessStep />}
        </div>
      </div>

      {/* Bottom nav (prev / next arrows) */}
      {currentStep !== 'success' && currentStep !== 'welcome' && (
        <div className="flex items-center justify-end gap-2 px-8 py-4">
          {error && <span className="text-red-400 text-sm mr-auto">{error}</span>}
          <button
            onClick={prev}
            disabled={stepIndex === 0}
            className="p-2 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={currentStep === 'consent'}
            className="p-2 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
