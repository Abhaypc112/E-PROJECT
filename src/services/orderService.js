const Address = require("../models/addressModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const { getAddressById } = require("./addressService");


// Add order service
const addOrder = async (userId,paymentMethode,addressId) => {
    const cart = await Cart.findOne({userId});
    if(!cart.products.length) throw new Error({message:'Cart not fount !'});
    const products = cart.products;
    const totalAmount = cart.totalCartPrice;
    const deliveryDetails = await getAddressById(userId,addressId);
    const order = new Order({userId,deliveryDetails,products,paymentMethode,totalAmount})
    const placedOrder =  await order.save();
    if(placedOrder){
        cart.products = [];
        await cart.save();
    }
    return placedOrder;
}

// Get orders
const getOrders = async (userId) => {
    const orders = await Order.find({userId})
    .populate({
        path: 'products.productId',
        model:'Product',
        select: `name description price images`
    })
    return orders
}

module.exports = {
    addOrder,
    getOrders
}