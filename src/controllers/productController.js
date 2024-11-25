const { getAllProducts,getProductById, getProductsByCaregory, addNewProduct, updateProductById, deleteProductById, getProductsCategory } = require('../services/productService');
const catchAsync = require('../utils/catchAsync');

// Controller for fetching all products
const allProducts = catchAsync( async (req,res)=>{
    const {category} = req.query;
    let products;
    if(category) products = await getProductsByCaregory(category);
    else products = await getAllProducts();
    res.status(200).json({status:"Success",data:products});
});

// Controller for fetching product by id
const productById = catchAsync( async (req,res)=>{
    const product = await getProductById(req.params.id);
    res.status(200).json({status:"Success",data:product}); 
    });
    
    // Add products
const addProduts = catchAsync( async (req,res) => {
    const productDetails = req.body;
    const product = await addNewProduct(productDetails);
    res.status(200).json({status:"Success",data:product}); 
});

const updateProduct = catchAsync( async (req,res) => {
    const productDetails = req.body;
    const productId = req.params.productId;
    const product = await updateProductById(productId,productDetails);
    res.status(200).json({status:"Success",data:product}); 
});

const deleteProduct = catchAsync( async (req,res) => {
    const productId = req.params.productId;
    const product = await deleteProductById(productId);
    res.status(200).json({status:"Success",data:product}); 
})

// Products categorys
const categorys = catchAsync( async (req,res) => {
    const category = await getProductsCategory();
    res.status(200).json({status:"Success",data:category}); 
})
module.exports = {
    allProducts,
    productById,
    addProduts,
    updateProduct,
    deleteProduct,
    categorys,
}