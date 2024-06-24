import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      react(),
      VitePWA({
        manifest: {
          // Your manifest options here
          name: 'Task Manager',
          short_name: 'Task Manager',
          icons: [
            {
              src: '/logo.png',
              sizes: '120x120',
              type: 'image/png',
            },
          ],
          start_url: '.',
          display: 'standalone',
          theme_color: '#000000',
          background_color: '#ffffff',
        },
      })
    ]
})
