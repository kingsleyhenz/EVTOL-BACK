"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_model_js_1 = __importDefault(require("../models/request.model.js"));
const enums_js_1 = require("../typings/enums.js");
class RequestService {
    async createRequest(data, userId) {
        const request = new request_model_js_1.default({ ...data, user: userId });
        return await request.save();
    }
    async getAllRequests() {
        return await request_model_js_1.default.find().populate('user deliveryDevice').exec();
    }
    async getRequestById(id) {
        return await request_model_js_1.default.findById(id).populate('user deliveryDevice').exec();
    }
    async updateRequestStatus(id, status) {
        return await request_model_js_1.default.findByIdAndUpdate(id, { requestStatus: status }, { new: true }).exec();
    }
    async getUserRequests(userId) {
        return await request_model_js_1.default.find({ user: userId }).exec();
    }
    async assignDevice(requestId, deviceId) {
        return await request_model_js_1.default.findByIdAndUpdate(requestId, {
            deliveryDevice: deviceId,
            requestStatus: enums_js_1.RequestStatus.ACCEPTED
        }, { new: true }).exec();
    }
}
exports.default = new RequestService();
//# sourceMappingURL=request.service.js.map