require('dotenv').config({path:'../.env'});

// Config variables
const config = {
    MONGO_URI : process.env.MONGO_URI,
    SERVER_PORT : process.env.SERVER_PORT,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY
};

module.exports = config;