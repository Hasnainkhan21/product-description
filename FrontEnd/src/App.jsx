import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import ProductUpload from './components/ProductUpload';
import ProductList from './components/ProductList';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard with Products */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ProductUpload />} />
          <Route path="products" element={<ProductList />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
