const mongoose = require('mongoose');

// Schema for user
const userSchema = new mongoose.Schema({
    name:{ type:String, required:true },
    username:{ type:String, required:true, unique:true },
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    block:{ type:Boolean, default:false },
    role:{ type:String,enum: ['user', 'subadmin', 'admin'], default:"user" }
});

const User = mongoose.model('User',userSchema);
module.exports = User;