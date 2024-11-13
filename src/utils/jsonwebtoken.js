const jwt = require('jsonwebtoken');
const config = require("../config/config");
const JWT_SECRET_KEY = config.JWT_SECRET_KEY;

//Generate token for user
const generateToken = (userId,role) => {
    return jwt.sign({userId,role},JWT_SECRET_KEY,{ expiresIn: '1h' });
}

module.exports = generateToken;