const userRouter = require('express').Router();
const UserController = require('../controllers/user_controller');

userRouter.post('/signup', UserController.signupPostController);
userRouter.post('/signin', UserController.signinPostController);

module.exports = userRouter;