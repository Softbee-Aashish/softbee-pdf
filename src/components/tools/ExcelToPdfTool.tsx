import { useState, useRef, useEffect } from 'react'
import { Sheet, Upload, Loader2, ArrowRight, Check } from 'lucide-react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { toast } from 'sonner'
import { Capacitor } from '@capacitor/core'
import { addActivity } from '../../utils/recentActivity'
import { usePipeline } from '../../utils/pipelineContext'
import SuccessState from './shared/SuccessState'
import PrivacyBadge from './shared/PrivacyBadge'
import { NativeToolLayout } from './shared/NativeToolLayout'

export default function ExcelToPdfTool() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { consumePipelineFile } = usePipeline()

  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [outFileName, setOutFileName] = useState('')

  const isNative = Capacitor.isNativePlatform()

  useEffect(() => {
    const pipelined = consumePipelineFile()
    if (pipelined) {
      const pipelinedFile = new File([pipelined.buffer as any], pipelined.name, { type: 'text/csv' })
      handleFile(pipelinedFile)
    }
  }, [])

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.tsv') && !selectedFile.name.endsWith('.txt')) {
      toast.error('Please select a CSV or spreadsheet data file (.csv).')
      return
    }

    setFile(selectedFile)
    setOutFileName(selectedFile.name.replace(/\.[^/.]+$/, '') + '.pdf')
    setDownloadUrl(null)
  }

  const convertToPdf = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const text = await file.text()
      const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0)

      if (lines.length === 0) {
        toast.error('File appears to be empty.')
        return
      }

      // Parse CSV rows
      const rows: string[][] = lines.map(line => {
        // basic csv split
        return line.split(',').map(c => c.replace(/^["']|["']$/g, '').trim())
      })

      const maxCols = Math.max(...rows.map(r => r.length), 1)

      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      // Landscape A4 for tables
      const pageWidth = 841.89
      const pageHeight = 595.28
      const margin = 40
      const tableWidth = pageWidth - margin * 2
      const colWidth = tableWidth / Math.min(maxCols, 8)
      const rowHeight = 24
      const fontSize = 9

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight])
      let cursorY = pageHeight - margin

      // Title
      currentPage.drawText(file.name.replace(/\.[^/.]+$/, ''), {
        x: margin,
        y: cursorY,
        size: 16,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.1)
      })
      cursorY -= 30

      for (let rIdx = 0; rIdx < rows.length; rIdx++) {
        if (cursorY - rowHeight < margin) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight])
          cursorY = pageHeight - margin
        }

        const isHeader = rIdx === 0
        const row = rows[rIdx]

        // Row background
        if (isHeader) {
          currentPage.drawRectangle({
            x: margin,
            y: cursorY - rowHeight,
            width: tableWidth,
            height: rowHeight,
            color: rgb(0.9, 0.95, 0.92)
          })
        } else if (rIdx % 2 === 0) {
          currentPage.drawRectangle({
            x: margin,
            y: cursorY - rowHeight,
            width: tableWidth,
            height: rowHeight,
            color: rgb(0.98, 0.98, 0.98)
          })
        }

        // Draw cells
        for (let cIdx = 0; cIdx < Math.min(row.length, 8); cIdx++) {
          const cellText = row[cIdx] || ''
          const truncated = cellText.length > 25 ? cellText.substring(0, 22) + '...' : cellText

          currentPage.drawText(truncated, {
            x: margin + cIdx * colWidth + 6,
            y: cursorY - rowHeight + 7,
            size: fontSize,
            font: isHeader ? fontBold : font,
            color: isHeader ? rgb(0.05, 0.35, 0.2) : rgb(0.2, 0.2, 0.2)
          })
        }

        // Bottom border
        currentPage.drawLine({
          start: { x: margin, y: cursorY - rowHeight },
          end: { x: margin + tableWidth, y: cursorY - rowHeight },
          thickness: 0.5,
          color: rgb(0.85, 0.85, 0.85)
        })

        cursorY -= rowHeight
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      setDownloadUrl(url)
      addActivity({
        name: outFileName,
        tool: 'Excel to PDF',
        size: blob.size,
        resultUrl: url
      })

      toast.success('Generated PDF table successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to convert spreadsheet to PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <NativeToolLayout
      title="Excel to PDF"
      description="Convert CSV and spreadsheet data into formatted, printable PDF tables."
      actions={
        file && !downloadUrl && (
          <button
            onClick={convertToPdf}
            disabled={isProcessing}
            className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 ${
              isNative ? 'py-4 rounded-2xl text-sm' : 'p-5 rounded-2xl text-base'
            }`}
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <>Convert to PDF Table <ArrowRight size={18} /></>}
          </button>
        )
      }
    >
      <input
        type="file"
        accept=".csv,.tsv,.txt"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {downloadUrl ? (
        <SuccessState
          message="Your PDF table is ready!"
          downloadUrl={downloadUrl}
          fileName={outFileName}
          onStartOver={() => {
            setFile(null)
            setDownloadUrl(null)
          }}
        />
      ) : !file ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Smallpdf Green Spreadsheet Dropzone */}
          <div
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
            }}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white rounded-[2rem] p-12 sm:p-16 text-center cursor-pointer shadow-xl transition-all duration-300 group flex flex-col items-center justify-center border-4 border-transparent hover:border-white/30"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sheet size={36} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-md hover:bg-gray-50 active:scale-95 transition-all text-sm mb-3">
              <Upload size={16} />
              <span>CHOOSE FILES</span>
            </div>

            <p className="text-sm text-white/80 font-medium">or drop CSV / spreadsheet files here</p>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Clean landscape table formatting</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Formatted row stripes & borders</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> 100% Client-Side Privacy</span>
            </div>
          </div>

          <PrivacyBadge />
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Sheet size={32} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{file.name}</h3>
            <p className="text-xs text-gray-400 font-medium">Spreadsheet Data • {(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  )
}
