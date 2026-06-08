import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getJobDescription } from '@/lib/jobDescriptions'
import { getFileUrl } from '@/lib/s3'
import { requireAdmin } from '@/lib/adminAuth'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

interface ScoringResult {
  score: number
  analysis: string
  strengths: string[]
  weaknesses: string[]
  recommendation: 'strong_fit' | 'good_fit' | 'moderate_fit' | 'weak_fit'
}

async function extractResumeText(cloud_storage_path: string, isPublic: boolean, resumePath: string): Promise<string> {
  try {
    // Get signed URL for resume
    const resumeUrl = await getFileUrl(cloud_storage_path, isPublic)
    
    // Fetch the resume file
    const response = await fetch(resumeUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch resume')
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Handle different file types
    if (resumePath.toLowerCase().endsWith('.pdf')) {
      // For PDF, we'll use LLM API to extract text
      const base64String = buffer.toString('base64')
      return base64String // Return base64 for LLM API
    } else if (resumePath.toLowerCase().endsWith('.docx') || resumePath.toLowerCase().endsWith('.doc')) {
      // For DOCX files
      const mammoth = require('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      return result.value
    } else {
      // For other files, try text extraction
      return buffer.toString('utf-8')
    }
  } catch (error) {
    console.error('[RESUME EXTRACTION ERROR]', error)
    return ''
  }
}

async function scoreApplication(
  application: any,
  jobDescription: any
): Promise<ScoringResult> {
  try {
    // Extract resume text or base64
    let resumeData = ''
    let isPDF = false
    
    if (application.cloud_storage_path) {
      resumeData = await extractResumeText(
        application.cloud_storage_path,
        application.isPublic,
        application.resumePath
      )
      isPDF = application.resumePath.toLowerCase().endsWith('.pdf')
    }

    // Prepare the prompt for LLM
    const systemPrompt = `You are an expert HR recruiter analyzing candidate applications. Evaluate the candidate against the job requirements and provide a detailed assessment.`

    let userContent: any[]
    
    if (isPDF && resumeData) {
      // For PDF, send as file data
      userContent = [
        {
          type: 'file',
          file: {
            filename: application.resumePath,
            file_data: `data:application/pdf;base64,${resumeData}`
          }
        },
        {
          type: 'text',
          text: `Analyze this candidate's resume for the following role:

**Role: ${jobDescription.title}**

**Key Requirements:**
${jobDescription.keyRequirements.map((r: string) => `- ${r}`).join('\n')}

**Must-Haves:**
${jobDescription.mustHaves.map((m: string) => `- ${m}`).join('\n')}

**Nice-to-Haves:**
${jobDescription.niceToHaves.map((n: string) => `- ${n}`).join('\n')}

**Additional Info:**
${application.linkedin ? `LinkedIn: ${application.linkedin}\n` : ''}${application.portfolio ? `Portfolio: ${application.portfolio}\n` : ''}${application.aiProject ? `AI Project: ${application.aiProject}\n` : ''}${application.additionalInfo ? `Additional Info: ${application.additionalInfo}` : ''}

Provide your assessment in JSON format:
{
  "score": <0-100>,
  "analysis": "<detailed analysis of candidate fit>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendation": "<strong_fit|good_fit|moderate_fit|weak_fit>"
}

Score criteria:
- 90-100: Exceptional candidate, exceeds requirements
- 75-89: Strong candidate, meets all key requirements
- 60-74: Good candidate, meets most requirements
- 40-59: Moderate candidate, some gaps
- 0-39: Weak candidate, significant gaps

Recommendation criteria:
- strong_fit: Score 80+, clear alignment with role
- good_fit: Score 65-79, solid match
- moderate_fit: Score 45-64, some fit but gaps exist
- weak_fit: Score <45, significant misalignment

Respond with raw JSON only.`
        }
      ]
    } else {
      // For text-based resumes or when no resume is available
      const resumeText = resumeData || 'Resume not available for analysis.'
      userContent = [
        {
          type: 'text',
          text: `Analyze this candidate for the following role:

**Role: ${jobDescription.title}**

**Candidate Information:**
Name: ${application.fullName}
Email: ${application.email}
${application.linkedin ? `LinkedIn: ${application.linkedin}\n` : ''}${application.portfolio ? `Portfolio: ${application.portfolio}\n` : ''}${application.aiProject ? `\nAI Project:\n${application.aiProject}\n` : ''}${application.additionalInfo ? `\nAdditional Info:\n${application.additionalInfo}\n` : ''}

**Resume Content:**
${resumeText}

**Key Requirements:**
${jobDescription.keyRequirements.map((r: string) => `- ${r}`).join('\n')}

**Must-Haves:**
${jobDescription.mustHaves.map((m: string) => `- ${m}`).join('\n')}

**Nice-to-Haves:**
${jobDescription.niceToHaves.map((n: string) => `- ${n}`).join('\n')}

Provide your assessment in JSON format:
{
  "score": <0-100>,
  "analysis": "<detailed analysis of candidate fit>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendation": "<strong_fit|good_fit|moderate_fit|weak_fit>"
}

Score criteria:
- 90-100: Exceptional candidate, exceeds requirements
- 75-89: Strong candidate, meets all key requirements
- 60-74: Good candidate, meets most requirements
- 40-59: Moderate candidate, some gaps
- 0-39: Weak candidate, significant gaps

Recommendation criteria:
- strong_fit: Score 80+, clear alignment with role
- good_fit: Score 65-79, solid match
- moderate_fit: Score 45-64, some fit but gaps exist
- weak_fit: Score <45, significant misalignment

Respond with raw JSON only.`
        }
      ]
    }

    // Call LLM API with timeout
    console.log('[SCORING] Calling LLM API...')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 120000) // 2 minute timeout
    
    try {
      const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
          ],
          response_format: { type: 'json_object' },
          max_tokens: 2000,
          temperature: 0.3
        }),
        signal: controller.signal
      })

      clearTimeout(timeout)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`LLM API error (${response.status}): ${errorText}`)
      }

      const data = await response.json()
      console.log('[SCORING] LLM API response received')
      const result = JSON.parse(data.choices[0].message.content)

      return {
        score: Math.min(100, Math.max(0, result.score)),
        analysis: result.analysis,
        strengths: result.strengths || [],
        weaknesses: result.weaknesses || [],
        recommendation: result.recommendation
      }
    } catch (error) {
      clearTimeout(timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('[SCORING ERROR] LLM API timeout')
        throw new Error('LLM API request timed out')
      }
      throw error
    }
  } catch (error) {
    console.error('[SCORING ERROR]', error)
    // Return default neutral score on error
    return {
      score: 50,
      analysis: 'Unable to fully analyze application. Manual review recommended.',
      strengths: ['Application submitted'],
      weaknesses: ['Automated analysis unavailable'],
      recommendation: 'moderate_fit'
    }
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  try {
    const { applicationId, bulkScore } = await request.json()

    if (bulkScore) {
      // Score all unscored applications
      const applications = await prisma.recruitmentApplication.findMany({
        where: {
          OR: [
            { aiScore: null },
            { scoredAt: null }
          ]
        }
      })

      console.log(`[SCORING] Starting bulk scoring for ${applications.length} applications`)

      const scoredApplications = []
      const errors = []

      for (let i = 0; i < applications.length; i++) {
        const app = applications[i]
        try {
          console.log(`[SCORING] Processing ${i + 1}/${applications.length}: ${app.fullName} (${app.role})`)
          
          const jobDescription = getJobDescription(app.role)
          if (!jobDescription) {
            console.log(`[SCORING] No job description found for role: ${app.role}`)
            continue
          }

          const scoring = await scoreApplication(app, jobDescription)

          const updated = await prisma.recruitmentApplication.update({
            where: { id: app.id },
            data: {
              aiScore: scoring.score,
              aiAnalysis: scoring.analysis,
              strengths: JSON.stringify(scoring.strengths),
              weaknesses: JSON.stringify(scoring.weaknesses),
              recommendation: scoring.recommendation,
              scoredAt: new Date()
            }
          })

          scoredApplications.push(updated)
          console.log(`[SCORING] Successfully scored ${app.fullName}: ${scoring.score}/100 (${scoring.recommendation})`)
        } catch (error) {
          console.error(`[SCORING ERROR] Failed to score ${app.fullName}:`, error)
          errors.push({ name: app.fullName, error: error instanceof Error ? error.message : 'Unknown error' })
        }
      }

      const response = {
        message: `Scored ${scoredApplications.length} of ${applications.length} applications`,
        count: scoredApplications.length,
        total: applications.length,
        errors: errors.length > 0 ? errors : undefined
      }

      console.log(`[SCORING] Completed: ${scoredApplications.length} successful, ${errors.length} errors`)

      return NextResponse.json(response)
    } else if (applicationId) {
      // Score single application
      const application = await prisma.recruitmentApplication.findUnique({
        where: { id: applicationId }
      })

      if (!application) {
        return NextResponse.json(
          { message: 'Application not found' },
          { status: 404 }
        )
      }

      const jobDescription = getJobDescription(application.role)
      if (!jobDescription) {
        return NextResponse.json(
          { message: 'Job description not found for this role' },
          { status: 400 }
        )
      }

      const scoring = await scoreApplication(application, jobDescription)

      const updated = await prisma.recruitmentApplication.update({
        where: { id: applicationId },
        data: {
          aiScore: scoring.score,
          aiAnalysis: scoring.analysis,
          strengths: JSON.stringify(scoring.strengths),
          weaknesses: JSON.stringify(scoring.weaknesses),
          recommendation: scoring.recommendation,
          scoredAt: new Date()
        }
      })

      return NextResponse.json(updated)
    } else {
      return NextResponse.json(
        { message: 'applicationId or bulkScore required' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('[SCORE APPLICATION ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to score application' },
      { status: 500 }
    )
  }
}
