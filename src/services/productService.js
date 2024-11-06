const Product = require("../models/productModel");


const getAllProducts = async () => {   
    return await Product.find();
}
const getProductById = async (id) => {
    return await Product.findById(id)
}
const getProductsByCaregory = async (category) => {
    return await Product.find({category})
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCaregory,
}