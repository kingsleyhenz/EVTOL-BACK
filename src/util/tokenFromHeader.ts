export const TokenFromHeader = (req: any) => {
    const headerInfo = req.headers.authorization;
    if (!headerInfo || !headerInfo.startsWith("Bearer ")) {
        throw new Error("Invalid token");
    } else {
        const token = headerInfo.split(" ")[1];
        return token;
    }

}
