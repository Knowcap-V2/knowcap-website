'use client'

import { useEffect } from 'react'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const sections = [
  { id: 'acceptance', title: 'Acceptance' },
  { id: 'use-of-service', title: 'Use of Service' },
  { id: 'liability', title: 'Liability' },
  { id: 'contact-us', title: 'Contact Us' },
]

const h2Anchor = { scrollMarginTop: '90px' } as const

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms of Service - Knowcap.ai'
  }, [])

  return (
    <EditorialShell>
      <PageHero
        kicker="Legal Information"
        title="Terms of Service"
        sub={<>Knowcap Service &amp; Browser Extension &bull; Last updated: May 11, 2026</>}
      />
      <div className="cl-page-body">
        <div className="cl-wrap">
          {/* Quick Navigation */}
          <nav
            aria-label="Terms sections"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 28 }}
          >
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="cl-btn cl-btn--ghost cl-btn--sm">
                {section.title}
              </a>
            ))}
          </nav>

          <div className="cl-prose">
            <p>
              Welcome to Knowcap. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Knowcap website, applications, browser extension, and API (collectively, the &ldquo;Service&rdquo;), operated by SMETOOLS LLC (&ldquo;Knowcap,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
            </p>

            <h2 id="acceptance" style={h2Anchor}>1. Acceptance of Terms</h2>
            <p>
              By creating a Knowcap account, signing in with a third-party identity provider, installing the Knowcap browser extension, or otherwise accessing the Service, you confirm that you have read, understood, and agree to be bound by these Terms and our{' '}
              <a href="/policy">Privacy Policy</a>. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms, and &ldquo;you&rdquo; refers to both you and that organization.
            </p>
            <p>
              If you do not have the authority, or you do not agree with these Terms, you must not accept these Terms and may not use the Service.
            </p>

            <h2 id="description" style={h2Anchor}>2. Description of Service</h2>
            <p>
              Knowcap is a visual transcription platform that watches meetings and screen activity to automatically generate timestamp-backed product requirement documents, standard operating procedures, onboarding guides, and other structured artifacts from your work. The Service turns ephemeral work into verified, searchable memory through transcription, analysis, and AI-generated summaries. Features, integrations, and supported workflows may change over time as we improve the Service.
            </p>

            <h2 id="use-of-service" style={h2Anchor}>3. User Accounts</h2>
            <p>
              To use most features of the Service, you must create an account.
            </p>
            <ul>
              <li><strong>Eligibility.</strong> You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account. The Service is not directed to children.</li>
              <li><strong>Accurate information.</strong> You agree to provide accurate, current, and complete information during registration and to keep your account information up to date.</li>
              <li><strong>Account security.</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at <a href="mailto:hsa@smetools.io">hsa@smetools.io</a> if you suspect unauthorized access.</li>
              <li><strong>One person per account.</strong> Unless we agree otherwise in writing, you may not share an individual account with other users. Team and organization accounts are governed by their own access controls.</li>
            </ul>

            <h2 id="acceptable-use" style={h2Anchor}>4. Acceptable Use</h2>
            <p>
              You agree not to misuse the Service. Specifically, you will not:
            </p>
            <ul>
              <li>Use the Service to upload, record, transcribe, or process content that you do not have the legal right to capture, including content recorded without the consent of participants where consent is required by applicable law.</li>
              <li>Upload or transmit content that is illegal, infringing, defamatory, harassing, harmful, or that violates the privacy or intellectual property rights of others.</li>
              <li>Reverse engineer, decompile, scrape, or attempt to extract the source code of the Service, except to the extent expressly permitted by applicable law.</li>
              <li>Use automated means (bots, crawlers, scripts) to access the Service in a way that exceeds reasonable use, abuses our API, or interferes with normal operation.</li>
              <li>Resell, sublicense, or expose the Service to third parties as a standalone product without our written permission.</li>
              <li>Attempt to gain unauthorized access to other accounts, systems, or networks connected to the Service.</li>
              <li>Interfere with or disrupt the Service, including by introducing malware, denial-of-service attempts, or excessive automated traffic.</li>
              <li>Use the Service to develop a competing product or to train machine learning models that compete with Knowcap.</li>
            </ul>
            <p>
              We may suspend or terminate access for violations of this section, at our discretion.
            </p>

            <h2 id="user-content" style={h2Anchor}>5. User Content</h2>
            <p>
              <strong>Your content remains yours.</strong> You retain all rights to the meetings, recordings, files, transcripts, prompts, and other materials you submit to the Service (&ldquo;User Content&rdquo;).
            </p>
            <p>
              <strong>License to operate the Service.</strong> You grant Knowcap a worldwide, non-exclusive, royalty-free license to host, store, process, transmit, transcribe, analyze, summarize, embed, and display your User Content solely for the purpose of providing and improving the Service for you and your organization. This license ends when you delete the relevant content, except to the extent that processing has already been completed or backups are subject to standard retention windows described in our Privacy Policy.
            </p>
            <p>
              <strong>No external model training.</strong> We do not use your User Content to train AI or machine learning models for the benefit of any third party. We do not sell your User Content. Aggregated, fully de-identified analytics that cannot reasonably be linked back to you or your organization are an exception and may be used to improve the Service.
            </p>
            <p>
              <strong>Your responsibility for content.</strong> You represent that you have all necessary rights, consents, and permissions to submit your User Content to the Service, including consent from meeting participants where required by applicable law, and that your User Content does not violate these Terms or any law.
            </p>
            <p>
              <strong>Feedback.</strong> If you send us suggestions, ideas, or feedback about the Service, you grant us a perpetual, irrevocable, royalty-free license to use that feedback without obligation to you.
            </p>

            <h2 id="billing" style={h2Anchor}>6. Subscriptions, Billing, and Cancellation</h2>
            <p>
              Knowcap offers free and paid plans. Current pricing, features, and limits are listed on our pricing page.
            </p>
            <ul>
              <li><strong>Billing cycles.</strong> Paid plans are billed in advance on a monthly or annual basis, depending on the plan you select. Fees are non-refundable except as required by law or as expressly stated in these Terms.</li>
              <li><strong>Renewals.</strong> Subscriptions automatically renew at the end of each billing cycle at the then-current price unless you cancel before the renewal date.</li>
              <li><strong>Cancellation.</strong> You may cancel your subscription at any time from your account settings or by emailing <a href="mailto:hsa@smetools.io">hsa@smetools.io</a>. Cancellation takes effect at the end of your current billing period; you retain access to paid features until then.</li>
              <li><strong>Changes to pricing.</strong> We may change pricing or plan features with at least 30 days&apos; advance notice for existing subscribers. Changes take effect at your next renewal.</li>
              <li><strong>Taxes.</strong> Fees are exclusive of applicable taxes, which are your responsibility.</li>
              <li><strong>Failed payments.</strong> If a payment fails, we may suspend access to paid features until payment is resolved.</li>
            </ul>

            <h2 id="availability" style={h2Anchor}>7. Service Availability and Modifications</h2>
            <p>
              We work hard to keep the Service running, but we do not guarantee uninterrupted availability. The free tier and standard paid plans are provided without a formal uptime service level agreement. We may modify, suspend, or discontinue any part of the Service at any time, including features, integrations, and supported third-party services. We will provide reasonable notice of material changes where practical.
            </p>
            <p>
              Scheduled maintenance, third-party outages (including Google, Supabase, and AI model providers), force majeure events, and emergency security work may cause temporary disruptions.
            </p>

            <h2 id="termination" style={h2Anchor}>8. Termination</h2>
            <p>
              You may stop using the Service and delete your account at any time. We may suspend or terminate your access to the Service, with or without notice, if:
            </p>
            <ul>
              <li>You violate these Terms or our Acceptable Use rules.</li>
              <li>We are required to do so by law or by a third-party provider we depend on.</li>
              <li>Your account has been inactive for an extended period.</li>
              <li>We discontinue the Service or a feature you depend on.</li>
            </ul>
            <p>
              Upon termination, your right to access the Service ends. Sections that by their nature should survive (including content licenses already granted, disclaimers, limitation of liability, indemnification, and governing law) will survive termination. You may export your data prior to termination; after termination, your data will be deleted in line with the retention windows described in our Privacy Policy.
            </p>

            <h2 id="disclaimers" style={h2Anchor}>9. Disclaimers</h2>
            <p>
              The Service is provided <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> without warranties of any kind, whether express, implied, statutory, or otherwise. To the maximum extent permitted by law, Knowcap disclaims all warranties, including warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.
            </p>
            <p>We do not warrant that:</p>
            <ul>
              <li>The Service will be uninterrupted, error-free, or secure.</li>
              <li>Transcriptions, summaries, or AI-generated outputs will be accurate, complete, or suitable for any particular purpose.</li>
              <li>The Service will meet your requirements or expectations.</li>
            </ul>
            <p>
              AI-generated content can contain errors, omissions, or hallucinations. You are responsible for reviewing and verifying any outputs before relying on them for business, legal, medical, financial, or other consequential decisions.
            </p>

            <h2 id="liability" style={h2Anchor}>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Knowcap and SMETOOLS LLC, together with our officers, directors, employees, and affiliates, will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including loss of profits, revenue, data, goodwill, or business opportunities, arising out of or related to your use of the Service, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Our total aggregate liability for any claim arising out of or related to these Terms or the Service will not exceed the greater of (a) the amount you paid us for the Service in the 12 months immediately preceding the event giving rise to the claim, or (b) one hundred United States dollars (US$100).
            </p>
            <p>
              Some jurisdictions do not allow the exclusion or limitation of certain damages. In those jurisdictions, our liability is limited to the maximum extent permitted by law.
            </p>

            <h2 id="indemnification" style={h2Anchor}>11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Knowcap, SMETOOLS LLC, and our officers, directors, employees, contractors, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to: (a) your User Content; (b) your use or misuse of the Service; (c) your violation of these Terms; or (d) your violation of any law or the rights of any third party, including meeting participants whose consent was required.
            </p>

            <h2 id="governing-law" style={h2Anchor}>12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law principles. Any dispute, claim, or controversy arising out of or relating to these Terms or the Service will be subject to the exclusive jurisdiction of the state and federal courts located in Sacramento County, California. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.
            </p>

            <h2 id="changes" style={h2Anchor}>13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. When we make material changes, we will update the &ldquo;Last updated&rdquo; date at the top and, where appropriate, notify you by email or in-product notice. Continued use of the Service after the changes take effect constitutes acceptance of the revised Terms. If you do not agree to the changes, you must stop using the Service.
            </p>

            <h2 id="contact-us" style={h2Anchor}>Contact Us</h2>
            <h3>SMETOOLS LLC</h3>
            <p>101 Dowd Ct, Folsom, CA 95630</p>
            <p>
              <a href="mailto:hsa@smetools.io">hsa@smetools.io</a>
              {' • '}
              <a href="mailto:shady@smetools.io">shady@smetools.io</a>
            </p>
          </div>

          {/* Back to Top */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cl-btn cl-btn--ghost cl-btn--sm"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </EditorialShell>
  )
}
