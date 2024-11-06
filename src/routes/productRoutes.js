const express = require('express');
const { allProducts, productById } = require('../controllers/productController');
const productRouter = express.Router();

// Routing for products
productRouter.route('/products')
    .get(allProducts)

productRouter.route('/product/:id')
    .get(productById)

module.exports = productRouter;