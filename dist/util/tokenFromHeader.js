"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFromHeader = void 0;
const TokenFromHeader = req => {
    const headerInfo = req.headers.authorization;
    if (!headerInfo || !headerInfo.startsWith("Bearer ")) {
        throw new Error("Invalid token");
    }
    else {
        const token = headerInfo.split(" ")[1];
        return token;
    }
};
exports.TokenFromHeader = TokenFromHeader;
//# sourceMappingURL=tokenFromHeader.js.map