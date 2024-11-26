const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { getToatalOrders, totalSales, totalProductsSaleds } = require('../controllers/orderController');
const { getTotalusers, updateUserStatus } = require('../controllers/userController');
const { allProducts, addProduts, deleteProduct } = require('../controllers/productController');
const { updateProduct } = require('../controllers/productController');
const productValidation = require('../validators/productValidation');
const adminRouter = express.Router();

// Routing for admin
adminRouter.get('/admin/total-orders',adminAuth,getToatalOrders);
adminRouter.get('/admin/total-users',adminAuth,getTotalusers);
adminRouter.get('/admin/products',adminAuth,allProducts);
adminRouter.patch('/admin/:userId/:status',adminAuth,updateUserStatus);
adminRouter.post('/admin/product',adminAuth,productValidation,addProduts);
adminRouter.route('/admin/:productId')
    .patch(adminAuth,updateProduct)
    .delete(adminAuth,deleteProduct)
adminRouter.get('/admin/total-sales',adminAuth,totalSales)
adminRouter.get('/admin/total-products-sales',adminAuth,totalProductsSaleds)

module.exports = adminRouter;