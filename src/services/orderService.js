const { default: mongoose } = require("mongoose");
const Address = require("../models/addressModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const { getAddressById } = require("./addressService");
const CustomError = require("../utils/customError");


// Add order service
const addOrder = async (userId,paymentMethode,addressId) => {
    const cart = await Cart.findOne({userId});
    if(!cart.products.length) throw new CustomError('Cart not fount !',404);
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
};

// Get orders
const getOrders = async (userId) => {
    const orders = await Order.aggregate([
        {$match:{userId: new mongoose.Types.ObjectId(userId)}},
        // {
        //     $unwind:'$products'
        // },
        {
            $lookup:{
                from:'products',
                localField:'products.productId',
                foreignField:'_id',
                as:'productDetails'
            }
        },
        {
            $project:{
                deliveryDetails:1,
                products:1,
                productDetails:1,
                paymentMethode:1,
                totalAmount:1,
                status:1,
                date:1
            }
        }
    ])
    return orders
};

//Get all orders
const getAllOrders = async () => {
    const allOrders = await Order.find();
    if(!allOrders.length) throw new CustomError('Cart not fount !',404);
    return allOrders;
}

module.exports = {
    addOrder,
    getOrders,
    getAllOrders,
};