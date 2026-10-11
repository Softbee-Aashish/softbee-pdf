import { useState, useRef } from 'react'
import { FileText, Loader2, X } from 'lucide-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { toast } from 'sonner'
import { addActivity } from '../../utils/recentActivity'
import SuccessState from './shared/SuccessState'
import ToolHeader from './shared/ToolHeader'

export default function TxtToPdfTool() {
  const [file, setFile] = useState<File | null>(null)
  const [textContent, setTextContent] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ url: string, name: string, size: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (!selected.name.endsWith('.txt') && selected.type !== 'text/plain') {
        toast.error('Please select a valid plain text (.txt) file.')
        return
      }
      try {
        const text = await selected.text()
        setFile(selected)
        setTextContent(text)
        setResult(null)
      } catch (err) {
        toast.error('Could not read text file.')
      }
    }
  }

  const handleConvert = async () => {
    if (!textContent.trim()) {
      toast.error('Please provide text to convert.')
      return
    }

    setIsProcessing(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontSize = 11
      const lineHeight = 16
      const margin = 50
      const pageWidth = 595.28 // A4
      const pageHeight = 841.89

      const maxLineWidth = pageWidth - margin * 2
      const linesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight)

      // Break text into wrapped lines
      const rawLines = textContent.split(/\r?\n/)
      const wrappedLines: string[] = []

      for (const rawLine of rawLines) {
        if (!rawLine) {
          wrappedLines.push('')
          continue
        }

        const words = rawLine.split(' ')
        let currentLine = ''

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word
          const width = font.widthOfTextAtSize(testLine, fontSize)
          if (width < maxLineWidth) {
            currentLine = testLine
          } else {
            if (currentLine) wrappedLines.push(currentLine)
            currentLine = word
          }
        }
        if (currentLine) wrappedLines.push(currentLine)
      }

      // Paginate
      const totalPages = Math.max(1, Math.ceil(wrappedLines.length / linesPerPage))

      for (let p = 0; p < totalPages; p++) {
        const page = pdfDoc.addPage([pageWidth, pageHeight])
        const startIdx = p * linesPerPage
        const endIdx = Math.min(startIdx + linesPerPage, wrappedLines.length)
        const pageLines = wrappedLines.slice(startIdx, endIdx)

        for (let i = 0; i < pageLines.length; i++) {
          const line = pageLines[i]
          if (line) {
            page.drawText(line, {
              x: margin,
              y: pageHeight - margin - (i + 1) * lineHeight,
              size: fontSize,
              font,
              color: rgb(0.1, 0.1, 0.1)
            })
          }
        }
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const outName = file ? file.name.replace(/\.txt$/i, '.pdf') : 'converted_document.pdf'

      setResult({
        url,
        name: outName,
        size: blob.size
      })

      await addActivity({
        name: outName,
        tool: 'TXT to PDF',
        size: blob.size,
        resultUrl: url
      })

      toast.success('Text converted to PDF successfully!')
    } catch (err: any) {
      console.error(err)
      toast.error('Conversion failed: ' + (err.message || 'Unknown error'))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <ToolHeader
        title="TXT to"
        highlight="PDF"
        description="Convert plain text files or raw notes into standard, formatted PDF documents."
      />

      {result ? (
        <SuccessState
          message="PDF Generated Successfully"
          fileName={result.name}
          downloadUrl={result.url}
          onStartOver={() => {
            setFile(null)
            setTextContent('')
            setResult(null)
          }}
        />
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-sm space-y-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,text/plain"
            className="hidden"
          />

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-3xl p-12 text-center hover:border-blue-500 cursor-pointer transition-colors group"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-bold dark:text-white mb-2">Choose .TXT File to Convert</h3>
              <p className="text-xs text-gray-400">Click to upload your plain text file</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/60 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                    TXT
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white truncate max-w-xs md:max-w-md">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => { setFile(null); setTextContent(''); }}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Preview & Edit Text Content
                </label>
                <textarea
                  rows={8}
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-xs font-mono dark:text-white transition-all resize-y"
                />
              </div>

              <button
                onClick={handleConvert}
                disabled={isProcessing || !textContent.trim()}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileText size={18} />
                    Convert TXT to PDF
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
