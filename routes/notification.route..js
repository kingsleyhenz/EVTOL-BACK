import express from "express";
import { getMyNotifications } from "../controller/notification.controller.js";
import { isLoggedIn } from './../middleware/isLoggedIn.js';

const messageRoute = express.Router();

messageRoute.get("/", isLoggedIn, getMyNotifications)

export default messageRoute;