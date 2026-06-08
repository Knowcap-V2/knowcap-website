import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getJobDescription } from '@/lib/jobDescriptions'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const body = await request.json()
    const { applicationId } = body

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    // Fetch the application details
    const application = await prisma.recruitmentApplication.findUnique({
      where: { id: applicationId }
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    // Get job description
    const jobDesc = getJobDescription(application.role)
    if (!jobDesc) {
      return NextResponse.json(
        { error: 'Job description not found' },
        { status: 404 }
      )
    }

    // Prepare context for AI
    const context = `
Job Title: ${jobDesc.title}

Key Requirements:
${jobDesc.keyRequirements.map(r => `- ${r}`).join('\n')}

Must-Haves:
${jobDesc.mustHaves.map(r => `- ${r}`).join('\n')}

Responsibilities:
${jobDesc.responsibilities.map(r => `- ${r}`).join('\n')}

Candidate Information:
- Name: ${application.fullName}
- Email: ${application.email}
- LinkedIn: ${application.linkedin || 'Not provided'}
- Portfolio: ${application.portfolio || 'Not provided'}
- AI Project Experience: ${application.aiProject || 'Not provided'}
- Additional Information: ${application.additionalInfo || 'Not provided'}
- AI Score: ${application.aiScore || 'Not scored yet'}
- AI Analysis: ${application.aiAnalysis || 'Not analyzed yet'}
- Strengths: ${application.strengths || 'Not identified yet'}
- Weaknesses: ${application.weaknesses || 'Not identified yet'}
`

    // Call Abacus.AI API to generate interview questions
    const apiKey = process.env.ABACUSAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const prompt = `You are an expert interviewer preparing for a job interview. Based on the following job description and candidate profile, generate:

1. **8-10 tailored interview questions** that:
   - Assess key requirements and must-haves for the role
   - Probe areas of strength from the candidate's profile
   - Explore potential weaknesses or gaps
   - Include behavioral, technical, and situational questions
   - Progress from easier to more challenging

2. **For each question, provide**:
   - The question itself
   - Why this question is important for this role
   - What to listen for in an ideal answer
   - Red flags or concerning responses
   - Follow-up questions to dig deeper

${context}

Format your response as a structured JSON with this exact structure:
{
  "questions": [
    {
      "question": "The interview question",
      "rationale": "Why this question matters",
      "idealAnswer": "What a strong answer includes",
      "redFlags": "Warning signs in responses",
      "followUps": ["Follow-up question 1", "Follow-up question 2"]
    }
  ],
  "overallStrategy": "2-3 sentences on the interview approach",
  "keyAreasToProbe": ["Area 1", "Area 2", "Area 3"]
}

Make questions specific to this candidate's background and the role's requirements.`

    const response = await fetch('https://routellm.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Abacus.AI API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate interview prep' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Parse the JSON response
    let interviewPrep
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)```/)
      const jsonString = jsonMatch ? jsonMatch[1].trim() : aiResponse.trim()
      interviewPrep = JSON.parse(jsonString)
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      // Fallback: return raw text
      interviewPrep = {
        questions: [],
        overallStrategy: aiResponse,
        keyAreasToProbe: [],
        rawResponse: aiResponse
      }
    }

    return NextResponse.json({
      success: true,
      interviewPrep,
      candidate: {
        name: application.fullName,
        role: jobDesc.title
      }
    })
  } catch (error) {
    console.error('Error generating interview prep:', error)
    return NextResponse.json(
      { error: 'Failed to generate interview prep' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
