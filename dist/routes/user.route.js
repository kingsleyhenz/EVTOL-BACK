"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_js_1 = __importDefault(require("../controller/user.controller.js"));
const isLoggedIn_js_1 = require("../middleware/isLoggedIn.js");
const userRoute = express_1.default.Router();
userRoute.post('/create-account', user_controller_js_1.default.register);
userRoute.post('/login', user_controller_js_1.default.login);
userRoute.get('/my-profile', isLoggedIn_js_1.isLoggedIn, user_controller_js_1.default.getProfile);
exports.default = userRoute;
//# sourceMappingURL=user.route.js.map