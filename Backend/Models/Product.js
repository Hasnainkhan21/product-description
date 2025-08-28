const mongoose = require('mongoose');
// create the product schema name image price catogory audience notes

const productSchema = new mongoose.Schema({
    name: {type: String, requird: true},
    image: {type: String, requird: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    audience: {type: String, required: true},
    notes: {type: String},
    

},{timestamps: true});
module.exports = mongoose.model('product', productSchema);

