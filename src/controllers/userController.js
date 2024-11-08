const { addNewUser, getUserInfo } = require("../services/userService");
const bcrypt = require('bcrypt');
const generateToken = require("../utils/jsonwebtoken");
;

// Add new user
const addUser = async (req,res) => {
    const {name,username,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try{
        const user = await addNewUser({name,username,email,password:hashPassword});
        if(!user) return res.status(400).send("User not create !");
        res.status(201).json({status:"Success",data:user});
    }catch(error){
        console.log('Error add user : ',error);
        res.status(500).json({ message: 'Server error while adding user !' });
    }
}

// Get user
const getUser = async (req,res) => {
    const {username,password} = req.body;
    try{
        const user = await getUserInfo(username);
        if(!user) return res.status(400).send("User not found !");
        const customer = await bcrypt.compare(password,user.password);
        if(!customer) return res.status(400).send("Invalid password !");
        const token = await generateToken(user.id);
        res.json({token});
    }catch(error){
        console.log('Error fetch user : ',error);
        res.status(500).json({ message: 'Server error while fetching user !' });
    }
}

module.exports = {
    addUser,
    getUser,
}