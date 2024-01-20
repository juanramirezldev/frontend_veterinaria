import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import appRouter from "./appRoutes"
import {AuthProvider} from "./context/AuthProvider"
import { PacientesProvider } from './context/PacientesProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PacientesProvider>
        <RouterProvider router={appRouter} />
      </PacientesProvider>
    </AuthProvider>
    
  </React.StrictMode>,
)
