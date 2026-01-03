// import { BrowserRouter } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>,
)
