'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

// Job data as a TypeScript const
const jobData: Record<string, { title: string; content: string }> = {
  'founding-ai-engineer': {
    title: 'Founding AI Engineer (Path to CTO)',
    content: `
      <div class="card">
        <h3 style="margin-top: 0;">The Opportunity</h3>
        <p style="font-size: 1.1rem; margin-bottom: 0;">We are looking for a partner, not an employee. We bring 10 years of domain expertise in Service Delivery and a 'hair-on-fire' sales pipeline of 500+ potential agency clients. We need You to build the technical soul of the company. You will start by shipping code Day 1, and as the team scales, you will have the path to evolve into the CTO role, owning the entire technical organization.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">The Challenges You Will Solve Immediately</h3>
        <p>This is not a "chatbot project." This is applied AI engineering where system design is as important as code. We need an engineer who can operate at the architecture and implementation level across:</p>
        <p><strong>Multimodal Alignment (High Priority):</strong></p>
        <ul>
          <li>Synchronizing transcript events with screen/video events.</li>
          <li>Structuring user actions, clicks, workflow steps, and metadata.</li>
          <li>Turning raw, multi-hour meetings into actionable, correctly-chunked knowledge units.</li>
        </ul>
        <p><strong>RAG / Retrieval Layer:</strong></p>
        <ul>
          <li>Designing and implementing a hybrid search strategy.</li>
          <li>Developing a robust chunking strategy for complex documents and transcripts.</li>
          <li>Selecting, tuning, and managing vector databases (e.g., Pinecone, Weaviate).</li>
          <li>Building and optimizing reranking pipelines to ensure retrieval precision (e.g., Cohere, Voyage).</li>
        </ul>
        <p><strong>Orchestration & Reliability Layer:</strong></p>
        <ul>
          <li>Building and maintaining complex LLM workflows (e.g., LangChain, LangGraph).</li>
          <li>Implementing intelligent model routing (small, fast models for simple tasks; large models for complex reasoning).</li>
          <li>Establishing guardrails and deterministic fallbacks to ensure reliable and predictable outputs.</li>
        </ul>
        <p><strong>Evaluation & Observability:</strong></p>
        <ul style="margin-bottom: 0;">
          <li>Creating a metrics-driven framework to measure and reduce hallucinations.</li>
          <li>Building regression testing suites for our AI pipeline.</li>
          <li>Ensuring source alignment and the "verifiability" of every piece of generated content.</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">Your Profile: Must-Haves & Nice-to-Haves</h3>
        <p>To succeed in this role from day one, you need a strong foundation in building production-grade AI systems.</p>
        <p><strong>Must-Haves:</strong></p>
        <ul>
          <li>5-7+ years of professional software engineering experience, with a proven track record of shipping and maintaining complex systems in a cloud environment.</li>
          <li>Deep, hands-on experience building and optimizing Retrieval-Augmented Generation (RAG) pipelines. This is non-negotiable. You should be an expert in chunking, embedding, and hybrid search strategies.</li>
          <li>Strong architectural and systems-thinking ability. You know how to design for scalability, cost, and reliability. You understand the trade-offs between different models and approaches.</li>
          <li>High proficiency in Python and its ecosystem for AI/ML development.</li>
          <li>A pragmatic, high-ownership mindset suited for a fast-paced, ambiguous startup environment. You are a builder who wants to own the problem from end to end.</li>
        </ul>
        <p><strong>Nice-to-Haves:</strong></p>
        <ul style="margin-bottom: 0;">
          <li>Direct, hands-on experience with multimodal AI models (processing both image/video and text).</li>
          <li>Experience with orchestration frameworks like LangChain, LangGraph, or equivalent.</li>
          <li>Familiarity with building real-time or low-latency data streaming pipelines.</li>
          <li>A public portfolio (GitHub, blog, etc.) demonstrating your passion for building and your expertise in AI.</li>
          <li>Experience in the professional services, ERP, or Odoo ecosystem is a significant plus.</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">The Mission (The "Evolution")</h3>
        <p><strong>Phase 1 (Months 1-6):</strong> You are the <strong>Lead Architect & Coder</strong>. You will build the <strong>Visual Transcription Engine (VTE)</strong>—the system that watches screens and audio to eliminate 20–40% of project rework. You optimize for <strong>Unit Economics</strong> and <strong>Latency</strong>.</p>
        <p><strong>Phase 2 (Months 6-12):</strong> You become the <strong>Engineering Lead</strong>. You will hire 2-3 junior engineers to scale what you built.</p>
        <p style="margin-bottom: 0;"><strong>Phase 3 (Year 1+):</strong> You become the <strong>CTO</strong>. You own the technical roadmap, security, and infrastructure for the entire company.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">Our Engineering Philosophy: Is This You?</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>You treat LLMs as raw material, not magic.</strong> You don't just accept the first response. You understand the model's failure points and have a craftsman's approach to prompt engineering, fine-tuning, and output validation to force it to produce exceptional results.</li>
          <li><strong>You are obsessed with the user's perception of speed.</strong> You know that a 3-second delay isn't just an inconvenience; it's a broken workflow. You think deeply about streaming tokens, optimistic UI, and caching strategies because you are driven to create a seamless user experience.</li>
          <li><strong>You have a practical obsession with the 'state-of-the-art'.</strong> Your YouTube feed isn't just for entertainment; it's for reconnaissance. When a new model or coding tool is released, you don't just watch the demo. You have an immediate, hands-on need to stress-test it. You've probably pitted Claude 3.5's code generation against Gemini 1.5's, not for sport, but to understand its unique strengths and weaknesses. You're constantly looking for a new technique or a better tool that can give Knowcap a competitive edge.</li>
          <li><strong>You automate your own life.</strong> Your GitHub isn't just course assignments. It's full of half-finished scripts, CLI tools, and bots you built to automate your own daily annoyances. You believe if you have to do a task twice, you should script it.</li>
          <li><strong>You want to build "Intelligence," not just "Wrappers."</strong> You are bored of simple API calls. You want to solve the hard problems: syncing visual data with audio, grounding hallucinations in ground truth, and building memory that actually persists.</li>
        </ul>
      </div>
    `
  },
  'head-of-growth': {
    title: 'Head of Growth (Revenue Partner)',
    content: `
      <div class="card">
        <h3 style="margin-top: 0;">The Role: Scientist of Revenue</h3>
        <p style="font-size: 1.1rem;">We are looking for a Head of Growth who is actually a "Scientist of Revenue." You aren't here to manage an agency or approve blog post graphics. You are here to build the engine that acquires, activates, and retains customers. You will inherit a product with massive potential and a CEO ready to close, but you need to build the bridge between the two.</p>
        <div style="background: rgba(31, 107, 58, 0.06); border: 1px solid rgba(31, 107, 58, 0.22); border-radius: 8px; padding: 1.5rem; margin: 1.5rem 0;">
          <h4 style="margin-top: 0; color: var(--primary); font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-triangle-exclamation"></i> The Reality Check: We are Pre-PMF</h4>
          <p style="margin-bottom: 0; font-size: 1rem;">We have a strong initial hypothesis targeting Odoo Partners, but we are transparent: <strong>We are still finding Product-Market Fit.</strong> Our target market could shift at any moment. We need a Revenue Partner who thrives in ambiguity, tests segments, and invalidates bad ideas fast.</p>
        </div>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">Key Responsibilities (The "What")</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>Own the "Full Funnel" Architecture:</strong> You aren't just generating leads; you are responsible for the entire lifecycle. From the first impression on LinkedIn to the moment they sign the contract (and renew). You will map, measure, and optimize every conversion point.</li>
          <li><strong>Build the Outbound Machine:</strong> Since our target (Odoo Partners) is distinct, you will likely rely heavily on Account-Based Marketing (ABM). You will scrape data, enrich leads, design multi-channel sequences (Email, LinkedIn, Twitter), and automate the handover to the CEO for closing.</li>
          <li><strong>The "Build in Public" Strategy:</strong> You will act as the Editor-in-Chief for our content interns. You don't need to edit the videos, but you must define the narrative, the hooks, and the distribution strategy to ensure our brand punch is well above our weight class.</li>
          <li><strong>Data & Attribution:</strong> Implement the stack (e.g., HubSpot, Mixpanel, June.so). We need to know exactly how much it costs to acquire a customer (CAC) and where our best users are coming from. No vanity metrics.</li>
          <li><strong>Rapid Experimentation:</strong> Run weekly growth sprints. Test a new cold email angle on Monday, analyze open rates by Wednesday, and pivot or double down by Friday.</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">Requirements (The "Who")</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>B2B SaaS Experience:</strong> You have scaled a B2B product from $0 to $1M+ ARR before. You understand the difference between selling to a developer vs. an agency owner.</li>
          <li><strong>Technical Literacy:</strong> You can write your own SQL, or at least you are dangerous with tools like Clay, Zapier, Phantombuster, and HubSpot workflows. You don't wait for engineering to pull a CSV for you.</li>
          <li><strong>Copywriting Chops:</strong> You understand that "Growth" is 90% psychology. You can write cold emails that don't sound like sales pitches and landing page headers that convert.</li>
          <li><strong>Scrappy & Analytical:</strong> You treat the budget like it's your own money. You prefer organic reach and clever hacks over dumping cash into Facebook Ads (unless the ROAS proves it works).</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">What Success Looks Like (30-60-90 Days)</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>Day 30:</strong> The CRM is clean. The ICP (Ideal Customer Profile) list of 7,500 Odoo partners is enriched and segmented. The first outbound experiments are live.</li>
          <li><strong>Day 60:</strong> You have established a predictable "Meeting Booked" metric. We are consistently getting 5-10 qualified demos per week from your machine.</li>
          <li><strong>Day 90:</strong> You have hired/onboarded the content team. We have a clear playbook for expanding beyond Odoo partners into the broader ERP market.</li>
        </ul>
      </div>
    `
  },
  'content-creator-intern': {
    title: 'Content Creator Interns (The "Build in Public" Squad)',
    content: `
      <div class="card">
        <h3 style="margin-top: 0;">The Opportunity</h3>
        <p style="font-size: 1.1rem; margin-bottom: 0;">Forget boring internships where you just fetch coffee. You are our media team. We're a startup building world-changing AI, and your mission is to turn our journey into a viral 'Build in Public' show on TikTok, Reels, and LinkedIn. Your camera is your all-access pass to the startup reality show everyone wishes they could see.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">The Mission</h3>
        <ul style="margin-bottom: 1.5rem;">
          <li><strong>Become the Voice of the Mission:</strong> You won't just post clips; you will learn to find the narrative gold. Your challenge is to take a complex technical debate about our AI engine and find the human story inside it—the frustration, the breakthrough, the passion.</li>
          <li><strong>Capture the "Aha!" Moments:</strong> You will sit in on product meetings and customer discovery calls to capture the moments when a potential client says, "I lose thousands of dollars on that exact problem." Those moments are the hooks for our entire marketing strategy.</li>
          <li><strong>Build a Community, Not Just an Audience:</strong> You'll engage with other builders, developers, and agency owners on social media, turning our followers into a community of evangelists who are invested in our success.</li>
        </ul>
        <p style="margin-bottom: 0; font-size: 0.9rem; color: var(--gray-text);"><em>Note: The application challenges for this role will be sent via email to qualified candidates after an initial screening.</em></p>
      </div>
    `
  },
  'product-manager': {
    title: 'Product Manager (CEO of the Product Intelligence Layer)',
    content: `
      <div class="card">
        <h3 style="margin-top: 0;">The Opportunity</h3>
        <p style="font-size: 1.1rem; margin-bottom: 0;">We are not building another project management tool. We are building the source of truth for all project work—the Verified Delivery OS. As our first Product Manager, you are the CEO of our core intellectual property. You will own the roadmap that transforms raw, messy service delivery interactions into structured, verifiable insights.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">The Mission</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>Translate Chaos into Clarity:</strong> You will live with our customers to deeply understand the pain of "decision drift" and "scope creep." Your core mission is to translate that pain into concrete technical specifications for our Visual Transcription Engine (VTE) and Verified Memory Graph.</li>
          <li><strong>Own the 'Verification' Promise:</strong> You will be ruthless in prioritizing features that strengthen our core "verification" promise. You'll work hand-in-hand with the Founding AI Engineer to balance groundbreaking AI capabilities with the absolute need for reliability and source attribution.</li>
          <li><strong>Build the Flywheel:</strong> You will define the product loops that make Knowcap indispensable. How does a verified decision in one project inform the next? How do our insights help an agency owner not just win a dispute, but also write better proposals in the future?</li>
        </ul>
      </div>
    `
  },
  'qa-specialist': {
    title: 'AI Trust & Reliability Specialist (QA)',
    content: `
      <div class="card">
        <h3 style="margin-top: 0;">The Opportunity</h3>
        <p style="font-size: 1.1rem; margin-bottom: 0;">In a world of AI hallucinations, trust is our most valuable asset. We are looking for a specialist who is obsessed with the truth. Your job is not just to find bugs, but to be the guardian of our verification promise. You are the last line of defense protecting our users from a single piece of bad data.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">The Mission</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>Become the Human Ground Truth:</strong> You will be the expert on what "good" looks like. You will manually review the outputs of our Product Intelligence Layer (PIL) against source videos, not just to find errors, but to deeply understand the nuances of where our AI excels and where it fails.</li>
          <li><strong>Build the 'Golden Datasets':</strong> Your meticulous verification work is not disposable. You will be responsible for curating the high-quality evaluation datasets that are fed directly into our automated "LLM-as-a-Judge" pipeline. The bugs you find today will train the models of tomorrow.</li>
          <li><strong>Champion the Edge Case:</strong> You have a natural talent for finding the scenarios that engineers miss. You think about different accents, low-quality video, overlapping speakers, and ambiguous jargon. Your curiosity and adversarial mindset are critical inputs into our engineering process.</li>
        </ul>
      </div>
    `
  },
  'executive-assistant': {
    title: 'Executive Assistant (The Founder\'s Force Multiplier)',
    content: `
      <div class="card">
        <h3 style="margin-top: 0;">The Opportunity</h3>
        <p style="font-size: 1.1rem;">We are looking for a true business partner to serve as the operational backbone of the company. This isn't a typical EA role; you are the CEO's force multiplier. Your primary mission is to create leverage and reclaim executive time as the company's most valuable resource. You will own the systems that allow leadership to focus exclusively on building the product, selling to customers, and hiring our team. You will have immense ownership, and your impact will be felt across the entire organization.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">What This Role Is</h3>
        <p style="margin-bottom: 0;">This is a full-time, on-site role based at our headquarters in New Cairo. You will work directly with (Hassan Sam Arslan) the CEO every day. We are looking for a career-oriented individual who wants to build a company and grow with us.</p>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">The Mission: What You'll Actually Do</h3>
        <p>Your mission is to design, implement, and run the core operating system for the CEO's office. Success is measured by your ability to create order from chaos and generate leverage for the founder. This breaks down into four key pillars:</p>

        <h4><strong>1. The Gatekeeper: Mastering Information Flow</strong></h4>
        <p>You are the primary filter for all inbound communication. Your goal is to protect the CEO from noise and ensure his attention is only on the most critical items.</p>
        <ul>
          <li><strong>Inbox Mastery:</strong> You will have full authority over the CEO's inbox with the goal of driving it to "Inbox Zero" daily. This involves aggressively archiving, unsubscribing, and filtering all non-essential mail.</li>
          <li><strong>Triage & Action:</strong> You will read, process, and take action on emails. This includes responding on the CEO's behalf for scheduling, handling common inquiries, and delegating tasks to other team members when appropriate.</li>
          <li><strong>Daily Briefings:</strong> You will synthesize the most critical emails and action items into a concise daily briefing for the CEO to review.</li>
        </ul>

        <h4 style="margin-top: 2rem;"><strong>2. The Architect: Building the CEO's Operating System</strong></h4>
        <p>You don't just manage tasks; you build the systems that make the founder's office run. You are obsessively organized and love creating processes.</p>
        <ul>
          <li><strong>Guardian of the Calendar:</strong> You will be the sole owner of the CEO's calendar, with the authority to enforce the "Perfect Week" principle. You will protect his morning "Deep Work" blocks at all costs.</li>
          <li><strong>Meeting Architecture:</strong> You will ensure every meeting the CEO attends is a valuable use of time. This means confirming attendees, ensuring there is a clear written agenda, and circulating pre-read materials 24 hours in advance.</li>
          <li><strong>SOP Development:</strong> You will document and create Standard Operating Procedures (SOPs) for recurring tasks, such as travel booking, expense reporting, and meeting preparation, to ensure consistency and efficiency.</li>
        </ul>

        <h4 style="margin-top: 2rem;"><strong>3. The Communicator: Mastering the Follow-Up</strong></h4>
        <p>Nothing gets dropped. You are the glue that connects conversations to actions and ensures accountability across the organization.</p>
        <ul>
          <li><strong>Action Item Tracking:</strong> You will attend key meetings with the primary goal of capturing all action items, decisions, and deadlines. You will be responsible for entering these into our project management system and ensuring they are assigned to the correct owner.</li>
          <li><strong>The "Closed Loop" System:</strong> Your superpower is the follow-up. You will relentlessly track open items, send reminders to team members, and ensure that every loop opened in a meeting is eventually "closed" with a resolution.</li>
          <li><strong>Creative Problem Solving:</strong> When conflicts or problems arise, you don't just report them; you are expected to come to the table with 1-2 potential creative solutions.</li>
        </ul>

        <h4 style="margin-top: 2rem;"><strong>4. The Operator: Seamless Execution</strong></h4>
        <p>You will manage the core logistics that allow the CEO to operate at maximum efficiency.</p>
        <ul>
          <li><strong>Travel Logistics:</strong> You will manage all aspects of business travel, including booking flights and accommodations, managing itineraries, and scheduling key meetings during trips.</li>
          <li><strong>Expense Management:</strong> You will handle all expense reporting and receipt management for the CEO.</li>
          <li><strong>Event Coordination:</strong> You will assist with the planning and coordination of internal and external events, such as team offsites or investor meetings.</li>
        </ul>
      </div>
      <div class="card">
        <h3 style="margin-top: 0;">This Role Is For You If...</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>You Are a Natural Systems-Builder:</strong> You genuinely find joy in creating order from chaos. Your default response to a recurring problem is to build a checklist, a template, or a process to ensure it never happens again.</li>
          <li><strong>You Are Obsessed with "Closing the Loop":</strong> The thought of an unanswered email or an untracked action item makes you uncomfortable. You have a natural, relentless drive to follow up until a task is verifiably complete.</li>
          <li><strong>You Are a World-Class Filter:</strong> You have an intuitive ability to distinguish between what is merely "urgent" and what is truly "important." You take pride in being a trusted filter that allows your leader to focus on what matters most.</li>
          <li><strong>You Are a Proactive Problem-Solver:</strong> You don't just identify problems; you bring solutions. You think one step ahead and are constantly looking for ways to improve efficiency and remove friction.</li>
          <li><strong>You Thrive in a High-Velocity Environment:</strong> You are calm and collected under pressure and are comfortable with the ambiguity and shifting priorities of a seed-stage startup.</li>
        </ul>
      </div>
    `
  }
}

/* Page-local editorial styling. Maps the legacy careers vocabulary
   (.card, var(--primary), var(--gray-text)) onto the V6b token set. */
const CAREERS_CSS = `
.cv{--primary:var(--green);--gray-text:var(--sec)}
.cv h2{font-size:1.9rem;font-weight:500;font-variation-settings:'SOFT' 55,'WONK' 0;letter-spacing:-.012em;margin:0 0 16px}
.cv h4{font-family:var(--disp);font-size:1.15rem;font-weight:560;color:var(--ink);margin:0 0 10px;font-variation-settings:'SOFT' 55,'WONK' 0}
.cv h4 strong{font-weight:inherit}
.cv-pill{display:inline-block;background:var(--green-tint);color:var(--green-deep);padding:8px 16px;border-radius:50px;font-family:var(--mono);font-size:12px;font-weight:500;letter-spacing:.05em}
.cv-badge{display:inline-block;background:var(--white);border:1px solid var(--border);color:var(--ink);padding:8px 16px;border-radius:50px;font-size:13.5px;font-weight:500}
.cv-kicker-center{display:block;text-align:center}
.cv-jobgrid{display:grid;grid-template-columns:1fr;gap:20px;margin:16px 0 40px}
@media(min-width:768px){.cv-jobgrid{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}}
.cv-jobcard{display:flex;flex-direction:column;padding:28px}
.cv-jobcard p{flex:1 1 auto;color:var(--sec);margin:0 0 18px}
.cv-jobcard .cl-btn{align-self:flex-start}
.cv-detail-grid{display:grid;grid-template-columns:1fr;gap:32px}
@media(min-width:992px){.cv-detail-grid{grid-template-columns:3fr 1fr}}
.cv-detail .card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:28px;margin-bottom:20px}
.cv-detail .card h3{font-size:1.3rem;font-weight:500;font-variation-settings:'SOFT' 55,'WONK' 0;margin:24px 0 12px}
.cv-detail .card h4{margin:16px 0 8px}
.cv-detail .card p{margin:0 0 14px;color:var(--ink-soft)}
.cv-detail .card ul{margin:0 0 14px;padding-left:22px;color:var(--ink-soft)}
.cv-detail .card li{margin-bottom:6px}
.cv-detail .card strong{color:var(--ink)}
.cv-back{display:inline-flex;align-items:center;gap:8px;font-size:13.5px;font-weight:500;color:var(--sec);margin:0 0 24px;cursor:pointer;transition:color .15s}
.cv-back:hover{color:var(--green)}
.cv-side-card{padding:22px;position:sticky;top:88px}
.cv-side-card ul{list-style:none;margin:12px 0 0;padding:0}
.cv-side-card li a{display:block;padding:10px 0;font-size:14px;font-weight:500;color:var(--ink);border-bottom:1px solid var(--border);transition:color .15s}
.cv-side-card li:last-child a{border-bottom:none}
.cv-side-card li a:hover{color:var(--green)}
.cv-group{margin-bottom:18px}
.cv-team-photo{width:120px;height:120px;border-radius:50%;overflow:hidden;margin:0 auto 14px;position:relative;background:var(--border);border:2px solid var(--border-2)}
`

export default function CareersPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<string>('home')
  const [currentJobId, setCurrentJobId] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'Knowcap.ai | Careers'

    // Handle initial hash
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home'
      navigateTo(hash)
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (pageId: string) => {
    if (pageId === 'home') {
      setCurrentView('home')
      setCurrentJobId('')
    } else if (jobData[pageId]) {
      setCurrentView('detail')
      setCurrentJobId(pageId)
    } else {
      setCurrentView('home')
      setCurrentJobId('')
    }
    window.scrollTo(0, 0)
    window.location.hash = pageId
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Prevent double submission
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.append('role', currentJobId)

    try {
      const response = await fetch('/api/submit-recruitment', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Redirect to thank you page
        router.push('/thank-you?type=application')
      } else {
        const errorData = await response.json().catch(() => ({ message: 'There was an error submitting your application. Please try again.' }))
        setIsSubmitting(false) // Re-enable button on error

        // Display the server's error message (e.g., duplicate application message)
        alert(errorData.message)
        return
      }
    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false) // Re-enable button on error
      alert('There was an error submitting your application. Please try again.')
    }
  }

  return (
    <EditorialShell>
      <style dangerouslySetInnerHTML={{ __html: CAREERS_CSS }} />
      <div className="cv">
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <div id="home">
            <PageHero
              kicker="Careers"
              title={<>Stop Documenting Work.<br />Start Verifying It.</>}
              sub="Help us build the AI that turns meetings and screen work into verifiable project memory."
            />
            <div className="cl-wrap" style={{ textAlign: 'center' }}>
              <p className="cl-page-sub" style={{ marginTop: 0 }}>
                Every summary, task, and decision is automatically generated and linked to the exact moment in the video proof—giving professional teams context they finally trust.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 22 }}>
                <span className="cv-pill">🚀 Join the Founding Team</span>
                <span className="cv-badge">📍 New Cairo HQ • In-Person High-Velocity Environment</span>
              </div>
            </div>

            <div className="cl-page-body">
              <div className="cl-wrap">
                <section style={{ textAlign: 'center', paddingTop: 40 }}>
                  <h3 className="cl-kicker cv-kicker-center" style={{ marginBottom: 14 }}>WHY BUILD AT KNOWCAP.AI?</h3>
                  <h2>Join a Mission, Not Just a Company.</h2>
                  <p style={{ maxWidth: '70ch', margin: '0 auto', color: 'var(--sec)' }}>
                    We are a small, obsessed team building the missing layer of enterprise productivity. We believe that the chaos of service delivery is a solvable problem. If you are driven by solving hard problems with massive real-world impact, this is the place for you.
                  </p>
                </section>

                <div style={{ marginTop: '4rem' }}>
                  <h3 className="cl-kicker cv-kicker-center" style={{ marginBottom: '2rem' }}>What We Offer (Beyond a Paycheck)</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="cl-card" style={{ padding: 28 }}>
                      <h4>Direct Ownership &amp; Impact</h4>
                      <p style={{ margin: 0, color: 'var(--sec)' }}>You won&apos;t be a cog in a machine. You will own entire pillars of our business, and your work will directly influence our product and revenue from day one.</p>
                    </div>
                    <div className="cl-card" style={{ padding: 28 }}>
                      <h4>Solve a Hard, Meaningful Problem</h4>
                      <p style={{ margin: 0, color: 'var(--sec)' }}>We are tackling a complex, valuable problem that plagues millions of professionals. You will be working on cutting-edge AI and product challenges, not just another CRUD app.</p>
                    </div>
                    <div className="cl-card" style={{ padding: 28 }}>
                      <h4>No Bureaucracy, High Velocity</h4>
                      <p style={{ margin: 0, color: 'var(--sec)' }}>We are a small, focused team. You will work directly with the founders, make decisions quickly, and ship work that matters without layers of management slowing you down.</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '6rem' }}>
                  <h4 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem' }}>Meet the Founding Team</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: 600, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div className="cv-team-photo">
                        <Image
                          src="/hassan-profile.jpg"
                          alt="Hassan Sam Arslan"
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                          priority
                        />
                      </div>
                      <h4>Hassan Sam Arslan</h4>
                      <p style={{ color: 'var(--green)', fontWeight: 500 }}>Founder &amp; CEO</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="cv-team-photo">
                        <Image
                          src="/shady-profile.jpg"
                          alt="Shady Deeb"
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center' }}
                          priority
                        />
                      </div>
                      <h4>Shady Deeb</h4>
                      <p style={{ color: 'var(--green)', fontWeight: 500 }}>Founding Partner</p>
                    </div>
                  </div>
                </div>

                <section id="open-roles" style={{ marginTop: '5rem' }}>
                  <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Join the Founding Team</h2>

                  <h3 className="cl-kicker">TECHNICAL &amp; AI</h3>
                  <div className="cv-jobgrid">
                    <article className="cl-card cv-jobcard">
                      <h4>Founding AI Engineer (Path to CTO)</h4>
                      <p>The technical soul of the company. A partner to build the core AI engine from scratch and evolve into the CTO as we scale.</p>
                      <button onClick={() => navigateTo('founding-ai-engineer')} className="cl-btn cl-btn--solid cl-btn--sm">Learn More &amp; Apply →</button>
                    </article>
                  </div>

                  <h3 className="cl-kicker">GROWTH &amp; REVENUE</h3>
                  <div className="cv-jobgrid">
                    <article className="cl-card cv-jobcard">
                      <h4>Head of Growth (Revenue Partner)</h4>
                      <p>The engine that turns our potential into a calendar full of qualified demos. You own the strategy, the funnel, and the data.</p>
                      <button onClick={() => navigateTo('head-of-growth')} className="cl-btn cl-btn--solid cl-btn--sm">Learn More &amp; Apply →</button>
                    </article>
                    <article className="cl-card cv-jobcard">
                      <h4>Content Creator Interns</h4>
                      <p>Our frontline storytellers. Your mission is to turn our journey into a must-watch &apos;Build in Public&apos; reality show. (3 roles available).</p>
                      <button onClick={() => navigateTo('content-creator-intern')} className="cl-btn cl-btn--solid cl-btn--sm">Learn More &amp; Apply →</button>
                    </article>
                  </div>

                  <h3 className="cl-kicker">PRODUCT &amp; OPERATIONS</h3>
                  <div className="cv-jobgrid">
                    <article className="cl-card cv-jobcard">
                      <h4>Product Manager</h4>
                      <p>The CEO of our core intellectual property, owning the roadmap that transforms raw interactions into structured, verifiable insights.</p>
                      <button onClick={() => navigateTo('product-manager')} className="cl-btn cl-btn--solid cl-btn--sm">Learn More &amp; Apply →</button>
                    </article>
                    <article className="cl-card cv-jobcard">
                      <h4>AI Trust &amp; Reliability Specialist (QA)</h4>
                      <p>The guardian of our verification promise. You are the last line of defense protecting our users from a single piece of bad data.</p>
                      <button onClick={() => navigateTo('qa-specialist')} className="cl-btn cl-btn--solid cl-btn--sm">Learn More &amp; Apply →</button>
                    </article>
                    <article className="cl-card cv-jobcard">
                      <h4>Executive Assistant</h4>
                      <p>The operational backbone of the company. Your mission is to create leverage and reclaim executive time as our most valuable resource.</p>
                      <button onClick={() => navigateTo('executive-assistant')} className="cl-btn cl-btn--solid cl-btn--sm">Learn More &amp; Apply →</button>
                    </article>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* JOB DETAIL VIEW */}
        {currentView === 'detail' && currentJobId && jobData[currentJobId] && (
          <div id="job-detail-template">
            <PageHero kicker="Careers" title={jobData[currentJobId].title} />
            <div className="cl-page-body">
              <div className="cl-wrap">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="cv-back">
                  <i className="fa-solid fa-arrow-left"></i> Back to All Roles
                </a>
                <div className="cv-detail-grid">
                  <div>
                    <div className="cv-detail" dangerouslySetInnerHTML={{ __html: jobData[currentJobId].content }} />

                    {/* Application Form */}
                    <div style={{ marginTop: '3rem' }}>
                      <h2>Join the Mission</h2>
                      <div className="cl-card" style={{ padding: 28 }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--sec)', marginBottom: 20 }}>Submit your essentials here. If your profile is a strong match, we will reach out with the detailed application challenges for this role.</p>
                        <form onSubmit={handleFormSubmit}>
                          <div className="cv-group">
                            <label htmlFor="fullName" className="cl-label">Full Name</label>
                            <input type="text" id="fullName" name="fullName" required className="cl-input" />
                          </div>
                          <div className="cv-group">
                            <label htmlFor="email" className="cl-label">Email</label>
                            <input type="email" id="email" name="email" required className="cl-input" />
                          </div>
                          <div className="cv-group">
                            <label htmlFor="referral_source" className="cl-label">Where did you hear about us?</label>
                            <select id="referral_source" name="referral_source" required className="cl-input">
                              <option value="">Select an option...</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="twitter">Twitter / X</option>
                              <option value="instagram">Instagram</option>
                              <option value="facebook">Facebook</option>
                              <option value="friend">Friend or Colleague</option>
                              <option value="job_board">Job Board</option>
                              <option value="google">Google Search</option>
                              <option value="event">Event or Conference</option>
                              <option value="university">University / Career Center</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="cv-group">
                            <label htmlFor="linkedin" className="cl-label">LinkedIn Profile (Optional)</label>
                            <input type="url" id="linkedin" name="linkedin" className="cl-input" />
                          </div>
                          <div className="cv-group">
                            <label htmlFor="portfolio" className="cl-label">Portfolio / GitHub (Optional)</label>
                            <input type="url" id="portfolio" name="portfolio" className="cl-input" />
                          </div>
                          <div className="cv-group">
                            <label htmlFor="ai_project" className="cl-label">Something Cool You Did with AI (Optional)</label>
                            <textarea id="ai_project" name="ai_project" placeholder="Share a project you've built, or a concept you'd love to bring to life." rows={3} className="cl-input" style={{ resize: 'vertical' }}></textarea>
                          </div>
                          <div className="cv-group">
                            <label htmlFor="additional_info" className="cl-label">Anything you would like to share? (Optional)</label>
                            <textarea id="additional_info" name="additional_info" placeholder="Any additional information you'd like us to know..." rows={3} className="cl-input" style={{ resize: 'vertical' }}></textarea>
                          </div>
                          <div className="cv-group">
                            <label htmlFor="resume" className="cl-label">Resume / CV</label>
                            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required className="cl-input" />
                          </div>
                          <button
                            type="submit"
                            className="cl-btn cl-btn--solid"
                            disabled={isSubmitting}
                            style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <aside>
                    <div className="cl-card cv-side-card">
                      <h5 className="cl-kicker">Other Open Roles</h5>
                      <ul>
                        <li><a href="#founding-ai-engineer">Founding AI Engineer</a></li>
                        <li><a href="#head-of-growth">Head of Growth</a></li>
                        <li><a href="#content-creator-intern">Content Creator Intern</a></li>
                        <li><a href="#product-manager">Product Manager</a></li>
                        <li><a href="#qa-specialist">AI Trust &amp; Reliability Specialist</a></li>
                        <li><a href="#executive-assistant">Executive Assistant</a></li>
                      </ul>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </EditorialShell>
  )
}
