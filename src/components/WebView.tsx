import { useState, useMemo } from 'react'
import {
  Search, ChevronRight, Sparkles, Shield, Lock, FileText, CheckCircle2,
  Download, ArrowRight, Zap, Smartphone,
  ServerOff, Cpu, ChevronDown, Check, Star
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { Tool, ToolCategory } from '../types'

// Smallpdf Vibrant Badge Color Mapping
const toolBadgeStyles: Record<string, { bg: string, text: string, label: string }> = {
  'Merge PDF': { bg: 'bg-rose-500', text: 'text-white', label: 'PDF' },
  'Edit PDF': { bg: 'bg-[#00A896]', text: 'text-white', label: 'EDIT' },
  'Compress PDF': { bg: 'bg-amber-500', text: 'text-white', label: 'PDF' },
  'PDF to Word': { bg: 'bg-[#1D4ED8]', text: 'text-white', label: 'DOCX' },
  'Word to PDF': { bg: 'bg-[#2563EB]', text: 'text-white', label: 'PDF' },
  'PDF to Excel': { bg: 'bg-[#059669]', text: 'text-white', label: 'XLSX' },
  'Excel to PDF': { bg: 'bg-[#10B981]', text: 'text-white', label: 'PDF' },
  'PDF Reader': { bg: 'bg-[#059669]', text: 'text-white', label: 'VIEW' },
  'Split PDF': { bg: 'bg-blue-500', text: 'text-white', label: 'PDF' },
  'Protect PDF': { bg: 'bg-indigo-500', text: 'text-white', label: 'PDF' },
  'Unlock PDF': { bg: 'bg-violet-500', text: 'text-white', label: 'PDF' },
  'Rotate PDF': { bg: 'bg-orange-500', text: 'text-white', label: 'PDF' },
  'Rearrange PDF': { bg: 'bg-emerald-500', text: 'text-white', label: 'PDF' },
  'Delete Pages': { bg: 'bg-red-500', text: 'text-white', label: 'PDF' },
  'Extract Pages': { bg: 'bg-purple-500', text: 'text-white', label: 'PDF' },
  'Page Numbers': { bg: 'bg-sky-500', text: 'text-white', label: 'PDF' },
  'Watermark': { bg: 'bg-purple-500', text: 'text-white', label: 'PDF' },
  'Metadata': { bg: 'bg-cyan-500', text: 'text-white', label: 'PDF' },
  'Signature': { bg: 'bg-pink-500', text: 'text-white', label: 'SIGN' },
  'Flatten PDF': { bg: 'bg-rose-600', text: 'text-white', label: 'PDF' },
  'Grayscale': { bg: 'bg-zinc-600', text: 'text-white', label: 'B&W' },
  'PDF to Image': { bg: 'bg-lime-600', text: 'text-white', label: 'IMG' },
  'PDF to JPG': { bg: 'bg-amber-500', text: 'text-white', label: 'JPG' },
  'PDF to PNG': { bg: 'bg-yellow-500', text: 'text-white', label: 'PNG' },
  'Image to PDF': { bg: 'bg-teal-500', text: 'text-white', label: 'PDF' },
  'JPG to PDF': { bg: 'bg-orange-500', text: 'text-white', label: 'PDF' },
  'PNG to PDF': { bg: 'bg-emerald-500', text: 'text-white', label: 'PDF' },
  'TXT to PDF': { bg: 'bg-blue-600', text: 'text-white', label: 'TXT' },
  'Extract Images': { bg: 'bg-yellow-500', text: 'text-white', label: 'IMG' },
  'PDF to Text': { bg: 'bg-blue-600', text: 'text-white', label: 'OCR' },
  'Repair PDF': { bg: 'bg-red-500', text: 'text-white', label: 'FIX' },
}

// Smallpdf Styled Tool Card Component with Animated Logo Badges
const SmallpdfToolCard = ({
  title,
  desc,
  icon: Icon,
  onClick
}: Tool & { onClick: () => void }) => {
  const badge = toolBadgeStyles[title] || { bg: 'bg-rose-500', text: 'text-white', label: 'PDF' }

  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left w-full cursor-pointer"
    >
      <div className="flex items-center gap-4 min-w-0 pr-3">
        {/* Animated Colorful Badge matching Smallpdf signature style */}
        <div className={`w-12 h-12 rounded-xl ${badge.bg} ${badge.text} flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-2 group-hover:shadow-md transition-all duration-300 ease-out`}>
          <Icon size={20} strokeWidth={2.2} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="text-[9px] font-black tracking-tighter opacity-90 leading-none mt-0.5">{badge.label}</span>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors truncate">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-snug line-clamp-2 mt-0.5 font-normal">
            {desc}
          </p>
        </div>
      </div>

      {/* Trailing Animated Arrow */}
      <div className="text-gray-300 dark:text-zinc-600 group-hover:text-rose-500 group-hover:translate-x-1 transition-all shrink-0">
        <ChevronRight size={18} strokeWidth={2.5} />
      </div>
    </button>
  )
}

// FAQ Accordion Item
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-gray-900 dark:text-white hover:text-rose-500 transition-colors"
      >
        <span>{question}</span>
        <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 text-gray-400 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800/60 animate-in fade-in duration-200">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function WebView({ tools }: { tools: Tool[] }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'All' | ToolCategory>('All')

  // Top 6 Popular Tools (matching Smallpdf showcase)
  const popularTools = useMemo(() => {
    const popularTitles = ['Compress PDF', 'PDF to Word', 'Merge PDF', 'Edit PDF', 'PDF to Image', 'Signature']
    return tools.filter(t => popularTitles.includes(t.title))
  }, [tools])

  // Filtered Tool List
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = !query || tool.title.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
      const matchesCategory = activeTab === 'All' || tool.category === activeTab
      return matchesSearch && matchesCategory
    })
  }, [tools, searchQuery, activeTab])

  const scrollToTools = () => {
    document.getElementById('all-tools-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-black text-gray-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. HERO SECTION (Smallpdf Style) */}
      <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 px-6 overflow-hidden border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-100 dark:border-rose-900/30">
              <Sparkles size={14} /> 100% Client-Side • Privacy-First
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight dark:text-white leading-[1.1]">
              We make PDF <span className="text-rose-500">easy.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              All the tools you need to be productive and work smarter with documents. Merge, split, compress, edit, and sign PDFs directly in your browser with zero server uploads.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToTools}
                className="px-7 py-3.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-rose-500/25 transition-all text-sm flex items-center gap-2"
              >
                Explore All PDF Tools
                <ArrowRight size={16} />
              </button>

              <Link
                to="/about"
                className="px-6 py-3.5 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-200 font-bold rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm transition-colors text-sm"
              >
                How It Works
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                No files uploaded
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                No registration required
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" strokeWidth={3} />
                Free forever (AGPL-3.0)
              </span>
            </div>
          </div>

          {/* Right Hero Column: Interactive Document Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-gray-200/80 dark:border-zinc-800">
              
              {/* Document Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  contract_final.pdf
                </span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/30">
                  Protected
                </span>
              </div>

              {/* Document Simulation Sheet */}
              <div className="my-6 p-5 bg-gray-50 dark:bg-zinc-950/60 rounded-2xl border border-gray-100 dark:border-zinc-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-zinc-700 rounded-md" />
                  <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded-md" />
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-full bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-2.5 w-5/6 bg-gray-200 dark:bg-zinc-800 rounded" />
                  <div className="h-2.5 w-4/6 bg-gray-200 dark:bg-zinc-800 rounded" />
                </div>

                {/* Simulated Signature & Stamp */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-200/60 dark:border-zinc-800">
                  <div className="border border-dashed border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <span className="text-[10px] font-bold text-rose-500">Verified Signature</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">Page 1 of 4</span>
                </div>
              </div>

              {/* Tool Actions Tray */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl font-bold flex flex-col items-center gap-1">
                  <Zap size={14} />
                  <span>Compressed</span>
                </div>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl font-bold flex flex-col items-center gap-1">
                  <Lock size={14} />
                  <span>Encrypted</span>
                </div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold flex flex-col items-center gap-1">
                  <Shield size={14} />
                  <span>Offline</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. MOST POPULAR PDF TOOLS SECTION (Smallpdf 6-grid) */}
      <section className="py-16 px-6 border-b border-gray-100 dark:border-white/5 bg-[#FAFAFA] dark:bg-zinc-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white mb-2">
              Most Popular PDF Tools
            </h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Quick access to our most frequently used utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.map((tool) => (
              <SmallpdfToolCard
                key={tool.title}
                {...tool}
                onClick={() => navigate(tool.path || '/')}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={scrollToTools}
              className="px-6 py-3 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-200 font-bold rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm text-xs uppercase tracking-wider transition-all"
            >
              See All {tools.length} Tools Below
            </button>
          </div>
        </div>
      </section>

      {/* 3. ALL SMALLPDF TOOLS DIRECTORY */}
      <section id="all-tools-section" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight dark:text-white mb-3">
            All SoftBee PDF Tools
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 leading-relaxed">
            Make use of our collection of PDF tools to process digital documents and streamline your workflow seamlessly.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-6 mb-10">
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. merge, compress, protect, ocr...)"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none text-sm dark:text-white shadow-sm transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['All', 'Edit', 'Convert', 'Optimize', 'Secure'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                }`}
              >
                {cat === 'All' ? 'All Tools' : cat === 'Edit' ? 'Organize & Edit' : cat === 'Convert' ? 'Convert & Extract' : cat === 'Optimize' ? 'Compress & Optimize' : 'Security & Sign'}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Tools Grid (Smallpdf Replica) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <SmallpdfToolCard
              key={tool.title}
              {...tool}
              onClick={() => navigate(tool.path || '/')}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-base font-bold dark:text-white mb-2">No tools match your query</p>
            <p className="text-xs text-gray-400 mb-4">Try clearing your search keyword or switching category tabs.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
              className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. "KEEP YOUR SIMPLE TASKS SIMPLE" - ALTERNATING FEATURE SHOWCASE */}
      <section className="py-20 px-6 bg-white dark:bg-zinc-950 border-t border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight dark:text-white mb-3">
              Keep Your Simple Tasks Simple
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400">
              Say goodbye to bloated desktop editors. Process, arrange, and protect documents with fast client-side tools designed for privacy.
            </p>
          </div>

          {/* Row 1: Work Directly on Your Files */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-500">Local Architecture</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold dark:text-white">
                Work Directly on Your Files
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                Most web-based PDF editors require uploading documents to remote cloud storage. SoftBee PDF runs WebAssembly scripts right in your web browser. Your confidential contracts and bank statements never leave your device.
              </p>
              <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400 font-medium pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  No server storage or temporary disk caching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Operates even with internet disconnected
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  Zero risk of cloud security breaches
                </li>
              </ul>
              <div className="pt-2">
                <Link to="/about" className="text-xs font-bold text-rose-500 hover:underline inline-flex items-center gap-1">
                  Learn about our local engine <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200/80 dark:border-zinc-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-zinc-800">
                  <span className="text-xs font-bold dark:text-white">File Privacy Inspector</span>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">Local RAM</span>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                    <span>Uploaded to Server:</span>
                    <span className="font-bold text-rose-500">0 Bytes (None)</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                    <span>Processing Engine:</span>
                    <span className="font-bold text-gray-900 dark:text-white">WebAssembly / pdf-lib</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                    <span>Network Transmission:</span>
                    <span className="font-bold text-emerald-500">Zero Outbound Telemetry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Digital Signatures Made Easy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200/80 dark:border-zinc-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-zinc-800">
                  <span className="text-xs font-bold dark:text-white">Digital Sign Tool</span>
                  <span className="text-[10px] font-bold text-pink-500 bg-pink-50 dark:bg-pink-950/40 px-2 py-0.5 rounded">In-Browser</span>
                </div>
                <div className="h-32 bg-white dark:bg-zinc-950 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center">
                  <span className="font-serif italic text-2xl text-gray-700 dark:text-zinc-300">Jane Smith</span>
                </div>
                <p className="text-[11px] text-gray-400 text-center">Touch, mouse, or typed cryptographic electronic signature.</p>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-500">Electronic Signatures</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold dark:text-white">
                Digital Signatures Made Easy
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                Add clean electronic signatures to contracts, agreements, and forms without printing a single sheet of paper. Your signature remains on your computer rather than being synced to external accounts.
              </p>
              <div className="pt-2">
                <Link to="/signature" className="text-xs font-bold text-pink-500 hover:underline inline-flex items-center gap-1">
                  Launch Sign Tool <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Row 3: Create the Perfect Document */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-500">Document Organizer</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold dark:text-white">
                Create the Perfect Document
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                Combine separate PDFs into a unified presentation, extract pages you need, rotate upside-down scans, and reorder document sequences in seconds using drag-and-drop.
              </p>
              <div className="pt-2">
                <Link to="/merge" className="text-xs font-bold text-blue-500 hover:underline inline-flex items-center gap-1">
                  Merge & Arrange PDFs <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200/80 dark:border-zinc-800">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-2">
                    <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-500 font-bold text-xs flex items-center justify-center mx-auto">
                      {num}
                    </div>
                    <div className="h-10 bg-gray-100 dark:bg-zinc-800 rounded-lg" />
                    <span className="text-[10px] text-gray-400 font-bold">Page {num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. GET IT ON MOBILE (Smallpdf Mobile Banner) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-zinc-900 to-black text-white rounded-[2.5rem] p-8 md:p-14 border border-zinc-800 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-rose-400 border border-white/10">
                <Smartphone size={14} /> Android App Available
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Get It on Mobile
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
                Enjoy offline PDF editing wherever you go. Install our Android application or Progressive Web App (PWA) to split, merge, and protect documents without needing Wi-Fi or mobile data.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://github.com/Softbee-Aashish/softbee-pdf/releases/latest/download/softbee-pdf.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-rose-500/30 transition-all text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Android APK
                </a>

                <a
                  href="https://github.com/Softbee-Aashish/softbee-pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 transition-colors text-xs uppercase tracking-wider"
                >
                  View Source on GitHub
                </a>
              </div>
            </div>

            {/* Mobile Visual Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-56 h-96 bg-zinc-950 rounded-[2.5rem] border-4 border-zinc-700 p-4 shadow-2xl space-y-3 relative">
                <div className="w-16 h-4 bg-zinc-800 rounded-full mx-auto mb-2" />
                <div className="p-3 bg-zinc-900 rounded-xl space-y-2">
                  <div className="h-3 w-20 bg-rose-500/40 rounded" />
                  <div className="h-2 w-32 bg-zinc-800 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-zinc-900 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-rose-400">Merge</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-blue-400">Compress</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-amber-400">Protect</span>
                  </div>
                  <div className="p-2.5 bg-zinc-900 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-emerald-400">Sign</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING & ZERO TRAPS */}
      <section className="py-16 px-6 bg-[#FAFAFA] dark:bg-zinc-950/60 border-t border-b border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight dark:text-white mb-2">
              Plans & Pricing
            </h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Clear, honest, and completely free. No subscription traps, credit card prompts, or hidden fees.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-8 border-2 border-rose-500 shadow-xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full text-xs font-bold uppercase tracking-wider">
              Community Edition
            </div>

            <div>
              <div className="text-5xl font-black dark:text-white">$0</div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Free Forever • AGPL-3.0</p>
            </div>

            <ul className="text-left space-y-3 text-xs text-gray-600 dark:text-zinc-300 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                Unlimited document processing
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                Zero file size limitations
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                100% in-browser client-side execution
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                All 25+ PDF conversion and editing tools included
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                No registration or email required
              </li>
            </ul>

            <button
              onClick={scrollToTools}
              className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md shadow-rose-500/20 transition-all"
            >
              Start Using SoftBee PDF
            </button>
          </div>
        </div>
      </section>

      {/* 7. "WHY CHOOSE SOFTPDF?" (TRUST & COMPLIANCE GRID) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white mb-2">
            Why Choose SoftBee PDF?
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Engineered with a strict security-by-design philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center font-bold">
              <Star size={20} />
            </div>
            <h3 className="font-bold text-base dark:text-white">People Trust Us</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Used by students, educators, and researchers worldwide who need reliable PDF manipulation without signing up for paid subscriptions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center font-bold">
              <Shield size={20} />
            </div>
            <h3 className="font-bold text-base dark:text-white">Businesses Trust Us</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Ideal for legal teams and accounting departments handling non-disclosure agreements, financial reports, and confidential contracts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center font-bold">
              <ServerOff size={20} />
            </div>
            <h3 className="font-bold text-base dark:text-white">Client Data Protection</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Because files are processed locally in RAM, neither SoftBee nor any cloud vendor ever inspects or logs your document contents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center font-bold">
              <Lock size={20} />
            </div>
            <h3 className="font-bold text-base dark:text-white">Standard 256-Bit Security</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Uses industry standard cryptographic algorithms for password locking, metadata stripping, and signature stamping.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center font-bold">
              <Cpu size={20} />
            </div>
            <h3 className="font-bold text-base dark:text-white">Universal Compatibility</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              Engineered in TypeScript and WebAssembly to run smoothly across Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Android.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center font-bold">
              <FileText size={20} />
            </div>
            <h3 className="font-bold text-base dark:text-white">Open Source & Auditable</h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
              100% transparent. Anyone can inspect our code repository on GitHub to verify our zero-server privacy claims.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-gray-100 dark:border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
            Answers to common questions about SoftBee PDF and client-side processing.
          </p>
        </div>

        <div className="space-y-3">
          <FAQItem
            question="How does client-side PDF processing work?"
            answer="Instead of sending your document across the internet to a server for manipulation, SoftBee PDF uses JavaScript and WebAssembly compiled libraries (such as pdf-lib and pdfjs) to execute all PDF algorithms directly within your device's browser memory."
          />
          <FAQItem
            question="Are my documents saved or accessible by anyone else?"
            answer="No. Your files are loaded into your computer's volatile RAM and disappear as soon as you close or refresh the browser tab. We maintain zero database storage and have no backend servers processing PDF documents."
          />
          <FAQItem
            question="Can I use SoftBee PDF when I have no internet connection?"
            answer="Yes! Once the web application is loaded in your browser or installed as a Progressive Web App (PWA) / Android APK, all processing functions 100% offline without requiring internet connectivity."
          />
          <FAQItem
            question="Is SoftBee PDF really free forever?"
            answer="Yes. SoftBee PDF is released under the GNU Affero General Public License (AGPL-3.0) to guarantee permanent open-source freedom. There are no paid tiers, feature paywalls, or document quotas."
          />
          <FAQItem
            question="What is the difference between SoftBee PDF and traditional PDF tools?"
            answer="Traditional online PDF editors require you to upload your files to their servers, posing potential confidentiality risks. SoftBee PDF eliminates the server step entirely, giving you total data ownership and zero tracking."
          />
        </div>
      </section>

    </div>
  )
}