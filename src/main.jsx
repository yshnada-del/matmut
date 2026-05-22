import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/onboarding.css'
import './styles/auth.css'
import './styles/home.css'
import './styles/address.css'
import './styles/ready-photo.css'
import './styles/photo.css'
import './styles/analyze.css'
import './styles/aichat.css'
import './styles/result.css'
import './styles/detail.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
