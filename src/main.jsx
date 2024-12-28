import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.jsx';
import InvoiceForm from './components/InvoiceForm.jsx';
import Login from './components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
   
  </StrictMode>,
)
