"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        // Placeholder for actual Joi/Zod validation
        // For now it just passes through
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate.js.map