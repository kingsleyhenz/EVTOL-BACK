"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const device_controller_js_1 = __importDefault(require("../controller/device.controller.js"));
const cloudconfig_js_1 = __importDefault(require("../config/cloudconfig.js"));
const multer_1 = __importDefault(require("multer"));
const evRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: cloudconfig_js_1.default });
evRouter.post('/Register', device_controller_js_1.default.registerDevice);
evRouter.get('/all', device_controller_js_1.default.getAllDevices);
evRouter.get('/available', device_controller_js_1.default.getAvailableDevices);
exports.default = evRouter;
//# sourceMappingURL=device.route.js.map