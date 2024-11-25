const express = require('express');
const userAuth = require('../middlewares/userAuth');
const { palceOrder, getUserOrders } = require('../controllers/orderController');
const { addUserAddress, getUserAllAddress, getUserAddressById, updateUserAddress, deleteUserAddress } = require('../controllers/addressController');
const userAddsVali = require('../validators/addressValidator');
const orderRouter = express.Router();


// Routing for orders
orderRouter.post('/users/order',userAuth,palceOrder)
orderRouter.route('/users/order')
    .get(userAuth,getUserOrders)
orderRouter.route('/users/address')
    .post(userAuth,userAddsVali,addUserAddress)
    .get(userAuth,getUserAllAddress)
orderRouter.route('/users/address/:defaultAd')
    .get(userAuth,getUserAddressById) 
    .patch(userAuth,updateUserAddress)
    .delete(userAuth,deleteUserAddress)
module.exports = orderRouter;