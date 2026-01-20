import express from "express";
import NotificationController from "../controller/notification.controller.js";
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const messageRoute = express.Router();

messageRoute.get("/", isLoggedIn, NotificationController.getMyNotifications);
messageRoute.get("/get/:notificationId", isLoggedIn, NotificationController.getNotificationById);

export default messageRoute;
