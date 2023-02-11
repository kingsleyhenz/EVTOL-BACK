export const TokenFromHeader = req => {
    const headerInfo = req.headers.authorization;
    if (!headerInfo || !headerInfo.startswith("Bearer ")) {
        throw new Error("Invalid token");
    }else{
        const token = headerInfo.split(" ")[1];
        return token;
    }

}