import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export async function DELETE(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { message: 'Submission ID is required' },
        { status: 400 }
      )
    }

    await prisma.contactSubmission.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Contact submission deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[DELETE CONTACT SUBMISSION ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to delete submission' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
