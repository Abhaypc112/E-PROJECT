const CustomError = require("../utils/customError");

//MongooseErrorHandler
const mongooseErrorHandler = (err,req,res,next) => {
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message).join(', ');
    return next(new CustomError(message, 400)); 
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const message = `Duplicate field value: ${JSON.stringify(err.keyValue)}. Please use another value!`;
        return next(new CustomError(message, 400));
      }
    if(err.name === 'CastError'){
        const message = `Invalid ${err.path}: ${err.value}`;
        return next(new CustomError(message,400)) 
    }
    next(err);
}

module.exports = mongooseErrorHandler;