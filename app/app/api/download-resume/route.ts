import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getFileUrl } from '@/lib/s3'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

// Mark route as dynamic
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Missing application ID' },
        { status: 400 }
      )
    }

    // Get application from database
    const application = await prisma.recruitmentApplication.findUnique({
      where: { id },
      select: {
        cloud_storage_path: true,
        isPublic: true,
        resumePath: true
      }
    })

    if (!application) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    if (!application.cloud_storage_path) {
      return NextResponse.json(
        { message: 'Resume file not available' },
        { status: 404 }
      )
    }

    // Generate signed URL for private file
    const downloadUrl = await getFileUrl(
      application.cloud_storage_path,
      application.isPublic
    )

    return NextResponse.json({
      url: downloadUrl,
      filename: application.resumePath || 'resume.pdf'
    })
  } catch (error) {
    console.error('[DOWNLOAD RESUME ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to generate download URL' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
