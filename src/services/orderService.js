const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const { getAllAddress } = require("./addressService");
const CustomError = require("../utils/customError");


// Add order service
const addOrder = async (userId,paymentMethode) => {
    const cart = await Cart.findOne({userId});
    if(!cart.products.length) throw new CustomError('Cart not fount !',404);
    const products = cart.products;
    const totalAmount = cart.totalCartPrice;
    const address = await getAllAddress(userId);
    const order = new Order({userId,deliveryDetails:address.addressDetails,products,paymentMethode,totalAmount})
    const placedOrder =  await order.save();
    if(placedOrder){
        cart.products = [];
        await cart.save();
    }
    return placedOrder;
};

// Get orders
const getOrders = async (userId) => {
    const orders = await Order.find({userId})
    .populate({
        path: 'products.productId',
        model:'Product',
        select: `name description price images`
    })
        
    return orders
};

//Get all orders
const getAllOrders = async () => {
    const allOrders = await Order.find()
    .populate({
        path: 'products.productId',
        model:'Product',
        select: `name description price images`
    })
    .populate({
        path: 'userId',
        model:'User',
        select: `name role`
    })
    if(!allOrders.length) throw new CustomError('Orders not fount !',404);
    return allOrders;
}

// Get total sales
const getTotalSales = async () => {
    const sales = await Order.aggregate([
        {$group:{_id:null,totalSales:{$sum:"$totalAmount"}}}
    ])
    if(!sales) throw new CustomError('Totalsales not fount !',404);
    return sales;
}

// Get total products saled
const getTotalProductsSales = async () => {
    const product = await Order.aggregate([
        {$unwind:"$products"},
        {$group:{_id:null,products:{$sum:"$products.quantity"}}}
    ])
    if(!product) throw new CustomError('Count not fount !',404);
    return product
}

// const generateRazorpay = async (orderId,totalAmount) => {
//     try{
//         const options = {
//             amount:totalAmount,
//             currency:"USD",
//             receipt:orderId
//         }
//         const payment = await instance.orders.create(options);
//         console.log(payment);
//         return payment;
//     }catch (error){
//         console.log(error);
        
//     }
// }

module.exports = {
    addOrder,
    getOrders,
    getAllOrders,
    getTotalSales,
    getTotalProductsSales,
    // generateRazorpay,
};