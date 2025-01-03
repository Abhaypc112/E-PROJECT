const { addNewUser, authenticateUser, getAllUsers, updateStatus, getUserById } = require("../services/userService");
const catchAsync = require("../utils/catchAsync");

// Add new user
const addUser = catchAsync( async (req,res,next) => {
    const user = await addNewUser(req.body);
    res.status(201).json({status:"Success",data:{name:user.username,password:user.password}});
});

// Login user
const loginUser = catchAsync( async (req,res,next) => {
    const {username,password} = req.body;
    const data = await authenticateUser(username,password);
    res.status(200).json({status:"success",data});
});

// Get all users
const getTotalusers = catchAsync(async(req,res) => {
    const totalUsers = await getAllUsers();
    res.status(200).json({status:"success",data:totalUsers});
});

// Block and Unblock user
const updateUserStatus = catchAsync( async (req,res) => {
    let {userId,status} = req.params;
    if(status === "block"){
        status = true;
    }else if(status === "unblock"){
        status = false;
    };
    const updateUser = await updateStatus(userId,status);
    res.status(200).json({status:"success",data:updateUser});
})

// Get user by id
const getUserDetails = catchAsync( async (req,res,next) => {
    const {userId} = req.user;
    const user = await getUserById(userId);
    const {name,email,} = user;
    res.status(200).json({status:"success",data:{name,email}});
})

module.exports = {
    addUser,
    loginUser,
    getTotalusers,
    updateUserStatus, 
    getUserDetails,
};