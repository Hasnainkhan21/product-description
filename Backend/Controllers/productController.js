const Product = require("../Models/Product");

// @desc Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error in getProducts:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Create new product
const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, audience, notes } = req.body;

    // required fields check
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, Price and Category are required" });
    }

    const product = new Product({
      name,
      price,
      category,
      image,
      audience,
      notes,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Error in createProduct:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getProducts, createProduct };
