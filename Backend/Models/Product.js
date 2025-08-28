const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
    name: {type: String, required: true}, 
    image: {type: String, required: true}, 
    price: {type: Number, required: true},
    category: {type: String, required: true},
    audience: {type: String, required: true},
    notes: {type: String},
    

},{timestamps: true});
module.exports = mongoose.model('product', productSchema);

