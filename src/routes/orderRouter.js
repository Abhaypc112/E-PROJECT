const express = require('express');
const userAuth = require('../middlewares/userAuth');
const { palceOrder, getUserOrders } = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.route('/users/:id/order')
    .post(userAuth,palceOrder)
    .get(userAuth,getUserOrders)

module.exports = orderRouter;