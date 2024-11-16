const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const CustomError = require("../utils/customError");
const generateToken = require("../utils/jsonwebtoken");

//Add user services
const addNewUser = async (data) => {
    const {name,username,email,password,role} = data;
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({name,username,email,password:hashPassword,role});
    const user = await newUser.save();
    if(!user) new CustomError("User not create !",400);
    return user;
};

//login user services
const authenticateUser = async (username,password) => {
    const user = await User.findOne({username});
    if(!user) throw new CustomError("User not found !",404);
    const customer = await bcrypt.compare(password,user.password);
    if(!customer) throw new CustomError("Invalid password !",404);
    if(user.block) throw new CustomError("You are blocked ! - Contact admin",401);
    const token = await generateToken(user.id,user.role);
    return token;
};

//Get all users
const getAllUsers = async () => {
    const allUsers = await User.find();
    if(!allUsers.length) return next(new CustomError("Users not found !",404));
    return allUsers;
};

// Update status
const updateStatus = async (userId,status) => {
    const user = await User.findById(userId);
    user.block = status;
    return await user.save();
}
module.exports = {
    addNewUser,
    authenticateUser,
    getAllUsers,
    updateStatus,
};