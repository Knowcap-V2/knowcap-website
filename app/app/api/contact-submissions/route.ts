import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(submissions, { status: 200 })
  } catch (error) {
    console.error('[GET CONTACT SUBMISSIONS ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
