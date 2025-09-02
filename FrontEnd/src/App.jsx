import { useState } from 'react'
import './index.css'
import ProductUpload from './components/productupload';
import ProductList from './components/ProductList';
import GenerateDescription from "./components/GenerateDescription";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<><ProductUpload /><ProductList /></>} />
        <Route path="/generate-description" element={<GenerateDescription />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
