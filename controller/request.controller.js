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

