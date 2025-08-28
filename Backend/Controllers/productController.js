const Product = require('../Models/Product');

const createProduct = async (req, res) => {
    try {
        
        const { name, price, currency, category, audience, notes } = req.body;
        
        
        const imagePath = req.file ? req.file.path : null;

        if (!name || !price || !category || !imagePath) {
            return res.status(400).json({ message: "Required fields are missing!" });
        }

        const newProduct = new Product({
            name,
            price,
            currency,
            category,
            audience,
            notes,
            image: imagePath 
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createProduct, getProducts };