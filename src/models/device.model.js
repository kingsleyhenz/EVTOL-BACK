    import mongoose from 'mongoose';

    const DeviceSchema = new mongoose.Schema({
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

    const Devices = mongoose.model('Devices', DeviceSchema);

    export default Devices;