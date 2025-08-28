const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path'); // <-- YEH LINE ADD KAREIN
const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// YEH LINE ADD KAREIN taake images serve hon
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

const port = process.env.PORT || 3000;

// Connect DB
connectDB();

app.get('/', (req, res) => {
  res.send('Hello Developers!');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});