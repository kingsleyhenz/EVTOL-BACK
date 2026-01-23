import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    fullName: string;
    username?: string;
    password: string;
    email: string;
    phoneNo?: number;
    role?: "User" | "Admin";
    requests: mongoose.Types.ObjectId[];
    notification: mongoose.Types.ObjectId[];
}
declare const User: mongoose.Model<IUser, {}, {}, {}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map