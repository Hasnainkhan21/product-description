const Product = require("../Models/Product");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

// Create product with AI description
const createProduct = async (req, res) => {
  try {
    const { name, price, currency, category, audience } = req.body;
    const image = req.file ? req.file.filename : null;

    // Generate AI description (short + simple)
    const prompt = `Write a concise product description in plain text (2–3 sentences, under 50 words). 
    Product: ${name}, Category: ${category}, Price: ${price}, Audience: ${audience}. 
    Keep it professional and easy to understand. Do NOT include headings, bullet points, or SEO tags.`;

    const result = await model.generateContent(prompt);
    const aiDescription = result.response.text() || "No description generated.";

    const product = new Product({
      name,
      price,
      currency,
      category,
      audience,
      notes: aiDescription, // store as notes/description
      image,
    });

    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    console.error("❌ Error in createProduct:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error in getProducts:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteProduct:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
};
