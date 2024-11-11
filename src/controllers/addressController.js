const { addAddress, getAllAddress, getAddressById, updateAddress, deleteAddress } = require("../services/addressService");

// Add address
const addUserAddress = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const addressDetails = req.body;
    try{
        const address = await addAddress(userId,addressDetails);
        res.status(201).json({message:'Success',data:address});
    }catch(error){
        console.log('Error address  : ',error);
        res.status(500).json({ message: 'Address not added !' });
    }
}

// Get all address
const getUserAllAddress = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    try{
        const address = await getAllAddress(userId);
        res.status(201).json({message:'Success',data:address});
    }catch(error){
        console.log('Error address  : ',error);
        res.status(500).json({ message: 'Address not added !' });
    }
}

// Get default address
const getUserAddressById = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const defaultAd = req.params.defaultAd
    try{
        const address = await getAddressById(userId,defaultAd);
        res.status(201).json({message:'Success',data:address});
    }catch(error){
        console.log('Error address  : ',error);
        res.status(500).json({ message: 'Address not added !' });
    }
}

// Update address
const updateUserAddress = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const defaultAd = req.params.defaultAd;
    const addressDetails = req.body;
    try{
        const address = await updateAddress(userId,defaultAd,addressDetails);
        res.status(201).json({message:'Success',data:address});
    }catch(error){
        console.log('Error address  : ',error);
        res.status(500).json({ message: 'Address not added !' });
    }
}

// Delete address
const deleteUserAddress = async (req,res) => {
    const {userId,role} = req.user;
    if(!role === ('user' || 'admin')) return res.status(401).send("Not Authorization !");
    const defaultAd = req.params.defaultAd;
    try{
        const address = await deleteAddress(userId,defaultAd);
        res.status(201).json({message:'Success',data:address});
    }catch(error){
        console.log('Error address  : ',error);
        res.status(500).json({ message: 'Address not deleted !' });
    }
}


module.exports = {
    addUserAddress,
    getUserAllAddress,
    getUserAddressById,
    updateUserAddress,
    deleteUserAddress,
}