import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <meta name="theme-color" content="#b0d6f7"/>
    <App />
  </StrictMode>,
)
