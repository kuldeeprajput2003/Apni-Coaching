const userRouter = require('express').Router();
const UserController = require('../controllers/user_controller');

userRouter.post('/signup', UserController.signupPostController);
userRouter.post('/signin', UserController.signinPostController);
userRouter.get('/verify/:_id', UserController.verifyGetController);

module.exports = userRouter;