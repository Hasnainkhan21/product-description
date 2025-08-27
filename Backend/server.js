const express = require('express');
const app = express();
require("dotenv").config();
const connectDB = require('./Configurations/db');
const port = process.env.PORT;
const cors = require('cors');


app.use(cors());
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
  res.send('Hello Developers!');
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});