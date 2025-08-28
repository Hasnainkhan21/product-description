<<<<<<< HEAD
// Router/productRoutes.js

=======
>>>>>>> feature/product-upload-module
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
<<<<<<< HEAD
const { createProduct, getProducts } = require('../Controllers/productController'); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
        
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post('/addproduct', upload.single('image'), createProduct);


=======
const { createProduct, getProducts } = require('../Controllers/productController');

// Multer ka setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/addproduct', upload.single('image'), createProduct);
>>>>>>> feature/product-upload-module
router.get('/', getProducts);

module.exports = router;