"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_model_js_1 = __importDefault(require("../models/notification.model.js"));
class NotificationService {
    async createNotification(data) {
        return await notification_model_js_1.default.create({ ...data, status: data.status || 'Unread' });
    }
    async getAllNotifications() {
        return await notification_model_js_1.default.find();
    }
    async getNotificationById(id) {
        return await notification_model_js_1.default.findById(id);
    }
    async markAsRead(id) {
        return await notification_model_js_1.default.findByIdAndUpdate(id, { status: 'Read' }, { new: true });
    }
}
exports.default = new NotificationService();
//# sourceMappingURL=notification.service.js.map