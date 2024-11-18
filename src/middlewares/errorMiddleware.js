const config = require("../config/config");

// Add global error handler
const errorHandler = (err, req, res, next) => {
    console.error("Error stack:", err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    if(config.NODE_ENV === "development"){
      res.status(statusCode).json({
        message: message,
        stack:err.stack,
        name:err.name,
        error:err
      });
    }else if(config.NODE_ENV === "deployment"){
      res.status(statusCode).json({
        message: message
      });
     }
  };
  
module.exports = errorHandler;