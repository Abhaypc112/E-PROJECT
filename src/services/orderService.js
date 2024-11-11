const Address = require("../models/addressModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");


// Add order service
const addOrder = async (userId) => {
    const cart = await Cart.findOne({userId});
    if(!cart.products.length) throw new Error({message:'Cart not fount !'});
    const deliveryDetails = await Address.findOne({userId});
    const products = cart.products;
    const paymentMethode = 'COD'
    const totalAmount = cart.totalCartPrice;
    const status = 'placed';
    const order = new Order({userId,deliveryDetails,products,paymentMethode,totalAmount,status})
    return await order.save();
}

// Get orders
const getOrders = async (userId) => {
    const orders = await Order.find({userId})
    .populate({
        path: 'products.productId',
        model:'Product',
        select: `name description price images`
    });
    return orders
}

module.exports = {
    addOrder,
    getOrders
}