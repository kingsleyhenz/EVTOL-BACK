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
    state:{
        type:String,
        required:true
    },
    isBooked:{
        type:Boolean,
        required:true
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true}
}
)

const evReg = mongoose.model('Reg',RegSchema);

export default evReg;