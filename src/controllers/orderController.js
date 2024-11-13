const { addOrder, getOrders } = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");

// Add order
const palceOrder = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) throw new Error({message:"Not Authorization !"});
    const paymentMethode = req.body.paymentMethode;
    const defaultAddress = req.params.addressId;
    const order = await addOrder(userId,paymentMethode,defaultAddress);
    res.status(201).json({message:'Success',data:order});
});

// Get orders
const getUserOrders = catchAsync( async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) throw new Error({message:"Not Authorization !"});
    const order = await getOrders(userId);
    res.status(201).json({message:'Success',data:order});
});

module.exports = {
    palceOrder,
    getUserOrders
};