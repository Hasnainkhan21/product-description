const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
<<<<<<< HEAD

const { createProduct, getProducts,generateDescription } = require('../Controllers/productController');
router.post("/generate-description", generateDescription);
=======
const { createProduct, getProducts } = require('../Controllers/productController');
>>>>>>> 2895f281d6f2b76d77f819e07d46309d4717fae5

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
