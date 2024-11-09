const { updateWishlist, getWishlist, deleteWishlist } = require("../services/wishlistService");

// Update wishlist products
const updateWishlistProduct = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const productId = req.params.productId;
    try{
        const wishlist = await updateWishlist(userId,productId);
        res.status(200).json({message:'Success',data:wishlist});
    }catch(error){
        console.log('Error update cart : ',error);
        res.status(500).json({ message: 'Product not added !' });
    }
}

// Get wishlist products
const getWishlistProduct = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    try{
        const wishlist = await getWishlist(userId);
        res.status(200).json({message:'Success',data:wishlist});
    }catch(error){
        console.log('Error update cart : ',error);
        res.status(500).json({ message: 'Product not fetched !' });
    }
}

// Delete wishlist products
const deleteWishlistProduct = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const productId = req.params.productId;
    try{
        const wishlist = await deleteWishlist(userId,productId);
        res.status(200).json({message:'Success',data:wishlist});
    }catch(error){
        console.log('Error update cart : ',error);
        res.status(500).json({ message: 'Product not deleted !' });
    }
}

module.exports = {
    updateWishlistProduct,
    getWishlistProduct,
    deleteWishlistProduct
}