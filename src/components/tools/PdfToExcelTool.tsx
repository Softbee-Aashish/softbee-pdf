import { useState, useRef, useEffect } from 'react'
import { FileSpreadsheet, Loader2, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import { Capacitor } from '@capacitor/core'
import { getPdfMetaData, loadPdfDocument } from '../../utils/pdfHelpers'
import { addActivity } from '../../utils/recentActivity'
import { usePipeline } from '../../utils/pipelineContext'
import SuccessState from './shared/SuccessState'
import { NativeToolLayout } from './shared/NativeToolLayout'
import ToolLandingPage from './shared/ToolLandingPage'
import { toolsSeoData } from '../../utils/toolSeoData'

export default function PdfToExcelTool() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { consumePipelineFile } = usePipeline()

  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [outFileName, setOutFileName] = useState('')

  const isNative = Capacitor.isNativePlatform()

  useEffect(() => {
    const pipelined = consumePipelineFile()
    if (pipelined) {
      const pipelinedFile = new File([pipelined.buffer as any], pipelined.name, { type: 'application/pdf' })
      handleFile(pipelinedFile)
    }
  }, [])

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      toast.error('Please select a valid PDF file.')
      return
    }

    setIsProcessing(true)
    try {
      const meta = await getPdfMetaData(selectedFile)
      if (meta.isLocked) {
        toast.error('This file is locked with a password.')
        return
      }

      setFile(selectedFile)
      setPageCount(meta.pageCount)
      setOutFileName(selectedFile.name.replace(/\.[^/.]+$/, '') + '.csv')
    } catch (err) {
      console.error(err)
      toast.error('Could not load PDF document.')
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const convertToExcel = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const pdf = await loadPdfDocument(file)
      const rows: string[] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        // Group text items by Y coordinate (rows)
        const itemsByY: { [y: number]: { x: number, str: string }[] } = {}

        for (const item of textContent.items as any[]) {
          if (!item.str || !item.transform) continue
          const x = Math.round(item.transform[4])
          const y = Math.round(item.transform[5] / 8) * 8 // cluster within 8pt

          if (!itemsByY[y]) itemsByY[y] = []
          itemsByY[y].push({ x, str: item.str })
        }

        // Sort rows by descending Y (top of page to bottom)
        const sortedYs = Object.keys(itemsByY).map(Number).sort((a, b) => b - a)

        for (const y of sortedYs) {
          const rowItems = itemsByY[y].sort((a, b) => a.x - b.x)
          const escapedRow = rowItems.map(it => `"${it.str.replace(/"/g, '""')}"`).join(',')
          if (escapedRow.trim()) {
            rows.push(escapedRow)
          }
        }
      }

      const csvContent = '\uFEFF' + rows.join('\r\n') // Add UTF-8 BOM for Excel compatibility
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      setDownloadUrl(url)
      addActivity({
        name: outFileName,
        tool: 'PDF to Excel',
        size: blob.size,
        resultUrl: url
      })

      toast.success('Converted PDF to Excel spreadsheet (.csv)!')
    } catch (err) {
      console.error(err)
      toast.error('Conversion failed.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <NativeToolLayout
      title="PDF to Excel"
      description="Extract tables and structured data from PDF into an editable spreadsheet."
      actions={
        file && !downloadUrl && (
          <button
            onClick={convertToExcel}
            disabled={isProcessing}
            className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 ${
              isNative ? 'py-4 rounded-2xl text-sm' : 'p-5 rounded-2xl text-base'
            }`}
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <>Extract to Spreadsheet (.csv) <ArrowRight size={18} /></>}
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

      {downloadUrl ? (
        <SuccessState
          message="Your spreadsheet is ready!"
          downloadUrl={downloadUrl}
          fileName={outFileName}
          onStartOver={() => {
            setFile(null)
            setDownloadUrl(null)
          }}
          showPreview={false}
        />
      ) : !file ? (
        <ToolLandingPage
          config={toolsSeoData['pdf-to-excel']}
          onFileSelect={(files) => files[0] && handleFile(files[0])}
          accept=".pdf"
        />
      ) : (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <FileSpreadsheet size={32} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{file.name}</h3>
            <p className="text-xs text-gray-400 font-medium">{pageCount} Pages • {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  )
}
