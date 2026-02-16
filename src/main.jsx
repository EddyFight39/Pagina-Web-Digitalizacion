import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { DigitalDashboard } from './components/dashboard/DigitalDashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<App />} />
        <Route path="/digitalizacion" element={<DigitalDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
