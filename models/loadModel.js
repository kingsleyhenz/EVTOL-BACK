import mongoose from "mongoose";

const LoadSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    carryTo:{
        type:String,
        required:true
    },
    carrier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "evReg"
    }
})

const evload = mongoose.model("Load", LoadSchema);

export default evload;