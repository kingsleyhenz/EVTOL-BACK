import mongoose, { Document } from "mongoose";
import { RequestStatus } from "../typings/enums.js";
export interface IRequest extends Document {
    user: mongoose.Types.ObjectId;
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    parcelCountry?: string;
    parcelState?: string;
    parcelCity?: string;
    parcelAddress?: string;
    parcelWidth?: number;
    parcelHeight?: number;
    parcelLength?: number;
    parcelWeight?: number;
    recipientCountry?: string;
    recipientState?: string;
    recipientCity?: string;
    recipientAddress?: string;
    item: string;
    description: string;
    requestedDate?: Date;
    requestStatus: RequestStatus;
    deliveredDate?: Date;
    deliveryDevice?: mongoose.Types.ObjectId;
}
declare const Request: mongoose.Model<IRequest, {}, {}, {}, any>;
export default Request;
//# sourceMappingURL=request.model.d.ts.map