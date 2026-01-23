"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_service_js_1 = __importDefault(require("../services/device.service.js"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const response_util_js_1 = require("../util/response.util.js");
class DeviceController {
    async registerDevice(req, res) {
        const data = req.body;
        try {
            const evtol = await device_service_js_1.default.createDevice(data);
            return response_util_js_1.ResponseUtil.success(res, evtol, 201);
        }
        catch (error) {
            return response_util_js_1.ResponseUtil.error(res, error.message, 400);
        }
    }
    async getAllDevices(req, res) {
        try {
            const devices = await device_service_js_1.default.getAllDevices();
            return res.status(200).json({
                status: "Success",
                data: devices,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    async getAvailableDevices(req, res) {
        try {
            const devices = await device_service_js_1.default.findAvailableDevices();
            return res.status(200).json({
                status: "Success",
                data: devices,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
    async sendConfirmationEmail(name, email) {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER || "ayehenz29@gmail.com",
                    pass: process.env.EMAIL_PASS || "xfkpqulivwwhwisc",
                },
            });
            const mailOptions = {
                from: process.env.EMAIL_USER || "ayehenz29@gmail.com",
                to: email,
                subject: "Drone On Its Way!",
                text: `Thank you for using our services ,\n\nThe ${name} You Requested For Is On Its Way.`,
            };
            await transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.log("Email error:", error.message);
        }
    }
}
exports.default = new DeviceController();
//# sourceMappingURL=device.controller.js.map