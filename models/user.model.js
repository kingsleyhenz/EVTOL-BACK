import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"]
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
})

const userModel = mongoose.model("User",userSchema);

export default userModel;