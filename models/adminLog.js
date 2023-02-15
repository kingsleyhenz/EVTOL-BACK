import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminUsername:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})

export default mongoose.model("Admin",adminSchema)