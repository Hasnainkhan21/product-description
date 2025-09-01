const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path'); 
const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// Connect to database
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Hello Developers!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
const authRoutes = require("./Router/authRoutes");

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); // 👈 add this line
