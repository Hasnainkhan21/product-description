import React, { useEffect, useState } from "react";
import Sidebar from "./menubar";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    const [deletingIds, setDeletingIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3005/api/products"); 
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
    
  const handleDelete = async (id) => {
   const userConfirmed = window.confirm("Do you want to delete this product?");
    if (!userConfirmed) return;

    try {
      setDeletingIds((prev) => [...prev, id]);
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id.toString() !== id.toString()));
      } else {
        console.error("❌ Failed to delete product");
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
    finally {
      setDeletingIds((prev) => prev.filter((delId) => delId.toString() !== id.toString()));
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-gray-100">
          
          <Sidebar />

    <div className="max-w-3xl mx-auto p-6 flex-1 ">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-indigo-600 py-6 text-white">ALL PRODUCTS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow-md bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>
              {p.price} {p.currency}
            </p>
            <p className="text-sm text-gray-500">{p.category}</p>
            {p.image && (
              <img
                src={`http://localhost:3005/uploads/${p.image}`} 
                alt={p.name}
                className="w-32 h-32 object-cover mt-2 rounded"
              />
            )}
              <button
                onClick={() => handleDelete(p._id)}
                className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
