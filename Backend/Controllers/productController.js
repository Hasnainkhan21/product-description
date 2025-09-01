// Controllers/productController.js

const Product = require('../Models/Product');
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// createProduct function
const createProduct = async (req, res) => {
    try {
        const { name, price, category, audience, notes } = req.body;
        const imagePath = req.file ? req.file.path : null;

        if (!name || !price || !category || !imagePath) {
            return res.status(400).json({ message: "Name, Price, Category and Image are required" });
        }

        const product = new Product({
            name,
            price,
            category,
            audience,
            notes,
            image: imagePath,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error("❌ Error in createProduct:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
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

// generateDescription function
const generateDescription = async (req, res) => {
  try {
    const { productName, price, category, audience } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert product description writer." },
        { role: "user", content: `Write a short and long description with SEO tags for product: ${productName}, category: ${category}, price: ${price}, audience: ${audience}` }
      ]
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Functions ko export karna
module.exports = {
    createProduct,
    getProducts,
    generateDescription
};