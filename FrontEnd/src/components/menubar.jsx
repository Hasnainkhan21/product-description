import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, PlusCircle, Package } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-56 bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <h1 className="text-lg font-bold">AI Commerce</h1>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

      
        <nav className="flex flex-col gap-2 p-4 text-sm">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => setOpen(false)}
          >
            <Home size={18} /> Dashboard
          </Link>

          <Link
            to="/products/upload"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => setOpen(false)}
          >
            <PlusCircle size={18} /> Add Product
          </Link>

          <Link
            to="/products/list"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/20 transition"
            onClick={() => setOpen(false)}
          >
            <Package size={18} /> Manage Products
          </Link>
        </nav>
      </aside>

    
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-20"
        />
      )}

   
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 bg-white p-2 rounded-md shadow z-40"
      >
        <Menu size={24} />
      </button>
    </>
  );
}
