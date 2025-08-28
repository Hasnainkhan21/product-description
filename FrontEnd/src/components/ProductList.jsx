import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products"); 
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

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>
              {p.price} {p.currency}
            </p>
            <p className="text-sm text-gray-500">{p.category}</p>
            {p.image && (
              <img
                src={`http://localhost:3000/${p.image}`} 
                alt={p.name}
                className="w-32 h-32 object-cover mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
