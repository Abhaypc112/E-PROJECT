const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true},
    deliveryDetails: {type:Object, required:true},
    products: {type:Array, required:true},
    paymentMethode: {type:String, required:true},
    totalAmount: {type:Number, required:true},
    status: {type:String, required:true},
    date: {type:Date, required:true, default:Date.now()}
})
const Order = mongoose.model('Order',orderSchema);

module.exports = Order;