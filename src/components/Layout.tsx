import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Download as DownloadIcon,
  Moon as MoonIcon,
  Sun as SunIcon,
  History as HistoryIcon,
  Upload as UploadIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  Plus as PlusIcon,
  Trash2 as Trash2Icon,
  CheckCircle2 as CheckCircleIcon,
  Home as HomeIcon,
  ArrowLeft as ArrowLeftIcon,
  LayoutGrid as LayoutGridIcon,
  Settings as SettingsIcon,
  Github as GHIcon,
  Heart as HeartIcon,
  Download
} from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import { Theme, Tool, ViewMode } from '../types'
import { SoftBeeLogo } from './Logo'
import { ActivityEntry, getRecentActivity, clearActivity } from '../utils/recentActivity'
import { hapticImpact } from '../utils/haptics'

interface LayoutProps {
  children: React.ReactNode
  theme: Theme
  toggleTheme: () => void
  tools: Tool[]
  onFileDrop?: (files: FileList) => void
  viewMode: ViewMode
}

export default function Layout({ children, theme, toggleTheme, tools, onFileDrop, viewMode }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDragging, setIsDragging] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activity, setActivity] = useState<ActivityEntry[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isNative = Capacitor.isNativePlatform()
  const showMobileNav = isNative || viewMode === 'android'

  const isMobileBrowser = !isNative && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  useEffect(() => {
    if (showHistory) {
      getRecentActivity().then(setActivity)
    }
  }, [showHistory])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Disable global drop on mobile to prevent accidental triggers/bugs
    if (Capacitor.isNativePlatform()) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      if (onFileDrop) setIsDragging(true)
    }
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsDragging(false)
      }
    }
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (onFileDrop && e.dataTransfer?.files) {
        onFileDrop(e.dataTransfer.files)
      }
    }

    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('drop', handleDrop)
    return () => {
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('drop', handleDrop)
    }
  }, [onFileDrop])

  const activeTool = tools.find(t => {
    const pathPart = t.title.split(' ')[0].toLowerCase()
    return location.pathname.includes(`/${pathPart}`)
  })

  const isHome = location.pathname === '/'

  const isMainView = isHome ||
    location.pathname.endsWith('/android-tools') ||
    location.pathname.endsWith('/android-history') ||
    location.pathname.endsWith('/settings')

  const shouldShowNav = showMobileNav && isMainView && !activeTool

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-black text-gray-900 dark:text-zinc-100 transition-colors duration-300`}>

      {isDragging && (
        <div className="fixed inset-0 z-[200] bg-rose-500/10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] shadow-2xl border-4 border-dashed border-rose-500 animate-in zoom-in duration-300">
            <UploadIcon size={64} className="text-rose-500 animate-bounce" />
            <p className="mt-4 font-black uppercase tracking-widest text-rose-500 text-center text-sm">Drop PDF to start</p>
          </div>
        </div>
      )}

      {/* Web Header */}
      {!showMobileNav && (
        <header className="flex items-center justify-between px-4 lg:px-8 h-16 md:h-20 border-b border-gray-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md sticky top-0 z-[100]">
          <div className="flex items-center gap-3 lg:gap-6 flex-1 min-w-0">
            {!isHome && (
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-xl transition-colors text-gray-500 hover:text-rose-500 shrink-0">
                <ArrowLeftIcon size={20} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity shrink-0">
              <SoftBeeLogo size={26} iconColor="#F59E0B" />
              <span className="font-extrabold tracking-tight text-lg lg:text-xl dark:text-white hidden sm:block">SoftBee PDF</span>
            </Link>

            {/* Tools Mega-Menu Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider ${
                  isDropdownOpen
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-gray-700 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-900'
                }`}
              >
                <LayoutGridIcon size={16} />
                <span>Tools</span>
                <ChevronDownIcon size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega-Menu Dropdown (Smallpdf Style) */}
              {isDropdownOpen && (
                <div className="fixed sm:absolute top-16 sm:top-full left-4 right-4 sm:left-0 sm:right-auto mt-2 sm:w-[780px] lg:w-[860px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-6 z-[120] animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Column 1: Compress & Optimize */}
                    <div className="space-y-3">
                      <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-500 border-b border-amber-500/10 pb-2">
                        Compress & Optimize
                      </div>
                      <div className="space-y-1">
                        {[
                          { title: 'Compress PDF', path: '/compress', badge: 'bg-amber-500 text-white', desc: 'Reduce file size' },
                          { title: 'Grayscale', path: '/grayscale', badge: 'bg-zinc-500 text-white', desc: 'Black & white PDF' },
                          { title: 'Flatten PDF', path: '/flatten', badge: 'bg-rose-500 text-white', desc: 'Lock form fields' },
                          { title: 'Repair PDF', path: '/repair', badge: 'bg-red-500 text-white', desc: 'Recover damaged file' },
                        ].map((item) => (
                          <button
                            key={item.path}
                            onClick={() => { navigate(item.path); setIsDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors group"
                          >
                            <span className={`w-7 h-7 rounded-lg ${item.badge} flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                              PDF
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Organize & Edit */}
                    <div className="space-y-3">
                      <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-rose-500 border-b border-rose-500/10 pb-2">
                        Organize & Edit
                      </div>
                      <div className="space-y-1">
                        {[
                          { title: 'Edit PDF', path: '/edit-pdf', badge: 'bg-[#00A896] text-white', desc: 'Add text & annotate' },
                          { title: 'PDF Reader', path: '/pdf-reader', badge: 'bg-[#059669] text-white', desc: 'View & read PDF' },
                          { title: 'Merge PDF', path: '/merge', badge: 'bg-rose-500 text-white', desc: 'Combine multiple files' },
                          { title: 'Split PDF', path: '/split', badge: 'bg-blue-500 text-white', desc: 'Extract pages' },
                          { title: 'Rotate PDF', path: '/rotate-pdf', badge: 'bg-orange-500 text-white', desc: 'Fix orientation' },
                          { title: 'Rearrange PDF', path: '/rearrange-pdf', badge: 'bg-emerald-500 text-white', desc: 'Reorder pages' },
                          { title: 'Delete Pages', path: '/delete-pages', badge: 'bg-red-500 text-white', desc: 'Remove unwanted pages' },
                          { title: 'Extract Pages', path: '/extract-pages', badge: 'bg-purple-500 text-white', desc: 'Save selected pages' },
                          { title: 'Page Numbers', path: '/page-numbers', badge: 'bg-sky-500 text-white', desc: 'Add page numbers' },
                          { title: 'Watermark', path: '/watermark', badge: 'bg-purple-500 text-white', desc: 'Add custom stamp' },
                        ].map((item) => (
                          <button
                            key={item.title}
                            onClick={() => { navigate(item.path); setIsDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors group cursor-pointer"
                          >
                            <span className={`w-7 h-7 rounded-lg ${item.badge} flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                              PDF
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Convert & Extract */}
                    <div className="space-y-3">
                      <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-500 border-b border-emerald-500/10 pb-2">
                        Convert & Extract
                      </div>
                      <div className="space-y-1">
                        {[
                          { title: 'PDF to Word', path: '/pdf-to-word', badge: 'bg-[#1D4ED8] text-white', desc: 'Convert to DOCX' },
                          { title: 'Word to PDF', path: '/word-to-pdf', badge: 'bg-[#2563EB] text-white', desc: 'DOCX to PDF' },
                          { title: 'PDF to Excel', path: '/pdf-to-excel', badge: 'bg-[#059669] text-white', desc: 'Extract to CSV' },
                          { title: 'Excel to PDF', path: '/excel-to-pdf', badge: 'bg-[#10B981] text-white', desc: 'Spreadsheet to PDF' },
                          { title: 'PDF to Image', path: '/pdf-to-image', badge: 'bg-emerald-500 text-white', desc: 'Export JPG or PNG' },
                          { title: 'Image to PDF', path: '/image-to-pdf', badge: 'bg-teal-500 text-white', desc: 'JPG / PNG to PDF' },
                          { title: 'PDF to JPG', path: '/pdf-to-jpg', badge: 'bg-amber-500 text-white', desc: 'Direct JPG export' },
                          { title: 'PDF to PNG', path: '/pdf-to-png', badge: 'bg-yellow-500 text-white', desc: 'Direct PNG export' },
                          { title: 'TXT to PDF', path: '/txt-to-pdf', badge: 'bg-blue-500 text-white', desc: 'Plain text to PDF' },
                          { title: 'Extract Images', path: '/extract-images', badge: 'bg-yellow-500 text-white', desc: 'Rip embedded images' },
                          { title: 'PDF to Text', path: '/pdf-to-text', badge: 'bg-blue-600 text-white', desc: 'OCR & Text extract' },
                        ].map((item) => (
                          <button
                            key={item.title}
                            onClick={() => { navigate(item.path); setIsDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors group cursor-pointer"
                          >
                            <span className={`w-7 h-7 rounded-lg ${item.badge} flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                              PDF
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Column 4: Security & Sign */}
                    <div className="space-y-3">
                      <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-indigo-500 border-b border-indigo-500/10 pb-2">
                        Security & Sign
                      </div>
                      <div className="space-y-1">
                        {[
                          { title: 'Protect PDF', path: '/protect', badge: 'bg-indigo-500 text-white', desc: 'Encrypt with password' },
                          { title: 'Unlock PDF', path: '/unlock', badge: 'bg-violet-500 text-white', desc: 'Remove password' },
                          { title: 'Signature', path: '/signature', badge: 'bg-pink-500 text-white', desc: 'Draw or type signature' },
                          { title: 'Metadata', path: '/metadata', badge: 'bg-cyan-500 text-white', desc: 'Edit author & title' },
                        ].map((item) => (
                          <button
                            key={item.title}
                            onClick={() => { navigate(item.path); setIsDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors group cursor-pointer"
                          >
                            <span className={`w-7 h-7 rounded-lg ${item.badge} flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                              PDF
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.title}</p>
                              <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Quick Top Links (Smallpdf Style) */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-zinc-300">
              <Link to="/compress" className="px-3 py-1.5 rounded-lg hover:text-rose-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">Compress</Link>
              <Link to="/pdf-to-word" className="px-3 py-1.5 rounded-lg hover:text-rose-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">Convert</Link>
              <Link to="/merge" className="px-3 py-1.5 rounded-lg hover:text-rose-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">Merge</Link>
              <Link to="/edit-pdf" className="px-3 py-1.5 rounded-lg hover:text-rose-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">Edit</Link>
              <Link to="/signature" className="px-3 py-1.5 rounded-lg hover:text-rose-500 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">Sign</Link>
            </nav>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {isMobileBrowser && (
              <a
                href="https://github.com/Softbee-Aashish/softbee-pdf/releases/latest/download/softbee-pdf.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 active:scale-95 transition-all"
              >
                <Download size={14} />
                Get APK
              </a>
            )}
            <Link to="/about" className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all hidden md:block ${location.pathname.includes('about') ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900'}`}>
              About
            </Link>
            <Link to="/contact" className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all hidden md:block ${location.pathname.includes('contact') ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900'}`}>
              Contact
            </Link>
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-rose-500 transition-colors" title="Toggle theme">
              {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </button>
            <button onClick={() => setShowHistory(true)} className={`p-2 transition-colors relative ${showHistory ? 'text-rose-500' : 'text-gray-500 hover:text-rose-500'}`} title="Recent activity">
              <HistoryIcon size={18} />
              {activity.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-black" />}
            </button>
          </div>
        </header>
      )}

      <main className={`flex-1 min-w-0 ${shouldShowNav ? 'pb-32' : ''}`}>
        {children}
      </main>

      {/* Web Footer - SaaS Smallpdf Design */}
      {!showMobileNav && (
        <footer className="border-t border-gray-200 dark:border-white/10 mt-20 bg-white dark:bg-zinc-950 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">

              {/* Col 1: Brand & Tagline */}
              <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
                <Link to="/" className="flex items-center gap-2 text-gray-900 dark:text-white group w-fit">
                  <SoftBeeLogo size={24} iconColor="#F59E0B" partColor="currentColor" />
                  <span className="font-extrabold tracking-tight text-lg group-hover:text-rose-500 transition-colors">SoftBee PDF</span>
                </Link>
                <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed max-w-xs">
                  The privacy-first PDF toolkit. Process, convert, and protect documents 100% offline in your browser. Zero server uploads.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold border border-emerald-200/50 dark:border-emerald-900/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    100% Client-Side Engine
                  </span>
                </div>
              </div>

              {/* Col 2: Popular Tools */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-4">PDF Tools</h4>
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                  <li><Link to="/merge" className="hover:text-rose-500 transition-colors">Merge PDF</Link></li>
                  <li><Link to="/edit-pdf" className="hover:text-rose-500 transition-colors">Edit PDF</Link></li>
                  <li><Link to="/compress" className="hover:text-rose-500 transition-colors">Compress PDF</Link></li>
                  <li><Link to="/pdf-reader" className="hover:text-rose-500 transition-colors">PDF Reader</Link></li>
                  <li><Link to="/split" className="hover:text-rose-500 transition-colors">Split PDF</Link></li>
                  <li><Link to="/rotate-pdf" className="hover:text-rose-500 transition-colors">Rotate PDF</Link></li>
                  <li><Link to="/rearrange-pdf" className="hover:text-rose-500 transition-colors">Rearrange Pages</Link></li>
                  <li><Link to="/flatten" className="hover:text-rose-500 transition-colors">Flatten PDF</Link></li>
                  <li><Link to="/page-numbers" className="hover:text-rose-500 transition-colors">Page Numbers</Link></li>
                  <li><Link to="/watermark" className="hover:text-rose-500 transition-colors">Watermark PDF</Link></li>
                </ul>
              </div>

              {/* Col 3: Convert & Security */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-4">Convert & Security</h4>
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                  <li><Link to="/pdf-to-word" className="hover:text-rose-500 transition-colors">PDF to Word (.docx)</Link></li>
                  <li><Link to="/word-to-pdf" className="hover:text-rose-500 transition-colors">Word to PDF</Link></li>
                  <li><Link to="/pdf-to-excel" className="hover:text-rose-500 transition-colors">PDF to Excel (.csv)</Link></li>
                  <li><Link to="/excel-to-pdf" className="hover:text-rose-500 transition-colors">Excel to PDF</Link></li>
                  <li><Link to="/pdf-to-image" className="hover:text-rose-500 transition-colors">PDF to Image</Link></li>
                  <li><Link to="/image-to-pdf" className="hover:text-rose-500 transition-colors">Image to PDF</Link></li>
                  <li><Link to="/txt-to-pdf" className="hover:text-rose-500 transition-colors">TXT to PDF</Link></li>
                  <li><Link to="/protect" className="hover:text-rose-500 transition-colors">Protect PDF</Link></li>
                  <li><Link to="/unlock" className="hover:text-rose-500 transition-colors">Unlock PDF</Link></li>
                  <li><Link to="/signature" className="hover:text-rose-500 transition-colors">Digital Signature</Link></li>
                </ul>
              </div>

              {/* Col 4: Trust & Company */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-4">Trust & Company</h4>
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                  <li><Link to="/about" className="hover:text-rose-500 transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-rose-500 transition-colors">Contact Us</Link></li>
                  <li><Link to="/privacy" className="hover:text-rose-500 transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-rose-500 transition-colors">Terms of Service</Link></li>
                  <li><Link to="/thanks" className="hover:text-rose-500 transition-colors">Hall of Fame</Link></li>
                </ul>
              </div>

              {/* Col 5: Open Source & Mobile */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white mb-4">Open Source & Mobile</h4>
                <ul className="space-y-2.5 text-xs text-gray-500 dark:text-zinc-400">
                  <li>
                    <a href="https://github.com/Softbee-Aashish/softbee-pdf" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors flex items-center gap-1.5">
                      <GHIcon size={13} /> GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Softbee-Aashish/softbee-pdf/releases" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">
                      Android APK Download
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Softbee-Aashish/softbee-pdf/issues" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">
                      Bug Tracker
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Softbee-Aashish" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors flex items-center gap-1">
                      Sponsor <HeartIcon size={12} className="text-rose-500" />
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-zinc-500">
              <p>© 2026 SoftBee PDF — Licensed under GNU AGPL v3.0. 100% Client-Side Architecture.</p>
              <div className="flex gap-6 items-center">
                <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
                <a href="https://github.com/Softbee-Aashish/softbee-pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Titan Bottom Navigation (Solid, Grounded) */}
      {shouldShowNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800 flex items-end justify-between px-6 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3 z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${location.pathname === '/' ? 'text-rose-500' : 'text-gray-400 dark:text-zinc-600'}`}
          >
            <HomeIcon size={24} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Home</span>
          </button>

          <button
            onClick={() => navigate('/android-tools')}
            className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${location.pathname === '/android-tools' ? 'text-rose-500' : 'text-gray-400 dark:text-zinc-600'}`}
          >
            <LayoutGridIcon size={24} strokeWidth={location.pathname === '/android-tools' ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Tools</span>
          </button>

          {/* Floating Action Button - Lifted */}
          <div className="relative -top-8">
            <button
              onClick={() => {
                hapticImpact()
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = '.pdf'
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) onFileDrop?.([file] as any)
                }
                input.click()
              }}
              className="w-14 h-14 bg-rose-500 text-white rounded-2xl shadow-xl shadow-rose-500/40 flex items-center justify-center active:scale-90 transition-transform ring-4 ring-white dark:ring-black"
            >
              <PlusIcon size={32} strokeWidth={3} />
            </button>
          </div>

          <button
            onClick={() => navigate('/android-history')}
            className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${location.pathname === '/android-history' ? 'text-rose-500' : 'text-gray-400 dark:text-zinc-600'}`}
          >
            <HistoryIcon size={24} strokeWidth={location.pathname === '/android-history' ? 2.5 : 2} />
            <span className="text-[10px] font-bold">History</span>
          </button>

          <Link
            to="/settings"
            className={`flex flex-col items-center gap-1.5 flex-1 transition-all no-underline ${location.pathname.includes('settings') ? 'text-rose-500' : 'text-gray-400 dark:text-zinc-600'}`}
          >
            <SettingsIcon size={24} strokeWidth={location.pathname.includes('settings') ? 2.5 : 2} />
            <span className="text-[10px] font-bold">Settings</span>
          </Link>
        </nav>
      )}

      {/* Sidebar History Drawer */}
      <aside className={`fixed top-0 right-0 h-screen w-full sm:w-80 bg-white dark:bg-zinc-950 border-l border-gray-100 dark:border-zinc-800 z-[150] shadow-2xl transition-transform duration-500 ease-out transform ${showHistory ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <HistoryIcon className="text-rose-500" size={24} />
              <h2 className="text-xl font-black dark:text-white">Activity</h2>
            </div>
            <div className="flex items-center gap-2">
              {activity.length > 0 && (
                <button
                  onClick={async () => { await clearActivity(); setActivity([]); }}
                  className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-gray-400 hover:text-rose-500 rounded-xl transition-colors"
                >
                  <Trash2Icon size={18} />
                </button>
              )}
              <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors">
                <ChevronRightIcon size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
            {activity.length === 0 ? (<div className="text-center py-20 opacity-40"><p className="text-xs font-bold uppercase tracking_widest text-gray-400">No recent files</p></div>) : (
              activity.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800 group relative">
                  <div className="flex items-center gap-3 mb-2"><div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-lg flex items-center justify-center"><CheckCircleIcon size={16} /></div><div className="flex-1 min-w-0"><p className="text-xs font-bold truncate dark:text-white">{item.name}</p><p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{item.tool}</p></div></div>
                  <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold"><span>{new Date(item.timestamp).toLocaleTimeString()}</span>{item.resultUrl && (<a href={item.resultUrl} download={item.name} className="text-rose-500 hover:underline flex items-center gap-1"><DownloadIcon size={10} /> Redownload</a>)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
      {showHistory && (<div onClick={() => setShowHistory(false)} className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[140] animate-in fade-in duration-300" />)}
    </div>
  )
}