import express from "express";
import { createAccount } from './../controller/user.controller.js';


const userRoute = express.Router();

userRoute.post('/create-account', createAccount);

export default userRoute;