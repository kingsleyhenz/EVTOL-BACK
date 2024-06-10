import express from "express";
import { createAccount, getProfile, loginAccount } from './../controller/user.controller.js';
import { isLoggedIn } from './../middleware/isLoggedIn.js';


const userRoute = express.Router();

userRoute.post('/create-account', createAccount);

userRoute.post('/login', loginAccount);

userRoute.get('/my-profile', isLoggedIn, getProfile);

export default userRoute;