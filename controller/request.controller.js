import Request from "../models/request.model.js";

export const makeRequest = async (req, res) => {
    try {
      const {
        recipientName,
        email,
        address,
        phone,
        item,
        requestedDate,
        expectedDeliveryDate,
        deliveryDevice,
      } = req.body;
  
      const newRequest = new Request({
        recipientName,
        email,
        address,
        phone,
        item,
        requestedDate,
        expectedDeliveryDate,
        deliveryDevice,
      });
      await newRequest.save();
      res.status(201).json(newRequest);
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
      if (declinedRequest.requestStatus !== 'Pending' || declinedRequest.requestStatus !== 'Rejected') {
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
      const { requestId } = req.params;
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
  

