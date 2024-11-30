const express = require('express');
const { allProducts, productById, categorys, getHomeProducts } = require('../controllers/productController');
const productRouter = express.Router();

// Routing for products
productRouter.get('/products',allProducts);
productRouter.get('/products/categorys',categorys);
productRouter.get('/products/:category', allProducts);
productRouter.get('/product/:id', productById);
productRouter.get('/product/home',getHomeProducts);


module.exports = productRouter;