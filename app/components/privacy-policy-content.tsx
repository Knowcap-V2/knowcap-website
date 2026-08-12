
'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Users, Mail, FileText, Lock } from 'lucide-react'

const sections = [
  {
    id: 'data-collection',
    title: 'Data Collection',
    icon: Eye
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    icon: Users
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    icon: Shield
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    icon: Mail
  }
]

export default function PrivacyPolicyContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-[#005EFF]" />
              <span className="text-sm font-medium text-muted-foreground">Legal Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Knowcap Chrome Extension • Effective Date: September 9, 2025
            </p>
            
            {/* Quick Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg group"
                >
                  <section.icon className="w-5 h-5 text-[#005EFF] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-sm font-medium text-center">{section.title}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">1. Introduction</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This Privacy Policy describes how SMETOOLS LLC ("Knowcap," "we," "us," or "our") collects, uses, shares, and protects your information when you use our Chrome Extension (the "Extension") and related services (collectively, the "Service"). Your privacy is of the utmost importance to us. By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </motion.div>

          {/* Service Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">2. Description of Service</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The Knowcap Chrome Extension provides a service to help users record, transcribe, and organize their Google Meetings and other screen-captured content. It features an AI-powered bot that can automatically join and record meetings, as well as tools for manual screen, camera, and audio recording. All captured content is processed for transcription and uploaded to the user's account at app.knowcap.ai for easy access and management.
            </p>
          </motion.div>

          {/* Data Collection */}
          <motion.div
            id="data-collection"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">3. Information We Collect</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In the last 12 months, we have collected the following categories of personal information:
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 rounded-r-lg">
                <h3 className="font-bold text-[#0052CC] mb-2">A. Identifiers</h3>
                <p className="text-sm text-muted-foreground mb-2"><strong>Information You Provide:</strong> Name and email address when you create a Knowcap account.</p>
                <p className="text-sm text-muted-foreground"><strong>Sources:</strong> Directly from you.</p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-500/5 p-4 rounded-r-lg">
                <h3 className="font-bold text-blue-300 mb-2">B. Audio, Electronic, and Visual Information</h3>
                <p className="text-sm text-muted-foreground mb-2"><strong>Information You Provide:</strong> When you use the Knowcap bot or screen recorder, we capture video from the meeting, your camera feed, and/or your screen share, as well as audio from the meeting and/or your microphone, as directed by you.</p>
                <p className="text-sm text-muted-foreground"><strong>Sources:</strong> Directly from you and your use of the Service.</p>
              </div>

              <div className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 rounded-r-lg">
                <h3 className="font-bold text-[#0052CC] mb-2">C. Internet or Other Electronic Network Activity Information</h3>
                <p className="text-sm text-muted-foreground mb-2"><strong>Information Collected Automatically:</strong> We may collect anonymous data about your interaction with the Extension, such as feature usage and performance metrics. We also detect meet.google.com URLs to enable the extension's core functionality.</p>
                <p className="text-sm text-muted-foreground"><strong>Sources:</strong> Automatically from your device and browser.</p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-500/5 p-4 rounded-r-lg">
                <h3 className="font-bold text-blue-300 mb-2">D. Inferences Drawn from Other Personal Information</h3>
                <p className="text-sm text-muted-foreground mb-2"><strong>Information Collected Automatically:</strong> Audio from your recordings is processed to generate a text-based transcript.</p>
                <p className="text-sm text-muted-foreground"><strong>Sources:</strong> Automatically generated from the audio/visual information you provide.</p>
              </div>

              <div className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 rounded-r-lg">
                <h3 className="font-bold text-[#0052CC] mb-2">E. Other Information You Provide</h3>
                <p className="text-sm text-muted-foreground mb-2"><strong>Information You Provide:</strong> We store settings you configure, such as the custom name for your meeting bot, auto-join preferences, and the default project for your recordings.</p>
                <p className="text-sm text-muted-foreground"><strong>Sources:</strong> Directly from you.</p>
              </div>
            </div>
          </motion.div>

          {/* How We Use Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">4. How We Use Your Information</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect for the following business and commercial purposes:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#0052CC]">To Provide and Maintain the Service:</span>
                  <span className="text-muted-foreground"> To allow the bot to join meetings, record content, generate transcripts, and upload the final video to your Knowcap account.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#0052CC]">To Personalize Your Experience:</span>
                  <span className="text-muted-foreground"> To remember your settings and preferences.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#0052CC]">To Organize Your Content:</span>
                  <span className="text-muted-foreground"> To associate your recordings with the projects you designate on app.knowcap.ai.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#0052CC]">For Communication:</span>
                  <span className="text-muted-foreground"> To send important notices about your account or changes to our services.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#0052CC]">For Security and Improvement:</span>
                  <span className="text-muted-foreground"> To secure our services, prevent abuse, and analyze usage patterns to improve the Extension.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-[#0052CC]">For Advertising Measurement:</span>
                  <span className="text-muted-foreground"> We use the Meta Pixel on our marketing site to measure the performance of our advertising campaigns — for example, whether a visit or signup resulted from a specific ad. This may involve sharing limited technical information about your visit with Meta. See Meta&apos;s Data Policy for details.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Data Sharing */}
          <motion.div
            id="data-sharing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">5. Data Sharing and Disclosure</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We do not sell your personal information or "share" it for cross-context behavioral advertising. We may disclose your information with the following categories of third parties for business purposes:
            </p>
            
            <div className="space-y-6">
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6">
                <h3 className="font-bold text-red-300 mb-4">Service Providers</h3>
                <p className="text-muted-foreground mb-4">
                  We engage third-party service providers who help us operate our Service. These providers are contractually obligated to safeguard your data and are not permitted to use it for any other purpose. These include:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-red-300">Google:</span>
                      <span className="text-muted-foreground"> We use several Google services to provide our core functionality. Your data shared with these services is governed by the Google Privacy Policy.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-red-300">Google Cloud Platform (including Firebase):</span>
                      <span className="text-muted-foreground"> For cloud hosting, data storage, and backend logic.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-red-300">Google Gemini:</span>
                      <span className="text-muted-foreground"> For processing audio to generate transcripts and provide other AI-powered features.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-red-300">Recall.ai:</span>
                      <span className="text-muted-foreground"> We use Recall.ai to provide the meeting bot functionality. Your data shared with Recall.ai is governed by the Recall.ai Privacy Policy.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-[#0052CC] mb-2">Legal Compliance</h4>
                  <p className="text-sm text-muted-foreground">We may disclose your information if required by law or in response to a valid request from a law enforcement or government agency.</p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-blue-300 mb-2">Business Transfers</h4>
                  <p className="text-sm text-muted-foreground">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google API Services and Limited Use Disclosure */}
          <motion.div
            id="google-api-limited-use"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">6. Google API Services and Limited Use Disclosure</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Knowcap integrates with Google services so you can sign in with your Google account and, optionally, connect Google Calendar and Google Drive to power core product features. This section explains which Google APIs we use, why we need each scope, and how we handle data we receive from Google.
            </p>

            <h3 className="font-semibold text-[#0052CC] mb-3">Google APIs we use</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Google Identity (OpenID Connect / userinfo)</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Google Calendar API</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Google Drive API (file-scoped)</p></div>
            </div>

            <h3 className="font-semibold text-[#0052CC] mb-3">Per-scope justification</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you connect your Google account, Knowcap requests only the OAuth scopes it needs to deliver features you have explicitly enabled:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">userinfo.email</span> &mdash; Used to identify your account during sign-in and to associate activity in Knowcap with the correct user.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">userinfo.profile</span> &mdash; Used to display your name and avatar in the Knowcap interface so you and your teammates can recognize each other.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">calendar.readonly</span> &mdash; Used to show your upcoming meetings inside Knowcap so you can choose which ones to capture.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">calendar.events.readonly</span> &mdash; Used to read meeting details such as conferencing links and attendees so the Knowcap meeting bot can automatically join meetings you have opted to record.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">drive.file</span> &mdash; Used with the Google Drive Picker so you can select specific files for Knowcap to ingest. This is a per-file consent scope: Knowcap can only see files you explicitly pick, never your full Drive.</p></div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We do not request any additional Google scopes beyond those listed above.
            </p>

            <h3 className="font-semibold text-[#0052CC] mb-3">Limited Use disclosure</h3>
            <div className="border-l-4 border-cyan-500 bg-cyan-500/5 p-4 rounded-r mb-6">
              <p className="text-muted-foreground italic">
                Knowcap&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{' '}
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-[#005EFF] hover:text-[#0052CC] font-medium">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
            </div>

            <h3 className="font-semibold text-[#0052CC] mb-3">How we handle Google user data</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">No AI model training.</span> We do not use data received from Google APIs to develop, improve, or train generalized or third-party AI or machine learning models.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">No selling or advertising.</span> We do not sell data received from Google APIs and we do not use it for advertising purposes.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">No third-party transfers.</span> We do not transfer data received from Google APIs to third parties, except as necessary to provide or improve the user-facing features you have enabled (for example, secure infrastructure providers that host the Service), to comply with applicable law, or as part of a merger, acquisition, or sale of assets with appropriate notice to you.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground"><span className="font-semibold text-[#0052CC]">No human access.</span> We do not allow humans to read data received from Google APIs unless (a) we have obtained your explicit consent to view specific content, (b) it is necessary for security purposes such as investigating abuse, (c) it is required to comply with applicable law, or (d) the data has been aggregated and de-identified so it cannot be linked to any individual.</p></div>
            </div>

            <h3 className="font-semibold text-[#0052CC] mb-3">Revoking access and deleting your data</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You can disconnect Knowcap from your Google account at any time:
            </p>
            <div className="space-y-2 mb-3">
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Visit your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-[#005EFF] hover:text-[#0052CC] font-medium">Google account permissions page</a>.</p></div>
              <div className="flex items-start gap-3"><div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div><p className="text-muted-foreground">Select Knowcap and click &ldquo;Remove Access.&rdquo;</p></div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To delete data Knowcap has already stored, sign in to Knowcap and use the in-app data deletion controls, or email us at <a href="mailto:hsa@smetools.io" className="text-[#005EFF] hover:text-[#0052CC]">hsa@smetools.io</a>. Deletion follows the retention windows described elsewhere in this Privacy Policy.
            </p>
          </motion.div>

          {/* Data Storage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">7. Data Storage, Security, and Retention</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#0052CC] mb-2">Storage and Security:</h3>
                <p className="text-muted-foreground">All recorded data is securely uploaded to and stored on our servers, hosted by Google Cloud Platform, with industry-standard security measures including end-to-end encryption.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0052CC] mb-2">Source Code Management:</h3>
                <p className="text-muted-foreground">Our Extension's source code is managed in private GitHub repositories with strictly limited access.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0052CC] mb-2">Data Retention:</h3>
                <p className="text-muted-foreground">We retain your personal information for as long as your account is active. If you delete your account, your data will be permanently deleted from our production systems within 90 days, except where retention is required for legal or security purposes.</p>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            id="your-rights"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">8. Your Rights and Choices</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                <h4 className="font-bold text-[#0052CC] mb-2">Access and Deletion</h4>
                <p className="text-sm text-muted-foreground">You can access, manage, and delete your recordings and transcripts at any time through your dashboard.</p>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-bold text-blue-300 mb-2">Extension Settings</h4>
                <p className="text-sm text-muted-foreground">You can enable or disable features like auto-joining directly within the Extension's settings.</p>
              </div>
              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                <h4 className="font-bold text-[#0052CC] mb-2">Uninstalling</h4>
                <p className="text-sm text-muted-foreground">You can stop all information collection by uninstalling the Extension from your browser.</p>
              </div>
            </div>
          </motion.div>

          {/* California Rights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">9. Your California Privacy Rights (CCPA/CPRA)</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you are a California resident, you have specific rights regarding your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-[#0052CC] font-medium">Right to Know and Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-[#0052CC] font-medium">Right to Delete</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-[#0052CC] font-medium">Right to Correct</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-300 font-medium">Right to Opt-Out of Sale / Sharing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-300 font-medium">Right to Non-Discrimination</span>
                </div>
              </div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <h4 className="font-bold text-[#0052CC] mb-2">How to Exercise Your Rights:</h4>
              <p className="text-sm text-muted-foreground">To exercise these rights, please submit a verifiable consumer request to us by emailing hsa@smetools.io or shady@smetools.io.</p>
            </div>
          </motion.div>

          {/* Children's Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">10. Children's Privacy</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information.
            </p>
          </motion.div>

          {/* Policy Changes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">11. Changes to This Privacy Policy</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top. We encourage you to review this policy periodically.
            </p>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            id="contact-us"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-[#005EFF]" />
              <h2 className="text-2xl font-bold text-[#0052CC]">12. Contact Us</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#0052CC] mb-2">SMETOOLS LLC</h3>
                <p className="text-muted-foreground">101 Dowd Ct, Folsom, CA 95630</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:hsa@smetools.io" 
                  className="text-[#005EFF] hover:text-[#0052CC] transition-colors font-medium"
                >
                  hsa@smetools.io
                </a>
                <span className="text-muted-foreground hidden sm:block">•</span>
                <a 
                  href="mailto:shady@smetools.io" 
                  className="text-[#005EFF] hover:text-[#0052CC] transition-colors font-medium"
                >
                  shady@smetools.io
                </a>
              </div>
            </div>
          </motion.div>

          {/* Back to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Back to Top
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
