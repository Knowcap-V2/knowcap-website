import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        subject,
        message
      }
    })

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email to admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'hsa@knowcap.ai',
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005EFF; font-family: 'Space Grotesk', sans-serif;">New Contact Form Submission</h2>
          
          <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="font-family: 'Space Grotesk', sans-serif;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;" />
          
          <p style="color: #6B7280; font-size: 14px;">
            Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
          </p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(adminMailOptions)

    // Auto-reply to sender
    const replyMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message - Knowcap.ai',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005EFF; font-family: 'Space Grotesk', sans-serif;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>We've received your message and will get back to you within 24 hours.</p>

          <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <p>Best regards,<br/>The Knowcap Team</p>
          
          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;" />
          
          <p style="color: #6B7280; font-size: 14px;">
            <strong>Knowcap.ai</strong><br/>
            Email: hsa@knowcap.ai<br/>
            Website: <a href="https://knowcap.ai" style="color: #005EFF;">knowcap.ai</a>
          </p>
        </div>
      `,
    }

    await transporter.sendMail(replyMailOptions)

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[CONTACT FORM ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
