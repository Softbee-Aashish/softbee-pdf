import { useState, useRef } from 'react'
import {
  Upload, ChevronDown, ArrowRight,
  CheckCircle2, ChevronRight, FileText
} from 'lucide-react'
import { ToolSeoConfig } from '../../../utils/toolSeoData'
import PrivacyBadge from './PrivacyBadge'

interface ToolLandingPageProps {
  config: ToolSeoConfig
  onFileSelect: (files: FileList) => void
  accept?: string
  multiple?: boolean
}

export default function ToolLandingPage({
  config,
  onFileSelect,
  accept,
  multiple = false
}: ToolLandingPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files)
    }
  }

  const scrollToDropzone = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const IconComponent = config.icon

  return (
    <div className="space-y-20 max-w-5xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP HERO & COLORED DROPZONE (Smallpdf Style) */}
      <section className="space-y-6 text-center pt-0 md:pt-2">
        <div className="max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            {config.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-zinc-400 font-normal leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept={accept || config.acceptTypes}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && onFileSelect(e.target.files)}
        />

        {/* Pi7-Style Compact Rectangle Dropzone Box */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="w-full max-w-2xl mx-auto border-2 border-dashed border-gray-300 hover:border-blue-500 dark:border-zinc-700 dark:hover:border-blue-400 rounded-2xl bg-white dark:bg-zinc-900/60 hover:bg-blue-50/30 dark:hover:bg-zinc-900/90 p-7 sm:p-8 text-center cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col items-center justify-center relative select-none"
        >
          {/* Top text prompt */}
          <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-zinc-200 mb-3 flex items-center justify-center gap-2">
            <IconComponent size={18} className="text-gray-600 dark:text-zinc-300 group-hover:text-blue-600 transition-colors" />
            <span>Select Or Drag &amp; Drop Files Here</span>
          </p>

          {/* "CHOOSE FILES" Primary Button (Pi7 style) */}
          <div className={`inline-flex items-center gap-2 px-8 py-3 ${config.bannerColor} hover:opacity-90 text-white rounded-xl font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-sm mb-3`}>
            <Upload size={16} className="text-white" />
            <span>Select PDF Files</span>
            <ChevronDown size={14} className="opacity-70 ml-0.5" />
          </div>

          {/* Bottom helper text */}
          <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">
            {config.acceptText} • 100% Client-Side Engine
          </p>

          {/* 3 Checkmark Guarantees */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800/80 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
            {config.checkmarks.map((check, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>{check}</span>
              </span>
            ))}
          </div>
        </div>

        <PrivacyBadge />
      </section>

      {/* 2. VALUE PROPOSITION FEATURE SHOWCASE */}
      <section className="space-y-12 pt-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            {config.valueProp.headline}
          </h2>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            {config.valueProp.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.valueProp.features.map((feat, idx) => {
            const FeatIcon = feat.icon
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-4 text-left"
              >
                <div className={`w-12 h-12 rounded-2xl ${feat.badgeColor} flex items-center justify-center shadow-sm`}>
                  <FeatIcon size={24} strokeWidth={2.2} />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. "HOW TO [TOOL]" STEP-BY-STEP BOX WITH MOCKUP */}
      <section className="bg-blue-50/60 dark:bg-zinc-900/60 rounded-[2.5rem] p-8 sm:p-12 border border-blue-100/80 dark:border-zinc-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Steps List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              {config.howTo.title}
            </h2>
            <div className="space-y-4">
              {config.howTo.steps.map((step) => (
                <div key={step.number} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md shadow-blue-500/20">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive UI Mockup Card */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-gray-200/80 dark:border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preview Engine</span>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800 text-center space-y-2">
              <FileText size={32} className="mx-auto text-blue-600" />
              <p className="text-xs font-bold text-gray-800 dark:text-zinc-200">Sample_Document.pdf</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 text-[10px] font-bold">
                100% Client-Side Ready
              </span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Select File Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* 4. "EVERYTHING YOU NEED" 6-FEATURE GRID */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            {config.featureGrid.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.featureGrid.items.map((item, idx) => {
            const ItemIcon = item.icon
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-2 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-700 dark:text-zinc-300">
                  <ItemIcon size={20} />
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. TOOL-SPECIFIC FAQS (SEO ACCORDION) */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            {config.title} FAQs
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Frequently asked questions about using our {config.title.toLowerCase()} utility.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {config.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div
                key={idx}
                className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 dark:text-white hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed border-t border-gray-100 dark:border-zinc-800 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. TUTORIALS & GUIDES CARDS */}
      {config.tutorials && config.tutorials.length > 0 && (
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
              Tutorials on {config.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.tutorials.map((tut, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">
                    {tut.tag}
                  </span>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors leading-snug">
                    {tut.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-normal">
                    {tut.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                  <span>Step-by-Step Guide</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. BOTTOM CTA BANNER */}
      <section className="bg-gray-100 dark:bg-zinc-900 p-8 sm:p-12 rounded-[2.5rem] text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          Document Work Made Easy
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
          Start compressing, merging, converting, or editing your documents now with 100% offline security.
        </p>
        <button
          onClick={scrollToDropzone}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Get Started with {config.title}</span>
          <ArrowRight size={14} />
        </button>
      </section>

    </div>
  )
}
