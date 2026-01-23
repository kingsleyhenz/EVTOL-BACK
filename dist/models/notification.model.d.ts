import mongoose, { Document } from "mongoose";
export interface IMessage extends Document {
    title: string;
    body: string;
    status: "Read" | "Unread";
}
declare const Message: mongoose.Model<IMessage, {}, {}, {}, any>;
export default Message;
//# sourceMappingURL=notification.model.d.ts.map