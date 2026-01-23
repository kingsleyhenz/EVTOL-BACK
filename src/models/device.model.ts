import mongoose, { Schema, Document } from 'mongoose';
import { DeviceState } from '../typings/enums.ts';

export interface IDevice extends Document {
    serialNo: string;
    model: string;
    weight: number;
    battery: number;
    state: DeviceState;
    isBooked?: mongoose.Types.ObjectId;
    deliveries: mongoose.Types.ObjectId[];
}

const DeviceSchema = new Schema<IDevice>({
    serialNo: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    battery: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: Object.values(DeviceState),
        default: DeviceState.IDLE,
    },
    isBooked: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request"  
    },
    deliveries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request"
        }
    ]
},
{
    timestamps: true,
    toJSON: { virtuals: true }
});

const Device = mongoose.model<IDevice>('Device', DeviceSchema);

export default Device;
