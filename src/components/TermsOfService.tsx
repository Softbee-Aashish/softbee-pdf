import { Scale } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-black text-gray-900 dark:text-zinc-100 transition-colors duration-300 pb-24">
      {/* Header */}
      <section className="relative pt-16 pb-12 px-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-950/60">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-rose-100 dark:border-rose-900/30">
            <Scale size={14} /> Legal Documentation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-base text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Last updated: October 2026. Please read these terms carefully before using SoftBee PDF.
          </p>
        </div>
      </section>

      {/* Main Legal Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-10">
        
        {/* Section 1 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">1</span>
            Acceptance of Terms
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            By accessing or using the SoftBee PDF website (<a href="https://softbee-pdf.pages.dev" className="text-rose-500 underline">softbee-pdf.pages.dev</a>) or the SoftBee PDF mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">2</span>
            Open Source License (GNU AGPL v3.0)
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            SoftBee PDF is free, open-source software distributed under the terms of the <strong>GNU Affero General Public License version 3 (AGPL-3.0)</strong>. You are welcome to review, inspect, modify, and redistribute the source code in accordance with the AGPL-3.0 license terms published in our <a href="https://github.com/Softbee-Aashish/softbee-pdf" target="_blank" rel="noopener noreferrer" className="text-rose-500 underline">GitHub repository</a>.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">3</span>
            Client-Side Architecture & Document Ownership
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            All file processing—including merging, splitting, compressing, encrypting, and converting—is executed <strong>entirely inside your browser or device memory</strong> using client-side WebAssembly and JavaScript libraries.
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-zinc-300 space-y-2">
            <li>SoftBee PDF does not maintain backend servers that ingest, upload, or store your documents.</li>
            <li>You retain 100% intellectual property, copyright, and confidentiality over all files you process.</li>
            <li>We cannot view, access, recover, or restore any document processed through the toolkit.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">4</span>
            Permitted & Lawful Use
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            You agree to use SoftBee PDF exclusively for lawful purposes. You must not use this application to:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-zinc-300 space-y-2">
            <li>Forge or alter counterfeit documents, credentials, or government identification papers.</li>
            <li>Circumvent or crack cryptographic protections without authorization from the legitimate owner.</li>
            <li>Violate intellectual property, copyright, or confidentiality agreements.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">5</span>
            Third-Party Services & Advertising
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            To sustain free development and maintenance, SoftBee PDF displays advertisements served by <strong>Google AdSense</strong> and analyzes anonymous site traffic via <strong>Google Analytics</strong>.
          </p>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            These third-party vendors may use cookies or web beacons in accordance with Google's Privacy Policy. Neither Google nor advertisers have access to the contents of your PDF files. For full details on cookie preferences and opt-out options, please review our <Link to="/privacy" className="text-rose-500 underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Section 6 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">6</span>
            Disclaimer of Warranties
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            SoftBee PDF is provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis, without warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that file processing will be completely error-free or uninterrupted.
          </p>
        </div>

        {/* Section 7 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">7</span>
            Limitation of Liability
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            To the maximum extent permitted by applicable law, neither SoftBee nor its contributors shall be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use this software, including data loss or corrupted documents. We advise users to retain backup copies of critical documents prior to batch processing.
          </p>
        </div>

        {/* Section 8 */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-200/80 dark:border-white/10 shadow-sm space-y-4">
          <h2 className="text-xl font-bold dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold">8</span>
            Contact & Inquiries
          </h2>
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            If you have questions or concerns regarding these Terms of Service, please contact us at:
          </p>
          <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl text-xs space-y-1">
            <p className="font-bold text-gray-900 dark:text-white">SoftBee PDF Project</p>
            <p className="text-gray-600 dark:text-zinc-400">Email: <a href="mailto:softbee@outlook.in" className="text-rose-500 underline font-bold">softbee@outlook.in</a></p>
            <p className="text-gray-600 dark:text-zinc-400">Website: <a href="https://softbee-pdf.pages.dev" className="text-rose-500 underline">https://softbee-pdf.pages.dev</a></p>
          </div>
        </div>

      </main>
    </div>
  )
}
