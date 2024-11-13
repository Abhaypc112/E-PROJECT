const config = require("../config/config");

// Add global error handler
const errorHandler = (err, req, res, next) => {
    console.error("Error stack:", err.stack);
    const statusCode = err.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || 'Internal Server Error';
    if(config.NODE_ENV === "development"){
      res.status(statusCode).json({
        message: message,
        stack:err.stack
      });
    }else if(config.NODE_ENV === "deployment"){
      res.status(statusCode).json({
        message: message
      });
     }
  };
  
module.exports = errorHandler;