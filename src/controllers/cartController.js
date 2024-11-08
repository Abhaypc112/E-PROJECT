const { updateCart, getCartById, deleteCart } = require("../services/cartServce");

// Add product to cart
const addProductCart = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const productQuantity = Number(quantity);
    try{
        const cart = await updateCart(userId,productId,productQuantity);
        res.status(201).json({message:'Success',data:cart});
    }catch(error){
        console.log('Error fetching products : ',error);
        res.status(500).json({ message: 'Product not added !' });
    }
};

// Get cart products
const getProductCart = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    try{
        const cart = await getCartById(userId);
        res.status(201).json({message:'Success',data:cart});
    }catch(error){
        console.log('Error fetching products : ',error);
        res.status(500).json({ message: 'Product not find !' });
    }
}

// Delete cart products
const deleteProductCart = async (req,res) => {
    const {userId,role} = req.user;
    const productId = req.params.productId;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    try{
        const cart = await deleteCart(userId,productId);
        res.status(201).json({message:'Success',data:cart});
    }catch(error){
        console.log('Error fetching products : ',error);
        res.status(500).json({ message: 'Product not deleted !' });
    }
}

module.exports = {
    addProductCart,
    getProductCart,
    deleteProductCart
};