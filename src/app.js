const express = require('express');
const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishlistRouter = require('./routes/wishlistRouter');
const orderRouter = require('./routes/orderRouter');
const errorHandler = require('./middlewares/errorMiddleware');
const app = express();
app.use(express.urlencoded({extended:true}));

app.use(errorHandler);

// User side
app.use(productRouter) // Define products route
app.use(usersRouter) // Define users route
app.use(cartRouter) // Define carts route
app.use(wishlistRouter) // Define wishlist route
app.use(orderRouter) // Define order route

//Admin side


module.exports = app;