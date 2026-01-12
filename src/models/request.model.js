import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipientName:{
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
  parcelCountry: {
    type: String,
  },
  parcelState: {
    type: String,
  },
  parcelCity: {
    type: String,
  },
  parcelAddress: {
    type: String,
  },
  parcelWidth: {
    type: Number,
  },
  parcelHeight: {
    type: Number,
  },
  parcelLength: {
    type: Number,
  },
  parcelWeight: {
    type: Number
  },
  recipientCountry: {
    type: String,
  },
  recipientState: {
    type: String,
  },
  recipientCity: {
    type: String,
  },
  recipientaddress: {
    type: String,
  },
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
  },
  requestStatus: {
    type: String,
    enum: [
      "Pending",
      "Accepted",
      "Rejected",
      "Canceled",
      "In Transit",
      "Delivered",
    ],
    default: "Pending",
  },
  deliveredDate: {
    type: Date,
  },
  deliveryDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Devices",
  }
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
