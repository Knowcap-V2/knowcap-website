'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ArrowRight, Loader2, ChevronUp, ChevronDown } from 'lucide-react'
import Image from 'next/image'

/* ─── Question definitions ─────────────────────────────────── */

const CHALLENGES = [
  'Decisions get made verbally and then forgotten',
  'AI agents act on assumptions, not verified facts',
  'No audit trail of what was agreed and by whom',
  'Meeting follow-ups are scattered across emails and chats',
]

const PLATFORMS = [
  'Zoom', 'Google Meet', 'Microsoft Teams', 'Slack Huddles',
  'Phone Calls', 'In-Person', 'WhatsApp', 'Webex',
]

const TEAM_SIZES = ['Just me', '2–10', '11–50', '50+']

type Step =
  | 'challenge'
  | 'platforms'
  | 'role'
  | 'teamSize'
  | 'contact'
  | 'motivation'
  | 'consent'
  | 'success'

const STEP_ORDER: Step[] = [
  'challenge', 'platforms', 'role', 'teamSize', 'contact', 'motivation', 'consent',
]

const STEP_LABELS: Record<Step, string> = {
  challenge: 'What\'s your biggest challenge with meetings?',
  platforms: 'Where do your team meetings happen?',
  role: 'What is your job title?',
  teamSize: 'How large is your team?',
  contact: 'Share your contact details',
  motivation: 'What do you hope to solve with Knowcap?',
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
      style={{ backgroundColor: disabled ? '#334155' : '#005EFF', cursor: disabled ? 'not-allowed' : 'pointer' }}
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

function SingleChoice({
  stepNum, question, choices, value, onChange, onNext,
}: {
  stepNum: number; question: string; choices: string[];
  value: string; onChange: (v: string) => void; onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question={question} />
      <p className="text-xs text-gray-500 -mt-4">Choose 1</p>
      <div className="flex flex-col gap-3">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => { onChange(c); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${
              value === c
                ? 'border-[#005EFF] bg-[#005EFF]/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
              value === c ? 'bg-[#005EFF] border-[#005EFF]' : 'border-gray-600'
            }`}>
              {value === c && <Check className="w-3 h-3 text-white" />}
            </span>
            {c}
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
  const toggle = (c: string) => {
    if (value.includes(c)) {
      onChange(value.filter((x) => x !== c))
    } else if (!max || value.length < max) {
      onChange([...value, c])
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl">
      <QuestionLabel stepNum={stepNum} question={question} />
      {hint && <p className="text-xs text-gray-500 -mt-4">{hint}</p>}
      <div className="flex flex-col gap-3">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => toggle(c)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all ${
              value.includes(c)
                ? 'border-[#005EFF] bg-[#005EFF]/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
              value.includes(c) ? 'bg-[#005EFF] border-[#005EFF]' : 'border-gray-600'
            }`}>
              {value.includes(c) && <Check className="w-3 h-3 text-white" />}
            </span>
            {c}
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
      <div className="border-b border-gray-600 focus-within:border-[#005EFF] transition-colors">
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
        <div key={field} className="border-b border-gray-600 focus-within:border-[#005EFF] transition-colors">
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
      <QuestionLabel stepNum={stepNum} question="What do you hope to solve with Knowcap?" />
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us about your meeting challenges, what you're building, or what you hope to achieve..."
        rows={4}
        className="w-full bg-transparent border border-gray-700 focus:border-[#005EFF] rounded-lg text-white p-3 outline-none placeholder:text-gray-600 resize-none transition-colors text-sm"
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
                ? 'border-[#005EFF] bg-[#005EFF]/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <span className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
              (opt === 'I accept' && accepted) ? 'bg-[#005EFF] border-[#005EFF]' : 'border-gray-600'
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
        style={{ backgroundColor: !accepted || loading ? '#334155' : '#005EFF', cursor: !accepted || loading ? 'not-allowed' : 'pointer' }}
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
        style={{ backgroundColor: '#005EFF' }}
      >
        Explore Knowcap <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}

function QuestionLabel({ stepNum, question }: { stepNum: number; question: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#005EFF] text-sm font-semibold mt-1 flex-shrink-0">{stepNum}</span>
      <p className="text-xl font-semibold text-white leading-snug" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {question} <span className="text-[#005EFF]">*</span>
      </p>
    </div>
  )
}

/* ─── Main component ───────────────────────────────────────── */

export default function BetaTypeform() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('challenge')
  const [animating, setAnimating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [challenge, setChallenge] = useState('')
  const [platforms, setPlatforms] = useState<string[]>([])
  const [role, setRole] = useState('')
  const [teamSize, setTeamSize] = useState('')
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

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/submit-beta-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          company: contact.company,
          role,
          motivation,
          teamSize,
          topChallenge: challenge,
          meetingPlatforms: platforms.join(', '),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      goTo('success')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.')
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
        {currentStep !== 'success' && (
          <span className="text-gray-500 text-sm">
            {stepIndex + 1} / {totalVisible}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {currentStep !== 'success' && (
        <div className="h-0.5 bg-gray-800 mx-0">
          <div
            className="h-full bg-[#005EFF] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div
          className="w-full transition-all duration-200"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(12px)' : 'translateY(0)' }}
        >
          {currentStep === 'challenge' && (
            <SingleChoice
              stepNum={1}
              question="What's your biggest challenge with meetings?"
              choices={CHALLENGES}
              value={challenge}
              onChange={setChallenge}
              onNext={next}
            />
          )}
          {currentStep === 'platforms' && (
            <MultiChoice
              stepNum={2}
              question="Where do your team meetings happen?"
              hint="Select your top platforms"
              choices={PLATFORMS}
              value={platforms}
              onChange={setPlatforms}
              onNext={next}
            />
          )}
          {currentStep === 'role' && (
            <TextInput
              stepNum={3}
              question="What is your job title?"
              placeholder="e.g. CEO, Product Manager, Consultant"
              value={role}
              onChange={setRole}
              onNext={next}
            />
          )}
          {currentStep === 'teamSize' && (
            <SingleChoice
              stepNum={4}
              question="How large is your team?"
              choices={TEAM_SIZES}
              value={teamSize}
              onChange={setTeamSize}
              onNext={next}
            />
          )}
          {currentStep === 'contact' && (
            <ContactStep
              stepNum={5}
              values={contact}
              onChange={(k, v) => setContact((c) => ({ ...c, [k]: v }))}
              onNext={next}
              loading={false}
            />
          )}
          {currentStep === 'motivation' && (
            <MotivationStep
              stepNum={6}
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
      {currentStep !== 'success' && (
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
