const jwt = require('jsonwebtoken');
const config = require('../config/config');
const JWT_SECRET_KEY = config.JWT_SECRET_KEY;

// User authorization
const userAuth = (req,res,next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ message: 'Access denied, token missing!' });
    try{
        const verified = jwt.verify(token,JWT_SECRET_KEY);
        req.user = verified;
        next();
    }catch(error){
        res.status(401).json({ message: 'Invalid token !' });
    }
}

module.exports = userAuth;