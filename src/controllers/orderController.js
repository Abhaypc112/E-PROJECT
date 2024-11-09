const { addOrder, getOrders } = require("../services/orderService");

// Add order
const palceOrder = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) throw new Error({message:"Not Authorization !"});
    try{
        const order = await addOrder(userId);
        res.status(201).json({message:'Success',data:order});
    }catch(error){
        console.log('Error update cart : ',error);
        res.status(500).json({ message: 'Orders not added !' });
    }
}

// Get orders
const getUserOrders = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) throw new Error({message:"Not Authorization !"});
    try{
        const order = await getOrders(userId);
        res.status(201).json({message:'Success',data:order});
    }catch(error){
        console.log('Error update cart : ',error);
        res.status(500).json({ message: 'Orders not fetch !' });
    }
}
module.exports = {
    palceOrder,
    getUserOrders
}