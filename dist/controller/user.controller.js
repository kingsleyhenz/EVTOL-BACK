"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_js_1 = __importDefault(require("../services/user.service.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_js_1 = require("../util/generateToken.js");
class UserController {
    async register(req, res) {
        try {
            const data = req.body;
            const existingUser = await user_service_js_1.default.findByEmail(data.email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
            await user_service_js_1.default.registerUser({
                ...data,
                password: hashedPassword
            });
            return res.status(201).json({ message: "Account Registered Successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await user_service_js_1.default.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: "User not registered" });
            }
            const isValid = await bcrypt_1.default.compare(password, user.password);
            if (!isValid) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
            const token = (0, generateToken_js_1.generateToken)(user);
            return res.status(200).json({
                status: "Success",
                token,
                role: user.role,
            });
        }
        catch (error) {
            return res.status(500).json({ status: "Error", message: "Failed to login" });
        }
    }
    async getProfile(req, res) {
        try {
            const userId = req.userAuth?._id;
            if (!userId)
                return res.status(401).json({ error: "Unauthorized" });
            const user = await user_service_js_1.default.getUserById(userId);
            if (!user)
                return res.status(400).json({ message: "User Not Found" });
            return res.json({ status: "Success", data: user });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map