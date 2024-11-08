const Cart = require("../models/cartModel");
const { getProductById } = require("./productService");

// Cart product add and update service
const updateCart = async (userId,productId,productQuantity) => {
        const product = await getProductById(productId);
        if(!product) return res.status(400).send("Not found !");
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
            const totalCartPrice = userCart.products.reduce((total,value) => total+value.totalProductPrice,0);
            userCart.totalCartPrice = totalCartPrice;
            return await userCart.save();
        }else{
            const totalProductPrice = product.price * productQuantity;
            const totalCartPrice = totalProductPrice;
            const productDetails = {userId, products:[{productId,quantity:productQuantity,totalProductPrice}],totalCartPrice}
            const cart = new Cart(productDetails);
            return await cart.save();
        }
}

// Get cart products service
const getCartById = async (userId) => {
    const cart = await Cart.findOne({userId})
    .populate({
        path: 'products.productId',
        select: `name description price images`
      });
    return cart;
}

// Delete cart products service
const deleteCart = async (userId,productId) => {
    const cart = await Cart.findOne({userId});
    if(!cart) return res.status(400).send("Cart Not fount !");
    cart.products = cart.products.filter((product) => product.productId.toString() !== productId);
    const totalCartPrice = cart.products.reduce((total,value) => total+value.totalProductPrice,0);
    cart.totalCartPrice = totalCartPrice;
    return await cart.save();
}

module.exports = {
    updateCart,
    getCartById,
    deleteCart
};