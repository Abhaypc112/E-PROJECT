const Address = require("../models/addressModel");
const CustomError = require("../utils/customError");

// Add address
const addAddress  = async (userId,addressDetails) => {
    const userAddress = await Address.findOne({userId});
    if(!userAddress){
        const newAddress = new Address({userId,addressDetails});
        return await newAddress.save();
    }
    const {fullName,phone,address,pincode} = addressDetails;
    userAddress.addressDetails = {fullName,phone,address,pincode};
    return await userAddress.save();
};

// Get All address
const getAllAddress = async (userId) => {
    const address =  await Address.findOne({userId});
    if(!address) throw new CustomError('Address not fount !',404)
    return address
};

// Get address by Id
const getAddressById = async (userId) => {
    const address = await Address.findOne({userId});
    if(!address) throw new CustomError({message:'Address not found !'})
    return address;
};

// Update address
const updateAddress = async (userId,addressId,updatedDetsils) => {
    const currentAddress = await Address.findOne({userId});
    if(!currentAddress) throw new CustomError({message:'Address not found !'})
    const currentIndex = currentAddress.addressList.findIndex(item => item._id.toString() === addressId)
    const {fullName,phone,address,pincode} = updatedDetsils;
    if(currentIndex !== -1){
        currentAddress.addressList[currentIndex] = {fullName,phone,address,pincode};
    }
    return await currentAddress.save();
};

// Delete address
const deleteAddress = async (userId,addressId) => {
    const currentAddress = await Address.findOne({userId});
    if(!currentAddress) throw new Error({message:'Address not found !'});
    const currentIndex = currentAddress.addressList.findIndex(item => item._id.toString() === addressId)
    if(currentIndex !== -1){
        currentAddress.addressList.splice(currentIndex,1)
    }
    return await currentAddress.save();
};
module.exports = {
    addAddress,
    getAllAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
};