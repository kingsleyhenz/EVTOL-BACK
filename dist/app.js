"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_js_1 = require("./config/dbConnect.js");
const device_route_js_1 = __importDefault(require("./routes/device.route.js"));
const request_route_js_1 = __importDefault(require("./routes/request.route.js"));
const user_route_js_1 = __importDefault(require("./routes/user.route.js"));
const notification_route_js_1 = __importDefault(require("./routes/notification.route.js"));
const errorHandler_js_1 = require("./middleware/errorHandler.js");
dotenv_1.default.config();
(0, dbConnect_js_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
}));
app.options('*', (0, cors_1.default)());
// Routes
app.use("/api/v1/evtol/admin", device_route_js_1.default);
app.use("/api/v1/request", request_route_js_1.default);
app.use("/api/v1/user", user_route_js_1.default);
app.use("/api/v1/notification", notification_route_js_1.default);
// Error Handling
app.use(errorHandler_js_1.notFound);
app.use(errorHandler_js_1.errorHandler);
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
}
exports.default = app;
//# sourceMappingURL=app.js.map