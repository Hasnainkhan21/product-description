import React,{useState} from 'react'

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
    setPreview(URL.createObjectURL(file)); // show preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !category || !image) {
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
       const res = await fetch("http://localhost:5000/api/products/addproduct", { 
         method: "POST",
         body: formData,
      });

      if (res.ok) {
        alert("✅ Product uploaded successfully!");
        // reset form
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
    <div>
      <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">UPLOAD PRODUCT</h2>
       <form onSubmit={handleSubmit} className="space-y-4">
      <input
          type="text"
          placeholder="Product Name *"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          required
        />

         <div className="flex space-x-2">
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
            onChange={(e) => {const val = e.target.value;
                            if (val >= 0) setPrice(val);}}
            
            className="flex-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
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
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
        />

        <textarea
          placeholder="Notes (special features)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          rows="3"
        />
         
         <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-lg"
          required
        />

       
        {preview && (
          <div className="mt-3 text-center">
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover mx-auto rounded-lg border"
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
  )
}
