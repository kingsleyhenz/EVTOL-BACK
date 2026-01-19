import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    title: string;
    body: string;
    status: "Read" | "Unread";
}

const messageSchema = new Schema<IMessage>({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Read", "Unread"],
        default: "Unread"
    }
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
