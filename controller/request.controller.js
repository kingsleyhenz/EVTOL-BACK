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

  