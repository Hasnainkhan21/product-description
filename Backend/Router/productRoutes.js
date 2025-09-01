const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { createProduct, getProducts,generateDescription } = require('../Controllers/productController');
router.post("/generate-description", generateDescription);

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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
