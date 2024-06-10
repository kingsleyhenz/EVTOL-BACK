import { TokenFromHeader } from "../util/tokenFromHeader.js";
import { verifyToken } from "../util/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
    try {
        const token = TokenFromHeader(req);
        const userCode = verifyToken(token);
        req.userAuth = userCode.id;
        // console.log(req.userAuth);
        next();
    } catch (error) {
        // console.log(error);
        return res.status(401).json
        ({ 
            message: "Unauthorized" }); 
    }
}
