const mongoose = require('mongoose');

// Scheema for wishlist
const wishlistScheema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true},
    products: [{
        productId: {type:mongoose.Schema.Types.ObjectId, required:true ,ref:'Product'}
    }]
})
const Wishlist = mongoose.model('Wishlist',wishlistScheema);

module.exports = Wishlist;