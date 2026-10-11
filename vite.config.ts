import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/logo.svg', 'icons/pwa-192.svg', 'icons/pwa-512.svg', 'icons/maskable-512.svg'],
      manifest: {
        name: 'SoftBee PDF Tools',
        short_name: 'SoftBee PDF',
        description: 'Merge, split, compress, convert and edit PDFs 100% offline. No uploads, no servers, absolute privacy.',
        theme_color: '#f59e0b',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        orientation: 'any',
        categories: ['productivity', 'utilities'],
        lang: 'en',
        icons: [
          {
            src: 'icons/pwa-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/pwa-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icons/maskable-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Merge PDF',
            short_name: 'Merge',
            url: '/#/merge',
            description: 'Combine multiple PDFs into one'
          },
          {
            name: 'Compress PDF',
            short_name: 'Compress',
            url: '/#/compress',
            description: 'Reduce PDF file size'
          },
          {
            name: 'Split PDF',
            short_name: 'Split',
            url: '/#/split',
            description: 'Split a PDF into separate pages'
          },
          {
            name: 'PDF to Word',
            short_name: 'PDF→Word',
            url: '/#/pdf-to-word',
            description: 'Convert PDF to editable Word document'
          }
        ],
        screenshots: [
          {
            src: 'icons/logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            form_factor: 'wide',
            label: 'SoftBee PDF Home'
          }
        ]
      },
      workbox: {
        // Cache all assets aggressively for offline use
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Large PDF workers need special handling — allow up to 5MB
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Cache tesseract language data (OCR) 
            urlPattern: /.*tesseract.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tesseract-cache',
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  base: process.env.VITE_BASE || './',
  server: {
    host: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'pdf-lib-core': ['pdf-lib'],
          'pdfjs-viewer': ['pdfjs-dist'],
          'tesseract-core': ['tesseract.js'],
          'vendor-ui': ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'sonner'],
          'vendor-utils': ['jszip', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities']
        }
      }
    }
  }
})
