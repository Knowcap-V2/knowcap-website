'use client'

import { Mail, AlertCircle, Loader } from 'lucide-react'

// Admin list: invite-email outcome for an approved beta applicant + Resend (#158).

interface ApprovalEmailFields {
  approvalEmailStatus: string | null
  approvalEmailError: string | null
  approvalEmailSentAt: string | null
}

/** Pick the persisted email-outcome fields out of an approve/resend response. */
export function approvalEmailFields(result: any): Partial<ApprovalEmailFields> {
  const fields: Partial<ApprovalEmailFields> = {
    approvalEmailStatus: result.approvalEmailStatus ?? null,
    approvalEmailError: result.approvalEmailError ?? null,
  }
  // A failed attempt keeps the last successful send time.
  if (result.approvalEmailSentAt) fields.approvalEmailSentAt = result.approvalEmailSentAt
  return fields
}

function statusLine(app: ApprovalEmailFields) {
  if (app.approvalEmailStatus === 'sent') {
    const at = app.approvalEmailSentAt ? new Date(app.approvalEmailSentAt).toLocaleString() : 'unknown time'
    return <span className="text-green-700">Invite email sent {at}</span>
  }
  if (app.approvalEmailStatus === 'failed') {
    return (
      <span className="text-red-700 flex items-start gap-1">
        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
        <span>Invite email failed: {app.approvalEmailError || 'unknown error'}</span>
      </span>
    )
  }
  return <span className="text-gray-500">Invite email: not recorded (approved before tracking)</span>
}

export default function BetaApprovalEmailStatus({
  app,
  resending,
  onResend,
}: {
  app: ApprovalEmailFields
  resending: boolean
  onResend: () => void
}) {
  return (
    <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 text-sm">
      {statusLine(app)}
      <button
        onClick={onResend}
        disabled={resending}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50"
        title="Re-send the 'you're in' invite email and record the result"
      >
        {resending ? <Loader className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
        Resend invite
      </button>
    </div>
  )
}
