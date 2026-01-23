"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    static success(res, data, statusCode = 200) {
        return res.status(statusCode).json({
            status: 'Success',
            data
        });
    }
    static error(res, message, statusCode = 500) {
        return res.status(statusCode).json({
            status: 'Error',
            message
        });
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.util.js.map