import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'
import { createGmailSender, resendApprovalEmail } from '@/lib/betaApprovalEmail'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// Re-send the "you're in" invite to an already-approved beta applicant and
// record the new outcome (issue #158). Admin-only, same guard as approve.
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { id } = await request.json()
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Application id is required' }, { status: 400 })
    }

    const application = await prisma.betaApplication.findUnique({ where: { id } })
    const { status, body } = await resendApprovalEmail(application, {
      send: createGmailSender(),
      saveOutcome: async (appId, record) => {
        await prisma.betaApplication.update({ where: { id: appId }, data: record })
      },
    })
    return NextResponse.json(body, { status })
  } catch (error) {
    console.error('[RESEND BETA APPROVAL EMAIL ERROR]', error)
    return NextResponse.json({ error: 'Failed to resend invite email' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
