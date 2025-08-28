const Product = require('../Models/Product');

<<<<<<< HEAD
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

=======
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
>>>>>>> feature/product-upload-module
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
<<<<<<< HEAD
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createProduct, getProducts };
=======
        console.error("❌ Error in getProducts:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Functions ko export karna
module.exports = {
    createProduct,
    getProducts
};
>>>>>>> feature/product-upload-module
