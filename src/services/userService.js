const User = require("../models/userModel")

//Add and get user services
const addNewUser = async (data) => {
    const newProduct = new User(data);
    return await newProduct.save();
}
const getUserInfo = async (username) => {
    return await User.findOne({username});
}

module.exports = {
    addNewUser,
    getUserInfo,
};