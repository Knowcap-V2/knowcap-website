'use client'

import { useEffect } from 'react'
import EditorialShell, { PageHero } from '@/components/editorial/shell'

const sections = [
  { id: 'data-collection', title: 'Data Collection' },
  { id: 'data-sharing', title: 'Data Sharing' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'contact-us', title: 'Contact Us' },
]

const h2Anchor = { scrollMarginTop: '90px' } as const

export default function PolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy - Knowcap.ai'
  }, [])

  return (
    <EditorialShell>
      <PageHero
        kicker="Legal Information"
        title="Privacy Policy"
        sub="Knowcap Chrome Extension • Effective Date: June 14, 2026"
      />
      <div className="cl-page-body">
        <div className="cl-wrap">
          {/* Quick Navigation */}
          <nav
            aria-label="Policy sections"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 28 }}
          >
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="cl-btn cl-btn--ghost cl-btn--sm">
                {section.title}
              </a>
            ))}
          </nav>

          <div className="cl-prose">
            <h2 style={h2Anchor}>1. Introduction</h2>
            <p>
              This Privacy Policy describes how SMETOOLS LLC (&quot;Knowcap,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, shares, and protects your information when you use our Chrome Extension (the &quot;Extension&quot;) and related services (collectively, the &quot;Service&quot;). Your privacy is of the utmost importance to us. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2 style={h2Anchor}>2. Description of Service</h2>
            <p>
              The Knowcap Chrome Extension helps you capture the work your team already does — meetings (including Google Meet), calls, screen recordings, documents, and links — as part of Knowcap&apos;s verified work intelligence for AI agents. It features an AI-powered bot that can automatically join and record meetings, as well as tools for manual screen, camera, and audio recording. All captured content is processed for transcription and uploaded to the user&apos;s account at app.knowcap.ai, where a named human confirms what becomes durable evidence for your agents.
            </p>

            <h2 id="data-collection" style={h2Anchor}>3. Information We Collect</h2>
            <p>
              In the last 12 months, we have collected the following categories of personal information:
            </p>

            <h3>A. Identifiers</h3>
            <p><strong>Information You Provide:</strong> Name and email address when you create a Knowcap account.</p>
            <p><strong>Sources:</strong> Directly from you.</p>

            <h3>B. Audio, Electronic, and Visual Information</h3>
            <p><strong>Information You Provide:</strong> When you use the Knowcap bot or screen recorder, we capture video from the meeting, your camera feed, and/or your screen share, as well as audio from the meeting and/or your microphone, as directed by you.</p>
            <p><strong>Sources:</strong> Directly from you and your use of the Service.</p>

            <h3>C. Internet or Other Electronic Network Activity Information</h3>
            <p><strong>Information Collected Automatically:</strong> We may collect anonymous data about your interaction with the Extension, such as feature usage and performance metrics. We also detect meet.google.com URLs to enable the extension&apos;s core functionality.</p>
            <p><strong>Sources:</strong> Automatically from your device and browser.</p>

            <h3>D. Inferences Drawn from Other Personal Information</h3>
            <p><strong>Information Collected Automatically:</strong> Audio from your recordings is processed to generate a text-based transcript.</p>
            <p><strong>Sources:</strong> Automatically generated from the audio/visual information you provide.</p>

            <h3>E. Other Information You Provide</h3>
            <p><strong>Information You Provide:</strong> We store settings you configure, such as the custom name for your meeting bot, auto-join preferences, and the default project for your recordings.</p>
            <p><strong>Sources:</strong> Directly from you.</p>

            <h2 style={h2Anchor}>4. How We Use Your Information</h2>
            <p>
              We use the information we collect for the following business and commercial purposes:
            </p>
            <ul>
              <li><strong>To Provide and Maintain the Service:</strong> To allow the bot to join meetings, record content, generate transcripts, and upload the final video to your Knowcap account.</li>
              <li><strong>To Personalize Your Experience:</strong> To remember your settings and preferences.</li>
              <li><strong>To Organize Your Content:</strong> To associate your recordings with the projects you designate on app.knowcap.ai.</li>
              <li><strong>For Communication:</strong> To send important notices about your account or changes to our services.</li>
              <li><strong>For Security and Improvement:</strong> To secure our services, prevent abuse, and analyze usage patterns to improve the Extension.</li>
            </ul>

            <h2 id="data-sharing" style={h2Anchor}>5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information or &quot;share&quot; it for cross-context behavioral advertising. We may disclose your information with the following categories of third parties for business purposes:
            </p>

            <h3>Service Providers</h3>
            <p>
              We engage third-party service providers who help us operate our Service. These providers are contractually obligated to safeguard your data and are not permitted to use it for any other purpose. These include:
            </p>
            <ul>
              <li><strong>Google:</strong> We use several Google services to provide our core functionality. Your data shared with these services is governed by the Google Privacy Policy.</li>
              <li><strong>Google Cloud Platform (including Firebase):</strong> For cloud hosting, data storage, and backend logic.</li>
              <li><strong>Google Gemini:</strong> For processing audio to generate transcripts and provide other AI-powered features.</li>
              <li><strong>Recall.ai:</strong> We use Recall.ai to provide the meeting bot functionality. Your data shared with Recall.ai is governed by the Recall.ai Privacy Policy.</li>
            </ul>

            <h3>Legal Compliance</h3>
            <p>We may disclose your information if required by law or in response to a valid request from a law enforcement or government agency.</p>

            <h3>Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>

            <h2 id="google-api-limited-use" style={h2Anchor}>6. Google API Services and Limited Use Disclosure</h2>
            <p>
              Knowcap integrates with Google services so you can sign in with your Google account and, optionally, connect Google Calendar and Google Drive to power core product features. This section explains which Google APIs we use, why we need each scope, and how we handle data we receive from Google.
            </p>

            <h3>Google APIs we use</h3>
            <ul>
              <li>Google Identity (OpenID Connect / userinfo)</li>
              <li>Google Calendar API</li>
              <li>Google Drive API (file-scoped)</li>
            </ul>

            <h3>Per-scope justification</h3>
            <p>
              When you connect your Google account, Knowcap requests only the OAuth scopes it needs to deliver features you have explicitly enabled:
            </p>
            <ul>
              <li><strong>userinfo.email</strong> &mdash; Used to identify your account during sign-in and to associate activity in Knowcap with the correct user.</li>
              <li><strong>userinfo.profile</strong> &mdash; Used to display your name and avatar in the Knowcap interface so you and your teammates can recognize each other.</li>
              <li><strong>calendar.readonly</strong> &mdash; Used to show your upcoming meetings inside Knowcap so you can choose which ones to capture.</li>
              <li><strong>calendar.events.readonly</strong> &mdash; Used to read meeting details such as conferencing links and attendees so the Knowcap meeting bot can automatically join meetings you have opted to record.</li>
              <li><strong>drive.file</strong> &mdash; Used with the Google Drive Picker so you can select specific files for Knowcap to ingest. This is a per-file consent scope: Knowcap can only see files you explicitly pick, never your full Drive.</li>
            </ul>
            <p>
              We do not request any additional Google scopes beyond those listed above.
            </p>

            <h3>Limited Use disclosure</h3>
            <p style={{ fontStyle: 'italic', borderLeft: '3px solid var(--green)', paddingLeft: 16 }}>
              Knowcap&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>

            <h3>How we handle Google user data</h3>
            <ul>
              <li><strong>No AI model training.</strong> We do not use data received from Google APIs to develop, improve, or train generalized or third-party AI or machine learning models.</li>
              <li><strong>No selling or advertising.</strong> We do not sell data received from Google APIs and we do not use it for advertising purposes.</li>
              <li><strong>No third-party transfers.</strong> We do not transfer data received from Google APIs to third parties, except as necessary to provide or improve the user-facing features you have enabled (for example, secure infrastructure providers that host the Service), to comply with applicable law, or as part of a merger, acquisition, or sale of assets with appropriate notice to you.</li>
              <li><strong>No human access.</strong> We do not allow humans to read data received from Google APIs unless (a) we have obtained your explicit consent to view specific content, (b) it is necessary for security purposes such as investigating abuse, (c) it is required to comply with applicable law, or (d) the data has been aggregated and de-identified so it cannot be linked to any individual.</li>
            </ul>

            <h3>Revoking access and deleting your data</h3>
            <p>
              You can disconnect Knowcap from your Google account at any time:
            </p>
            <ul>
              <li>Visit your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google account permissions page</a>.</li>
              <li>Select Knowcap and click &ldquo;Remove Access.&rdquo;</li>
            </ul>
            <p>
              To delete data Knowcap has already stored, sign in to Knowcap and use the in-app data deletion controls, or email us at <a href="mailto:hsa@smetools.io">hsa@smetools.io</a>. Deletion follows the retention windows described elsewhere in this Privacy Policy.
            </p>

            <h2 style={h2Anchor}>7. Data Storage, Security, and Retention</h2>
            <h3>Storage and Security:</h3>
            <p>All recorded data is securely uploaded to and stored on our servers, hosted by Google Cloud Platform, with industry-standard security measures including end-to-end encryption.</p>
            <h3>Source Code Management:</h3>
            <p>Our Extension&apos;s source code is managed in private GitHub repositories with strictly limited access.</p>
            <h3>Data Retention:</h3>
            <p>We retain your personal information for as long as your account is active. If you delete your account, your data will be permanently deleted from our production systems within 90 days, except where retention is required for legal or security purposes.</p>

            <h2 id="your-rights" style={h2Anchor}>8. Your Rights and Choices</h2>
            <h3>Access and Deletion</h3>
            <p>You can access, manage, and delete your recordings and transcripts at any time through your dashboard.</p>
            <h3>Extension Settings</h3>
            <p>You can enable or disable features like auto-joining directly within the Extension&apos;s settings.</p>
            <h3>Uninstalling</h3>
            <p>You can stop all information collection by uninstalling the Extension from your browser.</p>

            <h2 style={h2Anchor}>9. Your California Privacy Rights (CCPA/CPRA)</h2>
            <p>
              If you are a California resident, you have specific rights regarding your personal information:
            </p>
            <ul>
              <li>Right to Know and Access</li>
              <li>Right to Delete</li>
              <li>Right to Correct</li>
              <li>Right to Opt-Out of Sale / Sharing</li>
              <li>Right to Non-Discrimination</li>
            </ul>
            <h3>How to Exercise Your Rights:</h3>
            <p>To exercise these rights, please submit a verifiable consumer request to us by emailing hsa@smetools.io or shady@smetools.io.</p>

            <h2 style={h2Anchor}>10. Children&apos;s Privacy</h2>
            <p>
              Our Service is not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information.
            </p>

            <h2 style={h2Anchor}>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Effective Date&quot; at the top. We encourage you to review this policy periodically.
            </p>

            <h2 id="contact-us" style={h2Anchor}>12. Contact Us</h2>
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
