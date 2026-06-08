import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// Send email using SMTP with Gmail App Password
async function sendEmail(to: string, subject: string, htmlBody: string) {
  console.log('[EMAIL] 🚀 Starting email send process via SMTP')
  console.log('[EMAIL] 📧 To:', to)
  console.log('[EMAIL] 📝 Subject:', subject)
  
  // Check for Gmail App Password
  const gmailPassword = process.env.GMAIL_APP_PASSWORD
  const gmailUser = process.env.GMAIL_USER || 'hsa@knowcap.ai'
  
  if (!gmailPassword) {
    console.error('[EMAIL] ❌ GMAIL_APP_PASSWORD not set in environment variables')
    throw new Error('Gmail App Password not configured. Please set GMAIL_APP_PASSWORD environment variable.')
  }
  
  console.log('[EMAIL] ✅ Gmail credentials found')
  console.log('[EMAIL] 📧 Sending from:', gmailUser)

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword
    }
  })
  
  console.log('[EMAIL] ✅ SMTP transporter created')

  // Send email
  console.log('[EMAIL] 📤 Sending email via SMTP...')
  const info = await transporter.sendMail({
    from: `"Knowcap.ai HR Team" <${gmailUser}>`,
    to: to,
    subject: subject,
    html: htmlBody
  })
  
  console.log('[EMAIL] ✅ Email sent successfully! Message ID:', info.messageId)
  return info
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { applicationId } = await request.json()
    
    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
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

    // Check if already sent
    if (application.interviewStatus === 'Link Sent' || application.interviewStatus === 'Interview Booked') {
      return NextResponse.json(
        { error: `Interview invitation already sent to ${application.fullName}` },
        { status: 400 }
      )
    }

    // Prepare email
    const subject = 'Invitation to Schedule Your Interview with Knowcap.ai'
    const htmlBody = `
      <p>Dear ${application.fullName},</p>

      <p>Thank you for your interest in joining Knowcap.ai. We would like to invite you to schedule an interview at a time convenient for you.</p>

      <p>Please use the following link to book your interview slot:</p>

      <p><a href="https://knowcap.ai/hr">https://knowcap.ai/hr</a></p>

      <p>We look forward to speaking with you soon.</p>

      <p>Best regards,<br/>
      Knowcap.ai HR Team</p>
    `

    // Send email
    console.log(`[API] Sending interview invitation to ${application.fullName} (${application.email})`)
    await sendEmail(application.email, subject, htmlBody)

    // Update application status
    await prisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: { interviewStatus: 'Link Sent' }
    })

    // Log the email
    await prisma.emailLog.create({
      data: {
        applicationId: applicationId,
        recipientEmail: application.email,
        recipientName: application.fullName,
        subject: subject,
        body: htmlBody,
        sentBy: 'admin_manual'
      }
    })

    console.log(`[API] ✅ Interview invitation sent successfully to ${application.fullName}`)

    return NextResponse.json({
      success: true,
      message: `Interview invitation sent to ${application.fullName}`,
      application: {
        id: application.id,
        fullName: application.fullName,
        email: application.email,
        interviewStatus: 'Link Sent'
      }
    })

  } catch (error: any) {
    console.error('[API] ❌ Error sending interview invitation:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send interview invitation' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
