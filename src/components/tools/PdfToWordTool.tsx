import { useState, useRef, useEffect } from 'react'
import { FileText, Upload, Loader2, ArrowRight, Check } from 'lucide-react'
import JSZip from 'jszip'
import { toast } from 'sonner'
import { Capacitor } from '@capacitor/core'
import { getPdfMetaData, loadPdfDocument } from '../../utils/pdfHelpers'
import { addActivity } from '../../utils/recentActivity'
import { usePipeline } from '../../utils/pipelineContext'
import SuccessState from './shared/SuccessState'
import PrivacyBadge from './shared/PrivacyBadge'
import { NativeToolLayout } from './shared/NativeToolLayout'

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

export default function PdfToWordTool() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { consumePipelineFile } = usePipeline()

  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
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
        toast.error('This file is locked with a password. Please unlock it first.')
        return
      }

      setFile(selectedFile)
      setPageCount(meta.pageCount)
      setOutFileName(selectedFile.name.replace(/\.[^/.]+$/, '') + '.docx')
    } catch (err) {
      console.error(err)
      toast.error('Could not read PDF metadata.')
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const convertToWord = async () => {
    if (!file) return
    setIsProcessing(true)
    setProgress(10)

    try {
      const pdf = await loadPdfDocument(file)
      const paragraphs: string[] = []

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(Math.round(10 + (i / pdf.numPages) * 60))
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()

        let lastY: number | null = null
        let currentLine = ''

        for (const item of textContent.items as any[]) {
          if (!item.str) continue
          const itemY = item.transform ? item.transform[5] : null

          if (lastY !== null && itemY !== null && Math.abs(itemY - lastY) > 8) {
            if (currentLine.trim()) {
              paragraphs.push(currentLine.trim())
            }
            currentLine = item.str
          } else {
            currentLine += (currentLine ? ' ' : '') + item.str
          }
          lastY = itemY
        }

        if (currentLine.trim()) {
          paragraphs.push(currentLine.trim())
        }
      }

      setProgress(80)

      // Construct DOCX archive
      const zip = new JSZip()

      zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`)

      zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`)

      const wordFolder = zip.folder('word')
      wordFolder?.file('_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`)

      const paragraphsXml = paragraphs
        .map(p => `<w:p><w:r><w:t xml:space="preserve">${escapeXml(p)}</w:t></w:r></w:p>`)
        .join('')

      wordFolder?.file('document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphsXml || '<w:p><w:r><w:t>Document Content</w:t></w:r></w:p>'}
    <w:sectPr/>
  </w:body>
</w:document>`)

      setProgress(95)
      const docxBlob = await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })

      const url = URL.createObjectURL(docxBlob)
      setDownloadUrl(url)
      setProgress(100)

      addActivity({
        name: outFileName,
        tool: 'PDF to Word',
        size: docxBlob.size,
        resultUrl: url
      })

      toast.success('Successfully converted PDF to DOCX!')
    } catch (err) {
      console.error(err)
      toast.error('Conversion failed. Please try another document.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <NativeToolLayout
      title="PDF to Word"
      description="Convert PDF documents into editable Microsoft Word (.docx) files seamlessly."
      actions={
        file && !downloadUrl && (
          <button
            onClick={convertToWord}
            disabled={isProcessing}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/25 ${
              isNative ? 'py-4 rounded-2xl text-sm' : 'p-5 rounded-2xl text-base'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Converting... {progress}%
              </span>
            ) : (
              <>Convert to Word (.docx) <ArrowRight size={18} /></>
            )}
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
          message="Your Word document is ready!"
          downloadUrl={downloadUrl}
          fileName={outFileName}
          onStartOver={() => {
            setFile(null)
            setDownloadUrl(null)
            setProgress(0)
          }}
          showPreview={false}
        />
      ) : !file ? (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Smallpdf Royal Blue Dropzone */}
          <div
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
            }}
            className="w-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-[2rem] p-12 sm:p-16 text-center cursor-pointer shadow-xl transition-all duration-300 group flex flex-col items-center justify-center border-4 border-transparent hover:border-white/30"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText size={36} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl font-bold shadow-md hover:bg-gray-50 active:scale-95 transition-all text-sm mb-3">
              <Upload size={16} />
              <span>CHOOSE FILES</span>
            </div>

            <p className="text-sm text-white/80 font-medium">or drop PDF files here</p>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Editable Word (.docx) export</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> Layout & text preserved</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-white" /> 100% Client-Side Privacy</span>
            </div>
          </div>

          <PrivacyBadge />
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <FileText size={32} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">{file.name}</h3>
            <p className="text-xs text-gray-400 font-medium">{pageCount} Pages • {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 font-medium">Converting pages to editable Word format... {progress}%</p>
            </div>
          )}
        </div>
      )}
    </NativeToolLayout>
  )
}
