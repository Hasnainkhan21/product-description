const express = require('express');
const app = express();
require("dotenv").config();
const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

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
