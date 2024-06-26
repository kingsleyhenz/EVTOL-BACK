import Request from "../models/request.model.js";

export const makeRequest = async (req, res) => {
    try {
      const {
        email,
        address,
        phone,
        item,
        requestedDate,
        expectedDeliveryDate,
      } = req.body;
      const newRequest = new Request({
        email,
        address,
        phone,
        item,
        requestedDate,
        expectedDeliveryDate,
      });
      await newRequest.save();
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getAllRequests = async(req, res) => {
    try {
      const allRequests = await Request.find();
      res.status(200).json(allRequests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const acceptRequest = async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const existingRequest = await Request.findById(requestId);
      if (!existingRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      if (existingRequest.requestStatus !== 'Pending') {
        return res.status(400).json({ error: 'Request cannot be accepted again' });
      }
      const acceptedRequest = await Request.findByIdAndUpdate(
        requestId,
        { requestStatus: 'Accepted' },
        { new: true }
      );
      res.status(200).json(acceptedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const declineRequest = async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const declinedRequest = await Request.findById(requestId);
      if (!declinedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      if (declinedRequest.requestStatus === 'Rejected') {
        return res.status(400).json({ error: 'Request has already been rejected.' });
      }
      if (declinedRequest.requestStatus !== 'Pending') {
        return res.status(400).json({ error: 'Unable to reject request.' });
      }
      const updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        { requestStatus: 'Rejected' },
        { new: true }
      );
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const cancelRequest = async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const existingRequest = await Request.findById(requestId);
      if (!existingRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      if (existingRequest.requestStatus === 'Delivered' || existingRequest.requestStatus === 'Rejected') {
        return res.status(400).json({ error: 'Unable to cancel request.' });
      }
      if (existingRequest.requestStatus === 'Canceled') {
        return res.status(400).json({ error: 'Request has already been canceled.' });
      }
      const canceledRequest = await Request.findByIdAndUpdate(
        requestId,
        { requestStatus: 'Canceled' },
        { new: true }
      );
      res.status(200).json(canceledRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deployDevice = async (req,res)=>{
    try {
      const { requestId } = req.params;
      const { deliveryDevice } = req.body;
      if (!deliveryDevice) {
        return res.status(400).json({ error: 'Delivery device is required' });
      }
      const existingRequest = await Request.findById(requestId);
      if (!existingRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      if (existingRequest.request !== 'Accepted') {
        return res.status(400).json({ error: 'Request cannot be deployed' });
      }
      const updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        {
          requestStatus: 'In Transit',
          deliveryDevice: deliveryDevice,
        },
        { new: true }
      );
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  export const deliverRequest = async (req, res) => {
    try {
      const { requestId } = req.params;
      const existingRequest = await Request.findById(requestId);
      if (!existingRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
      if (existingRequest.requestStatus === 'Delivered') {
        return res.status(400).json({ error: 'Request has already been delivered.' });
      }
      if (existingRequest.requestStatus !== 'In Transit') {
        return res.status(400).json({ error: 'Request is not in transit.' });
      }
      const { deliveryDevice } = existingRequest;
      const updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        { requestStatus: 'Delivered', deliveredDate: new Date() },
        { new: true }
      );
      const deliveryDeviceUpdate = await DeviceReg.findOneAndUpdate(
        { serialNo: deliveryDevice },
        { $push: { deliveries: requestId } },
        { new: true }
      );
      res.status(200).json({ updatedRequest, deliveryDeviceUpdate });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

