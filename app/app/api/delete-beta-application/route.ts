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
        { message: 'Application ID is required' },
        { status: 400 }
      )
    }

    await prisma.betaApplication.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Application deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[DELETE BETA APPLICATION ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to delete application' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
