const express = require('express');
const { getProductCart, deleteProductCart, addProductCart, adjustCount } = require("../controllers/cartController");
const userAuth = require("../middlewares/userAuth");
const cartRouter = express.Router();


// Routing for cart
cartRouter.route('/users/:id/cart/:productId')
    .post(userAuth,addProductCart)
    .delete(userAuth,deleteProductCart)
cartRouter.get('/users/:id/cart',userAuth,getProductCart)
cartRouter.patch('/users/:id/cart/:productId/:adjust',userAuth,adjustCount)

module.exports = cartRouter;