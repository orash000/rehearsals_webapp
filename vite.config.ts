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
    allowedHosts: ["f139fa933acc.ngrok-free.app"],
  }
})