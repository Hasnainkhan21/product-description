const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path'); 
const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON (non-file routes)

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Make multer upload available to routes
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Routes
app.use('/api/products', productRoutes);

// Connect to database
connectDB();

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
