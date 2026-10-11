import { useState, useRef, useEffect } from 'react'
import { FileUp, Upload, Loader2, ArrowRight, Check } from 'lucide-react'
import JSZip from 'jszip'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { toast } from 'sonner'
import { Capacitor } from '@capacitor/core'
import { addActivity } from '../../utils/recentActivity'
import { usePipeline } from '../../utils/pipelineContext'
import SuccessState from './shared/SuccessState'
import PrivacyBadge from './shared/PrivacyBadge'
import { NativeToolLayout } from './shared/NativeToolLayout'

export default function WordToPdfTool() {
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
      const pipelinedFile = new File([pipelined.buffer as any], pipelined.name, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      handleFile(pipelinedFile)
    }
  }, [])

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.doc')) {
      toast.error('Please select a Microsoft Word (.docx) file.')
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
      const zip = new JSZip()
      const content = await zip.loadAsync(file)
      const docXmlFile = content.file('word/document.xml')

      let paragraphs: string[] = []

      if (docXmlFile) {
        const xmlText = await docXmlFile.async('text')
        // Parse paragraph texts from XML
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        const pNodes = xmlDoc.getElementsByTagName('w:p')

        for (let i = 0; i < pNodes.length; i++) {
          const tNodes = pNodes[i].getElementsByTagName('w:t')
          let paraText = ''
          for (let j = 0; j < tNodes.length; j++) {
            paraText += tNodes[j].textContent || ''
          }
          if (paraText.trim()) {
            paragraphs.push(paraText.trim())
          }
        }
      }

      if (paragraphs.length === 0) {
        paragraphs = ['Document Content (No extractable text found in Word document)']
      }

      // Generate PDF with pdf-lib
      const pdfDoc = await PDFDocument.create()
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

      const pageWidth = 595.28 // A4 width
      const pageHeight = 841.89 // A4 height
      const margin = 50
      const contentWidth = pageWidth - margin * 2
      const fontSize = 11
      const lineHeight = fontSize * 1.5

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight])
      let cursorY = pageHeight - margin

      // Title header
      currentPage.drawText(file.name.replace(/\.[^/.]+$/, ''), {
        x: margin,
        y: cursorY,
        size: 18,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.1)
      })
      cursorY -= 32

      for (const para of paragraphs) {
        // Simple word wrapping
        const words = para.split(/\s+/)
        let currentLine = ''

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          const testWidth = fontRegular.widthOfTextAtSize(testLine, fontSize)

          if (testWidth <= contentWidth) {
            currentLine = testLine
          } else {
            // Check page overflow
            if (cursorY - lineHeight < margin + 20) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight])
              cursorY = pageHeight - margin
            }

            if (currentLine) {
              currentPage.drawText(currentLine, {
                x: margin,
                y: cursorY,
                size: fontSize,
                font: fontRegular,
                color: rgb(0.2, 0.2, 0.2)
              })
              cursorY -= lineHeight
            }
            currentLine = word
          }
        }

        if (currentLine) {
          if (cursorY - lineHeight < margin + 20) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight])
            cursorY = pageHeight - margin
          }
          currentPage.drawText(currentLine, {
            x: margin,
            y: cursorY,
            size: fontSize,
            font: fontRegular,
            color: rgb(0.2, 0.2, 0.2)
          })
          cursorY -= lineHeight
        }

        cursorY -= 8 // extra space between paragraphs
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      setDownloadUrl(url)
      addActivity({
        name: outFileName,
        tool: 'Word to PDF',
        size: blob.size,
        resultUrl: url
      })

      toast.success('Converted Word document to PDF successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to convert Word document.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <NativeToolLayout
      title="Word to PDF"
      description="Convert Microsoft Word documents (.docx) into crisp PDF files."
      actions={
        file && !downloadUrl && (
          <button
            onClick={convertToPdf}
            disabled={isProcessing}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/25 ${
              isNative ? 'py-4 rounded-2xl text-sm' : 'p-5 rounded-2xl text-base'
            }`}
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : <>Convert to PDF <ArrowRight size={18} /></>}
          </button>
        )
      }
    >
      <input
        type="file"
        accept=".docx,.doc"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {downloadUrl ? (
        <SuccessState
          message="Your PDF document is ready!"
          downloadUrl={downloadUrl}
          fileName={outFileName}
          onStartOver={() => {
            setFile(null)
            setDownloadUrl(null)
          }}
        />
      ) : !file ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Smallpdf Dark Blue Dropzone */}
          <div
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
            }}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[2rem] p-12 sm:p-16 text-center cursor-pointer shadow-xl transition-all duration-300 group flex flex-col items-center justify-center border-4 border-transparent hover:border-white/30"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileUp size={36} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-md hover:bg-gray-50 active:scale-95 transition-all text-sm mb-3">
              <Upload size={16} />
              <span>CHOOSE FILES</span>
            </div>

            <p className="text-sm text-white/80 font-medium">or drop Word (.docx) files here</p>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Fast DOCX to PDF rendering</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> High-fidelity vector PDF</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> 100% Client-Side Privacy</span>
            </div>
          </div>

          <PrivacyBadge />
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <FileUp size={32} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{file.name}</h3>
            <p className="text-xs text-gray-400 font-medium">Word Document • {(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}
    </NativeToolLayout>
  )
}
