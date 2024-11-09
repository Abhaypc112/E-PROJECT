const mongoose = require('mongoose');

// Schma for cart
const cartSchema = new mongoose.Schema({
    userId: { type:mongoose.Schema.Types.ObjectId, required:true, ref:'User', unique:true },
    products: [{
        productId:{ type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
        quantity:{ type:Number, required:true, default:1},
        totalProductPrice:{ type:Number, required:true}}],
    totalCartPrice: {type:Number, required:true}
});
const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;