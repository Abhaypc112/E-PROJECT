const { updateWishlist, getWishlist, deleteWishlist } = require("../services/wishlistService");
const catchAsync = require("../utils/catchAsync");

// Update wishlist products
const updateWishlistProduct = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const productId = req.params.productId;
    const wishlist = await updateWishlist(userId,productId);
    res.status(200).json({message:'Success',data:wishlist});
});

// Get wishlist products
const getWishlistProduct = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const wishlist = await getWishlist(userId);
    res.status(200).json({message:'Success',data:wishlist});
});

// Delete wishlist products
const deleteWishlistProduct = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const productId = req.params.productId;
    const wishlist = await deleteWishlist(userId,productId);
    res.status(200).json({message:'Success',data:wishlist});
});

module.exports = {
    updateWishlistProduct,
    getWishlistProduct,
    deleteWishlistProduct
};