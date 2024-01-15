import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  requestedDate: {
    type: Date,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  requestStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Canceled', 'In Transit', 'Delivered'],
    default: 'Pending',
  },
  deliveredDate: {
    type: Date,
  },
  deliveryDevice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DevieReg',
    required: true,
  },
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
