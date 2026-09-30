import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'
import { createGmailSender, deliverApprovalEmail, approvalEmailResponse } from '@/lib/betaApprovalEmail'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

const APP_URL = process.env.KNOWCAP_APP_URL || 'https://app.knowcap.ai'

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

    // Tell the applicant they're in, and record whether it went out (#158).
    // Best-effort: the approval already succeeded, so a failed send or a failed
    // status write never turns this into an error response.
    const emailResult = await deliverApprovalEmail(application, {
      send: createGmailSender(),
      saveOutcome: async (appId, record) => {
        await prisma.betaApplication.update({ where: { id: appId }, data: record })
      },
    })

    return NextResponse.json(
      { success: true, approvedAt: updated.approvedAt, ...approvalEmailResponse(emailResult) },
      { status: 200 },
    )
  } catch (error) {
    console.error('[APPROVE BETA APPLICATION ERROR]', error)
    return NextResponse.json({ error: 'Failed to approve application' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
