// Controllers/productController.js

const Product = require('../Models/Product');
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// createProduct function
const createProduct = async (req, res) => {
  try {
    const { name, price, currency, category, audience } = req.body;
    const image = req.file ? req.file.filename : null;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert product description writer." },
        {
          role: "user",
          content: `Write a short and long description with SEO tags for product: ${name}, category: ${category}, price: ${price}, audience: ${audience}`,
        },
      ],
    });

    const aiDescription = response.choices[0].message.content;

    const product = new Product({
      name,
      price,
      currency,
      category,
      audience,
      notes: aiDescription, // <-- auto-filled
      image,
    });

    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    console.error("❌ Error in addProduct:", err);
    res.status(500).json({ error: err.message });
  }
};

// getProducts function
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error in getProducts:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


//delete product through id

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

// Functions ko export karna
module.exports = {
    createProduct,
    getProducts,
    deleteProduct
};  