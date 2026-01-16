import { Request, Response, NextFunction } from 'express';
import { TokenFromHeader } from "../util/tokenFromHeader.js";
import { verifyToken } from "../util/verifyToken.js";

export const isLoggedIn = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = TokenFromHeader(req);
        const userCode: any = verifyToken(token);
        if (!userCode) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        req.userAuth = { _id: userCode.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
