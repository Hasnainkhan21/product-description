import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";

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
      const res = await fetch(
        `http://localhost:3005/api/products/delete/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        console.error("❌ Failed to delete product");
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    } finally {
      setDeletingIds((prev) =>
        prev.filter((delId) => delId.toString() !== id.toString())
      );
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-white rounded">
          ALL PRODUCTS
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                handleDelete={handleDelete}
                deletingIds={deletingIds}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
