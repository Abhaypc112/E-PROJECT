const User = require("../models/userModel")

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
}