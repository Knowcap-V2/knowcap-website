import { NextResponse } from 'next/server'
import { clearAdminCookie } from '@/lib/adminAuth'

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 })
  clearAdminCookie(res)
  return res
}
