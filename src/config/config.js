require('dotenv').config({path:'./.env'});

// Config variables
const config = {
    MONGO_URI : process.env.MONGO_URI,
    SERVER_PORT : process.env.SERVER_PORT,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    NODE_ENV : process.env.NODE_ENV,
    RAZORPAY_KEY_ID : process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET : process.env.RAZORPAY_KEY_SECRET
};

module.exports = config; 