const mongoose = require('mongoose');
const config = require('./config');

// MongoDB connection
async function connectDB(){
    try{
        const connect = await mongoose.connect(config.MONGO_URI);
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB;