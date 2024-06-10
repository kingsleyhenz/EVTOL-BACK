import express from "express";
import { createAccount, loginAccount } from './../controller/user.controller.js';


const userRoute = express.Router();

userRoute.post('/create-account', createAccount);

userRoute.post('/login', loginAccount);

export default userRoute;