const express = require('express');
const productRouter = require('./routes/productsRoutes');
const app = express();


app.use(productRouter) // Define products route

module.exports = app;