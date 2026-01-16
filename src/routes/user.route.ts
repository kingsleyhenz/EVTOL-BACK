import express from "express";
import UserController from '../controller/user.controller.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const userRoute = express.Router();

userRoute.post('/create-account', UserController.register);
userRoute.post('/login', UserController.login);
userRoute.get('/my-profile', isLoggedIn, UserController.getProfile);

export default userRoute;
