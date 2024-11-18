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

// Add products service
const addNewProduct = async (productDetails) => {
    const {name,description,category,price,stock,rating,material,images,tags} = productDetails;

    const product = await Product({name,description,category,price,stock,rating,material,images:images.split(','),tags:tags.split(',')});
    if(!product) throw new CustomError('Product not added !');
    return await product.save();
}

// Update product service
const updateProductById = async (productId,updatedDetails) => {
    const {name,description,category,price,stock,rating,material,images,tags} = updatedDetails;
    let product = await Product.findById(productId);
    if(!product) throw new CustomError('Product not updated !');
    product.name = name?name:product.name;
    product.description = description?description:product.description;
    product.category = category?category:product.description;
    product.price = price?price:product.price;
    product.stock = stock?stock:product.stock;
    product.rating = rating?rating:product.rating;
    product.material = material?material:product.material;
    product.images = images?images.split(','):product.images;
    product.tags = tags?tags:product.tags;
    return await product.save();
}

// Delete product service
const deleteProductById = async (productId) => {
    const product = await Product.findByIdAndDelete(productId);
    if(!product) throw new CustomError('Product not deleted !');
    return product
}
module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCaregory,
    addNewProduct,
    updateProductById,
    deleteProductById,
};