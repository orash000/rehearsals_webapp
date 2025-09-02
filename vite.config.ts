import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsConfigPaths()
  ],
  server: {
    allowedHosts: ["9d32daea356f.ngrok-free.app"],
  }
})