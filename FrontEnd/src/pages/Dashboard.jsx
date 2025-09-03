import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
      {/* Sidebar (fixed width) */}
      <Sidebar />

      {/* Main Section */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Link to="/products/upload">
            <button className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg text-sm shadow hover:opacity-90 transition">
              + Add Product
            </button>
          </Link>
        </header>

        {/* Products Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        </section>
      </main>
    </div>
  );
}
