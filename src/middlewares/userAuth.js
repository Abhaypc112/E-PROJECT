const jwt = require('jsonwebtoken');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const CustomError = require('../utils/customError');
const JWT_SECRET_KEY = config.JWT_SECRET_KEY;

// User authorization
const userAuth = catchAsync( (req,res,next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ message: 'Access denied, token missing!' });
    const verified = jwt.verify(token,JWT_SECRET_KEY);
    if(verified.role === "user" || verified.role === "admin"){
        req.user = verified;
        next();
    }else{ 
        throw new CustomError ('User not authorized !',401 );
    }
});

module.exports = userAuth;