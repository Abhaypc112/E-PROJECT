const express = require('express');
const { addUser, loginUser, getUserDetails } = require('../controllers/userController');
const userRegVali = require('../validators/userValidator');
const userAuth = require('../middlewares/userAuth');
const usersRouter = express.Router();

// // Routing for users
usersRouter.post('/user/signup',userRegVali,addUser);
usersRouter.post('/user/login',loginUser);
usersRouter.get('/user',userAuth,getUserDetails);

module.exports = usersRouter;