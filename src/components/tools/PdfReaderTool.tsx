import { useState, useRef, useEffect } from 'react'
import {
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  RotateCw, Printer, Download, Loader2
} from 'lucide-react'
import { toast } from 'sonner'
import { getPdfMetaData, loadPdfDocument, renderPageThumbnail } from '../../utils/pdfHelpers'
import { usePipeline } from '../../utils/pipelineContext'
import { NativeToolLayout } from './shared/NativeToolLayout'
import ToolLandingPage from './shared/ToolLandingPage'
import { toolsSeoData } from '../../utils/toolSeoData'

export default function PdfReaderTool() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { consumePipelineFile } = usePipeline()

  const [file, setFile] = useState<File | null>(null)
  const [pdfDocProxy, setPdfDocProxy] = useState<any | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageThumbnails, setPageThumbnails] = useState<string[]>([])
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [renderedImageUrl, setRenderedImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const pipelined = consumePipelineFile()
    if (pipelined) {
      const pipelinedFile = new File([pipelined.buffer as any], pipelined.name, { type: 'application/pdf' })
      handleFile(pipelinedFile)
    }
  }, [])

  useEffect(() => {
    if (!pdfDocProxy) return
    let active = true

    const renderPage = async () => {
      try {
        const thumb = await renderPageThumbnail(pdfDocProxy, currentPage, 2.0)
        if (active) setRenderedImageUrl(thumb)
      } catch (err) {
        console.error('Error rendering page in reader:', err)
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

    try {
      const meta = await getPdfMetaData(selectedFile)
      if (meta.isLocked) {
        toast.error('This file is locked. Please unlock it first.')
        return
      }

      const proxy = await loadPdfDocument(selectedFile)
      setFile(selectedFile)
      setPdfDocProxy(proxy)
      setPageCount(meta.pageCount)
      setCurrentPage(1)
      setRotation(0)

      const thumbs: string[] = []
      for (let i = 1; i <= Math.min(meta.pageCount, 20); i++) {
        try {
          const t = await renderPageThumbnail(proxy, i, 0.4)
          thumbs.push(t)
        } catch {
          // ignore
        }
      }
      setPageThumbnails(thumbs)
      toast.success(`Opened "${selectedFile.name}"`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to open PDF document.')
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handlePrint = () => {
    if (!renderedImageUrl) return
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`
      <html>
        <head><title>Print ${file?.name || 'Document'}</title></head>
        <body style="margin:0;display:flex;justify-content:center;">
          <img src="${renderedImageUrl}" style="max-width:100%;height:auto;" onload="window.print();window.close();" />
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const handleDownload = () => {
    if (!file) return
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <NativeToolLayout
      title="PDF Reader"
      description="View and read PDF documents smoothly in high definition directly in your browser."
    >
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {!file ? (
        <ToolLandingPage
          config={toolsSeoData['pdf-reader']}
          onFileSelect={(files) => files[0] && handleFile(files[0])}
          accept=".pdf"
        />
      ) : (
        <div className="space-y-6">
          {/* Top Reader Controls */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-900 dark:text-white truncate max-w-[200px]">
                {file.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
                Page {currentPage} of {pageCount}
              </span>
              <button
                disabled={currentPage >= pageCount}
                onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(prev => Math.max(50, prev - 15))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="text-[11px] font-bold text-gray-500 w-10 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(prev => Math.min(200, prev + 15))}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>

              <button
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300"
                title="Rotate 90°"
              >
                <RotateCw size={16} />
              </button>

              <button
                onClick={handlePrint}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300"
                title="Print Current Page"
              >
                <Printer size={16} />
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>

          {/* Reader Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {pageThumbnails.length > 1 && (
              <div className="lg:col-span-3 max-h-[700px] overflow-y-auto space-y-3 p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 px-1">Pages ({pageCount})</p>
                <div className="grid grid-cols-2 gap-2">
                  {pageThumbnails.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 bg-gray-50 dark:bg-zinc-800 ${
                        currentPage === idx + 1
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20'
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

            <div className={`${pageThumbnails.length > 1 ? 'lg:col-span-9' : 'lg:col-span-12'} flex justify-center bg-gray-100 dark:bg-zinc-950 p-6 rounded-3xl border border-gray-200 dark:border-zinc-800 overflow-auto`}>
              <div
                style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, transformOrigin: 'top center' }}
                className="bg-white shadow-2xl rounded-lg overflow-hidden transition-transform duration-150"
              >
                {renderedImageUrl ? (
                  <img
                    src={renderedImageUrl}
                    alt={`Page ${currentPage}`}
                    className="max-h-[850px] w-auto block select-none"
                  />
                ) : (
                  <div className="w-[500px] h-[700px] flex items-center justify-center">
                    <Loader2 className="animate-spin text-emerald-600" size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </NativeToolLayout>
  )
}
