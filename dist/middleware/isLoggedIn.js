"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const tokenFromHeader_js_1 = require("../util/tokenFromHeader.js");
const verifyToken_js_1 = require("../util/verifyToken.js");
const isLoggedIn = (req, res, next) => {
    try {
        const token = (0, tokenFromHeader_js_1.TokenFromHeader)(req);
        const userCode = (0, verifyToken_js_1.verifyToken)(token);
        if (!userCode) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        req.userAuth = { _id: userCode.id };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=isLoggedIn.js.map