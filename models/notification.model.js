import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
        enum: ["Read", "Unread"]
    }
});

const Messages = mongoose.model("Message", messageSchema);

export default Messages;