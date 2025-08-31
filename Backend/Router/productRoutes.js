const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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
router.get('/', getProducts);

module.exports = router;