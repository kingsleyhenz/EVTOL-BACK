"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_js_1 = __importDefault(require("../controller/notification.controller.js"));
const isLoggedIn_js_1 = require("../middleware/isLoggedIn.js");
const messageRoute = express_1.default.Router();
messageRoute.get("/", isLoggedIn_js_1.isLoggedIn, notification_controller_js_1.default.getMyNotifications);
messageRoute.get("/get/:notificationId", isLoggedIn_js_1.isLoggedIn, notification_controller_js_1.default.getNotificationById);
exports.default = messageRoute;
//# sourceMappingURL=notification.route.js.map