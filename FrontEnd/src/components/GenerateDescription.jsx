import React, { useState } from "react";
import API from "../api"; // yahan api.js import kiya

function GenerateDescription() {
  const [form, setForm] = useState({
    productName: "",
    price: "",
    category: "",
    audience: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/products/generate-description", form); 
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Error generating description. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>AI Product Description Generator</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="productName" placeholder="Product Name"
          value={form.productName} onChange={handleChange} required />
        <br /><br />
        <input type="text" name="price" placeholder="Price"
          value={form.price} onChange={handleChange} required />
        <br /><br />
        <input type="text" name="category" placeholder="Category"
          value={form.category} onChange={handleChange} required />
        <br /><br />
        <input type="text" name="audience" placeholder="Audience"
          value={form.audience} onChange={handleChange} />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Description"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid gray" }}>
          <h3>Generated Description</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateDescription;
