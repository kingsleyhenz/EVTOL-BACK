"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_model_js_1 = __importDefault(require("../models/device.model.js"));
const enums_js_1 = require("../typings/enums.js");
class DeviceService {
    async createDevice(data) {
        const device = new device_model_js_1.default(data);
        return await device.save();
    }
    async getAllDevices() {
        return await device_model_js_1.default.find().exec();
    }
    async getDeviceById(id) {
        return await device_model_js_1.default.findById(id).exec();
    }
    async updateDevice(id, data) {
        return await device_model_js_1.default.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteDevice(id) {
        return await device_model_js_1.default.findByIdAndDelete(id).exec();
    }
    async findAvailableDevices() {
        return await device_model_js_1.default.find({ state: enums_js_1.DeviceState.IDLE, battery: { $gt: 25 } }).exec();
    }
    async checkBattery(id) {
        const device = await device_model_js_1.default.findById(id).exec();
        return device ? device.battery : 0;
    }
}
exports.default = new DeviceService();
//# sourceMappingURL=device.service.js.map