import express from "express";
import UserController from '../controller/user.controller.ts';
import { isLoggedIn } from '../middleware/isLoggedIn.ts';

const userRoute = express.Router();

userRoute.post('/create-account', UserController.register);
userRoute.post('/login', UserController.login);
userRoute.get('/my-profile', isLoggedIn, UserController.getProfile);

export default userRoute;
