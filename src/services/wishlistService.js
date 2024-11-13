const Wishlist = require("../models/wishlistModel");
const CustomError = require("../utils/customError");
const { getProductById } = require("./productService")

// Update wishlist service 
const updateWishlist = async (userId,productId) => {
    const product = await getProductById(productId);
    if(!product)throw new CustomError('Product not found !',404); 
    const userWishlist = await Wishlist.findOne({userId});
    if(userWishlist){
        const wishProduct = userWishlist.products.findIndex(item => item.productId.toString() === productId);
        if(wishProduct !== -1){
           userWishlist.products = userWishlist.products.filter(item => item.productId.toString() !== productId);
        }else{
            userWishlist.products.push({productId});
        }
        return await userWishlist.save()
    }else{
        const wishlist = await new Wishlist({userId,products:[{productId}]});
        return await wishlist.save();
    }
};

// Get wishlist service
const getWishlist = async (userId) => {
    const userWishlist = await Wishlist.findOne({userId})
   .populate({
        path: 'products.productId',
        select: `name description price images`
    })
    return userWishlist;
};

// Delete wishlist service
const deleteWishlist = async (userId,productId) =>{
    const userWishlist = await Wishlist.findOne({userId});
    if(!userWishlist)throw new CustomError('Wishlist not found !',404); 
    userWishlist.products = userWishlist.products.filter(item => item.productId.toString() !== productId);
    return await userWishlist.save();
};

module.exports = {
    updateWishlist,
    getWishlist,
    deleteWishlist
};