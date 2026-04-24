import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoutesApp from './RoutesApp.jsx'
import { BrowserRouter } from 'react-router'
import UpdateVersion from './UpdateVersion.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <RoutesApp />
    </BrowserRouter>
    
  </StrictMode>,
)
