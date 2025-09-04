import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    nav("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-lg p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">AI Commerce</h2>
        <p className="text-xs text-blue-200 mt-1">Seller Dashboard</p>
      </div>

      <nav className="space-y-2 text-sm">
        <Link
          to="/dashboard"
          className="block px-3 py-2 rounded-md bg-white/20 hover:bg-white/30 transition"
        >
        Home
        </Link>

        <Link
          to="/products/list"
          className="block px-3 py-2 rounded-md hover:bg-white/20 transition"
        >
          All Products
        </Link>

        <Link
          to="/stores"
          className="block px-3 py-2 rounded-md hover:bg-white/20 transition"
        >
          Manage Stores
        </Link>

        <button
          onClick={logout}
          className="w-full text-left mt-6 px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
