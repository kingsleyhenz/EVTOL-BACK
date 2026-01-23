"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_controller_js_1 = __importDefault(require("../controller/request.controller.js"));
const isLoggedIn_js_1 = require("../middleware/isLoggedIn.js");
const requestRoute = express_1.default.Router();
requestRoute.post("/send-request", isLoggedIn_js_1.isLoggedIn, request_controller_js_1.default.makeRequest);
requestRoute.get("/all-requests", isLoggedIn_js_1.isLoggedIn, request_controller_js_1.default.getAllRequests);
requestRoute.get("/get/:requestId", isLoggedIn_js_1.isLoggedIn, request_controller_js_1.default.getRequestById);
requestRoute.get("/my-requests", isLoggedIn_js_1.isLoggedIn, request_controller_js_1.default.getMyRequests);
requestRoute.put("/accept/:requestId", isLoggedIn_js_1.isLoggedIn, request_controller_js_1.default.acceptRequest);
exports.default = requestRoute;
//# sourceMappingURL=request.route.js.map