const express = require('express');
const { allProducts, productById } = require('../controllers/productController');
const productRouter = express.Router();

// Routing for products
productRouter.get('/products', allProducts);
productRouter.get('/product/:id', productById);


module.exports = productRouter;