import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

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
    from: `"Knowcap Beta Applications" <${gmailUser}>`,
    to: to,
    subject: subject,
    html: htmlBody
  })
  
  console.log('[EMAIL] ✅ Email sent successfully! Message ID:', info.messageId)
  return info
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, role, motivation, teamSize, topChallenge, meetingPlatforms } = body

    // Validate required fields
    if (!name || !email || !company || !role || !motivation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to database
    const application = await prisma.betaApplication.create({
      data: {
        name,
        email,
        company,
        role,
        motivation,
        teamSize: teamSize || null,
        topChallenge: topChallenge || null,
        meetingPlatforms: meetingPlatforms || null,
      }
    })

    console.log('=== NEW BETA APPLICATION ===')
    console.log('ID:', application.id)
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Company:', company)
    console.log('Role:', role)
    console.log('Submitted on:', new Date().toLocaleString())
    console.log('============================')

    // Try to send email
    try {
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005EFF;">New Beta Application Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 10px 0;"><strong>Role:</strong> ${role}</p>
            ${teamSize ? `<p style="margin: 10px 0;"><strong>Team Size:</strong> ${teamSize}</p>` : ''}
            ${topChallenge ? `<p style="margin: 10px 0;"><strong>Top Challenge:</strong> ${topChallenge}</p>` : ''}
            ${meetingPlatforms ? `<p style="margin: 10px 0;"><strong>Meeting Platforms:</strong> ${meetingPlatforms}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #005EFF;">What they hope to solve with Knowcap:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${motivation}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="color: #6b7280; font-size: 14px;">
            Submitted on: ${new Date().toLocaleString()}<br/>
            Application ID: ${application.id}
          </p>
          
          <p style="margin-top: 20px;">
            <a href="https://knowcap.ai/admin" style="background-color: #005EFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View All Applications</a>
          </p>
        </div>
      `

      await sendEmail(
        'hsa@knowcap.ai',
        `New Beta Application: ${name} from ${company}`,
        htmlBody
      )

      console.log('✅ Beta application email sent successfully to hsa@knowcap.ai')
    } catch (emailError: any) {
      console.error('[EMAIL] ❌ Error sending email:', emailError.message)
      console.error('[EMAIL] Full error:', JSON.stringify(emailError, null, 2))
      // Don't fail the request if email fails - data is already saved
    }

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting beta application:', error)
    
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or contact us at hsa@knowcap.ai' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
