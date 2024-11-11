const express = require('express');
const userAuth = require('../middlewares/userAuth');
const { palceOrder, getUserOrders } = require('../controllers/orderController');
const { addUserAddress, getUserAllAddress, getUserAddressById, updateUserAddress, deleteUserAddress } = require('../controllers/addressController');
const orderRouter = express.Router();

orderRouter.route('/users/:id/order')
    .post(userAuth,palceOrder)
    .get(userAuth,getUserOrders)
orderRouter.route('/users/:id/address')
    .post(userAuth,addUserAddress)
    .get(userAuth,getUserAllAddress)
orderRouter.route('/users/:id/address/:defaultAd')
    .get(userAuth,getUserAddressById)
    .patch(userAuth,updateUserAddress)
    .delete(userAuth,deleteUserAddress)
module.exports = orderRouter;