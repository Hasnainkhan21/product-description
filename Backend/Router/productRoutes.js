const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

// POST route to add product
router.post('/addproduct', async (req, res) => {
    try {
        const { name, image, price, category, audience, notes } = req.body;

        const newProduct = new Product({ name, image, price, category, audience, notes });
        await newProduct.save();

        res.status(200).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get route to fetch all products
router.get('/', async(req, res)=>{
    try {
        const products = await Product .find();
        res.status(200).json(products);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "server error"});    }
})

module.exports = router;
