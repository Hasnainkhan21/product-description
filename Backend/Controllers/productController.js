const Product = require('../Models/Product');

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

// Functions ko export karna
module.exports = {
    createProduct,
    getProducts
};