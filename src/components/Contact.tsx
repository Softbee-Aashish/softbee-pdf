import { useState } from 'react'
import {
  Mail, Send, CheckCircle2, Clock, Github,
  ShieldCheck, ArrowRight
} from 'lucide-react'
import { toast } from 'sonner'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields.')
      return
    }

    // Prepare email client fallback
    const mailtoUrl = `mailto:softbee@outlook.in?subject=${encodeURIComponent(
      `[SoftBee PDF Contact] ${subject || 'General Inquiry'}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`

    window.location.href = mailtoUrl
    setSubmitted(true)
    toast.success('Opening your email client to send your message!')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-black text-gray-900 dark:text-zinc-100 transition-colors duration-300 pb-24">
      {/* Hero Header */}
      <section className="relative pt-16 pb-12 px-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-950/60">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-rose-100 dark:border-rose-900/30">
            <Mail size={14} /> Official Support & Inquiries
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about SoftBee PDF, feedback, or a bug report? Reach out directly. We typically reply within 24 to 48 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details & Trust Cards (Left - 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-5">
                <Mail size={24} />
              </div>
              <h2 className="text-xl font-bold dark:text-white mb-1">Direct Email</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
                For general questions, partnerships, or technical inquiries.
              </p>
              <a
                href="mailto:softbee@outlook.in"
                className="inline-flex items-center gap-2 text-rose-500 font-bold hover:underline text-base"
              >
                softbee@outlook.in
                <ArrowRight size={16} />
              </a>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-xs text-gray-400 dark:text-zinc-500 font-medium">
                <Clock size={14} className="text-emerald-500" />
                <span>Response time: Within 24–48 hours</span>
              </div>
            </div>

            {/* GitHub Issues Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 border border-gray-200/80 dark:border-white/10 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white flex items-center justify-center mb-5">
                <Github size={24} />
              </div>
              <h2 className="text-xl font-bold dark:text-white mb-1">GitHub Issue Tracker</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">
                Found a bug or have a feature request? Open a public issue on our GitHub repository.
              </p>
              <a
                href="https://github.com/Softbee-Aashish/softbee-pdf/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-bold hover:text-rose-500 transition-colors text-base"
              >
                Open GitHub Issues
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Privacy Promise Notice */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl p-6 border border-emerald-200/60 dark:border-emerald-900/30">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-1">
                    Your Documents Stay Private
                  </h3>
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed">
                    Please never send sensitive PDFs via email. All PDF processing happens 100% locally in your browser memory on your device.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Message Form (Right - 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-10 border border-gray-200/80 dark:border-white/10 shadow-sm">
            <h2 className="text-2xl font-bold dark:text-white mb-2">Send a Message</h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-8">
              Fill out the form below to launch your email client with your prefilled inquiry.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold dark:text-white">Email Client Opened!</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
                  If your email app didn't automatically open, feel free to directly send an email to{' '}
                  <a href="mailto:softbee@outlook.in" className="text-rose-500 font-bold underline">
                    softbee@outlook.in
                  </a>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none text-sm dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none text-sm dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Feedback, Question, or Partnership"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none text-sm dark:text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none text-sm dark:text-white transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={16} />
                  Send Message via Email
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quick FAQ Strip */}
        <section className="mt-16 pt-12 border-t border-gray-200/80 dark:border-white/10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold dark:text-white mb-2">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Quick answers before you reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-white/10">
              <h4 className="font-bold text-sm dark:text-white mb-2">Are my PDFs uploaded to servers?</h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                No. SoftBee PDF operates 100% inside your browser or device memory. No files are ever uploaded or stored remotely.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-white/10">
              <h4 className="font-bold text-sm dark:text-white mb-2">Is SoftBee PDF free to use?</h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Yes. SoftBee PDF is completely free, open-source under AGPL-3.0, and has no subscription fees or file size paywalls.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/80 dark:border-white/10">
              <h4 className="font-bold text-sm dark:text-white mb-2">Can I use it offline?</h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Yes. Install it as a PWA or download the Android APK to process your PDF files with zero internet connection required.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
