const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { getToatalOrders } = require('../controllers/orderController');
const { getTotalusers, updateUserStatus } = require('../controllers/userController');
const { allProducts } = require('../controllers/productController');
const adminRouter = express.Router();

adminRouter.get('/admin/totalorders',adminAuth,getToatalOrders);
adminRouter.get('/admin/totalusers',adminAuth,getTotalusers);
adminRouter.get('/admin/products',adminAuth,allProducts);
adminRouter.patch('/admin/:userId/:status',adminAuth,updateUserStatus)

module.exports = adminRouter;