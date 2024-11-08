const Product = require("../models/productModel");

// Get product services
const getAllProducts = async () => {   
    return await Product.find();
}
const getProductById = async (productId) => {
    return await Product.findById(productId);
}
const getProductsByCaregory = async (category) => {
    return await Product.find({category});
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCaregory,
};