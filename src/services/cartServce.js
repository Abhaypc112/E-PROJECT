const Cart = require("../models/cartModel");
const CustomError = require("../utils/customError");
const { getProductById } = require("./productService");

// Cart product add and update service
const updateCart = async (userId,productId,productQuantity) =>{
        const product = await getProductById(productId);
        if(!product) throw new CustomError("Product not found !",404);
        const userCart = await Cart.findOne({userId});
        if(userCart){
            const existIndex = userCart.products.findIndex((item) => item.productId.toString() === productId); 
            if(existIndex !== -1){
                userCart.products[existIndex].quantity += productQuantity;
                userCart.products[existIndex].totalProductPrice += product.price * userCart.products[existIndex].quantity;
            }else{
                const totalProductPrice = product.price * productQuantity;
                userCart.products.push({productId,quantity:productQuantity,totalProductPrice});
            }
            userCart.totalCartPrice = userCart.products.reduce((total,value) => total+value.totalProductPrice,0);
            return await userCart.save();
        }else{
            const totalProductPrice = product.price * productQuantity;
            const totalCartPrice = totalProductPrice;
            const productDetails = {userId, products:[{productId,quantity:productQuantity,totalProductPrice}],totalCartPrice}
            const cart = new Cart(productDetails);
            return await cart.save();
        }
};

// Get cart products service
const getCartById = async (userId) => {
    const cart = await Cart.findOne({userId})
    .populate({
        path: 'products.productId',
        select: `name description price images`
      });
    return cart;
};

// Delete cart products service
const deleteCart = async (userId,productId) => {
    const cart = await Cart.findOne({userId});
    if(!cart) throw new CustomError("Cart not found !",404);
    cart.products = cart.products.filter((product) => product.productId.toString() !== productId);
    const totalCartPrice = cart.products.reduce((total,value) => total+value.totalProductPrice,0);
    cart.totalCartPrice = totalCartPrice;
    await cart.save();
    return getCartById(userId)
};

// Update cart count service
const updateCount = async (userId,productId,adjust) => {
    const cart = await Cart.findOne({userId});
    if(!cart) throw new CustomError("Cart not found !",404);
    const product = await getProductById(productId);
    if(!product) throw new CustomError("Product not found !",404);
    const existIndex = cart.products.findIndex((item) => item.productId.toString() === productId); 
    if(existIndex === -1) throw new CustomError("Item not found !",404);
    if(adjust === 'increment'){
        cart.products[existIndex].quantity += 1;
        cart.products[existIndex].totalProductPrice += product.price;
    }else if(adjust === 'decrement' && cart.products[existIndex].quantity > 1){
        cart.products[existIndex].quantity -= 1;
        cart.products[existIndex].totalProductPrice -= product.price;
    }
    cart.totalCartPrice = cart.products.reduce((total,value) => total+value.totalProductPrice,0);
    await cart.save()
    return getCartById(userId)
};

module.exports = {
    updateCart,
    getCartById,
    deleteCart,
    updateCount
};