import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  base: '/DSA_roadmap_application/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'DSA Mastery',
        short_name: 'DSA',
        description: 'Master Data Structures & Algorithms',
        theme_color: '#6366f1',
        background_color: '#0f0f1a',
        display: 'standalone',
        icons: [
          { src: '/DSA_roadmap_application/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/DSA_roadmap_application/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-cache' }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
