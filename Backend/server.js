const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
require('dotenv').config();
const path = require('path'); 



=======
const app = express();
require("dotenv").config();
const path = require('path'); // <-- YEH LINE ADD KAREIN
>>>>>>> feature/product-upload-module
const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');

<<<<<<< HEAD
=======
// Middleware
app.use(cors());
app.use(express.json());

// YEH LINE ADD KAREIN taake images serve hon
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);
>>>>>>> feature/product-upload-module

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


connectDB();


app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
  res.send('Hello Developers! Server is running correctly.');
});


app.listen(port, () => {
<<<<<<< HEAD
  console.log(`✅ Server is running on port ${port}`);
=======
  console.log(`App is running on port ${port}`);
>>>>>>> feature/product-upload-module
});