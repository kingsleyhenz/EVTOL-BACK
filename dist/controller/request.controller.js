"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_service_js_1 = __importDefault(require("../services/request.service.js"));
const user_service_js_1 = __importDefault(require("../services/user.service.js"));
const notification_service_js_1 = __importDefault(require("../services/notification.service.js"));
const enums_js_1 = require("../typings/enums.js");
class RequestController {
    async makeRequest(req, res) {
        const userId = req.userAuth?._id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        try {
            const { parcelWidth, parcelHeight, parcelLength } = req.body;
            const volume = (parcelWidth || 0) * (parcelHeight || 0) * (parcelLength || 0);
            const parcelWeight = volume * 0.01;
            const newRequest = await request_service_js_1.default.createRequest({
                ...req.body,
                parcelWeight
            }, userId);
            const notification = await notification_service_js_1.default.createNotification({
                title: "Request Created",
                body: `Your request with ID ${newRequest._id} has been successfully created.`
            });
            const user = await user_service_js_1.default.getUserById(userId);
            if (user) {
                user.requests.push(newRequest._id);
                user.notification.push(notification._id);
                await user.save();
            }
            return res.status(201).json(newRequest);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getAllRequests(req, res) {
        try {
            const allRequests = await request_service_js_1.default.getAllRequests();
            return res.status(200).json(allRequests);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async getMyRequests(req, res) {
        try {
            const userId = req.userAuth?._id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            const user = await user_service_js_1.default.getUserById(userId);
            if (!user)
                return res.status(404).json({ error: "User not found" });
            return res.status(200).json(user.requests);
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to fetch requests" });
        }
    }
    async getRequestById(req, res) {
        try {
            const request = await request_service_js_1.default.getRequestById(req.params.requestId);
            if (!request)
                return res.status(404).json({ error: "Request not found" });
            return res.status(200).json(request);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async acceptRequest(req, res) {
        try {
            const requestId = req.params.requestId;
            const updatedRequest = await request_service_js_1.default.updateRequestStatus(requestId, enums_js_1.RequestStatus.ACCEPTED);
            const notification = await notification_service_js_1.default.createNotification({
                title: "Request Accepted",
                body: `Your request with ID ${requestId} has been accepted.`
            });
            const userId = req.userAuth?._id;
            const user = await user_service_js_1.default.getUserById(userId);
            if (user) {
                user.notification.push(notification._id);
                await user.save();
            }
            return res.status(200).json(updatedRequest);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.default = new RequestController();
//# sourceMappingURL=request.controller.js.map