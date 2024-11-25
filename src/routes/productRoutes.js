const express = require('express');
const { allProducts, productById, categorys } = require('../controllers/productController');
const productRouter = express.Router();

// Routing for products
productRouter.get('/products',allProducts);
productRouter.get('/products/categorys',categorys);
productRouter.get('/products/:category', allProducts);
productRouter.get('/product/:id', productById);


module.exports = productRouter;