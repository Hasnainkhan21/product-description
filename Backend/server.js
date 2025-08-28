const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); 



const connectDB = require('./Configurations/db');
const productRoutes = require('./Router/productRoutes');


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
  console.log(`✅ Server is running on port ${port}`);
});