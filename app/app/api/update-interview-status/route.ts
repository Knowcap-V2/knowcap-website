import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { applicationId, status } = await request.json()
    
    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['Pending', 'Link Sent', 'Interview Booked']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: Pending, Link Sent, Interview Booked' },
        { status: 400 }
      )
    }

    // Fetch the application
    const application = await prisma.recruitmentApplication.findUnique({
      where: { id: applicationId }
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Update application status
    const updatedApplication = await prisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: { interviewStatus: status }
    })

    console.log(`[API] ✅ Updated ${application.fullName}'s interview status to: ${status}`)

    return NextResponse.json({
      success: true,
      message: `Status updated to ${status}`,
      application: {
        id: updatedApplication.id,
        fullName: updatedApplication.fullName,
        email: updatedApplication.email,
        interviewStatus: updatedApplication.interviewStatus
      }
    })

  } catch (error: any) {
    console.error('[API] ❌ Error updating interview status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update interview status' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
