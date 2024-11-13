const { updateCart, getCartById, deleteCart, updateCount } = require("../services/cartServce");
const catchAsync = require("../utils/catchAsync");

// Add product to cart
const addProductCart = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const productQuantity = Number(quantity);
    const cart = await updateCart(userId,productId,productQuantity);
    res.status(201).json({message:'Success',data:cart});
});

// Get cart products
const getProductCart = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const cart = await getCartById(userId);
    res.status(200).json({message:'Success',data:cart});
});

// Delete cart products
const deleteProductCart = async (req,res) => {
    const {userId,role} = req.user;
    const productId = req.params.productId;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const cart = await deleteCart(userId,productId);
    res.status(200).json({message:'Success',data:cart});
}

// Product count increment and decrement 
const adjustCount = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    const {productId,adjust} = req.params;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const cart = await updateCount(userId,productId,adjust);
    res.status(200).json({message:'Success',data:cart});
});
module.exports = {
    addProductCart,
    getProductCart,
    deleteProductCart,
    adjustCount,
};