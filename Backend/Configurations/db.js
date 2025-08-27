const mongoose = require('mongoose');
const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(dbURI);
        console.log('Database connected successfully');
    }catch(err){
        console.error('Database connection error:', err);
    }
}
module.exports = connectDB;