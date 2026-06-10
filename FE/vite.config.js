// ─────────────────────────────────────────────
// VITE CONFIG
// Tailwind v4 menggunakan plugin, bukan postcss
// ─────────────────────────────────────────────

import { defineConfig } from 'vite'
import react            from '@vitejs/plugin-react'
import tailwindcss      from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})