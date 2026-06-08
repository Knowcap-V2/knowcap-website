import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const body = await request.json()
    const { applicationId, interviewFeedback, interviewRating } = body

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    // Validate rating if provided
    if (interviewRating !== undefined && interviewRating !== null) {
      if (interviewRating < 1 || interviewRating > 5) {
        return NextResponse.json(
          { error: 'Rating must be between 1 and 5' },
          { status: 400 }
        )
      }
    }

    const updatedApplication = await prisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: {
        interviewFeedback,
        interviewRating,
        interviewStatus: 'Interviewed' // Update status to Interviewed
      }
    })

    return NextResponse.json({
      success: true,
      application: updatedApplication
    })
  } catch (error) {
    console.error('Error updating interview feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update interview feedback' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
