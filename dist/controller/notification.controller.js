"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_service_js_1 = __importDefault(require("../services/notification.service.js"));
const user_service_js_1 = __importDefault(require("../services/user.service.js"));
class NotificationController {
    async getMyNotifications(req, res) {
        try {
            const userId = req.userAuth?._id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            const user = await user_service_js_1.default.getUserById(userId);
            if (!user)
                return res.status(404).json({ error: "User not found" });
            return res.status(200).json(user.notification);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to fetch notifications" });
        }
    }
    async getNotificationById(req, res) {
        try {
            const userId = req.userAuth?._id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            const notificationId = req.params.notificationId;
            const notification = await notification_service_js_1.default.getNotificationById(notificationId);
            if (!notification)
                return res.status(404).json({ error: "Notification not found" });
            await notification_service_js_1.default.markAsRead(notificationId);
            return res.status(200).json(notification);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to fetch notification" });
        }
    }
}
exports.default = new NotificationController();
//# sourceMappingURL=notification.controller.js.map