import mongoose, { Document } from 'mongoose';
import { DeviceState } from '../typings/enums.js';
export interface IDevice extends Document {
    serialNo: string;
    model: string;
    weight: number;
    battery: number;
    state: DeviceState;
    isBooked?: mongoose.Types.ObjectId;
    deliveries: mongoose.Types.ObjectId[];
}
declare const Device: mongoose.Model<IDevice, {}, {}, {}, any>;
export default Device;
//# sourceMappingURL=device.model.d.ts.map