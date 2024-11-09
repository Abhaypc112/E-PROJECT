const Wishlist = require("../models/wishlistModel");
const { getProductById } = require("./productService")

// Update wishlist service 
const updateWishlist = async (userId,productId) => {
    const product = await getProductById(productId);
    if(!product)throw new Error({message:'Product not found !'}); 
    const userWishlist = await Wishlist.findOne({userId});
    if(userWishlist){
        const wishProduct = userWishlist.products.findIndex(item => item.productId.toString() === productId);
        console.log(wishProduct);
        
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
}

// Get wishlist service
const getWishlist = async (userId) => {
    const userWishlist = await Wishlist.findOne({userId})
   .populate({
        path: 'products.productId',
        select: `name description price images`
    })
    return userWishlist;
}

// Delete wishlist service
const deleteWishlist = async (userId,productId) =>{
    const userWishlist = await Wishlist.findOne({userId});
    if(!userWishlist)throw new Error({message:'Wishlist not found !'}); 
    userWishlist.products = userWishlist.products.filter(item => item.productId.toString() !== productId);
    return await userWishlist.save();
}

module.exports = {
    updateWishlist,
    getWishlist,
    deleteWishlist
}