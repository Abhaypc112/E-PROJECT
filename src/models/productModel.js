const mongoose = require('mongoose');

// Schema for product
const productSchemas = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId , required:true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true,min: 0 },
    stock: { type: Number, required: true,min: 0 },
    rating: { type: Number, required: true,min: 0,max: 5 },
    material: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true }
});

const Product = mongoose.model('Product',productSchemas);
module.exports = Product;