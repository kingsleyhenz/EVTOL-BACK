    import mongoose from 'mongoose';

    const RegSchema = new mongoose.Schema({
        serialNo:{
            type:String,
            required:true
        },
        model:{
            type:String,
            required:true
        },
        weight:{
            type:Number,
            required:true
        },
        battery:{
            type:Number,
            required:true
        },
        state: {
            type: String,
            enum: ["IDLE", "LOADING","LOADED", "DELIVERING", "DELIVERED", "RETURNING"],
            default: "IDLE",
        },
        isBooked:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Request"  
        },
        deliveries: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Request"
            }
        ]
    },
    {
        timestamps:true,
        toJSON:{virtuals:true}
    }
    )

    const DevieReg = mongoose.model('Reg',RegSchema);

    export default DevieReg;