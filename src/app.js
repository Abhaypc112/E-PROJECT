const express = require('express');
const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishlistRouter = require('./routes/wishlistRouter');
const orderRouter = require('./routes/orderRouter');
const errorHandler = require('./middlewares/errorMiddleware');
const mongooseErrorHandler = require('./middlewares/mongooseErrorHandler');
const adminRouter = require('./routes/adminRouter');
const catchAsync = require('./utils/catchAsync');
const CustomError = require('./utils/customError');
const app = express();
const cors = require('cors');
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
// User side
app.use('/api',productRouter) // Define products route
app.use('/api',usersRouter) // Define users route
app.use('/api',cartRouter) // Define carts route
app.use('/api',wishlistRouter) // Define wishlist route
app.use('/api',orderRouter) // Define order route

// Admin side
app.use('/api',adminRouter) // Define admin route



// Handle undefined routes
app.use('*',catchAsync((req, res, next) => {
    next(new CustomError('Route not found!', 404));
  }));

// Middleware for mongoose error handler
app.use(mongooseErrorHandler)

// Middleware for error handler
app.use(errorHandler);

module.exports = app;