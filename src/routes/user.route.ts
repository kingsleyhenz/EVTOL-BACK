import express from 'express';
import UserController from '../controller/user.controller.ts';
import { isLoggedIn } from '../middleware/isLoggedIn.ts';
import { validateDto } from '../middleware/validate.ts';
import { CreateUserDto, LoginDto } from '../dto/user.dto.ts';

const userRoute = express.Router();

userRoute.post('/create-account', validateDto(CreateUserDto), UserController.register);
userRoute.post('/login', validateDto(LoginDto), UserController.login);
userRoute.get('/my-profile', isLoggedIn, UserController.getProfile);

export default userRoute;
