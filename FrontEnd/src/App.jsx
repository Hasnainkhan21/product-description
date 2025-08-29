import { useState } from 'react'
import './index.css'
import ProductUpload from './components/productupload';
import ProductList from './components/ProductList';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Product pages (your code) */}
        <Route path="/products" element={<><ProductUpload /><ProductList /></>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
