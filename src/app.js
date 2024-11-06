const express = require('express');
const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const app = express();
app.use(express.urlencoded({extended:true}));

app.use(productRouter) // Define products route
app.use(usersRouter) // Define users route

module.exports = app;