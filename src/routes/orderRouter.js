const express = require('express');
const userAuth = require('../middlewares/userAuth');
const { palceOrder, getUserOrders } = require('../controllers/orderController');
const { addUserAddress, getUserAllAddress, getUserAddressById, updateUserAddress, deleteUserAddress } = require('../controllers/addressController');
const userAddsVali = require('../validators/addressValidator');
const orderRouter = express.Router();

orderRouter.post('/users/:id/order/:addressId',userAuth,palceOrder)
orderRouter.route('/users/:id/order')
    .get(userAuth,getUserOrders)
orderRouter.route('/users/:id/address')
    .post(userAuth,userAddsVali,addUserAddress)
    .get(userAuth,getUserAllAddress)
orderRouter.route('/users/:id/address/:defaultAd')
    .get(userAuth,getUserAddressById)
    .patch(userAuth,updateUserAddress)
    .delete(userAuth,deleteUserAddress)
module.exports = orderRouter;