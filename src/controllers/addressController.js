const { addAddress, getAllAddress, getAddressById, updateAddress, deleteAddress } = require("../services/addressService");
const catchAsync = require("../utils/catchAsync");

// Add address
const addUserAddress = async (req,res) => {
    const {userId} = req.user;
    const addressDetails = req.body;
    const address = await addAddress(userId,addressDetails);
    res.status(201).json({message:'Success',data:address});
};

// Get all address
const getUserAllAddress = catchAsync( async (req,res,next) => {
    const {userId} = req.user;
    const address = await getAllAddress(userId);
    res.status(201).json({message:'Success',data:address});
});

// Get default address
const getUserAddressById = catchAsync( async (req,res) => {
    const {userId} = req.user;
    const defaultAd = req.params.defaultAd
        const address = await getAddressById(userId,defaultAd);
        res.status(201).json({message:'Success',data:address});
});

// Update address
const updateUserAddress = catchAsync( async (req,res) => {
    const {userId} = req.user;
    const defaultAd = req.params.defaultAd;
    const addressDetails = req.body;
        const address = await updateAddress(userId,defaultAd,addressDetails);
        res.status(201).json({message:'Success',data:address});
        console.log('Error address  : ',error);
        res.status(500).json({ message: 'Address not added !' });
});

// Delete address
const deleteUserAddress = catchAsync( async (req,res) => {
    const {userId} = req.user;
    const defaultAd = req.params.defaultAd;
        const address = await deleteAddress(userId,defaultAd);
        res.status(201).json({message:'Success',data:address});
});


module.exports = {
    addUserAddress,
    getUserAllAddress,
    getUserAddressById,
    updateUserAddress,
    deleteUserAddress,
};