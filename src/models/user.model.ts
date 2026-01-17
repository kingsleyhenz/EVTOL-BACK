import mongoose, { Schema, Document } from "mongoose";

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

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
    },
    role: { 
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request"
        }
    ],
    notification: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
