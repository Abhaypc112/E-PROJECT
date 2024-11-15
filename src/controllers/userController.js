const User = require("../models/userModel");
const { addNewUser, authenticateUser, getAllUsers } = require("../services/userService");
const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

// Add new user
const addUser = catchAsync( async (req,res,next) => {
    const user = await addNewUser(req.body);
    res.status(201).json({status:"Success",data:user});
});

// Login user
const loginUser = catchAsync( async (req,res,next) => {
    const {username,password} = req.body;
        const token = await authenticateUser(username,password);
        res.status(200).json({status:"success",token});
});

// Get all users
const getTotalusers = catchAsync(async(req,res) => {
    const totalUsers = await getAllUsers();
    res.status(200).json({status:"success",data:totalUsers});
});

module.exports = {
    addUser,
    loginUser,
    getTotalusers,
};