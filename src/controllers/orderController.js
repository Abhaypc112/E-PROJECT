const { addOrder, getOrders, getAllOrders } = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");

// Add order
const palceOrder = catchAsync( async (req,res) => {
    const {userId} = req.user;
    const paymentMethode = req.body.paymentMethode;
    const defaultAddress = req.params.addressId;
    const order = await addOrder(userId,paymentMethode,defaultAddress);
    res.status(201).json({message:'Success',data:order});
});

// Get orders
const getUserOrders = catchAsync( async (req,res) => {
    const {userId} = req.user;
    const order = await getOrders(userId);
    res.status(201).json({message:'Success',data:order});
});

// Get total orders
const getToatalOrders = catchAsync(async (req,res) => {
    const totalOrders = await getAllOrders();
    res.status(201).json({message:'Success',data:totalOrders});
});


module.exports = {
    palceOrder,
    getUserOrders,
    getToatalOrders,
};