import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const body = await request.json()
    const { applicationId, meetingLink } = body

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    // Update the meeting link
    const updatedApplication = await prisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: { meetingLink: meetingLink || null }
    })

    return NextResponse.json({
      success: true,
      application: updatedApplication
    })
  } catch (error) {
    console.error('Error updating meeting link:', error)
    return NextResponse.json(
      { error: 'Failed to update meeting link' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
