import { jwt } from "jsonwebtoken";

export const verifyToke = token =>{
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return false;
        }else{
            return decoded;
        }
    })

}