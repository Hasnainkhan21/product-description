import React from "react";

export default function ProductCard({ product, handleDelete, deletingIds }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p>
        {product.price} {product.currency}
      </p>
      <p className="text-sm text-gray-500">{product.category}</p>

      {product.image && (
        <img
          src={`http://localhost:3005/uploads/${product.image}`}
          alt={product.name}
          className="w-32 h-32 object-cover mt-2 rounded"
        />
      )}

      <button
        onClick={() => handleDelete(product._id)}
        disabled={deletingIds.includes(product._id)}
        className={`mt-3 px-3 py-1 rounded text-white transition ${
          deletingIds.includes(product._id)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {deletingIds.includes(product._id) ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
