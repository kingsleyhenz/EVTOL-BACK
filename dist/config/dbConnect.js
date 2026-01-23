"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL environment variable is not defined");
        }
        await mongoose_1.default.connect(mongoUrl);
        console.log("Database Connection Successful");
    }
    catch (e) {
        console.log(e.message);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=dbConnect.js.map