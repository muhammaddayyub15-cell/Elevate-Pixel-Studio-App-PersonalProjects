// ─────────────────────────────────────────────
// MAIN — Entry Point
// Mount React app ke DOM
// Import global styles
// ─────────────────────────────────────────────

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)