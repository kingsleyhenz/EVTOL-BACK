import express from "express";
import { getMyNotifications, getNotificationById } from "../controller/notification.controller.js";
import { isLoggedIn } from './../middleware/isLoggedIn.js';

const messageRoute = express.Router();

messageRoute.get("/", isLoggedIn, getMyNotifications);
messageRoute.get("/get/:notificationId", isLoggedIn, getNotificationById);

export default messageRoute;