"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
class UserService {
    async registerUser(userData) {
        const user = new user_model_js_1.default(userData);
        return await user.save();
    }
    async findByEmail(email) {
        return await user_model_js_1.default.findOne({ email }).exec();
    }
    async getUserById(id) {
        return await user_model_js_1.default.findById(id).populate('requests notification').exec();
    }
    async updateUser(id, updateData) {
        return await user_model_js_1.default.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async getAllUsers() {
        return await user_model_js_1.default.find().exec();
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map