const { addOrder, getOrders, getAllOrders, getTotalSales, getTotalProductsSales } = require("../services/orderService");
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

// Total Sales
const totalSales = catchAsync(async(req,res) => {
    const sales = await getTotalSales()
    res.status(201).json({message:'Success',data:sales});
})

// Total products saleds
const totalProductsSaleds = catchAsync(async(req,res) => {
    const sales = await getTotalProductsSales()
    res.status(201).json({message:'Success',data:sales});
})
module.exports = {
    palceOrder,
    getUserOrders,
    getToatalOrders,
    totalSales,
    totalProductsSaleds,
};