const express = require('express');
const { addUser, loginUser } = require('../controllers/userController');
const userRegVali = require('../validators/userValidator');
const usersRouter = express.Router();

// // Routing for users
usersRouter.post('/user/signup',userRegVali,addUser);
usersRouter.post('/user/login',loginUser);

module.exports = usersRouter;