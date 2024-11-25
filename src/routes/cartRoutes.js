const express = require('express');
const { getProductCart, deleteProductCart, addProductCart, adjustCount } = require("../controllers/cartController");
const userAuth = require("../middlewares/userAuth");
const cartRouter = express.Router();


// Routing for cart
cartRouter.route('/users/cart/:productId')
    .post(userAuth,addProductCart)
    .delete(userAuth,deleteProductCart)
cartRouter.get('/users/cart',userAuth,getProductCart)
cartRouter.patch('/users/cart/:productId/:adjust',userAuth,adjustCount)
 
module.exports = cartRouter;