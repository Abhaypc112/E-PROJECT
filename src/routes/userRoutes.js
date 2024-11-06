const express = require('express');
const { addUser, getUser } = require('../controllers/userController');
const usersRouter = express.Router();

usersRouter.route('/user/signup')
    .post(addUser)
usersRouter.route('/user/login')
    .post(getUser)

module.exports = usersRouter;