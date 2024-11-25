const mongoose = require('mongoose');

// Schema for category
const categorySchemas = new mongoose.Schema({
    category: { type: String, required: true },
    image: { type: String, required: true },
});

const Category = mongoose.model('Category',categorySchemas);
module.exports = Category;