import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/personaltrainer/', // Add this row and use your own repository name
  plugins: [react()],
  test: {
  globals: true,
  environment: 'jsdom',
  },
  })
  