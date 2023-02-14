import { TokenFromHeader } from "../util/tokenFromHeader.js";
import { verifyToken } from "../util/verifyToken.js";


export const isLoggedIn = (req, res, next) => {
    try {
        const token = TokenFromHeader(req);
        const userCode = verifyToken(token);
        req.userAuth = userCode.id;
        next();
    } catch (error) {
        return res.status(401).json
        ({ 
            message: "Unauthorized" }); 
    }
}
