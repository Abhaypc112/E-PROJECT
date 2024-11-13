const { addNewUser, authenticateUser } = require("../services/userService");
const catchAsync = require("../utils/catchAsync");

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

module.exports = {
    addUser,
    loginUser,
};