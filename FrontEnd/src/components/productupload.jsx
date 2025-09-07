import React, { useState } from "react";
import Sidebar from "./Sidebar";
import API from "../api"; // <-- make sure this points to your axios instance

export default function ProductUpload() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ AI Description Generator
  const handleGenerate = async () => {
    if (!productName || !price || !category || !audience) {
      alert("Fill product name, price, category, and audience first!");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/products/generate-description", {
        productName,
        price,
        category,
        audience,
      });
      setNotes(res.data.result); // Auto-fill notes
    } catch (err) {
      console.error(err);
      alert("Error generating description. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  // Upload product
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
      <Sidebar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 text-center">
            <h2 className="text-2xl font-bold text-white">UPLOAD PRODUCT</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input
              type="text"
              placeholder="Product Name *"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white text-gray-800"
              required
            />

            <input
              type="number"
              placeholder="Price *"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                if (val >= 0) setPrice(val);
              }}
              className="bg-white w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />

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
              placeholder="Audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="bg-white w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white w-full p-2 border rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
