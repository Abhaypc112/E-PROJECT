const Product = require("../models/productModel");
const CustomError = require("../utils/customError");

// Get product services
const getAllProducts = async () => {   
    const products = await Product.find();
    if(!products.length) new CustomError("Produts not found !",404);
    return products;
};
const getProductById = async (productId) => {
    const product = await Product.findById(productId);
    if(!product) throw new CustomError("Produt not found !");
    return product;
};
const getProductsByCaregory = async (category) => {
    const products = await Product.find({category});
    if(!products.length) throw new CustomError(`${category} caregory not found !`,404);
    return products;
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCaregory,
};