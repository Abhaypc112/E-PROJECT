const { default: mongoose } = require("mongoose");
const Address = require("../models/addressModel")

// Add address
const addAddress  = async (userId,addressDetails) => {
    const address = await Address.findOne({userId});
    if(!address){
        const newAddress = new Address({userId,addressList:[{addressDetails}]});
        return await newAddress.save();
    }
    address.addressList.push(addressDetails);
    return await address.save();
}

// Get All address
const getAllAddress = async (userId) => {
    return await Address.findOne({userId});
}

// Get address by Id
const getAddressById = async (userId,defaultAd) => {
    const address = await Address.findOne({userId});
    if(!address) throw new Error({message:'Address not found !'})
    const currentAddress = address.addressList.filter(item => item._id.toString() === defaultAd)
    return currentAddress[0];
}

// Update address
const updateAddress = async (userId,addressId,updatedDetsils) => {
    const currentAddress = await Address.findOne({userId});
    if(!currentAddress) throw new Error({message:'Address not found !'})
    const currentIndex = currentAddress.addressList.findIndex(item => item._id.toString() === addressId)
    const {fullName,phone,address,pincode} = updatedDetsils;
    if(currentIndex !== -1){
        currentAddress.addressList[currentIndex] = {fullName,phone,address,pincode};
    }
    return await currentAddress.save();
}

// Delete address
const deleteAddress = async (userId,addressId) => {
    const currentAddress = await Address.findOne({userId});
    if(!currentAddress) throw new Error({message:'Address not found !'});
    const currentIndex = currentAddress.addressList.findIndex(item => item._id.toString() === addressId)
    if(currentIndex !== -1){
        currentAddress.addressList.splice(currentIndex,1)
    }
    return await currentAddress.save();
}
module.exports = {
    addAddress,
    getAllAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
}