import React from "react";
import ReactMarkdown from "react-markdown";

export default function ProductCard({ product, handleDelete, deletingIds }) {
  return (
    <div className="w-full max-w-sm border rounded-2xl p-5 shadow-lg bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 hover:shadow-2xl transition-transform hover:scale-[1.02] flex flex-col items-center mx-auto">
      {/* Product Image */}
      {product.image ? (
        <div className="w-36 h-36 mb-4 rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center border border-indigo-200">
          <img
            src={`http://localhost:3005/uploads/${product.image}`}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150x150?text=No+Image";
            }}
          />
        </div>
      ) : (
        <div className="w-36 h-36 mb-4 rounded-xl flex items-center justify-center bg-gray-100 text-gray-400 border border-indigo-100">
          <span className="text-4xl">🖼️</span>
        </div>
      )}

      {/* Product Info */}
      <h3 className="text-lg font-bold text-indigo-800 mb-1 text-center line-clamp-1">
        {product.name}
      </h3>
      <p className="text-base font-semibold text-blue-700 mb-1">
        {product.price}{" "}
        <span className="text-sm text-gray-500">{product.currency}</span>
      </p>
      <p className="text-xs font-medium text-purple-600 mb-2 uppercase tracking-wide">
        {product.category}
      </p>

      {/* AI Description */}
      {product.notes && (
        <div className="mt-2 text-sm text-gray-700 bg-white/80 rounded-lg p-3 shadow-inner max-h-20 overflow-y-auto w-full">
          <ReactMarkdown>{product.notes}</ReactMarkdown>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3 w-full justify-center">
        <button
          onClick={() => handleDelete(product._id)}
          disabled={deletingIds.includes(product._id)}
          className={`px-4 py-1.5 text-sm rounded-lg font-medium text-white transition-all shadow-sm ${
            deletingIds.includes(product._id)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
          }`}
        >
          {deletingIds.includes(product._id) ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
