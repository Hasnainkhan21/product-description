
import React, { useState } from 'react'
import './index.css'
import ProductUpload from './components/productupload';
import ProductList from './components/ProductList';
import GenerateDescription from "./components/GenerateDescription";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Product management routes */}
        <Route path="/products/upload" element={<ProductUpload />} />
        <Route path="/products/list" element={<ProductList />} />
            
        {/* AI description generator route */}  
        <Route path="/generate-description" element={<GenerateDescription />} />  

        {/* Fallback route → redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
