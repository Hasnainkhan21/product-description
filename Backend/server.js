const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path'); 
const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const authRoutes = require('./Router/authRouter');

// ✅ Middleware (must come first)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data if needed

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer config
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

// ✅ Routes (after middleware)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Connect to database
connectDB();

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
