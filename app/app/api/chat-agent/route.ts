import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hsa@smetools.io',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Function definitions for the AI agent
const functions = [
  {
    name: 'query_candidates',
    description: 'Search and filter recruitment applications based on criteria like role, AI score, recommendation level, or skills mentioned in resume/analysis',
    parameters: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          description: 'Filter by job role (e.g., "founding-ai-engineer", "product-manager")',
        },
        minScore: {
          type: 'number',
          description: 'Minimum AI score (0-100)',
        },
        recommendation: {
          type: 'string',
          description: 'Filter by recommendation level: strong_fit, good_fit, moderate_fit, or weak_fit',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (default 10)',
        },
      },
    },
  },
  {
    name: 'get_candidate_details',
    description: 'Get full details of a specific candidate by their application ID',
    parameters: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'The unique ID of the application',
        },
      },
      required: ['applicationId'],
    },
  },
  {
    name: 'compare_candidates',
    description: 'Compare multiple candidates side-by-side',
    parameters: {
      type: 'object',
      properties: {
        applicationIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of application IDs to compare',
        },
      },
      required: ['applicationIds'],
    },
  },
  {
    name: 'send_email',
    description: 'Send an email to a candidate from hsa@knowcap.ai. The booking link knowcap.ai/teams should be included for scheduling.',
    parameters: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'The application ID of the candidate',
        },
        subject: {
          type: 'string',
          description: 'Email subject line',
        },
        body: {
          type: 'string',
          description: 'Email body content (HTML supported). Should include knowcap.ai/teams booking link.',
        },
      },
      required: ['applicationId', 'subject', 'body'],
    },
  },
  {
    name: 'get_email_history',
    description: 'Get the history of emails sent to a candidate',
    parameters: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'The application ID to check email history for',
        },
      },
      required: ['applicationId'],
    },
  },
]

// Function handlers
async function handleFunctionCall(functionName: string, args: any) {
  try {
    switch (functionName) {
      case 'query_candidates': {
        const { role, minScore, recommendation, limit = 10 } = args
        const where: any = {}
        
        if (role) where.role = role
        if (minScore) where.aiScore = { gte: minScore }
        if (recommendation) where.recommendation = recommendation
        
        const candidates = await prisma.recruitmentApplication.findMany({
          where,
          orderBy: { aiScore: 'desc' },
          take: limit,
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            aiScore: true,
            recommendation: true,
            strengths: true,
            weaknesses: true,
            aiAnalysis: true,
            linkedin: true,
            portfolio: true,
            referralSource: true,
            createdAt: true,
          },
        })
        
        return {
          success: true,
          count: candidates.length,
          candidates: candidates.map((c: any) => ({
            ...c,
            strengths: c.strengths ? JSON.parse(c.strengths) : [],
            weaknesses: c.weaknesses ? JSON.parse(c.weaknesses) : [],
          })),
        }
      }

      case 'get_candidate_details': {
        const { applicationId } = args
        const candidate = await prisma.recruitmentApplication.findUnique({
          where: { id: applicationId },
          include: {
            emailLogs: {
              orderBy: { sentAt: 'desc' },
              take: 5,
            },
          },
        })
        
        if (!candidate) {
          return { success: false, error: 'Candidate not found' }
        }
        
        return {
          success: true,
          candidate: {
            ...candidate,
            strengths: candidate.strengths ? JSON.parse(candidate.strengths) : [],
            weaknesses: candidate.weaknesses ? JSON.parse(candidate.weaknesses) : [],
          },
        }
      }
      
      case 'compare_candidates': {
        const { applicationIds } = args
        const candidates = await prisma.recruitmentApplication.findMany({
          where: { id: { in: applicationIds } },
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            aiScore: true,
            recommendation: true,
            strengths: true,
            weaknesses: true,
            aiAnalysis: true,
            linkedin: true,
            portfolio: true,
            aiProject: true,
            additionalInfo: true,
          },
        })
        
        return {
          success: true,
          candidates: candidates.map((c: any) => ({
            ...c,
            strengths: c.strengths ? JSON.parse(c.strengths) : [],
            weaknesses: c.weaknesses ? JSON.parse(c.weaknesses) : [],
          })),
        }
      }

      case 'send_email': {
        const { applicationId, subject, body } = args
        const candidate = await prisma.recruitmentApplication.findUnique({
          where: { id: applicationId },
        })
        
        if (!candidate) {
          return { success: false, error: 'Candidate not found' }
        }
        
        // Send email
        await transporter.sendMail({
          from: 'hsa@knowcap.ai <hsa@smetools.io>',
          to: candidate.email,
          subject: subject,
          html: body,
        })
        
        // Log email in database
        await prisma.emailLog.create({
          data: {
            applicationId: candidate.id,
            recipientEmail: candidate.email,
            recipientName: candidate.fullName,
            subject: subject,
            body: body,
            sentBy: 'ai_assistant',
          },
        })
        
        return {
          success: true,
          message: `Email sent to ${candidate.fullName} (${candidate.email})`,
        }
      }
      
      case 'get_email_history': {
        const { applicationId } = args
        const emails = await prisma.emailLog.findMany({
          where: { applicationId },
          orderBy: { sentAt: 'desc' },
          take: 10,
        })
        
        return {
          success: true,
          count: emails.length,
          emails,
        }
      }
      
      default:
        return { success: false, error: 'Unknown function' }
    }
  } catch (error: any) {
    console.error('Function call error:', error)
    return { success: false, error: error.message }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, conversationHistory = [] } = await request.json()
    
    // Get summary statistics for context
    const stats = await prisma.recruitmentApplication.aggregate({
      _count: { id: true },
      _avg: { aiScore: true },
    })
    
    const strongCandidates = await prisma.recruitmentApplication.count({
      where: { aiScore: { gte: 80 } },
    })
    
    const roleStats = await prisma.recruitmentApplication.groupBy({
      by: ['role'],
      _count: { id: true },
      _avg: { aiScore: true },
    })
    
    // System message with context
    const systemMessage = {
      role: 'system',
      content: `You are an AI Recruitment Assistant helping Hassan (hsa@knowcap.ai) manage recruitment for Knowcap.ai.

CURRENT RECRUITMENT STATS:
- Total Applications: ${stats._count.id}
- Average AI Score: ${Math.round(stats._avg.aiScore || 0)}/100
- Strong Candidates (80+): ${strongCandidates}

ROLES & APPLICATIONS:
${roleStats.map((r: any) => `- ${r.role}: ${r._count.id} applications (avg score: ${Math.round(r._avg.aiScore || 0)})`).join('\n')}

YOU CAN:
1. Query and filter candidates by role, score, recommendation level
2. Get detailed candidate information
3. Compare multiple candidates side-by-side
4. Draft personalized emails
5. Send emails from hsa@knowcap.ai (ALWAYS include booking link: https://knowcap.ai/teams)
6. Check email history for candidates

WHEN DRAFTING EMAILS:
- Be professional but friendly
- Personalize based on candidate's background and AI analysis
- ALWAYS include the booking link https://knowcap.ai/teams for scheduling
- Sign emails as "Hassan" or "The Knowcap Team"
- Use HTML formatting for better presentation

WHEN ASKED TO SEND EMAILS:
- First draft the email and show it to Hassan
- Wait for confirmation before sending
- After sending, confirm with email details

Be concise, helpful, and action-oriented. Focus on helping Hassan identify the best candidates and manage outreach efficiently.`,
    }
    
    // Combine messages
    const allMessages = [systemMessage, ...conversationHistory, ...messages]
    
    // Call LLM API with function calling
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: allMessages,
        functions: functions,
        function_call: 'auto',
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })
    
    if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    const message = data.choices[0].message
    
    // Check if function call is needed
    if (message.function_call) {
      const functionName = message.function_call.name
      const functionArgs = JSON.parse(message.function_call.arguments)
      
      console.log(`[AI Agent] Calling function: ${functionName}`, functionArgs)
      
      // Execute function
      const functionResult = await handleFunctionCall(functionName, functionArgs)
      
      // Call LLM again with function result
      const followUpMessages = [
        ...allMessages,
        message,
        {
          role: 'function',
          name: functionName,
          content: JSON.stringify(functionResult),
        },
      ]
      
      const followUpResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: followUpMessages,
          temperature: 0.7,
          max_tokens: 2000,
        }),
      })
      
      const followUpData = await followUpResponse.json()
      const finalMessage = followUpData.choices[0].message
      
      return NextResponse.json({
        message: finalMessage.content,
        functionCalled: functionName,
        functionResult,
      })
    }
    
    // No function call, return direct response
    return NextResponse.json({
      message: message.content,
    })
    
  } catch (error: any) {
    console.error('Chat agent error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
