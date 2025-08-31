import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const logout = () => {
    // TODO: clear tokens / session
    nav("/login");
  };

  // placeholder data
  const products = [
    { id: 1, title: "Smart Lamp", price: 29.99, stock: 12 },
    { id: 2, title: "AI Headphone", price: 79.99, stock: 5 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
      {/* Sidebar */}
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
            Overview
          </Link>
           <Link
            to="/products/list">
          <a className="block px-3 py-2 rounded-md hover:bg-white/20 transition">
            Manage Products
          </a>
          </Link>
          <a className="block px-3 py-2 rounded-md hover:bg-white/20 transition">
            Manage Stores
          </a>
          <button
            onClick={logout}
            className="w-full text-left mt-6 px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-indigo-800">Products</h1>
          <Link
            to="/products/upload">
          <button className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg text-sm shadow hover:opacity-90 transition">
            + Add Product
          </button>
           </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-indigo-200 rounded-xl p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">{p.title}</h3>
                <span className="text-sm font-semibold text-indigo-600">
                  ${p.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-3">Stock: {p.stock}</p>
              <div className="mt-5 flex gap-3">
                <button className="px-4 py-1.5 border border-indigo-200 rounded-md text-sm text-indigo-600 hover:bg-indigo-50 transition">
                  Edit
                </button>
                <button className="px-4 py-1.5 border border-red-200 rounded-md text-sm text-red-600 hover:bg-red-50 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
