import { useState, useRef, useEffect } from 'react'
import { Layers, Loader2, X, ShieldCheck } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { addActivity } from '../../utils/recentActivity'
import { usePipeline } from '../../utils/pipelineContext'
import SuccessState from './shared/SuccessState'
import ToolHeader from './shared/ToolHeader'
import ToolLandingPage from './shared/ToolLandingPage'
import { toolsSeoData } from '../../utils/toolSeoData'

export default function FlattenTool() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ url: string, name: string, size: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { consumePipelineFile } = usePipeline()

  // Initialize with pipeline file if available
  useEffect(() => {
    const pipeFile = consumePipelineFile()
    if (pipeFile && pipeFile.type === 'application/pdf') {
      const f = new File([pipeFile.buffer as any], pipeFile.name, { type: 'application/pdf' })
      setFile(f)
    }
  }, [consumePipelineFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
        toast.error('Please select a valid PDF file.')
        return
      }
      setFile(selected)
      setResult(null)
    }
  }

  const handleFlatten = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      
      // Flatten interactive forms
      const form = pdfDoc.getForm()
      try {
        form.flatten()
      } catch (err) {
        console.warn('No active form fields found to flatten', err)
      }

      const flattenedBytes = await pdfDoc.save()
      const blob = new Blob([flattenedBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const outName = file.name.replace(/\.pdf$/i, '_flattened.pdf')

      setResult({
        url,
        name: outName,
        size: blob.size
      })

      await addActivity({
        name: outName,
        tool: 'Flatten PDF',
        size: blob.size,
        resultUrl: url
      })

      toast.success('PDF successfully flattened!')
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to flatten PDF: ' + (err.message || 'Unknown error'))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,application/pdf"
        className="hidden"
      />

      {result ? (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <SuccessState
            message="PDF Flattened Successfully"
            fileName={result.name}
            downloadUrl={result.url}
            onStartOver={() => {
              setFile(null)
              setResult(null)
            }}
          />
        </div>
      ) : !file ? (
        <ToolLandingPage
          config={toolsSeoData['flatten']}
          onFileSelect={(files) => {
            if (files[0]) {
              setFile(files[0])
              setResult(null)
            }
          }}
          accept=".pdf,application/pdf"
        />
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
          <ToolHeader
            title="Flatten"
            highlight="PDF"
            description="Merge form fields, text layers, and annotations into static non-editable document pages."
          />
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-sm space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/60 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-bold dark:text-white truncate max-w-xs md:max-w-md">{file.name}</p>
                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/60 dark:border-rose-900/30 flex items-start gap-3">
                <ShieldCheck size={18} className="text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-900 dark:text-rose-300 leading-relaxed">
                  Flattening locks form entries, checkboxes, and signatures into permanent background graphics so they cannot be modified by viewers.
                </p>
              </div>

              <button
                onClick={handleFlatten}
                disabled={isProcessing}
                className="w-full py-4 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Flattening PDF...
                  </>
                ) : (
                  <>
                    <Layers size={18} />
                    Flatten PDF Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
