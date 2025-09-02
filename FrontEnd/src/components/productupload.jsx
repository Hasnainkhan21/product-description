import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function ProductUpload() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !category || !image || !audience) {
      alert("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("currency", currency);
    formData.append("category", category);
    formData.append("audience", audience);
    formData.append("notes", notes);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3005/api/products/addproduct", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Product uploaded successfully!");
        setProductName("");
        setPrice("");
        setCategory("");
        setAudience("");
        setNotes("");
        setImage(null);
        setPreview(null);
      } else {
        alert("❌ Failed to upload product!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error while uploading product!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixed on left */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 text-center">
            <h2 className="text-2xl font-bold text-white">UPLOAD PRODUCT</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input
              type="text"
              placeholder="Product Name *"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white text-gray-800"
              required
            />

            <div className="bg-white flex space-x-2">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border rounded-lg p-2 focus:ring focus:ring-blue-300"
                required
              >
                <option value="USD">$ (USD)</option>
                <option value="EUR">€ (EUR)</option>
                <option value="GBP">£ (GBP)</option>
                <option value="INR">₹ (INR)</option>
                <option value="PKR">₨ (PKR)</option>
              </select>

              <input
                type="number"
                placeholder="Price *"
                value={price}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val >= 0) setPrice(val);
                }}
                className="bg-white flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Category *</option>
              <option value="fashion">Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="beauty">Beauty</option>
              <option value="home">Home & Living</option>
              <option value="other">Other</option>
            </select>

            <input
              type="text"
              placeholder="Target Audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="bg-white w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />

            <textarea
              placeholder="Notes (special features)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              rows="3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white w-full p-2 border rounded-lg"
              required
            />

            {preview && (
              <div className="mt-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="bg-white w-40 h-40 object-cover mx-auto rounded-lg border"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
