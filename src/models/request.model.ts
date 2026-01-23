import mongoose, { Schema, Document } from "mongoose";
import { RequestStatus } from "../typings/enums.ts";

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

const requestSchema = new Schema<IRequest>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  recipientPhone: {
    type: String,
    required: true,
  },
  parcelCountry: String,
  parcelState: String,
  parcelCity: String,
  parcelAddress: String,
  parcelWidth: Number,
  parcelHeight: Number,
  parcelLength: Number,
  parcelWeight: Number,
  recipientCountry: String,
  recipientState: String,
  recipientCity: String,
  recipientAddress: String,
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  requestedDate: {
    type: Date,
    default: Date.now
  },
  requestStatus: {
    type: String,
    enum: Object.values(RequestStatus),
    default: RequestStatus.PENDING,
  },
  deliveredDate: Date,
  deliveryDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
  }
});

const Request = mongoose.model<IRequest>("Request", requestSchema);

export default Request;
