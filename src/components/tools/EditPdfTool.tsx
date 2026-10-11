import { useState, useRef, useEffect } from 'react'
import {
  Type, Square, Highlighter, EyeOff, Loader2,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw,
  ArrowRight, Upload, Check
} from 'lucide-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { toast } from 'sonner'
import { Capacitor } from '@capacitor/core'
import { getPdfMetaData, loadPdfDocument, renderPageThumbnail } from '../../utils/pdfHelpers'
import { addActivity } from '../../utils/recentActivity'
import { usePipeline } from '../../utils/pipelineContext'
import SuccessState from './shared/SuccessState'
import PrivacyBadge from './shared/PrivacyBadge'
import { NativeToolLayout } from './shared/NativeToolLayout'

type AnnotationType = 'text' | 'shape' | 'highlight' | 'redact'

interface TextAnnotation {
  id: string
  type: 'text'
  pageIndex: number
  x: number // percentage 0-100
  y: number // percentage 0-100
  text: string
  fontSize: number
  color: string
}

interface ShapeAnnotation {
  id: string
  type: 'shape' | 'highlight' | 'redact'
  pageIndex: number
  x: number
  y: number
  width: number
  height: number
  fillColor?: string
  borderColor?: string
}

export default function EditPdfTool() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { consumePipelineFile } = usePipeline()

  const [file, setFile] = useState<File | null>(null)
  const [pdfDocProxy, setPdfDocProxy] = useState<any | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageThumbnails, setPageThumbnails] = useState<string[]>([])
  const [zoom, setZoom] = useState(100)
  const [activeTool, setActiveTool] = useState<AnnotationType>('text')
  const [textInput, setTextInput] = useState('Sample Text')
  const [textColor, setTextColor] = useState('#000000')
  const [fontSize, setFontSize] = useState(18)
  const [annotations, setAnnotations] = useState<(TextAnnotation | ShapeAnnotation)[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null)

  const isNative = Capacitor.isNativePlatform()

  useEffect(() => {
    const pipelined = consumePipelineFile()
    if (pipelined) {
      const pipelinedFile = new File([pipelined.buffer as any], pipelined.name, { type: 'application/pdf' })
      handleFile(pipelinedFile)
    }
  }, [])

  // Render current page when page or file changes
  useEffect(() => {
    if (!pdfDocProxy) return
    let active = true

    const renderPage = async () => {
      try {
        const thumb = await renderPageThumbnail(pdfDocProxy, currentPage, 1.5)
        if (active) setRenderedImageUrl(thumb)
      } catch (err) {
        console.error('Error rendering page:', err)
      }
    }

    renderPage()
    return () => { active = false }
  }, [pdfDocProxy, currentPage])

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      toast.error('Please select a valid PDF file.')
      return
    }

    setIsProcessing(true)
    try {
      const meta = await getPdfMetaData(selectedFile)
      if (meta.isLocked) {
        toast.error('This file is password-protected. Please unlock it first.')
        return
      }

      const proxy = await loadPdfDocument(selectedFile)
      setFile(selectedFile)
      setPdfDocProxy(proxy)
      setPageCount(meta.pageCount)
      setCurrentPage(1)
      setAnnotations([])
      setDownloadUrl(null)

      // Generate first few thumbnails for page selector
      const thumbs: string[] = []
      for (let i = 1; i <= Math.min(meta.pageCount, 12); i++) {
        try {
          const t = await renderPageThumbnail(proxy, i, 0.4)
          thumbs.push(t)
        } catch {
          // ignore individual thumbnail failures
        }
      }
      setPageThumbnails(thumbs)
      toast.success(`Loaded "${selectedFile.name}" (${meta.pageCount} pages)`)
    } catch (err) {
      console.error(err)
      toast.error('Could not load PDF document.')
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isProcessing) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

    if (activeTool === 'text') {
      const newText: TextAnnotation = {
        id: Math.random().toString(),
        type: 'text',
        pageIndex: currentPage - 1,
        x,
        y,
        text: textInput || 'Text Note',
        fontSize,
        color: textColor
      }
      setAnnotations(prev => [...prev, newText])
      toast.success('Text placed!')
    } else if (activeTool === 'highlight') {
      const newHighlight: ShapeAnnotation = {
        id: Math.random().toString(),
        type: 'highlight',
        pageIndex: currentPage - 1,
        x: Math.max(0, x - 10),
        y: Math.max(0, y - 2),
        width: 20,
        height: 4,
        fillColor: '#FFEB3B'
      }
      setAnnotations(prev => [...prev, newHighlight])
    } else if (activeTool === 'redact') {
      const newRedact: ShapeAnnotation = {
        id: Math.random().toString(),
        type: 'redact',
        pageIndex: currentPage - 1,
        x: Math.max(0, x - 10),
        y: Math.max(0, y - 2),
        width: 20,
        height: 4,
        fillColor: '#000000'
      }
      setAnnotations(prev => [...prev, newRedact])
    } else if (activeTool === 'shape') {
      const newShape: ShapeAnnotation = {
        id: Math.random().toString(),
        type: 'shape',
        pageIndex: currentPage - 1,
        x: Math.max(0, x - 10),
        y: Math.max(0, y - 5),
        width: 20,
        height: 10,
        borderColor: textColor
      }
      setAnnotations(prev => [...prev, newShape])
    }
  }

  const removeAnnotation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setAnnotations(prev => prev.filter(a => a.id !== id))
  }

  const handleExport = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const buffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true })
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      const pages = pdfDoc.getPages()

      for (const ann of annotations) {
        if (ann.pageIndex < 0 || ann.pageIndex >= pages.length) continue
        const page = pages[ann.pageIndex]
        const { width, height } = page.getSize()

        if (ann.type === 'text') {
          const hex = ann.color.replace('#', '')
          const r = parseInt(hex.substring(0, 2), 16) / 255 || 0
          const g = parseInt(hex.substring(2, 4), 16) / 255 || 0
          const b = parseInt(hex.substring(4, 6), 16) / 255 || 0

          const pdfX = (ann.x / 100) * width
          const pdfY = height - ((ann.y / 100) * height) - ann.fontSize

          page.drawText(ann.text, {
            x: pdfX,
            y: pdfY,
            size: ann.fontSize,
            font: helveticaFont,
            color: rgb(r, g, b)
          })
        } else if (ann.type === 'highlight') {
          const pdfX = (ann.x / 100) * width
          const pdfW = (ann.width / 100) * width
          const pdfH = (ann.height / 100) * height
          const pdfY = height - ((ann.y / 100) * height) - pdfH

          page.drawRectangle({
            x: pdfX,
            y: pdfY,
            width: pdfW,
            height: pdfH,
            color: rgb(1, 0.92, 0.23),
            opacity: 0.45
          })
        } else if (ann.type === 'redact') {
          const pdfX = (ann.x / 100) * width
          const pdfW = (ann.width / 100) * width
          const pdfH = (ann.height / 100) * height
          const pdfY = height - ((ann.y / 100) * height) - pdfH

          page.drawRectangle({
            x: pdfX,
            y: pdfY,
            width: pdfW,
            height: pdfH,
            color: rgb(0, 0, 0),
            opacity: 1
          })
        } else if (ann.type === 'shape') {
          const pdfX = (ann.x / 100) * width
          const pdfW = (ann.width / 100) * width
          const pdfH = (ann.height / 100) * height
          const pdfY = height - ((ann.y / 100) * height) - pdfH

          page.drawRectangle({
            x: pdfX,
            y: pdfY,
            width: pdfW,
            height: pdfH,
            borderWidth: 2,
            borderColor: rgb(0.85, 0.15, 0.2)
          })
        }
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const outName = file.name.replace(/\.[^/.]+$/, '') + '-edited.pdf'

      setDownloadUrl(url)
      addActivity({
        name: outName,
        tool: 'Edit PDF',
        size: blob.size,
        resultUrl: url
      })
      toast.success('PDF successfully edited and ready to download!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to save edited PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const currentPageAnnotations = annotations.filter(a => a.pageIndex === currentPage - 1)

  return (
    <NativeToolLayout
      title="Edit PDF"
      description="Add text, annotations, shapes, and highlights directly to your PDF pages."
      actions={
        file && !downloadUrl && (
          <button
            onClick={handleExport}
            disabled={isProcessing}
            className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/25 ${
              isNative ? 'py-4 rounded-2xl text-sm' : 'p-5 rounded-2xl text-base'
            }`}
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <>Save & Download Edited PDF <ArrowRight size={18} /></>}
          </button>
        )
      }
    >
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {downloadUrl && file ? (
        <SuccessState
          message="Your edited PDF is ready!"
          downloadUrl={downloadUrl}
          fileName={file.name.replace(/\.[^/.]+$/, '') + '-edited.pdf'}
          onStartOver={() => {
            setFile(null)
            setPdfDocProxy(null)
            setDownloadUrl(null)
            setAnnotations([])
          }}
        />
      ) : !file ? (
        /* Smallpdf Teal Editor Dropzone */
        <div className="space-y-8 max-w-4xl mx-auto">
          <div
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
            }}
            className="w-full bg-[#00A896] hover:bg-[#029384] text-white rounded-[2rem] p-12 sm:p-16 text-center cursor-pointer shadow-xl transition-all duration-300 group flex flex-col items-center justify-center border-4 border-transparent hover:border-white/30"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Type size={36} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-md hover:bg-gray-50 active:scale-95 transition-all text-sm mb-3">
              <Upload size={16} />
              <span>CHOOSE FILES</span>
            </div>

            <p className="text-sm text-white/80 font-medium">or drop files here</p>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Free online PDF editing</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Add text, shapes & highlights</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> 100% Client-Side Privacy</span>
            </div>
          </div>

          <PrivacyBadge />
        </div>
      ) : (
        /* Editor Workspace (Smallpdf Style) */
        <div className="space-y-6">
          {/* Top Editor Toolbar */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            
            {/* Tool Selection Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTool('text')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTool === 'text' ? 'bg-cyan-600 text-white shadow-sm' : 'text-gray-600 dark:text-zinc-300 hover:text-cyan-600'
                }`}
                title="Add Text"
              >
                <Type size={15} />
                <span>Text</span>
              </button>

              <button
                onClick={() => setActiveTool('highlight')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTool === 'highlight' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-600 dark:text-zinc-300 hover:text-amber-500'
                }`}
                title="Highlight"
              >
                <Highlighter size={15} />
                <span>Highlight</span>
              </button>

              <button
                onClick={() => setActiveTool('shape')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTool === 'shape' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-600 dark:text-zinc-300 hover:text-rose-500'
                }`}
                title="Add Box Shape"
              >
                <Square size={15} />
                <span>Shape</span>
              </button>

              <button
                onClick={() => setActiveTool('redact')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTool === 'redact' ? 'bg-black text-white shadow-sm' : 'text-gray-600 dark:text-zinc-300 hover:text-black'
                }`}
                title="Redact Blackout"
              >
                <EyeOff size={15} />
                <span>Redact</span>
              </button>
            </div>

            {/* Tool Options (Text input, font size, color) */}
            {activeTool === 'text' && (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type note to place..."
                  className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                />
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white outline-none"
                >
                  <option value={14}>14pt</option>
                  <option value={18}>18pt</option>
                  <option value={24}>24pt</option>
                  <option value={32}>32pt</option>
                </select>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-7 h-7 rounded-lg border border-gray-200 dark:border-zinc-700 cursor-pointer"
                  title="Text Color"
                />
              </div>
            )}

            {/* Page Navigation & Zoom */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                Page {currentPage} / {pageCount}
              </span>
              <button
                disabled={currentPage >= pageCount}
                onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>

              <div className="h-4 w-px bg-gray-200 dark:bg-zinc-800 mx-1" />

              <button
                onClick={() => setZoom(prev => Math.max(70, prev - 15))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-[11px] font-bold text-gray-500 w-10 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(prev => Math.min(150, prev + 15))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
            </div>

            {/* Reset / Clear current page edits */}
            {currentPageAnnotations.length > 0 && (
              <button
                onClick={() => setAnnotations(prev => prev.filter(a => a.pageIndex !== currentPage - 1))}
                className="text-xs text-rose-500 font-bold hover:underline flex items-center gap-1"
              >
                <RotateCcw size={13} /> Clear Page
              </button>
            )}
          </div>

          {/* Interactive Document Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Page Thumbnails Strip */}
            {pageThumbnails.length > 1 && (
              <div className="lg:col-span-3 max-h-[650px] overflow-y-auto space-y-3 p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-1">Pages ({pageCount})</p>
                <div className="grid grid-cols-2 gap-2">
                  {pageThumbnails.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 bg-gray-50 dark:bg-zinc-800 ${
                        currentPage === idx + 1
                          ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={thumb} alt={`Page ${idx + 1}`} className="w-full h-24 object-contain" />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Center Canvas Area with Interactive Annotations */}
            <div className={`${pageThumbnails.length > 1 ? 'lg:col-span-9' : 'lg:col-span-12'} flex justify-center bg-gray-100 dark:bg-zinc-950 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-auto`}>
              <div
                ref={containerRef}
                onClick={handleCanvasClick}
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
                className="relative bg-white shadow-2xl rounded-lg cursor-crosshair select-none transition-transform duration-150 max-w-full"
              >
                {renderedImageUrl ? (
                  <img
                    src={renderedImageUrl}
                    alt={`Page ${currentPage}`}
                    className="max-h-[750px] w-auto pointer-events-none block rounded-lg"
                  />
                ) : (
                  <div className="w-[500px] h-[700px] flex items-center justify-center">
                    <Loader2 className="animate-spin text-cyan-600" size={32} />
                  </div>
                )}

                {/* Overlaid Annotations */}
                {currentPageAnnotations.map((ann) => {
                  if (ann.type === 'text') {
                    return (
                      <div
                        key={ann.id}
                        style={{
                          left: `${ann.x}%`,
                          top: `${ann.y}%`,
                          fontSize: `${ann.fontSize * (zoom / 100)}px`,
                          color: ann.color,
                        }}
                        className="absolute -translate-y-1/2 p-1 font-bold group bg-white/70 dark:bg-black/60 backdrop-blur-xs rounded border border-dashed border-cyan-400 hover:border-cyan-600 cursor-move"
                      >
                        <span>{ann.text}</span>
                        <button
                          onClick={(e) => removeAnnotation(ann.id, e)}
                          className="hidden group-hover:inline-block ml-1 text-rose-500 font-bold hover:scale-110"
                        >
                          ×
                        </button>
                      </div>
                    )
                  }

                  if (ann.type === 'highlight') {
                    return (
                      <div
                        key={ann.id}
                        style={{
                          left: `${ann.x}%`,
                          top: `${ann.y}%`,
                          width: `${ann.width}%`,
                          height: `${ann.height}%`,
                          backgroundColor: ann.fillColor || '#FFEB3B',
                        }}
                        className="absolute opacity-50 group border border-amber-400 cursor-pointer"
                      >
                        <button
                          onClick={(e) => removeAnnotation(ann.id, e)}
                          className="hidden group-hover:block absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] leading-none"
                        >
                          ×
                        </button>
                      </div>
                    )
                  }

                  if (ann.type === 'redact') {
                    return (
                      <div
                        key={ann.id}
                        style={{
                          left: `${ann.x}%`,
                          top: `${ann.y}%`,
                          width: `${ann.width}%`,
                          height: `${ann.height}%`,
                          backgroundColor: '#000000',
                        }}
                        className="absolute group cursor-pointer"
                      >
                        <button
                          onClick={(e) => removeAnnotation(ann.id, e)}
                          className="hidden group-hover:block absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] leading-none"
                        >
                          ×
                        </button>
                      </div>
                    )
                  }

                  if (ann.type === 'shape') {
                    return (
                      <div
                        key={ann.id}
                        style={{
                          left: `${ann.x}%`,
                          top: `${ann.y}%`,
                          width: `${ann.width}%`,
                          height: `${ann.height}%`,
                          borderColor: ann.borderColor || '#E11D48',
                        }}
                        className="absolute border-2 rounded group cursor-pointer"
                      >
                        <button
                          onClick={(e) => removeAnnotation(ann.id, e)}
                          className="hidden group-hover:block absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-4 h-4 text-[10px] leading-none"
                        >
                          ×
                        </button>
                      </div>
                    )
                  }

                  return null
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </NativeToolLayout>
  )
}
