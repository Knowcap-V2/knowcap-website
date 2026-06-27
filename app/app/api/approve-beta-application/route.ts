import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

const APP_URL = process.env.KNOWCAP_APP_URL || 'https://app.knowcap.ai'

// Email the approved applicant "you're in — sign up now".
async function sendApprovalEmail(to: string, name: string) {
  const gmailPassword = process.env.GMAIL_APP_PASSWORD
  const gmailUser = process.env.GMAIL_USER || 'hsa@knowcap.ai'
  if (!gmailPassword) {
    console.warn('[approve] GMAIL_APP_PASSWORD not set — skipping applicant email')
    return { sent: false }
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPassword },
  })
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'
  const html = `
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
  await transporter.sendMail({
    from: `"Knowcap" <${gmailUser}>`,
    to,
    subject: 'You are approved for Knowcap early access',
    html,
  })
  return { sent: true }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Application id is required' }, { status: 400 })
    }

    const application = await prisma.betaApplication.findUnique({ where: { id } })
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    const adminToken = process.env.BETA_ADMIN_TOKEN
    if (!adminToken) {
      return NextResponse.json(
        { error: 'BETA_ADMIN_TOKEN is not configured on the website — cannot reach the app allowlist.' },
        { status: 503 },
      )
    }

    // Bridge: add the applicant's email to the app's beta_allowlist so they can sign up.
    const allowlistRes = await fetch(`${APP_URL}/api/auth/allowlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        emails: [application.email],
        addedBy: 'knowcap.ai admin',
        note: `Beta approve: ${application.name} (${application.company})`,
      }),
    })

    if (!allowlistRes.ok) {
      const detail = await allowlistRes.text().catch(() => '')
      console.error('[approve] allowlist call failed', allowlistRes.status, detail)
      return NextResponse.json(
        { error: `Failed to add to allowlist (app returned ${allowlistRes.status}). Check BETA_ADMIN_TOKEN matches the app.` },
        { status: 502 },
      )
    }

    // Mark approved (only after the allowlist write succeeded).
    const updated = await prisma.betaApplication.update({
      where: { id },
      data: { approvedAt: new Date(), approvedBy: 'admin' },
    })

    // Tell the applicant they're in (best-effort; approval already succeeded).
    let emailed = false
    try {
      const r = await sendApprovalEmail(application.email, application.name)
      emailed = r.sent
    } catch (e: any) {
      console.error('[approve] applicant email failed:', e?.message)
    }

    return NextResponse.json(
      { success: true, approvedAt: updated.approvedAt, emailed },
      { status: 200 },
    )
  } catch (error) {
    console.error('[APPROVE BETA APPLICATION ERROR]', error)
    return NextResponse.json({ error: 'Failed to approve application' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
