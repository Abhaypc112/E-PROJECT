const { getAllProducts,getProductById, getProductsByCaregory } = require('../services/productService');
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

module.exports = {
    allProducts,
    productById,
}