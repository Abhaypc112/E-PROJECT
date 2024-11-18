const express = require('express');
const userAuth = require('../middlewares/userAuth');
const { updateWishlistProduct, getWishlistProduct, deleteWishlistProduct } = require('../controllers/wishlistController');
const wishlistRouter = express.Router();

// Routing for wishlist
wishlistRouter.route('/users/:id/wishlist/:productId')
    .post(userAuth,updateWishlistProduct)
    .delete(userAuth,deleteWishlistProduct)
wishlistRouter.get('/users/:id/wishlist',userAuth,getWishlistProduct)

module.exports = wishlistRouter;