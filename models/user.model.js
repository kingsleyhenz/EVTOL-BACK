import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username:{
        type:String,    
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
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