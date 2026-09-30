import nodemailer from 'nodemailer'

// Beta-waitlist "you're in" invite email: send it, record the outcome on the
// BetaApplication row, and resend on demand (issue #158). Dependencies are
// injected so the logic is testable without Prisma or a live SMTP server.

const APP_URL = process.env.KNOWCAP_APP_URL || 'https://app.knowcap.ai'
const MAX_ERROR_LENGTH = 500

export type SendMail = (msg: { to: string; subject: string; html: string }) => Promise<unknown>

export type ApprovalEmailOutcome =
  | { status: 'sent'; error: null }
  | { status: 'failed'; error: string }

export interface ApprovalEmailRecord {
  approvalEmailStatus: 'sent' | 'failed'
  approvalEmailError: string | null
  approvalEmailSentAt?: Date
}

export interface ApprovalEmailDeps {
  /** null when the sender is not configured (no GMAIL_APP_PASSWORD). */
  send: SendMail | null
  saveOutcome: (id: string, record: ApprovalEmailRecord) => Promise<void>
}

export interface Applicant {
  id: string
  email: string
  name: string
  approvedAt?: Date | null
}

/** Gmail sender from env, or null when the app password is missing. */
export function createGmailSender(): SendMail | null {
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!pass) return null
  const user = process.env.GMAIL_USER || 'hsa@knowcap.ai'
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  return (msg) => transporter.sendMail({ from: `"Knowcap" <${user}>`, ...msg })
}

function buildApprovalEmailHtml(to: string, name: string): string {
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #191F2E;">
      <h2 style="color: #005EFF;">You're in.</h2>
      <p>Hi ${firstName},</p>
      <p>Your Knowcap early-access spot is open. Create your account with <strong>this email address</strong> to get in:</p>
      <p style="margin: 24px 0;">
        <a href="${APP_URL}/register" style="background-color: #005EFF; color: white; padding: 12px 22px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">Create your Knowcap account</a>
      </p>
      <p style="color: #6b7280; font-size: 13px;">Use the same email you applied with (${to}) — that's the one on the invite list.</p>
      <p style="margin-top: 24px;">- The Knowcap team</p>
    </div>
  `
}

/** Only the error's message text is kept — never the error object or config. */
function errorMessage(e: unknown): string {
  const msg = e instanceof Error ? e.message : typeof e === 'string' ? e : ''
  return (msg || 'Unknown email error').slice(0, MAX_ERROR_LENGTH)
}

export async function sendApprovalEmail(
  to: string,
  name: string,
  send: SendMail | null,
): Promise<ApprovalEmailOutcome> {
  if (!send) return { status: 'failed', error: 'GMAIL_APP_PASSWORD is not set on the website' }
  try {
    await send({ to, subject: 'You are approved for Knowcap early access', html: buildApprovalEmailHtml(to, name) })
    return { status: 'sent', error: null }
  } catch (e) {
    return { status: 'failed', error: errorMessage(e) }
  }
}

export function toApprovalEmailRecord(outcome: ApprovalEmailOutcome, now: Date): ApprovalEmailRecord {
  if (outcome.status === 'sent') {
    return { approvalEmailStatus: 'sent', approvalEmailError: null, approvalEmailSentAt: now }
  }
  // Keep any earlier approvalEmailSentAt: it is the last *successful* send.
  return { approvalEmailStatus: 'failed', approvalEmailError: outcome.error }
}

export interface ApprovalEmailResult {
  outcome: ApprovalEmailOutcome
  record: ApprovalEmailRecord
  persisted: boolean
}

/**
 * Send the invite and persist the outcome. A failed status write is logged,
 * not thrown: the approval itself already succeeded and must not become a 500.
 */
export async function deliverApprovalEmail(
  applicant: Applicant,
  deps: ApprovalEmailDeps,
  now: Date = new Date(),
): Promise<ApprovalEmailResult> {
  const outcome = await sendApprovalEmail(applicant.email, applicant.name, deps.send)
  if (outcome.status === 'failed') {
    console.error('[approve] applicant email failed:', outcome.error)
  }
  const record = toApprovalEmailRecord(outcome, now)
  try {
    await deps.saveOutcome(applicant.id, record)
    return { outcome, record, persisted: true }
  } catch (e) {
    console.error('[approve] could not record email outcome:', errorMessage(e))
    return { outcome, record, persisted: false }
  }
}

/** Response body shared by the approve and resend routes. */
export function approvalEmailResponse(result: ApprovalEmailResult) {
  return {
    emailed: result.outcome.status === 'sent',
    approvalEmailStatus: result.record.approvalEmailStatus,
    approvalEmailError: result.record.approvalEmailError,
    approvalEmailSentAt: result.record.approvalEmailSentAt ?? null,
    emailStatusRecorded: result.persisted,
  }
}

/** Resend for an already-approved applicant. Returns an HTTP status + body. */
export async function resendApprovalEmail(
  applicant: Applicant | null,
  deps: ApprovalEmailDeps,
  now: Date = new Date(),
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!applicant) return { status: 404, body: { error: 'Application not found' } }
  if (!applicant.approvedAt) {
    return { status: 409, body: { error: 'Application is not approved yet — approve it first' } }
  }
  const result = await deliverApprovalEmail(applicant, deps, now)
  return { status: 200, body: { success: true, ...approvalEmailResponse(result) } }
}
