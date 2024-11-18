const express = require('express');
const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishlistRouter = require('./routes/wishlistRouter');
const orderRouter = require('./routes/orderRouter');
const errorHandler = require('./middlewares/errorMiddleware');
const mongooseErrorHandler = require('./middlewares/mongooseErrorHandler');
const adminRouter = require('./routes/adminRouter');
const app = express();
app.use(express.urlencoded({extended:true}));

// User side
app.use('/api',productRouter) // Define products route
app.use('/api',usersRouter) // Define users route
app.use('/api',cartRouter) // Define carts route
app.use('/api',wishlistRouter) // Define wishlist route
app.use('/api',orderRouter) // Define order route

//Admin side
app.use('/api',adminRouter) // Define admin route

//Middleware for mongoose error handler
app.use(mongooseErrorHandler)

//Middleware for error handler
app.use(errorHandler);

module.exports = app;