const Category = require("../models/category");
const Product = require("../models/productModel");
const CustomError = require("../utils/customError");

// Get product services
const getAllProducts = async (skip, limit) => {   
    const products = await Product.find().skip(skip).limit(limit);
    if(!products.length) new CustomError("Produts not found !",404);
    return products;
};

const getProductById = async (productId) => {
    const product = await Product.findById(productId);
    if(!product) throw new CustomError("Produt not found !");
    return product;
};
const getProductsByCaregory = async (category, skip, limit) => {
    const products = await Product.find({category}).skip(skip).limit(limit);
    if(!products.length) throw new CustomError(`${category} caregory not found !`,404);
    return products;
};

const getAllHomeProduts = async () => {
    const products = await Product.find();
    if(!products.length) new CustomError("Produts not found !",404);
    return products;
}

// Add products service
const addNewProduct = async (productDetails) => {
    const {name,description,category,price,stock,rating,material,images,tags} = productDetails;
    const product = new Product({name,description,category,price,stock,rating,material,images,tags});
    if(!product) throw new CustomError('Product not added !',500);
    return await product.save();
}

// Update product service
const updateProductById = async (productId,updatedDetails) => {
    const {name,description,category,price,stock,rating,material,images,tags} = updatedDetails;
    const newData = {name,description,category,price,stock,rating,material,images,tags}
    let product = await Product.findByIdAndUpdate(
        productId,
        {$set: newData},
        {new:true, runValidators:true}
    );
    if(!product) throw new CustomError('Product not fount !',404);
    return product
}

// Delete product service
const deleteProductById = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);
    if(!product) throw new CustomError('Product not fount !',404);
    return product
}

// Show product categorys
const getProductsCategory = async () => {
    const category = await Category.find();
    return category;
}

const getTotalCountByCategory = async (category) => {
    return await Product.countDocuments({ category });
};

const getTotalCount = async () => {
    return await Product.countDocuments();
};
module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCaregory,
    addNewProduct,
    updateProductById,
    deleteProductById,
    getProductsCategory,
    getTotalCountByCategory,
    getTotalCount,
    getAllHomeProduts,
};