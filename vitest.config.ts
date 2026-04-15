import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { config } from 'dotenv'

// This loads your .env.local file
config({ path: '.env.local' })

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // This allows you to use 'test' and 'expect' without importing them every time
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})