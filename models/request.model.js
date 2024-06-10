import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email: {
    type: String,
    required: true,
  },
  location: [{
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    }
  }],
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
    ref: "Reg"
  },
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
