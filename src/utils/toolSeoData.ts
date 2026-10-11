import {
  Zap, Layers, Scissors, FileText, FileUp, Sheet,
  BookOpen, PenTool, RotateCw, ArrowUpDown, Lock,
  Unlock, Palette, FileImage, ImagePlus, Wrench,
  Hash, Type, Shield, CheckCircle2, Cpu, Globe,
  Download, Eye, Smartphone, HardDrive, Sparkles,
  FileSpreadsheet, Droplet
} from 'lucide-react'

export interface ToolSeoConfig {
  id: string
  title: string
  pageTitle: string
  subtitle: string
  bannerColor: string // Tailwind bg class or hex
  bannerTextColor: string
  icon: any
  acceptText: string
  acceptTypes: string
  checkmarks: string[]
  valueProp: {
    headline: string
    subtitle: string
    features: {
      title: string
      desc: string
      icon: any
      badgeColor: string
    }[]
  }
  howTo: {
    title: string
    steps: { number: number, title: string, desc: string }[]
  }
  featureGrid: {
    title: string
    items: {
      title: string
      desc: string
      icon: any
    }[]
  }
  faqs: {
    question: string
    answer: string
  }[]
  tutorials: {
    title: string
    tag: string
    desc: string
  }[]
}

export const toolsSeoData: Record<string, ToolSeoConfig> = {
  compress: {
    id: 'compress',
    title: 'Compress PDF',
    pageTitle: 'Compress PDF for Free',
    subtitle: 'Reduce PDF file size online while maintaining the best possible text and image quality. Fast, secure, and 100% client-side.',
    bannerColor: 'bg-[#E53E3E]',
    bannerTextColor: 'text-white',
    icon: Zap,
    acceptText: 'or drop PDF files here',
    acceptTypes: '.pdf',
    checkmarks: [
      'Reduce file size up to 90%',
      'Browser-based compression — no software required',
      '100% Client-Side Privacy — files never leave your device'
    ],
    valueProp: {
      headline: 'Shrink PDF size, preserve quality',
      subtitle: 'Our smart compression engine recalculates image DPI and streamlines stream structures without blurring fonts or losing readability.',
      features: [
        {
          title: 'Fast & Effective PDF Compressor',
          desc: 'Optimize PDFs in seconds directly in your web browser. Perfect for email attachments, government portal uploads, and digital forms.',
          icon: Zap,
          badgeColor: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
        },
        {
          title: 'Smaller PDFs, Same High Quality',
          desc: 'Choose between Standard compression for everyday balance, or Smallest Size to meet strict size limits like 100KB, 200KB, or 500KB.',
          icon: Sparkles,
          badgeColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
        },
        {
          title: 'Private & Secure Compression',
          desc: 'Unlike server-based compressors that upload your sensitive documents to remote clouds, SoftBee processes everything locally in browser memory.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How To Compress a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Choose your PDF', desc: 'Select or drop your PDF document into the compression dropzone above.' },
        { number: 2, title: 'Select compression level', desc: 'Pick High Quality, Standard (Recommended), or Smallest Size depending on your target file size.' },
        { number: 3, title: 'Inspect and compare', desc: 'View original vs compressed file sizes with interactive visual quality preview.' },
        { number: 4, title: 'Download your file', desc: 'Click download to save your compressed, lightweight PDF instantly.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF Compressor',
      items: [
        { title: 'Works on Any Device', desc: 'Compress PDF files seamlessly on Windows, Mac, Linux, iPhone, iPad, and Android phones.', icon: Smartphone },
        { title: 'Preserve Visual Elements', desc: 'Maintains vector lines, embedded fonts, and page layouts while reducing file bulk.', icon: CheckCircle2 },
        { title: 'Zero Cloud Uploads', desc: 'Engineered with WebAssembly and local JavaScript. Your documents remain strictly on your machine.', icon: HardDrive },
        { title: 'Fast Batch Compression', desc: 'Select multiple documents and compress all of them simultaneously into a single ZIP archive.', icon: Cpu },
        { title: 'Unlimited & Free', desc: 'No daily upload quotas, no paywalls, and no email registration needed to compress documents.', icon: Globe },
        { title: 'Instant Download', desc: 'No upload waits or server processing queues. Files are optimized instantly in your browser.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Is this online PDF compressor free to use?', answer: 'Yes! SoftBee PDF is completely free with zero subscription fees, hidden paywalls, or limits on the number of documents you can compress.' },
      { question: 'Will compressing my PDF reduce text readability?', answer: 'No. Our algorithm maintains vector text definitions and downsizes only oversized bitmap images and redundant internal streams, ensuring text stays crisp and printable.' },
      { question: 'Can I compress a PDF to 100KB, 200KB, or 500KB?', answer: 'Yes. Selecting the "Smallest Size" strategy aggressively downsamples heavy graphics to help you meet strict portal upload limits.' },
      { question: 'Are my confidential documents safe?', answer: 'Completely. SoftBee PDF runs 100% client-side in your browser. Your files are never sent to external servers or stored in any database.' },
      { question: 'How do I compress a PDF on my phone?', answer: 'Open this page on your mobile browser (Chrome, Safari, Firefox), tap Choose Files, pick your document from your storage, and tap Download.' }
    ],
    tutorials: [
      { title: 'How to Compress a PDF to Send via Email', tag: 'EMAIL ATTACHMENT', desc: 'Learn how to reduce PDF size below 25MB for Gmail, Outlook, and Yahoo attachments.' },
      { title: 'Shrink PDF to 200KB for Official Portals', tag: 'PORTAL UPLOADS', desc: 'Step-by-step instructions to compress government and job application documents under 200KB.' },
      { title: 'Batch Compressing Multiple PDFs at Once', tag: 'PRODUCTIVITY', desc: 'How to optimize an entire folder of PDF contracts and receipts in a single click.' }
    ]
  },

  merge: {
    id: 'merge',
    title: 'Merge PDF',
    pageTitle: 'Merge PDF Files Online',
    subtitle: 'Combine multiple PDF documents into a single organized file in seconds. Reorder pages and customize the sequence effortlessly.',
    bannerColor: 'bg-[#5B21B6]',
    bannerTextColor: 'text-white',
    icon: Layers,
    acceptText: 'or drop PDF files here to combine',
    acceptTypes: '.pdf',
    checkmarks: [
      'Combine multiple PDFs into one unified document',
      'Preview thumbnails and rearrange pages with drag-and-drop',
      '100% Client-Side Processing — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Simple Way to Combine PDFs for Free',
      subtitle: 'Merge invoices, scanned receipts, reports, and contracts into one clean document with intuitive drag-and-drop page ordering.',
      features: [
        {
          title: 'Merge Multiple PDFs on Any Device',
          desc: 'Whether using a desktop workstation, Chromebook, or smartphone, merge multiple PDFs with smooth performance.',
          icon: Layers,
          badgeColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
        },
        {
          title: 'Preview and Organize with Thumbnails',
          desc: 'See visual thumbnail cards for each file. Reorder pages, remove accidental duplicates, and rotate misaligned sheets before combining.',
          icon: Eye,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Reliable PDF Merging Without Uploads',
          desc: 'Your files are assembled directly in your browser memory using pdf-lib. No waiting in queue for remote servers.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Merge PDF Files Online for Free:',
      steps: [
        { number: 1, title: 'Select your PDF files', desc: 'Choose two or more PDF documents from your device or drop them into the workspace.' },
        { number: 2, title: 'Arrange file order', desc: 'Drag and drop cards to sequence the documents in the exact order you want them merged.' },
        { number: 3, title: 'Combine documents', desc: 'Click the "Merge PDF" button to merge all pages into a continuous PDF file.' },
        { number: 4, title: 'Save your combined file', desc: 'Download your consolidated PDF document with one click.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF Merger',
      items: [
        { title: 'Unlimited File Count', desc: 'Combine 2, 10, or 50 PDFs into one single document with no artificial file limits.', icon: Layers },
        { title: 'Interactive Thumbnail Reordering', desc: 'Drag and drop files to ensure perfect document chronology.', icon: ArrowUpDown },
        { title: 'Total Data Privacy', desc: 'Never uploads documents to the cloud. Protected by client-side browser execution.', icon: Shield },
        { title: 'Preserves Bookmarks & Forms', desc: 'Maintains page formatting, hyperlinks, fonts, and high-resolution photos.', icon: CheckCircle2 },
        { title: 'Fast Browser Engine', desc: 'Compiles large multi-megabyte PDFs in milliseconds using web workers.', icon: Cpu },
        { title: '100% Free Forever', desc: 'No watermark overlays added to your documents and no account registration needed.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'What file formats can I merge?', answer: 'You can merge standard PDF files, and you can also use our Image to PDF tool to add JPG or PNG photos into your document.' },
      { question: 'Is it possible to reorder pages before merging?', answer: 'Yes! Simply drag and drop the document cards in the order you desire before clicking the Merge button.' },
      { question: 'Will merging PDFs reduce the quality of embedded images?', answer: 'No. SoftBee PDF merges original PDF byte streams directly, preserving 100% of the original vector text and image resolution.' },
      { question: 'Is there a file size limit for merging?', answer: 'Because merging runs locally in your device RAM, you can combine large documents without server timeouts or file size caps.' },
      { question: 'Can I merge password-protected PDFs?', answer: 'Yes. SoftBee allows you to input the file password to unlock the file right in your browser before combining it.' }
    ],
    tutorials: [
      { title: 'How to Combine Invoices and Receipts for Tax Season', tag: 'FINANCE', desc: 'Organize scattered expense PDFs into a single chronological financial packet.' },
      { title: 'Merging PDF Resumes and Portfolios', tag: 'CAREER', desc: 'Create a professional job submission by combining your cover letter, resume, and credentials.' },
      { title: 'How to Reorder and Rotate Pages Before Merging', tag: 'GUIDE', desc: 'Fix upside-down pages and sequence multi-page scans into one clean file.' }
    ]
  },

  'edit-pdf': {
    id: 'edit-pdf',
    title: 'Edit PDF',
    pageTitle: 'Free Online PDF Editor',
    subtitle: 'Add custom text, highlight paragraphs, draw shapes, and redact sensitive information directly on your PDF pages.',
    bannerColor: 'bg-[#00A896]',
    bannerTextColor: 'text-white',
    icon: PenTool,
    acceptText: 'or drop PDF files here to edit',
    acceptTypes: '.pdf',
    checkmarks: [
      'Add text, notes, shapes, and highlights to any page',
      'Redact sensitive personal data and numbers securely',
      '100% Client-Side Privacy — Free & No Installation'
    ],
    valueProp: {
      headline: 'Edit Your PDFs The Easy Way',
      subtitle: 'A clean, modern PDF editing workspace right inside your browser. No expensive Adobe Acrobat license required.',
      features: [
        {
          title: 'Fast and Powerful PDF Editing',
          desc: 'Click anywhere on your document to place text notes with customizable font sizes, bold weights, and custom colors.',
          icon: PenTool,
          badgeColor: 'bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400'
        },
        {
          title: 'Document Organization at a Glance',
          desc: 'Navigate multi-page documents with thumbnail previews. Zoom in up to 150% to place annotations with precision.',
          icon: Eye,
          badgeColor: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400'
        },
        {
          title: 'Quick to Save, Easy to Share',
          desc: 'Bakes annotations directly into the PDF vector layer using pdf-lib, making them visible in any PDF reader or printer.',
          icon: Download,
          badgeColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
        }
      ]
    },
    howTo: {
      title: 'How to Edit a PDF for Free:',
      steps: [
        { number: 1, title: 'Upload your document', desc: 'Choose a PDF file from your computer or mobile device to open the editor.' },
        { number: 2, title: 'Select an editing tool', desc: 'Choose between Text, Highlight, Box Shape, or Redact from the top toolbar.' },
        { number: 3, title: 'Click on the page to annotate', desc: 'Click anywhere on the document canvas to place your text note or shape.' },
        { number: 4, title: 'Save and download', desc: 'Click "Save & Download Edited PDF" to export your finalized document.' }
      ]
    },
    featureGrid: {
      title: 'Free PDF Editing — Quick & Easy',
      items: [
        { title: 'Add Custom Text Notes', desc: 'Insert comments, date stamps, and form text with font size and color controls.', icon: FileText },
        { title: 'Highlight Important Lines', desc: 'Mark key clauses in contracts and textbooks with vibrant highlight overlays.', icon: Sparkles },
        { title: 'Blackout Redaction', desc: 'Hide sensitive data such as SSNs, bank details, and passwords with permanent redaction.', icon: Shield },
        { title: 'Multi-Page Navigation', desc: 'Jump between pages smoothly with page counters and thumbnail drawers.', icon: Layers },
        { title: 'Zero Cloud Uploads', desc: 'All editing happens in browser memory. Nothing is ever saved to external servers.', icon: HardDrive },
        { title: 'No Subscription or Watermarks', desc: 'Save your finished work without annoying trial watermarks or account signups.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'How can I add text to a PDF online?', answer: 'Select the Text tool in the top editor bar, type your desired content, adjust the font size and color, and click anywhere on the page to place it.' },
      { question: 'Can I redact sensitive information from my PDF?', answer: 'Yes! Select the Redact tool and click to place an opaque blackout box over confidential account numbers or personal details.' },
      { question: 'Will my annotations show up when printing?', answer: 'Yes. SoftBee embeds all annotations directly into the standard PDF document format so they render correctly in Adobe Acrobat, Chrome, and all physical printers.' },
      { question: 'Is this PDF editor truly free?', answer: '100% free under the open-source AGPL-3.0 license. There are no trial periods, paid tiers, or export watermarks.' }
    ],
    tutorials: [
      { title: 'How to Fill Out a PDF Form Without Printing', tag: 'FORM FILLING', desc: 'Add text and signatures to PDF forms digitally directly in your web browser.' },
      { title: 'How to Redact Confidential Info from PDF Documents', tag: 'SECURITY', desc: 'Permanently obscure sensitive numbers and private names before emailing documents.' },
      { title: 'Annotating and Highlighting PDF Study Materials', tag: 'STUDY TIPS', desc: 'Make clean annotations and study summaries on lecture slides and research papers.' }
    ]
  },

  'pdf-to-word': {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    pageTitle: 'Convert PDF to Word (.docx) Online',
    subtitle: 'Extract text, paragraphs, and structure from PDF documents into editable Microsoft Word (.docx) files.',
    bannerColor: 'bg-[#1D4ED8]',
    bannerTextColor: 'text-white',
    icon: FileText,
    acceptText: 'or drop PDF files here to convert to Word',
    acceptTypes: '.pdf',
    checkmarks: [
      'Extracts paragraphs and headings into editable DOCX format',
      'Opens natively in Microsoft Word, Google Docs & LibreOffice',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Turn Uneditable PDFs into Editable Word Docs',
      subtitle: 'Stop retyping documents from scratch. SoftBee PDF parses document streams and packages them into standard OpenXML Word files.',
      features: [
        {
          title: 'Accurate Text Extraction',
          desc: 'Reads character streams and coordinate offsets to group text lines into natural paragraphs and sentences.',
          icon: FileText,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Native Microsoft Word (.docx) Output',
          desc: 'Generates genuine OpenXML archives compatible with all versions of Microsoft Word, Google Docs, Apple Pages, and Office 365.',
          icon: Sparkles,
          badgeColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
        },
        {
          title: 'Private & Instant Local Conversion',
          desc: 'Conversion runs right inside your browser with JSZip and pdfjs-dist. Your confidential contracts never touch external servers.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert PDF to Word Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Drag and drop your PDF into the blue dropzone or browse your files.' },
        { number: 2, title: 'Start conversion', desc: 'Click the "Convert to Word (.docx)" button to extract the document contents.' },
        { number: 3, title: 'Wait for parsing', desc: 'Our engine extracts text coordinates and constructs a standard DOCX document.' },
        { number: 4, title: 'Download your Word doc', desc: 'Save your editable .docx file and open it in Word or Google Docs immediately.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF to Word Converter',
      items: [
        { title: 'Standard OpenXML Format', desc: 'Creates true .docx files with clean paragraph tags and XML formatting.', icon: FileText },
        { title: 'Edit Text Freely', desc: 'Modify typos, update dates, and rewrite paragraphs in your favorite word processor.', icon: PenTool },
        { title: 'No Installation Needed', desc: 'Works directly in your modern web browser without downloading external software.', icon: Globe },
        { title: '100% Client-Side Confidentiality', desc: 'Legal contracts, medical records, and NDA documents stay safely on your computer.', icon: Shield },
        { title: 'Cross-Platform Compatibility', desc: 'Works across Windows, macOS, Linux, Android, and iOS devices.', icon: Smartphone },
        { title: 'Zero Usage Limits', desc: 'Convert as many documents as you need with no daily quota or file counters.', icon: Download }
      ]
    },
    faqs: [
      { question: 'What file format will I receive?', answer: 'You will receive a standard Microsoft Word document with the .docx extension that opens seamlessly in Microsoft Word, Google Docs, and LibreOffice.' },
      { question: 'Can I edit the text after conversion?', answer: 'Yes! The resulting Word file contains editable text runs and paragraphs, allowing you to rewrite content, fix formatting, and add new sections.' },
      { question: 'Will my converted Word document be private?', answer: 'Yes. SoftBee PDF performs all processing in your web browser. No files are uploaded to any server or cloud storage.' },
      { question: 'How can I convert a scanned PDF to Word?', answer: 'If your PDF is a scanned image, use our PDF to Text (OCR) tool to extract optical character data before exporting.' }
    ],
    tutorials: [
      { title: 'How to Edit a Locked PDF by Converting to Word', tag: 'EDITING', desc: 'Unlock frozen documents by converting them into editable DOCX files.' },
      { title: 'Converting PDF Resumes into Word for Easy Updates', tag: 'CAREER', desc: 'Update your resume details and work history without having to rewrite it from scratch.' },
      { title: 'Opening and Editing PDF Files in Google Docs', tag: 'TUTORIAL', desc: 'Convert your PDF to DOCX and upload it to Google Drive for cloud collaboration.' }
    ]
  },

  'word-to-pdf': {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    pageTitle: 'Convert Word (.docx) to PDF Online',
    subtitle: 'Transform Microsoft Word documents into clean, professional, read-only PDF files with vector text formatting.',
    bannerColor: 'bg-[#2563EB]',
    bannerTextColor: 'text-white',
    icon: FileUp,
    acceptText: 'or drop Word (.docx) files here',
    acceptTypes: '.docx,.doc',
    checkmarks: [
      'Converts DOCX documents into universal vector PDFs',
      'Preserves paragraph structure, text wrapping, and fonts',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Turn Word Documents into Universal PDFs',
      subtitle: 'Ensure your documents look identical on every screen. Convert Word documents to PDF so recipients cannot accidentally alter your layout.',
      features: [
        {
          title: 'Universal Document Compatibility',
          desc: 'PDFs render consistently across all mobile devices, operating systems, and printers, preventing font substitution issues.',
          icon: Globe,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'High-Fidelity Vector Rendering',
          desc: 'Generated with vector typography that remains crisp at any zoom level, perfect for official contracts and printed reports.',
          icon: Sparkles,
          badgeColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
        },
        {
          title: 'Zero Cloud Storage Risk',
          desc: 'Unpacks document XML and builds the PDF locally using client-side WebAssembly, ensuring total enterprise confidentiality.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert Word to PDF Online for Free:',
      steps: [
        { number: 1, title: 'Select your Word file', desc: 'Choose a .docx file from your device or drop it into the conversion box.' },
        { number: 2, title: 'Click Convert to PDF', desc: 'Click the button to parse the XML paragraphs and lay out the document.' },
        { number: 3, title: 'Automatic page formatting', desc: 'Our engine applies margins, text wrapping, and page pagination.' },
        { number: 4, title: 'Download your PDF', desc: 'Save your print-ready PDF file directly to your downloads folder.' }
      ]
    },
    featureGrid: {
      title: 'Why Convert Word to PDF with SoftBee?',
      items: [
        { title: 'Lock Formatting', desc: 'Prevent accidental text shifting or missing font errors when sending to clients.', icon: CheckCircle2 },
        { title: 'Print-Ready A4 Layout', desc: 'Generates standard A4 vector pages with clean line spacing and margins.', icon: FileText },
        { title: 'Client-Side Security', desc: 'Protected by client-side browser execution. No confidential Word files leave your system.', icon: Shield },
        { title: 'No Microsoft Office Needed', desc: 'Works without needing Microsoft Word installed on your computer or mobile.', icon: Cpu },
        { title: 'Fast & Lightweight', desc: 'Produces compact PDF documents optimized for email and portal submission.', icon: Zap },
        { title: '100% Free', desc: 'Unlimited conversions with no daily restrictions or registration requirements.', icon: Download }
      ]
    },
    faqs: [
      { question: 'What file types are supported?', answer: 'We support standard Microsoft Word documents with the .docx and .doc extensions.' },
      { question: 'Why should I convert Word to PDF before emailing?', answer: 'Converting to PDF ensures your formatting, fonts, and page breaks remain identical for the recipient, regardless of what software they use to view it.' },
      { question: 'Are my confidential documents safe?', answer: 'Yes! SoftBee PDF runs 100% inside your browser. No files are uploaded to any server or third-party service.' }
    ],
    tutorials: [
      { title: 'Why You Should Always Send Resumes as PDF', tag: 'JOB APPLICATION', desc: 'Avoid formatting issues and make sure recruiters see your resume exactly as designed.' },
      { title: 'How to Prepare Legal Contracts as Read-Only PDFs', tag: 'LEGAL', desc: 'Lock contract terms from accidental edits by converting Word files to PDF.' },
      { title: 'Creating Clean Multi-Page PDFs from Word Notes', tag: 'NOTES', desc: 'Export lecture notes and essays into professional printable documents.' }
    ]
  },

  'pdf-reader': {
    id: 'pdf-reader',
    title: 'PDF Reader',
    pageTitle: 'Free Online PDF Reader & Viewer',
    subtitle: 'View, read, zoom, rotate, and print PDF documents in high definition directly in your browser without extra software.',
    bannerColor: 'bg-[#059669]',
    bannerTextColor: 'text-white',
    icon: BookOpen,
    acceptText: 'or drop PDF files here to read',
    acceptTypes: '.pdf',
    checkmarks: [
      'High-definition document viewer with fluid page navigation',
      'Zoom controls (50%–200%), 90° page rotation & print support',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'A Clean, Distraction-Free PDF Reader',
      subtitle: 'Open and read e-books, research manuals, invoices, and presentation slides smoothly without bulky desktop software.',
      features: [
        {
          title: 'Fast & Fluid Page Rendering',
          desc: 'Powered by pdfjs-dist for crisp font rasterization and instant rendering on both desktop screens and mobile displays.',
          icon: BookOpen,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        },
        {
          title: 'Thumbnail Sidebar & Page Jumping',
          desc: 'Quickly browse through multi-page documents with miniature thumbnail previews and jump to any page in one click.',
          icon: Eye,
          badgeColor: 'bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400'
        },
        {
          title: 'One-Click Print & Rotation Controls',
          desc: 'Easily fix misaligned scans with 90° rotation controls and print documents directly from your browser.',
          icon: RotateCw,
          badgeColor: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400'
        }
      ]
    },
    howTo: {
      title: 'How to Read PDF Files Online for Free:',
      steps: [
        { number: 1, title: 'Open your PDF', desc: 'Select any PDF file from your device or drag it into the green reader box.' },
        { number: 2, title: 'Navigate pages', desc: 'Use previous/next buttons or click thumbnails in the sidebar to browse pages.' },
        { number: 3, title: 'Adjust zoom & orientation', desc: 'Zoom in for fine detail or rotate pages that were scanned sideways.' },
        { number: 4, title: 'Print or download', desc: 'Print physical copies directly or download the file back to your device.' }
      ]
    },
    featureGrid: {
      title: 'Features of the SoftBee Online PDF Reader',
      items: [
        { title: 'Smooth High-Res Zoom', desc: 'Zoom from 50% to 200% for comfortable reading on all monitor resolutions.', icon: Sparkles },
        { title: 'Page Rotation Controls', desc: 'Rotate documents 90, 180, or 270 degrees on the fly for easy readability.', icon: RotateCw },
        { title: 'Print Directly to Paper', desc: 'Send pages straight to your printer without opening external viewer apps.', icon: FileText },
        { title: 'Thumbnail Overview', desc: 'View an instant visual directory of all document pages in the sidebar.', icon: Layers },
        { title: 'Zero Cloud Storage', desc: 'Rendered strictly in local browser memory. Files are never sent over the web.', icon: Shield },
        { title: 'Compatible with All Platforms', desc: 'Runs smoothly on Chrome, Safari, Edge, Firefox, and mobile devices.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Do I need to install Adobe Acrobat to read PDFs?', answer: 'No! SoftBee PDF Reader works directly inside any modern web browser without requiring any plugins or installations.' },
      { question: 'Can I print documents from this viewer?', answer: 'Yes! Simply click the Print button in the top toolbar to send the document directly to your connected printer.' },
      { question: 'Does this reader work with large PDFs?', answer: 'Yes. The reader dynamically renders active pages to maintain lightning-fast responsiveness even with 100+ page documents.' },
      { question: 'Is my document private when reading online?', answer: 'Absolutely. The reader operates 100% locally on your computer. Your document data is never sent to any server.' }
    ],
    tutorials: [
      { title: 'How to Read PDFs Comfortably on Mobile Devices', tag: 'MOBILE', desc: 'Tips for reading eBooks and documents on smartphones without eye strain.' },
      { title: 'Fixing Sideways Scanned Pages in PDF Documents', tag: 'SCAN FIX', desc: 'How to rotate pages and print correctly oriented documents.' },
      { title: 'Reading Multi-Page PDFs Without Installing Software', tag: 'GUIDE', desc: 'Access and review contracts instantly on public computers and Chromebooks.' }
    ]
  },

  split: {
    id: 'split',
    title: 'Split PDF',
    pageTitle: 'Split PDF Pages Online',
    subtitle: 'Separate specific pages, extract ranges, or split large PDF files into distinct individual documents with visual preview.',
    bannerColor: 'bg-[#2563EB]',
    bannerTextColor: 'text-white',
    icon: Scissors,
    acceptText: 'or drop PDF files here to split',
    acceptTypes: '.pdf',
    checkmarks: [
      'Extract specific pages or page ranges cleanly',
      'Visual thumbnail selection with multi-page preview',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Extract Just the Pages You Need',
      subtitle: 'Remove unneeded chapters or break down a massive PDF into lightweight, easy-to-share single files.',
      features: [
        {
          title: 'Visual Page Extraction',
          desc: 'Click on individual page thumbnails to select exactly the pages you want to save into your new document.',
          icon: Scissors,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Flexible Range Selection',
          desc: 'Specify page numbers or custom intervals like "1-5, 8, 11-14" to extract complex ranges in seconds.',
          icon: Layers,
          badgeColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
        },
        {
          title: 'Preserves Original Quality',
          desc: 'Extracts exact page streams without re-compressing images or altering font formatting.',
          icon: CheckCircle2,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Split PDF Files Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Drag and drop your PDF into the blue workspace.' },
        { number: 2, title: 'Select pages to extract', desc: 'Click thumbnails or enter the page numbers you wish to isolate.' },
        { number: 3, title: 'Process your split', desc: 'Click "Split PDF" to generate your extracted document.' },
        { number: 4, title: 'Download your file', desc: 'Download your new standalone PDF containing only the chosen pages.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need to Split PDFs',
      items: [
        { title: 'Interactive Thumbnail Selector', desc: 'Preview every page before extracting to avoid mistakes.', icon: Eye },
        { title: 'Custom Page Ranges', desc: 'Specify complex page combinations (e.g., pages 1, 3, 5-9).', icon: Hash },
        { title: 'Extract or Delete', desc: 'Save selected pages into a new PDF or delete unwanted pages cleanly.', icon: Scissors },
        { title: '100% Client-Side Confidentiality', desc: 'Process sensitive contracts with complete local privacy.', icon: Shield },
        { title: 'Lightning Fast Processing', desc: 'Splits 100-page files in under 2 seconds using pdf-lib.', icon: Zap },
        { title: 'Free with No Limits', desc: 'Split as many documents as you need with no paywalls.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Can I split multiple pages at once?', answer: 'Yes! You can select multiple individual pages or specify ranges (e.g. 1-10) to extract them together into a new PDF.' },
      { question: 'Will the extracted pages lose image or text quality?', answer: 'No. SoftBee extracts the original vector and image streams directly, preserving 100% of the document fidelity.' },
      { question: 'Can I delete unwanted pages from my PDF?', answer: 'Yes! You can use our Split tool to choose only the pages you want to keep, discarding the rest.' }
    ],
    tutorials: [
      { title: 'How to Extract a Single Page from a Large PDF', tag: 'PRODUCTIVITY', desc: 'Quickly save a single certificate, invoice, or chapter from a bulky document.' },
      { title: 'Splitting Large E-Books into Chapters', tag: 'READING', desc: 'Break down large textbooks into lightweight reading modules.' },
      { title: 'Removing Blank or Mistakenly Scanned Pages', tag: 'CLEANUP', desc: 'Clean up scanned PDF packets before submitting official applications.' }
    ]
  },

  'pdf-to-excel': {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    pageTitle: 'Convert PDF to Excel (.csv) Online',
    subtitle: 'Extract tables, ledgers, and financial numbers from PDF files into editable spreadsheets with UTF-8 encoding.',
    bannerColor: 'bg-[#059669]',
    bannerTextColor: 'text-white',
    icon: FileSpreadsheet,
    acceptText: 'or drop PDF files here to extract tables',
    acceptTypes: '.pdf',
    checkmarks: [
      'Accurate table coordinate extraction into spreadsheet rows',
      'Opens natively in Microsoft Excel, Google Sheets & LibreOffice',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Pull PDF Tables Straight Into Excel',
      subtitle: 'Extract tabular statements, bank ledgers, and price lists without hours of manual re-typing.',
      features: [
        {
          title: 'Smart Row Clumping',
          desc: 'Clusters horizontal text items by Y-coordinate offsets to construct clean CSV table rows.',
          icon: FileSpreadsheet,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        },
        {
          title: 'Full UTF-8 BOM Compatibility',
          desc: 'Includes byte-order markers so international currency signs and special characters render flawlessly.',
          icon: Sparkles,
          badgeColor: 'bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400'
        },
        {
          title: 'Zero Financial Data Exposure',
          desc: 'Calculated 100% locally in browser memory. Sensitive accounting books never touch cloud servers.',
          icon: Shield,
          badgeColor: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert PDF to Excel Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Choose a PDF containing tables, receipts, or data ledgers.' },
        { number: 2, title: 'Extract tables', desc: 'Click "Extract to Spreadsheet (.csv)" to parse data rows.' },
        { number: 3, title: 'Download spreadsheet', desc: 'Save your .csv file with all table structures preserved.' },
        { number: 4, title: 'Open in Excel', desc: 'Open directly in Microsoft Excel, Google Sheets, or Apple Numbers.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF Table Extractor',
      items: [
        { title: 'Excel & Sheets Ready', desc: 'Exports standard CSV format compatible with all major spreadsheet editors.', icon: Sheet },
        { title: 'Preserve Cell Alignment', desc: 'Organizes columns based on horizontal coordinates.', icon: ArrowUpDown },
        { title: 'Financial Grade Privacy', desc: 'Client-side processing guarantees your private balance sheets remain confidential.', icon: Shield },
        { title: 'Batch Page Parsing', desc: 'Scans all pages in your document and consolidates rows continuously.', icon: Layers },
        { title: 'No Account Required', desc: 'Convert tables instantly without sign-up forms or credit cards.', icon: Globe },
        { title: 'Instant Execution', desc: 'Processes multi-page financial statements in a split second.', icon: Zap }
      ]
    },
    faqs: [
      { question: 'Will this convert scanned PDF receipts?', answer: 'For scanned PDFs containing images, run our PDF to Text (OCR) tool first to detect characters before table export.' },
      { question: 'Can I open the resulting file in Microsoft Excel?', answer: 'Yes! The generated .csv file includes UTF-8 encoding so double-clicking it opens directly in Microsoft Excel or Google Sheets.' },
      { question: 'Are my private financial records stored anywhere?', answer: 'Never. SoftBee processes all data locally on your device using client-side JavaScript.' }
    ],
    tutorials: [
      { title: 'Extracting Bank Statements from PDF into Excel', tag: 'FINANCE', desc: 'How to import credit card and bank PDF statements into spreadsheets for tax filing.' },
      { title: 'Analyzing PDF Invoices in Google Sheets', tag: 'ACCOUNTING', desc: 'Streamline bookkeeping by extracting invoice totals into Google Sheets.' }
    ]
  },

  'excel-to-pdf': {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    pageTitle: 'Convert Excel & CSV to PDF Online',
    subtitle: 'Transform spreadsheets (.xlsx, .xls, .csv) into clean, printable vector PDF documents with auto-fitted columns.',
    bannerColor: 'bg-[#059669]',
    bannerTextColor: 'text-white',
    icon: Sheet,
    acceptText: 'or drop Excel (.xlsx, .csv) files here',
    acceptTypes: '.xlsx,.xls,.csv',
    checkmarks: [
      'Converts spreadsheets into clean A4 vector PDF pages',
      'Auto-formats headers and cell borders for professional reports',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Turn Spreadsheets Into Print-Ready PDF Reports',
      subtitle: 'Share numbers, estimates, and price sheets safely without worrying about recipients modifying formulas.',
      features: [
        {
          title: 'Clean Column Layout',
          desc: 'Automatically adjusts cell padding and row heights to fit neatly within standard page margins.',
          icon: Sheet,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        },
        {
          title: 'Universal Readability',
          desc: 'Recipients do not need Microsoft Office installed to inspect your tables and estimates.',
          icon: Globe,
          badgeColor: 'bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400'
        },
        {
          title: 'Enterprise Confidentiality',
          desc: 'Spreadsheet parsing occurs on your machine. Internal budgets are never sent across the internet.',
          icon: Shield,
          badgeColor: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert Excel to PDF Online for Free:',
      steps: [
        { number: 1, title: 'Choose your spreadsheet', desc: 'Select an .xlsx, .xls, or .csv document from your computer.' },
        { number: 2, title: 'Convert table', desc: 'Click "Convert to PDF" to generate vector pages.' },
        { number: 3, title: 'Preview layout', desc: 'Our engine applies table borders and headers automatically.' },
        { number: 4, title: 'Save your PDF', desc: 'Download your finalized, printable PDF document.' }
      ]
    },
    featureGrid: {
      title: 'Why Convert Excel to PDF with SoftBee?',
      items: [
        { title: 'Lock Numbers & Formulas', desc: 'Prevents unintentional cell edits or altered spreadsheet equations.', icon: Lock },
        { title: 'A4 Printable Formatting', desc: 'Ensures tables fit cleanly without clipping wide columns.', icon: FileText },
        { title: 'Supports XLSX & CSV', desc: 'Convert modern Excel workbooks as well as plain comma-separated files.', icon: Sheet },
        { title: 'High-Fidelity Typography', desc: 'Vector text rendering keeps fonts ultra-crisp on all screens.', icon: Sparkles },
        { title: '100% Private', desc: 'All operations execute locally in your browser memory.', icon: Shield },
        { title: 'Free & Unlimited', desc: 'No file count limits or paywalls.', icon: Download }
      ]
    },
    faqs: [
      { question: 'What spreadsheet formats are supported?', answer: 'SoftBee supports Excel spreadsheets (.xlsx, .xls) and standard delimited data files (.csv).' },
      { question: 'Will my converted PDF be locked from editing?', answer: 'Yes, converting to PDF turns dynamic spreadsheets into static, read-only documents.' }
    ],
    tutorials: [
      { title: 'How to Send Estimates as Read-Only PDFs', tag: 'BUSINESS', desc: 'Protect customer quotes from unauthorized edits before sending.' },
      { title: 'Printing Large Spreadsheets on Standard A4 Paper', tag: 'PRINTING', desc: 'Format wide tables into neat printable PDF pages.' }
    ]
  },

  signature: {
    id: 'signature',
    title: 'eSign PDF',
    pageTitle: 'Sign PDF Online for Free',
    subtitle: 'Create digital signatures, draw or type your name, and sign contracts, leases, and agreements in seconds.',
    bannerColor: 'bg-[#4F46E5]',
    bannerTextColor: 'text-white',
    icon: PenTool,
    acceptText: 'or drop PDF documents here to sign',
    acceptTypes: '.pdf',
    checkmarks: [
      'Draw, type, or upload your electronic signature',
      'Drag and place signatures and date stamps on any page',
      '100% Client-Side Privacy — Files never leave your browser'
    ],
    valueProp: {
      headline: 'The Easiest Way to Sign Documents Online',
      subtitle: 'Sign contracts, NDAs, rental agreements, and forms right in your browser without printing or scanning.',
      features: [
        {
          title: 'Multiple Signature Styles',
          desc: 'Draw naturally with a touchscreen or mouse, type in elegant script fonts, or upload an image of your signature.',
          icon: PenTool,
          badgeColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
        },
        {
          title: 'Visual Drag-and-Drop Placement',
          desc: 'Position your signature, initials, and date stamps exactly where you want them on any page.',
          icon: Eye,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Legally Valid & Private',
          desc: 'Compliant with electronic signature workflows. Document signing happens 100% on your machine.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Sign a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your contract', desc: 'Select or drop your PDF document into the purple sign workspace.' },
        { number: 2, title: 'Create your signature', desc: 'Draw using mouse/touch, type your name, or upload a signature photo.' },
        { number: 3, title: 'Place on document', desc: 'Click on the page where you need to sign and adjust the signature size.' },
        { number: 4, title: 'Download signed PDF', desc: 'Save your legally signed document ready to email to clients.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in an eSign Tool',
      items: [
        { title: 'Works on Touchscreens', desc: 'Sign with your finger or stylus on smartphones and tablets.', icon: Smartphone },
        { title: 'Permanent Vector Embedding', desc: 'Signatures are embedded directly into the PDF byte stream.', icon: CheckCircle2 },
        { title: 'Add Date Stamps & Initials', desc: 'Place date tags and initials alongside your signature.', icon: FileText },
        { title: 'Zero Cloud Storage', desc: 'Legal contracts are processed locally. Nothing is ever sent to external servers.', icon: HardDrive },
        { title: 'No Subscription Needed', desc: 'Unlike DocuSign or Adobe Sign, SoftBee eSign is completely free forever.', icon: Globe },
        { title: 'Instant Download', desc: 'Export your signed agreement in seconds with zero delay.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Is electronic signing legal?', answer: 'Yes! Electronic signatures are legally recognized under the ESIGN Act and European eIDAS regulation for most business contracts, leases, and agreements.' },
      { question: 'Do I have to create an account to sign?', answer: 'No! You can sign documents instantly without an account, email address, or credit card.' },
      { question: 'Are my signed contracts private?', answer: 'Completely. SoftBee operates 100% client-side. Your contracts and signatures never touch any server.' }
    ],
    tutorials: [
      { title: 'How to Sign a PDF on iPhone & Android', tag: 'MOBILE', desc: 'Use your touchscreen to sign forms on mobile devices.' },
      { title: 'Signing Lease Agreements & Real Estate Contracts', tag: 'REAL ESTATE', desc: 'Fast, secure paperless signing for landlords and tenants.' }
    ]
  },

  'rotate-pdf': {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    pageTitle: 'Rotate PDF Pages Online Permanently',
    subtitle: 'Rotate upside-down or sideways PDF pages by 90, 180, or 270 degrees. Save orientation permanently in seconds.',
    bannerColor: 'bg-[#7C3AED]',
    bannerTextColor: 'text-white',
    icon: RotateCw,
    acceptText: 'or drop PDF files here to rotate',
    acceptTypes: '.pdf',
    checkmarks: [
      'Rotate all pages or select specific pages individually',
      'Saves orientation permanently into the PDF file structure',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Fix Sideways or Upside-Down Scans Instantly',
      subtitle: 'Never struggle reading sideways scans again. Rotate single pages or entire documents with one click.',
      features: [
        {
          title: 'Rotate Individual Pages',
          desc: 'Hover over any thumbnail to rotate just that single misaligned sheet 90 degrees clockwise or counter-clockwise.',
          icon: RotateCw,
          badgeColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
        },
        {
          title: 'One-Click Batch Rotation',
          desc: 'Rotate all pages simultaneously with the global rotation controls for fast document fixes.',
          icon: Sparkles,
          badgeColor: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400'
        },
        {
          title: 'Permanent Orientation Save',
          desc: 'Updates the PDF /Rotate dictionary entries so the new orientation appears correctly in all PDF readers.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Rotate PDF Pages Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Select or drop your document into the purple rotation dropzone.' },
        { number: 2, title: 'Rotate pages', desc: 'Click the rotation buttons on individual pages or use "Rotate All".' },
        { number: 3, title: 'Apply changes', desc: 'Click "Save Rotated PDF" to update the document metadata.' },
        { number: 4, title: 'Download your file', desc: 'Save your correctly oriented PDF document.' }
      ]
    },
    featureGrid: {
      title: 'Why Rotate PDFs with SoftBee?',
      items: [
        { title: 'Interactive Thumbnails', desc: 'Visual preview of every page so you see changes in real time.', icon: Eye },
        { title: 'Lossless Rotation', desc: 'Rotates page display parameters without re-compressing images.', icon: CheckCircle2 },
        { title: '100% Private', desc: 'Processed inside your web browser. Zero files uploaded to the internet.', icon: Shield },
        { title: 'All Devices Supported', desc: 'Fix orientation on phones, tablets, or computers effortlessly.', icon: Smartphone },
        { title: 'Lightning Fast', desc: 'Saves 50-page rotated files in under one second.', icon: Zap },
        { title: 'No Limits', desc: 'Rotate as many documents as needed with no paywalls.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Will rotating my PDF make it blurry?', answer: 'No! SoftBee modifies the internal orientation metadata of the page, leaving text and images at 100% original quality.' },
      { question: 'Can I rotate just one page in a multi-page PDF?', answer: 'Yes! You can rotate individual pages separately while keeping the rest untouched.' }
    ],
    tutorials: [
      { title: 'How to Fix Sideways Scanned Documents Permanently', tag: 'SCANNING', desc: 'Permanently orient scanned sheets for easy reading and printing.' }
    ]
  },

  'rearrange-pdf': {
    id: 'rearrange-pdf',
    title: 'Rearrange PDF',
    pageTitle: 'Rearrange and Reorder PDF Pages Online',
    subtitle: 'Reorder pages, swap chapters, and organize your PDF document sequence with interactive drag-and-drop thumbnails.',
    bannerColor: 'bg-[#2563EB]',
    bannerTextColor: 'text-white',
    icon: ArrowUpDown,
    acceptText: 'or drop PDF files here to reorder',
    acceptTypes: '.pdf',
    checkmarks: [
      'Interactive visual drag-and-drop page organizer',
      'Delete accidental duplicates and reorder with ease',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Organize Your Document In Any Order',
      subtitle: 'Put pages in perfect chronological order with an intuitive visual tile interface.',
      features: [
        {
          title: 'Drag & Drop Page Sorting',
          desc: 'Grab any thumbnail and slide it to its new location in the document hierarchy.',
          icon: ArrowUpDown,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Remove Unneeded Pages',
          desc: 'Click the trash icon on blank or duplicate pages to purge them during reorganization.',
          icon: Scissors,
          badgeColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
        },
        {
          title: 'Instant In-Browser Compile',
          desc: 'Assembles the re-sequenced PDF using pdf-lib in milliseconds without uploading files.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Rearrange PDF Pages Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Drop your document into the reorder workspace.' },
        { number: 2, title: 'Drag thumbnails to reorder', desc: 'Click and drag pages to arrange them in your preferred sequence.' },
        { number: 3, title: 'Save new order', desc: 'Click "Save Reordered PDF" to assemble the document.' },
        { number: 4, title: 'Download your file', desc: 'Save your reorganized PDF to your device.' }
      ]
    },
    featureGrid: {
      title: 'Features of SoftBee PDF Organizer',
      items: [
        { title: 'Visual Thumbnails', desc: 'High-clarity page previews ensure you move the right sheet.', icon: Eye },
        { title: 'Delete on the Fly', desc: 'Remove misprinted or accidental duplicate pages in one click.', icon: Scissors },
        { title: 'No File Size Limits', desc: 'Reorder large multi-page reports smoothly in local memory.', icon: HardDrive },
        { title: 'Zero Cloud Uploads', desc: 'All processing occurs on your computer for maximum confidentiality.', icon: Shield },
        { title: 'Mobile Friendly', desc: 'Reorder pages on tablets and smartphones with touch drag-and-drop.', icon: Smartphone },
        { title: '100% Free Forever', desc: 'No subscriptions, watermarks, or hidden costs.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Can I remove pages while rearranging?', answer: 'Yes! Simply click the trash can icon on any thumbnail to discard that page.' },
      { question: 'Does rearranging alter document text formatting?', answer: 'No. SoftBee transfers the exact vector streams, preserving all original fonts, links, and pictures.' }
    ],
    tutorials: [
      { title: 'How to Put Scanned Pages in Correct Order', tag: 'ORGANIZATION', desc: 'Fix out-of-order scans before sharing with colleagues or clients.' }
    ]
  },

  protect: {
    id: 'protect',
    title: 'Protect PDF',
    pageTitle: 'Password Protect PDF Online for Free',
    subtitle: 'Encrypt your confidential PDF files with robust passwords to prevent unauthorized opening, copying, or printing.',
    bannerColor: 'bg-[#DC2626]',
    bannerTextColor: 'text-white',
    icon: Lock,
    acceptText: 'or drop PDF files here to encrypt',
    acceptTypes: '.pdf',
    checkmarks: [
      'Industry-standard 128-bit/256-bit password encryption',
      'Restricts unauthorized opening, printing, and extraction',
      '100% Client-Side Privacy — Password never transmitted over web'
    ],
    valueProp: {
      headline: 'Keep Your Confidential Documents Safe',
      subtitle: 'Add password protection to legal contracts, payroll sheets, and financial statements in seconds.',
      features: [
        {
          title: 'Strong Password Encryption',
          desc: 'Secures your file with standard PDF encryption recognized by all modern PDF viewers.',
          icon: Lock,
          badgeColor: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
        },
        {
          title: 'Zero Password Leakage',
          desc: 'Your password is used locally by client-side WebAssembly. It is never logged or transmitted over networks.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        },
        {
          title: 'Universal Viewer Support',
          desc: 'Protected PDFs prompt for password in Chrome, Acrobat, Apple Preview, and mobile PDF apps.',
          icon: Globe,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        }
      ]
    },
    howTo: {
      title: 'How to Password Protect a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Select your PDF', desc: 'Choose the file you want to secure from your device.' },
        { number: 2, title: 'Set your password', desc: 'Type and confirm your chosen encryption password.' },
        { number: 3, title: 'Encrypt document', desc: 'Click "Protect PDF" to encrypt the document streams.' },
        { number: 4, title: 'Download secured PDF', desc: 'Save your password-protected document.' }
      ]
    },
    featureGrid: {
      title: 'Why Protect PDFs with SoftBee?',
      items: [
        { title: 'Client-Side Security', desc: 'Passwords and documents never leave your browser memory.', icon: HardDrive },
        { title: 'Standard Compatibility', desc: 'Opens on Windows, macOS, iOS, Android, and Linux.', icon: Smartphone },
        { title: 'Instant Encryption', desc: 'Secures files in seconds without waiting in server queues.', icon: Zap },
        { title: 'Password Strength Indicator', desc: 'Guidance to help you choose a strong password.', icon: CheckCircle2 },
        { title: '100% Free Forever', desc: 'No limits on how many documents you can encrypt.', icon: Globe },
        { title: 'No Registration Required', desc: 'Protect files immediately without creating an account.', icon: Download }
      ]
    },
    faqs: [
      { question: 'What happens if I forget my password?', answer: 'Because SoftBee does not store your password or files, forgotten passwords cannot be recovered. Make sure to keep a copy of your password.' },
      { question: 'Will this PDF work on mobile devices?', answer: 'Yes! Standard password-protected PDFs can be unlocked on iPhones, iPads, and Android devices using any standard PDF viewer.' }
    ],
    tutorials: [
      { title: 'How to Password-Protect Sensitive Financial PDFs', tag: 'SECURITY', desc: 'Keep tax returns and bank statements secure before emailing.' }
    ]
  },

  unlock: {
    id: 'unlock',
    title: 'Unlock PDF',
    pageTitle: 'Remove PDF Password Online',
    subtitle: 'Decrypt and remove password security from your PDF documents so you can open, read, edit, and print them freely.',
    bannerColor: 'bg-[#EA580C]',
    bannerTextColor: 'text-white',
    icon: Unlock,
    acceptText: 'or drop locked PDF files here to decrypt',
    acceptTypes: '.pdf',
    checkmarks: [
      'Remove password protection and viewing restrictions permanently',
      'Preserves 100% original formatting and content quality',
      '100% Client-Side Privacy — Password never transmitted over web'
    ],
    valueProp: {
      headline: 'Remove Password Restrictions with Ease',
      subtitle: 'Unlock authorized PDFs so you do not have to re-enter your password every time you view or print them.',
      features: [
        {
          title: 'One-Click Security Removal',
          desc: 'Input the valid document password once to remove all viewing and printing restrictions permanently.',
          icon: Unlock,
          badgeColor: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
        },
        {
          title: 'Full Quality Preservation',
          desc: 'Decodes document streams cleanly without touching image resolutions or vector lines.',
          icon: Sparkles,
          badgeColor: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
        },
        {
          title: 'Private & Secure',
          desc: 'Decryption happens locally in your device RAM. Your passwords and files never leave your computer.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Unlock a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload locked PDF', desc: 'Select or drag your password-protected document.' },
        { number: 2, title: 'Enter password', desc: 'Type the authorized password to authenticate the document.' },
        { number: 3, title: 'Remove security', desc: 'Click "Unlock PDF" to strip the encryption layer.' },
        { number: 4, title: 'Save unlocked PDF', desc: 'Download your unrestricted, freely viewable document.' }
      ]
    },
    featureGrid: {
      title: 'Why Unlock PDFs with SoftBee?',
      items: [
        { title: 'Remove Password Prompts', desc: 'Open documents instantly without typing passwords each time.', icon: Eye },
        { title: 'Enable Printing & Editing', desc: 'Lifts restrictions that prevent printing or highlighting.', icon: FileText },
        { title: 'Client-Side Privacy', desc: 'Your confidential files and passwords stay 100% private.', icon: HardDrive },
        { title: 'Fast Decryption', desc: 'Decrypts documents in seconds using client-side JavaScript.', icon: Zap },
        { title: 'No Installation Needed', desc: 'Works directly in your modern web browser.', icon: Globe },
        { title: 'Free with No Limits', desc: 'Unlock as many documents as needed without fees.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Do I need to know the password to unlock the PDF?', answer: 'Yes, you must know the password to unlock and decrypt the document authorized by the owner.' },
      { question: 'Will unlocking remove any text or images?', answer: 'No. The document content remains 100% intact and unchanged.' }
    ],
    tutorials: [
      { title: 'How to Remove Password Prompts from PDF Statements', tag: 'TUTORIAL', desc: 'Save time by unlocking monthly bank statements you review frequently.' }
    ]
  },

  flatten: {
    id: 'flatten',
    title: 'Flatten PDF',
    pageTitle: 'Flatten PDF Forms & Layers Online',
    subtitle: 'Merge interactive form fields, checkboxes, and annotations permanently into the PDF page layer so they cannot be altered.',
    bannerColor: 'bg-[#0891B2]',
    bannerTextColor: 'text-white',
    icon: Layers,
    acceptText: 'or drop PDF forms here to flatten',
    acceptTypes: '.pdf',
    checkmarks: [
      'Lock fillable form fields and signatures permanently',
      'Universal compatibility across all PDF viewers & printers',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Lock Form Fields and Signatures Permanently',
      subtitle: 'Prevent recipients from changing filled-in form answers by baking all interactive inputs directly into the page.',
      features: [
        {
          title: 'Permanent Form Freezing',
          desc: 'Turns interactive form inputs and checkboxes into static vector graphics that cannot be tampered with.',
          icon: Layers,
          badgeColor: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400'
        },
        {
          title: 'Universal Printer Compatibility',
          desc: 'Fixes issues where some PDF viewers fail to print filled-in form field responses.',
          icon: CheckCircle2,
          badgeColor: 'bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400'
        },
        {
          title: 'Local Browser Processing',
          desc: 'Flattens documents directly in browser RAM without uploading sensitive answers to external clouds.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Flatten a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF form', desc: 'Select or drag your filled-out PDF form into the workspace.' },
        { number: 2, title: 'Click Flatten PDF', desc: 'Click the button to bake all fields into the document background.' },
        { number: 3, title: 'Process layers', desc: 'Our engine converts form widgets into native page graphics.' },
        { number: 4, title: 'Download your file', desc: 'Save your read-only, tamper-proof flattened PDF.' }
      ]
    },
    featureGrid: {
      title: 'Why Flatten PDFs with SoftBee?',
      items: [
        { title: 'Prevent Alterations', desc: 'Ensures contractual responses cannot be modified by third parties.', icon: Lock },
        { title: 'Print Without Missing Fields', desc: 'Guarantees printed output matches what you see on screen.', icon: FileText },
        { title: '100% Client-Side Security', desc: 'Confidential legal and tax forms stay on your device.', icon: HardDrive },
        { title: 'Cross-Device Rendering', desc: 'Renders identically on mobile phones and desktop viewers.', icon: Smartphone },
        { title: 'Fast & Lightweight', desc: 'Executes in milliseconds with zero server upload time.', icon: Zap },
        { title: 'Free & Unlimited', desc: 'Flatten as many forms as you need with zero fees.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'What does flattening a PDF mean?', answer: 'Flattening merges interactive form fields, checkboxes, and annotations into the underlying PDF page layer, making them non-editable and permanent.' },
      { question: 'Can someone edit form fields after flattening?', answer: 'No. Once flattened, form fields become standard page graphics that cannot be altered in standard PDF readers.' }
    ],
    tutorials: [
      { title: 'Why You Must Flatten PDF Forms Before Submitting', tag: 'GOVERNMENT', desc: 'Ensure official portals and clerks can view all your filled data correctly.' }
    ]
  },

  'txt-to-pdf': {
    id: 'txt-to-pdf',
    title: 'Text to PDF',
    pageTitle: 'Convert TXT to PDF Online',
    subtitle: 'Convert plain text files (.txt) into cleanly formatted, printable A4 PDF documents with custom typography and margins.',
    bannerColor: 'bg-[#2563EB]',
    bannerTextColor: 'text-white',
    icon: Type,
    acceptText: 'or drop .txt text files here',
    acceptTypes: '.txt',
    checkmarks: [
      'Clean typography with auto-wrapped paragraphs and line counts',
      'Generates standard A4 printable PDF documents',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Turn Raw Text into Professional PDF Documents',
      subtitle: 'Transform code snippets, meeting logs, and plain text notes into clean printable PDFs with zero hassle.',
      features: [
        {
          title: 'Automatic Word Wrapping',
          desc: 'Parses long text strings and breaks them naturally at word boundaries to fit standard page margins.',
          icon: Type,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Standard A4 Pagination',
          desc: 'Splits multi-thousand-word texts cleanly across multiple pages with consistent headers and footers.',
          icon: FileText,
          badgeColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
        },
        {
          title: 'Total Local Privacy',
          desc: 'All conversion takes place locally in your web browser. Nothing is ever sent over the network.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert TXT to PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your .txt file', desc: 'Select or drag your text file into the blue conversion box.' },
        { number: 2, title: 'Convert text', desc: 'Click "Convert to PDF" to format paragraphs and pagination.' },
        { number: 3, title: 'Generate vector pages', desc: 'Our engine applies crisp vector typography and margins.' },
        { number: 4, title: 'Download your PDF', desc: 'Save your printable, formatted PDF document.' }
      ]
    },
    featureGrid: {
      title: 'Why Convert TXT to PDF with SoftBee?',
      items: [
        { title: 'Crisp Vector Fonts', desc: 'Renders sharp vector typography at any screen zoom or print resolution.', icon: Sparkles },
        { title: 'Standard Page Margins', desc: 'Professional spacing ready for binder hole-punching and physical filing.', icon: CheckCircle2 },
        { title: 'Client-Side Security', desc: 'Private notes and code remain strictly on your machine.', icon: HardDrive },
        { title: 'Instant Execution', desc: 'Converts multi-page logs in a fraction of a second.', icon: Zap },
        { title: 'Cross-Device Compatible', desc: 'Runs seamlessly on Windows, Mac, Linux, and smartphones.', icon: Smartphone },
        { title: 'Free Forever', desc: 'No daily conversion quotas or trial limits.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'What file formats are supported?', answer: 'SoftBee supports standard plain text files (.txt) with UTF-8 encoding.' },
      { question: 'Does this handle large text documents?', answer: 'Yes! The converter automatically paginates long text files across multiple A4 pages.' }
    ],
    tutorials: [
      { title: 'How to Convert Text Logs and Code to PDF', tag: 'DEVELOPER', desc: 'Generate printable code documentation from text files.' }
    ]
  },

  'pdf-to-image': {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    pageTitle: 'Convert PDF to JPG & PNG Online',
    subtitle: 'Extract and render PDF pages as high-resolution JPG or PNG images. Download individual photos or all pages in a ZIP.',
    bannerColor: 'bg-[#D97706]',
    bannerTextColor: 'text-white',
    icon: FileImage,
    acceptText: 'or drop PDF files here to convert to images',
    acceptTypes: '.pdf',
    checkmarks: [
      'High-DPI rendering with crisp typography and vibrant graphics',
      'Download individual pages or bulk ZIP archive',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Turn PDF Pages into High-Quality Images',
      subtitle: 'Convert slides, infographics, and report pages into JPG or PNG pictures ready for presentations and social media.',
      features: [
        {
          title: 'High-Resolution Rasterization',
          desc: 'Renders pages with high pixel density so small text and fine diagrams remain crystal clear.',
          icon: FileImage,
          badgeColor: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
        },
        {
          title: 'JPG & PNG Formats Supported',
          desc: 'Choose JPG for lightweight sharing or PNG for crisp lines and lossless detail.',
          icon: Sparkles,
          badgeColor: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400'
        },
        {
          title: 'Private Browser Conversion',
          desc: 'Conversion runs locally via HTML5 canvas and pdfjs-dist. Files are never transmitted over the internet.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert PDF to JPG/PNG Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Drag and drop your PDF into the amber workspace.' },
        { number: 2, title: 'Choose format', desc: 'Select JPG for compact size or PNG for high detail.' },
        { number: 3, title: 'Render pages', desc: 'Click "Convert to Images" to render each page.' },
        { number: 4, title: 'Download images', desc: 'Save single images or download all pages packed in a ZIP.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF to Image Converter',
      items: [
        { title: 'High-DPI Output', desc: 'Produces sharp images suitable for printing and presentations.', icon: Sparkles },
        { title: 'Batch ZIP Download', desc: 'Download all converted page pictures in one organized ZIP file.', icon: Download },
        { title: '100% Client-Side Privacy', desc: 'Confidential documents never leave your browser memory.', icon: HardDrive },
        { title: 'Works on Mobile & Desktop', desc: 'Convert documents seamlessly on iPhones, Android, and PCs.', icon: Smartphone },
        { title: 'Fast Canvas Engine', desc: 'Renders pages rapidly using modern browser hardware acceleration.', icon: Zap },
        { title: 'Unlimited & Free', desc: 'No daily limits or watermarks on your converted images.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'What is the difference between JPG and PNG?', answer: 'JPG produces smaller file sizes ideal for web sharing, while PNG offers lossless clarity with crisp vector lines and text.' },
      { question: 'Can I download all pages at once?', answer: 'Yes! SoftBee provides a "Download All as ZIP" button that packages all rendered pages into a single compressed file.' }
    ],
    tutorials: [
      { title: 'How to Share PDF Slides on Instagram and LinkedIn', tag: 'SOCIAL', desc: 'Convert PDF presentation decks into high-res images for social posts.' }
    ]
  },

  'image-to-pdf': {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    pageTitle: 'Convert JPG & PNG to PDF Online',
    subtitle: 'Combine photos, receipts, screenshots, and scans into a single organized, professional PDF document.',
    bannerColor: 'bg-[#D97706]',
    bannerTextColor: 'text-white',
    icon: ImagePlus,
    acceptText: 'or drop JPG, PNG, WEBP images here',
    acceptTypes: 'image/*',
    checkmarks: [
      'Combine multiple photos into one unified PDF document',
      'Automatic orientation detection and custom page margins',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Turn Photos into Clean PDF Documents',
      subtitle: 'Merge photo receipts, ID cards, handwritten notes, and sketches into one neat PDF file for easy sharing.',
      features: [
        {
          title: 'Multiple Photos to One PDF',
          desc: 'Select several images at once and arrange them in the exact order you want them in the final document.',
          icon: ImagePlus,
          badgeColor: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
        },
        {
          title: 'Auto-Fit & Margin Controls',
          desc: 'Scales images proportionally to standard A4 or US Letter page dimensions without distortion.',
          icon: Eye,
          badgeColor: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
        },
        {
          title: 'Zero Cloud Storage Risk',
          desc: 'Images are converted directly in local browser memory. Personal photos are never uploaded.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert Images to PDF Online for Free:',
      steps: [
        { number: 1, title: 'Select images', desc: 'Choose JPG, PNG, or WEBP photos from your computer or phone.' },
        { number: 2, title: 'Reorder photos', desc: 'Drag images into the sequence you want them to appear.' },
        { number: 3, title: 'Convert to PDF', desc: 'Click "Convert to PDF" to generate the unified document.' },
        { number: 4, title: 'Save your file', desc: 'Download your consolidated PDF document with one click.' }
      ]
    },
    featureGrid: {
      title: 'Why Convert Photos to PDF with SoftBee?',
      items: [
        { title: 'Supports All Major Formats', desc: 'Works with JPG, JPEG, PNG, WEBP, and GIF images.', icon: FileImage },
        { title: 'Interactive Reordering', desc: 'Sequence photo receipts and pages before compiling.', icon: ArrowUpDown },
        { title: 'Preserve Image Resolution', desc: 'Maintains camera megapixels and clarity for printable quality.', icon: Sparkles },
        { title: '100% Private', desc: 'Runs entirely on your device with client-side WebAssembly.', icon: HardDrive },
        { title: 'Mobile Camera Friendly', desc: 'Snap receipts with your phone camera and build a PDF instantly.', icon: Smartphone },
        { title: 'Free & Unlimited', desc: 'Combine as many photos as you want with no hidden fees.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Can I combine multiple pictures into one PDF?', answer: 'Yes! You can select multiple images at once and SoftBee will compile each image into a consecutive page in a single PDF.' },
      { question: 'Will my pictures lose quality?', answer: 'No. SoftBee preserves the original resolution of your images while fitting them cleanly to the page.' }
    ],
    tutorials: [
      { title: 'How to Turn Photo Receipts into an Expense Report PDF', tag: 'FINANCE', desc: 'Compile receipts into a clean PDF packet for reimbursement.' }
    ]
  },

  watermark: {
    id: 'watermark',
    title: 'Watermark PDF',
    pageTitle: 'Add Watermark to PDF Online for Free',
    subtitle: 'Stamp custom text watermarks ("CONFIDENTIAL", "DRAFT", or company name) across all PDF pages with custom opacity.',
    bannerColor: 'bg-[#0284C7]',
    bannerTextColor: 'text-white',
    icon: Droplet,
    acceptText: 'or drop PDF files here to watermark',
    acceptTypes: '.pdf',
    checkmarks: [
      'Custom text, font size, angle, opacity, and color controls',
      'Protects your intellectual property and confidential files',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Brand and Protect Your PDF Documents',
      subtitle: 'Add clear watermark stamps across draft proposals, invoices, and sensitive documents to deter unauthorized copying.',
      features: [
        {
          title: 'Custom Text & Angles',
          desc: 'Type any watermark text and choose 45° diagonal or horizontal placement with customizable transparency.',
          icon: Droplet,
          badgeColor: 'bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400'
        },
        {
          title: 'Applies to Every Page',
          desc: 'Stamps the watermark uniformly across all pages in your document in a fraction of a second.',
          icon: Layers,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Permanent Vector Stamping',
          desc: 'Embeds watermarks directly into the PDF graphics state using pdf-lib for universal viewing.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Add a Watermark to a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Select or drop your document into the sky blue workspace.' },
        { number: 2, title: 'Enter watermark text', desc: 'Type your watermark (e.g. "CONFIDENTIAL" or "SAMPLE").' },
        { number: 3, title: 'Adjust settings', desc: 'Choose opacity, font size, rotation angle, and color.' },
        { number: 4, title: 'Download watermarked PDF', desc: 'Save your newly branded document.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF Watermarking Tool',
      items: [
        { title: 'Fine Opacity Control', desc: 'Set subtle transparent watermarks that do not obscure background text.', icon: Eye },
        { title: 'Diagonal & Horizontal Angles', desc: 'Rotate stamps 45° across the page or position them horizontally.', icon: RotateCw },
        { title: 'Zero Cloud Storage', desc: 'All processing takes place in your browser memory for total privacy.', icon: HardDrive },
        { title: 'Fast Batch Stamping', desc: 'Stamps 100+ page documents in seconds.', icon: Zap },
        { title: 'Universal Viewing', desc: 'Watermarks render identically in Acrobat, Chrome, and printouts.', icon: Globe },
        { title: '100% Free Forever', desc: 'No limits on document pages or file count.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Will the watermark obscure the text beneath it?', answer: 'No. You can adjust the opacity slider (e.g. 20% to 40%) so the watermark remains clearly legible while keeping underlying text readable.' },
      { question: 'Can someone remove the watermark easily?', answer: 'The watermark is embedded directly into the page content stream, making it permanent for general viewers.' }
    ],
    tutorials: [
      { title: 'How to Mark Draft Contracts as CONFIDENTIAL', tag: 'LEGAL', desc: 'Protect proprietary business proposals before sharing with external partners.' }
    ]
  },

  'page-numbers': {
    id: 'page-numbers',
    title: 'Page Numbers',
    pageTitle: 'Add Page Numbers to PDF Online for Free',
    subtitle: 'Insert clean, professional page numbers into PDF headers or footers with customizable format, font size, and alignment.',
    bannerColor: 'bg-[#7C3AED]',
    bannerTextColor: 'text-white',
    icon: Hash,
    acceptText: 'or drop PDF files here to number pages',
    acceptTypes: '.pdf',
    checkmarks: [
      'Top or bottom positioning with left, center, or right alignment',
      'Custom numbering formats ("Page X of Y", "1, 2, 3")',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Number PDF Pages with Professional Formatting',
      subtitle: 'Add clear pagination to reports, legal briefs, research papers, and ebooks in seconds.',
      features: [
        {
          title: 'Flexible Positioning',
          desc: 'Place page numbers at the header (top) or footer (bottom) aligned to the left, center, or right margin.',
          icon: Hash,
          badgeColor: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
        },
        {
          title: 'Multiple Numbering Formats',
          desc: 'Choose between standard numbers (1, 2, 3), prefix styles ("Page 1"), or total page counts ("Page 1 of 12").',
          icon: FileText,
          badgeColor: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400'
        },
        {
          title: 'Clean Vector Rendering',
          desc: 'Numbers are embedded using standard Helvetica vector fonts that remain crisp at all zoom levels.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Add Page Numbers to a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Select or drop your document into the numbering dropzone.' },
        { number: 2, title: 'Choose position', desc: 'Pick header or footer and select left, center, or right alignment.' },
        { number: 3, title: 'Choose format', desc: 'Select your preferred numbering style (e.g. "Page {n} of {total}").' },
        { number: 4, title: 'Download numbered PDF', desc: 'Save your professionally paginated document.' }
      ]
    },
    featureGrid: {
      title: 'Why Add Page Numbers with SoftBee?',
      items: [
        { title: 'Custom Start Number', desc: 'Start numbering from any page or offset to match document chapters.', icon: Hash },
        { title: 'Print-Ready Margins', desc: 'Safe positioning ensures numbers never get trimmed by office printers.', icon: CheckCircle2 },
        { title: '100% Client-Side Privacy', desc: 'Private reports remain safely in your browser memory.', icon: HardDrive },
        { title: 'Lightning Fast', desc: 'Paginates 200-page manuscripts in less than a second.', icon: Zap },
        { title: 'Works on All Platforms', desc: 'Number documents smoothly on PCs, Macs, and smartphones.', icon: Smartphone },
        { title: '100% Free Forever', desc: 'No daily limits or subscriptions.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Can I format page numbers as "Page 1 of 10"?', answer: 'Yes! SoftBee supports dynamic total page templates so each page clearly shows its position in the document.' },
      { question: 'Can I exclude the first page (cover page)?', answer: 'Yes, you can configure the start page offset to keep cover pages unnumbered.' }
    ],
    tutorials: [
      { title: 'How to Paginate Academic Theses and Reports', tag: 'ACADEMIC', desc: 'Add formal page numbering to student dissertations and project papers.' }
    ]
  },

  grayscale: {
    id: 'grayscale',
    title: 'Grayscale PDF',
    pageTitle: 'Convert PDF to Black and White / Grayscale Online',
    subtitle: 'Convert full-color PDF documents into clean black-and-white grayscale pages to save printer ink and reduce file size.',
    bannerColor: 'bg-[#475569]',
    bannerTextColor: 'text-white',
    icon: Palette,
    acceptText: 'or drop PDF files here to convert to grayscale',
    acceptTypes: '.pdf',
    checkmarks: [
      'Removes color saturation to save expensive black & color printer toner',
      'Reduces file size for quick email attachments',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Save Printer Ink and Shrink File Bulk',
      subtitle: 'Prepare documents for economical printing by stripping color saturation while keeping text razor-sharp.',
      features: [
        {
          title: 'Color to Grayscale Conversion',
          desc: 'Reroutes RGB and CMYK color spectra to monochrome luminance values for optimal black-and-white clarity.',
          icon: Palette,
          badgeColor: 'bg-slate-100 text-slate-600 dark:bg-slate-950 dark:text-slate-400'
        },
        {
          title: 'Toner & Ink Cost Savings',
          desc: 'Prevents office color printers from drawing expensive cyan, magenta, and yellow toner on background fills.',
          icon: Sparkles,
          badgeColor: 'bg-gray-100 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
        },
        {
          title: 'Private In-Browser Processing',
          desc: 'All image filters execute in local device RAM using HTML5 canvas. Documents never leave your PC.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Convert a PDF to Grayscale Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Select or drop your color PDF into the slate gray box.' },
        { number: 2, title: 'Convert to Grayscale', desc: 'Click the action button to convert all pages to monochrome.' },
        { number: 3, title: 'Process images & text', desc: 'Our engine recalculates color luminance for balanced contrast.' },
        { number: 4, title: 'Download your file', desc: 'Save your print-ready black and white PDF.' }
      ]
    },
    featureGrid: {
      title: 'Why Convert to Grayscale with SoftBee?',
      items: [
        { title: 'Balanced Contrast', desc: 'Maintains high contrast so colored headers remain easily readable in gray.', icon: Eye },
        { title: 'Save Printing Expenses', desc: 'Avoid unexpected color print charges at office supply stores.', icon: CheckCircle2 },
        { title: 'Zero Cloud Uploads', desc: 'Converts documents locally in browser memory for complete privacy.', icon: HardDrive },
        { title: 'Smaller File Sizes', desc: 'Single-channel grayscale images consume fewer bytes than 24-bit color.', icon: Zap },
        { title: 'Works on Any Browser', desc: 'Runs smoothly on Chrome, Safari, Firefox, and mobile devices.', icon: Globe },
        { title: '100% Free Forever', desc: 'No page limits or subscriptions required.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Will text remain readable after converting to grayscale?', answer: 'Yes! Our algorithm balances luminance values to ensure dark text remains sharp and light backgrounds stay clean.' },
      { question: 'Why should I convert a PDF to grayscale before printing?', answer: 'Color printers often consume expensive color toner even for grey backgrounds. Grayscale forces printers to use only standard black toner.' }
    ],
    tutorials: [
      { title: 'How to Print Documents Cheaply at Libraries and Copy Shops', tag: 'PRINTING', desc: 'Avoid expensive per-page color printing fees with monochrome PDFs.' }
    ]
  },

  'pdf-to-text': {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    pageTitle: 'Extract Text & OCR from PDF Online',
    subtitle: 'Extract text from PDF documents and scanned pages into editable plain text with optical character recognition.',
    bannerColor: 'bg-[#1D4ED8]',
    bannerTextColor: 'text-white',
    icon: FileText,
    acceptText: 'or drop PDF files here to extract text',
    acceptTypes: '.pdf',
    checkmarks: [
      'Extract text directly into editable format or clipboard',
      'Supports scanned documents via local OCR engines',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Extract Readable Text from Any PDF File',
      subtitle: 'Copy quotes, paragraphs, and data out of locked or scanned documents in seconds.',
      features: [
        {
          title: 'Stream Text Extraction',
          desc: 'Parses character objects directly from the PDF stream to preserve exact words and sentences.',
          icon: FileText,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        },
        {
          title: 'Copy to Clipboard or TXT File',
          desc: 'Copy extracted text with one click or download it as a standard .txt document.',
          icon: Sparkles,
          badgeColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
        },
        {
          title: 'Private & Local Processing',
          desc: 'Text parsing happens locally in your browser. Confidential research and transcripts stay private.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Extract Text from a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Choose a document from your computer or phone.' },
        { number: 2, title: 'Extract text', desc: 'Click "Extract Text" to scan and parse content.' },
        { number: 3, title: 'Review text preview', desc: 'Inspect the extracted text directly in the interactive box.' },
        { number: 4, title: 'Copy or download', desc: 'Copy to clipboard or download as a .txt file.' }
      ]
    },
    featureGrid: {
      title: 'Everything You Need in a PDF Text Extractor',
      items: [
        { title: 'One-Click Copy', desc: 'Instantly paste extracted paragraphs into emails, Word, or code.', icon: CheckCircle2 },
        { title: 'Download as TXT', desc: 'Save structured plain text files to your computer.', icon: Download },
        { title: '100% Client-Side Confidentiality', desc: 'Legal transcripts and medical notes never touch cloud servers.', icon: HardDrive },
        { title: 'Fast Multi-Page Parsing', desc: 'Scans 50-page books in seconds using pdfjs-dist.', icon: Zap },
        { title: 'Cross-Device Compatible', desc: 'Extract text on smartphones, tablets, and desktops.', icon: Smartphone },
        { title: 'Free with No Limits', desc: 'Extract as much text as you need with zero paywalls.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Can I extract text from a scanned PDF image?', answer: 'Yes, if your browser has OCR support enabled, optical character recognition will transcribe letters from scanned graphics.' },
      { question: 'Is my document sent to any server for OCR?', answer: 'No. SoftBee PDF performs all processing in your web browser. No files are uploaded to any server or cloud storage.' }
    ],
    tutorials: [
      { title: 'How to Copy Text from a Protected or Locked PDF', tag: 'PRODUCTIVITY', desc: 'Extract un-selectable text into clean editable notes.' }
    ]
  },

  repair: {
    id: 'repair',
    title: 'Repair PDF',
    pageTitle: 'Repair Corrupted PDF Files Online',
    subtitle: 'Fix damaged, unreadable, or corrupted PDF documents by reconstructing broken cross-reference tables and trailers.',
    bannerColor: 'bg-[#DC2626]',
    bannerTextColor: 'text-white',
    icon: Wrench,
    acceptText: 'or drop damaged PDF files here to repair',
    acceptTypes: '.pdf',
    checkmarks: [
      'Reconstructs corrupted cross-reference (xref) tables and trailers',
      'Recovers readable pages from damaged or partial downloads',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Rescue Corrupted and Unreadable PDF Files',
      subtitle: 'Restore broken files that crash viewers or display "File is corrupted or damaged" errors.',
      features: [
        {
          title: 'Structure Rebuilding',
          desc: 'Scans document byte streams to locate orphan indirect objects and generate fresh xref tables.',
          icon: Wrench,
          badgeColor: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
        },
        {
          title: 'Recovers Readable Content',
          desc: 'Extracts valid page trees and stream objects even when file trailers have been truncated.',
          icon: CheckCircle2,
          badgeColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
        },
        {
          title: 'Private & Local Recovery',
          desc: 'Reconstruction takes place locally in your device RAM without uploading confidential data.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Repair a Damaged PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload corrupted PDF', desc: 'Select the broken or unreadable file from your device.' },
        { number: 2, title: 'Rebuild document structure', desc: 'Click "Repair PDF" to scan and reconstruct object tables.' },
        { number: 3, title: 'Validate recovery', desc: 'Our engine generates a clean, valid PDF catalog.' },
        { number: 4, title: 'Download repaired PDF', desc: 'Save your restored document.' }
      ]
    },
    featureGrid: {
      title: 'Why Repair PDFs with SoftBee?',
      items: [
        { title: 'Fix "Corrupt File" Errors', desc: 'Enables damaged documents to open in Adobe Acrobat and Chrome.', icon: CheckCircle2 },
        { title: 'Reconstruct Missing Trailers', desc: 'Rebuilds EOF and catalog references for truncated files.', icon: HardDrive },
        { title: '100% Client-Side Privacy', desc: 'Damaged contracts and invoices stay strictly on your computer.', icon: Shield },
        { title: 'Fast Diagnostic Engine', desc: 'Diagnoses and fixes structural errors in seconds.', icon: Zap },
        { title: 'Works on All Devices', desc: 'Recover documents on phones, tablets, or computers.', icon: Smartphone },
        { title: '100% Free Forever', desc: 'No charges or account registration required.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Can all damaged PDF files be repaired?', answer: 'SoftBee can repair documents with damaged headers, broken xref tables, or missing trailers. However, completely wiped or overwritten zero-byte files cannot be recovered.' },
      { question: 'Will repairing a PDF delete any information?', answer: 'No. The repair engine attempts to preserve and reconnect every valid object and page in the file.' }
    ],
    tutorials: [
      { title: 'How to Fix Corrupted PDFs That Won\'t Open in Chrome or Adobe', tag: 'TROUBLESHOOTING', desc: 'Step-by-step guide to recovering damaged downloads.' }
    ]
  },

  'extract-images': {
    id: 'extract-images',
    title: 'Extract Images',
    pageTitle: 'Extract Images from PDF Online',
    subtitle: 'Extract embedded photos, diagrams, and figures from your PDF documents in their original untouched resolution.',
    bannerColor: 'bg-[#D97706]',
    bannerTextColor: 'text-white',
    icon: FileImage,
    acceptText: 'or drop PDF files here to extract images',
    acceptTypes: '.pdf',
    checkmarks: [
      'Extract photos and figures at original untouched resolution',
      'Download individual images or all packed in a ZIP',
      '100% Client-Side Privacy — Zero Server Uploads'
    ],
    valueProp: {
      headline: 'Extract High-Resolution Images from Any PDF',
      subtitle: 'Pull original photos, product diagrams, and illustrations out of PDF brochures and reports without taking screenshots.',
      features: [
        {
          title: 'Lossless Original Quality',
          desc: 'Extracts the exact embedded image stream without downsampling or lossy re-encoding.',
          icon: FileImage,
          badgeColor: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
        },
        {
          title: 'Single or Batch ZIP Download',
          desc: 'Save individual pictures with one click or download all discovered photos in a single ZIP.',
          icon: Download,
          badgeColor: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
        },
        {
          title: 'Private & Secure',
          desc: 'Extracted directly inside your web browser. Confidential product assets are never uploaded.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Extract Images from a PDF Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Choose a document containing photos or diagrams.' },
        { number: 2, title: 'Scan for image objects', desc: 'Click "Extract Images" to scan internal document streams.' },
        { number: 3, title: 'Preview images', desc: 'See visual thumbnail cards for each discovered picture.' },
        { number: 4, title: 'Download your photos', desc: 'Download single photos or grab all images in a ZIP.' }
      ]
    },
    featureGrid: {
      title: 'Why Extract Images with SoftBee?',
      items: [
        { title: 'Original Resolution', desc: 'Preserves the true camera megapixels of embedded photos.', icon: Sparkles },
        { title: 'Better than Screenshots', desc: 'Avoids screen resolution limits and color distortion.', icon: CheckCircle2 },
        { title: '100% Client-Side Privacy', desc: 'Proprietary designs and personal photos never leave your device.', icon: HardDrive },
        { title: 'Instant Extraction', desc: 'Pulls dozens of images in seconds using web workers.', icon: Zap },
        { title: 'Works on Mobile & Desktop', desc: 'Extract graphics on phones, tablets, or PCs.', icon: Smartphone },
        { title: 'Unlimited & Free', desc: 'Extract as many images as you need with zero paywalls.', icon: Globe }
      ]
    },
    faqs: [
      { question: 'Why is extracting better than taking a screenshot?', answer: 'Screenshots are limited by your monitor resolution. Extracting gets the actual high-resolution source file stored inside the PDF.' },
      { question: 'What image formats will be extracted?', answer: 'Images are extracted as high-quality PNG or JPG files depending on how they were embedded in the PDF.' }
    ],
    tutorials: [
      { title: 'How to Save High-Res Photos from PDF Catalogs and Brochures', tag: 'DESIGN', desc: 'Pull original marketing assets out of PDF files.' }
    ]
  },

  metadata: {
    id: 'metadata',
    title: 'Edit Metadata',
    pageTitle: 'View & Edit PDF Metadata Online',
    subtitle: 'Inspect and edit document Title, Author, Subject, Keywords, Creator, and Producer properties for privacy or SEO.',
    bannerColor: 'bg-[#475569]',
    bannerTextColor: 'text-white',
    icon: FileText,
    acceptText: 'or drop PDF files here to view metadata',
    acceptTypes: '.pdf',
    checkmarks: [
      'Update Title, Author, Keywords, and Subject properties',
      'Remove identifying author details for complete privacy',
      '100% Client-Side Privacy — Fast & Free'
    ],
    valueProp: {
      headline: 'Control Your Document Properties & Privacy',
      subtitle: 'Add professional tags for SEO and indexing, or scrub personal computer names before submitting papers.',
      features: [
        {
          title: 'Full Metadata Control',
          desc: 'Update Title, Author, Subject, Keywords, Creator, and Producer tags in seconds.',
          icon: FileText,
          badgeColor: 'bg-slate-100 text-slate-600 dark:bg-slate-950 dark:text-slate-400'
        },
        {
          title: 'Scrub Sensitive Creator Info',
          desc: 'Remove personal author names, software versions, and workstation IDs before public release.',
          icon: Shield,
          badgeColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
        },
        {
          title: 'Direct Byte-Level Update',
          desc: 'Rewrites document info dictionaries and XMP metadata streams cleanly using pdf-lib.',
          icon: Sparkles,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        }
      ]
    },
    howTo: {
      title: 'How to Edit PDF Metadata Online for Free:',
      steps: [
        { number: 1, title: 'Upload your PDF', desc: 'Select or drag your document into the metadata inspector.' },
        { number: 2, title: 'Inspect current properties', desc: 'View existing Title, Author, and Subject fields.' },
        { number: 3, title: 'Edit or remove tags', desc: 'Type updated values or clear fields to anonymize.' },
        { number: 4, title: 'Save updated PDF', desc: 'Download your PDF with updated metadata.' }
      ]
    },
    featureGrid: {
      title: 'Why Edit Metadata with SoftBee?',
      items: [
        { title: 'Anonymize Authorship', desc: 'Strip personal usernames and file creation paths.', icon: Shield },
        { title: 'Improve Document Search', desc: 'Add keywords to help search engines index your whitepapers.', icon: Globe },
        { title: '100% Client-Side Privacy', desc: 'Everything is processed in local memory.', icon: HardDrive },
        { title: 'Instant Execution', desc: 'Updates document headers in milliseconds.', icon: Zap },
        { title: 'Cross-Device Compatible', desc: 'Edit properties on any desktop or mobile browser.', icon: Smartphone },
        { title: '100% Free Forever', desc: 'No subscriptions or daily limits.', icon: Download }
      ]
    },
    faqs: [
      { question: 'Why should I remove metadata before sharing a PDF?', answer: 'Metadata often contains your real name, company, computer username, and software versions. Removing it protects your privacy.' },
      { question: 'Does editing metadata alter document pages?', answer: 'No. Only document information dictionary tags are modified; page text and layouts remain completely untouched.' }
    ],
    tutorials: [
      { title: 'How to Scrub Identifying Metadata from Blind Peer Review Submissions', tag: 'ACADEMIC', desc: 'Anonymize academic papers before submitting for peer review.' }
    ]
  }
}

// Fallback helper for any tool that doesn't have a customized entry
export function getToolSeoData(toolId: string, fallbackTitle: string, fallbackDesc: string): ToolSeoConfig {
  const normalized = toolId.replace(/^\//, '').toLowerCase()
  if (toolsSeoData[normalized]) {
    return toolsSeoData[normalized]
  }

  // Create an automated high-quality SEO profile for other tools
  return {
    id: normalized,
    title: fallbackTitle,
    pageTitle: `${fallbackTitle} Online`,
    subtitle: fallbackDesc,
    bannerColor: 'bg-rose-500',
    bannerTextColor: 'text-white',
    icon: Sparkles,
    acceptText: 'or drop files here',
    acceptTypes: '.pdf',
    checkmarks: [
      'Fast, reliable document processing directly in your browser',
      '100% Client-Side Privacy — Zero Server Uploads',
      'Free & Open Source under AGPL-3.0 License'
    ],
    valueProp: {
      headline: `Fast & Professional ${fallbackTitle}`,
      subtitle: `Process, convert, and manage your PDF documents seamlessly without installing heavy software or paying subscription fees.`,
      features: [
        {
          title: `Accurate ${fallbackTitle} Processing`,
          desc: `Engineered with modern WebAssembly and client-side PDF libraries to ensure clean formatting and vector fidelity.`,
          icon: CheckCircle2,
          badgeColor: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
        },
        {
          title: 'Total Client-Side Privacy',
          desc: 'Your files are processed directly in your device memory. Documents are never transmitted to external clouds or servers.',
          icon: Shield,
          badgeColor: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
        },
        {
          title: 'Cross-Platform Compatibility',
          desc: 'Works smoothly on all devices including Windows, Mac, Linux, iPhone, iPad, and Android smartphones.',
          icon: Smartphone,
          badgeColor: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
        }
      ]
    },
    howTo: {
      title: `How to Use ${fallbackTitle} Online for Free:`,
      steps: [
        { number: 1, title: 'Choose your document', desc: 'Select or drag your file into the tool dropzone above.' },
        { number: 2, title: 'Configure tool settings', desc: 'Adjust options, parameters, or visual controls according to your requirements.' },
        { number: 3, title: 'Process your file', desc: 'Click the action button to process the document in your browser.' },
        { number: 4, title: 'Download your result', desc: 'Save your processed document directly to your device.' }
      ]
    },
    featureGrid: {
      title: `Everything You Need for ${fallbackTitle}`,
      items: [
        { title: 'Zero Cloud Uploads', desc: 'Files are processed in local browser memory with zero tracking.', icon: HardDrive },
        { title: 'Works on Any Browser', desc: 'Compatible with Chrome, Safari, Firefox, Edge, and mobile browsers.', icon: Globe },
        { title: 'Preserves Document Quality', desc: 'Maintains vector fonts, sharp images, and original page geometry.', icon: CheckCircle2 },
        { title: 'Instant Execution', desc: 'No queue times or upload delays. Computations execute in real time.', icon: Cpu },
        { title: '100% Free Forever', desc: 'No paywalls, daily limits, or forced registration.', icon: Sparkles },
        { title: 'Direct Local Download', desc: 'Save your output file with a single click.', icon: Download }
      ]
    },
    faqs: [
      { question: `Is this ${fallbackTitle} tool free to use?`, answer: `Yes! SoftBee PDF is completely free with no hidden charges, subscription fees, or daily limits.` },
      { question: 'Are my confidential documents safe?', answer: 'Yes. All file processing occurs 100% client-side in your web browser. No files are ever uploaded to any server.' },
      { question: 'Does this tool work on mobile devices?', answer: 'Yes! SoftBee PDF works on iPhone, iPad, and Android browsers, as well as via our Android APK.' }
    ],
    tutorials: [
      { title: `Mastering ${fallbackTitle} for Daily Productivity`, tag: 'TUTORIAL', desc: 'How to streamline your daily document workflow with privacy-first tools.' },
      { title: 'Working with PDFs Privately and Offline', tag: 'SECURITY', desc: 'Why client-side document processing is the safest way to manage digital files.' }
    ]
  }
}
