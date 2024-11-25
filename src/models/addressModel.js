const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, required:true},
    addressDetails:{
        fullName: {type:String, required:true},
        phone: {type:Number, required:true},
        address: {type:String, required:true},
        pincode: {type:Number, required:true}
    },
})
const Address = mongoose.model('Address',addressSchema);

module.exports = Address;