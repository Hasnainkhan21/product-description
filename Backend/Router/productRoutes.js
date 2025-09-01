const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { createProduct, getProducts,generateDescription } = require('../Controllers/productController');
router.post("/generate-description", generateDescription);

// Use multer middleware from server.js
const upload = require('multer')({
  storage: require('multer').diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST add product with image upload
router.post('/addproduct', upload.single('image'), async (req, res) => {
  try {
    const { name, price, currency, category, audience, notes } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validate required fields
    if (!name || !price || !category || !audience || !image) {
      return res.status(400).json({ message: 'Please fill all required fields!' });
    }

    const product = new Product({
      name,
      price,
      currency,
      category,
      audience,
      notes,
      image
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Error in createProduct:', err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
