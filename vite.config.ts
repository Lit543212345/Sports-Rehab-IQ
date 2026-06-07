import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/Sports-Rehab-IQ/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Sports Rehab IQ - Sports Injury Guide',
        short_name: 'Sports Rehab IQ',
        description: 'Evidence-based sports injury self-diagnosis and treatment tracking. Works offline.',
        start_url: '/Sports-Rehab-IQ/',
        display: 'standalone',
        background_color: '#0a1628',
        theme_color: '#00d4aa',
        orientation: 'portrait-primary',
        categories: ['health', 'fitness', 'medical'],
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        /** Precache all built assets (JS, CSS, HTML, fonts, knowledgebase data) */
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],

        /** Runtime caching for any images loaded dynamically */
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sports-rehab-iq-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'sports-rehab-iq-fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],

        /** Skip waiting and claim clients immediately on update */
        skipWaiting: false,
        clientsClaim: true,

        /** Clean up old precache entries automatically */
        cleanupOutdatedCaches: true,
      },

      devOptions: {
        enabled: false, // Disable SW in dev mode for cleaner DX
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
