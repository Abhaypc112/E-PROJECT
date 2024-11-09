const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    deliveryDetails: {
        fullName: {type:String, required:true},
        phone: {type:Number, required:true},
        address: {type:String, required:true},
        pincode: {type:Number, required:true}
    },
    userId: {type:mongoose.Schema.Types.ObjectId, required:true},
    paymentMethode: {type:String, required:true},
    totalAmount: {type:Number, required:true},
    status: {type:String, required:true},
    date: {type:Number, required:true}
})
const Order = mongoose.model('Order',orderSchema);

module.exports = Order;