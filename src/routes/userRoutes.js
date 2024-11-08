const express = require('express');
const { addUser, getUser } = require('../controllers/userController');
const userRegVali = require('../validators/userValidator');
const usersRouter = express.Router();

usersRouter.post('/user/signup',userRegVali,addUser);
usersRouter.post('/user/login',getUser);

module.exports = usersRouter;