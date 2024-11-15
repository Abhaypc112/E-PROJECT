const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { getToatalOrders } = require('../controllers/orderController');
const { getTotalusers } = require('../controllers/userController');
const adminRouter = express.Router();

adminRouter.get('/admin/totalorders',adminAuth,getToatalOrders);
adminRouter.get('/admin/totalusers',adminAuth,getTotalusers)

module.exports = adminRouter;