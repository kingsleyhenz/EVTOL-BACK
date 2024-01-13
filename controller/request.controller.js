import Request from "../models/request.model.js";
import userModel from "./../models/user.model.js";
import { requestAccepted, requestDeclineDueToUnavailabilty, requestDeclineDueToWeight, requestDelivered, requestSent } from "./notification.controller.js";
import Devices from './../models/device.model.js';

export const makeRequest = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const {
      recipientName,
      recipientEmail,
      recipientPhone,
      parcelCountry,
      parcelState,
      parcelCity,
      parcelAddress,
      recipientCountry,
      recipientState,
      recipientCity,
      recipientAddress,
      parcelWidth,
      parcelHeight,
      parcelLength,
      item,
      description
    } = req.body;

    const volume = parcelWidth * parcelHeight * parcelLength;
    const newRequest = new Request({
      user: userId,
      recipientName,
      recipientEmail,
      recipientPhone,
      parcelCountry,
      parcelState,
      parcelCity,
      parcelAddress,
      recipientCountry,
      recipientState,
      recipientCity,
      recipientAddress,
      item,
      parcelWidth,
      parcelHeight,
      parcelLength,
      parcelWeight: volume * 0.01,
      requestedDate: new Date(),
      description
    });
    await newRequest.save();
    const notificationId = await requestSent(newRequest._id);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.requests.push(newRequest._id);
    user.notification.push(notificationId);
    await user.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error in makeRequest:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const allRequests = await Request.find();
    res.status(200).json(allRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const userId = req.userAuth._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await userModel.findById(userId).populate('requests');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.requests);
  } catch (error) {
    console.error("Error fetching user requests:", error.message);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

export const getRequestById = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const requestId = req.params.requestId;
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const requestId = req.params.requestId;
    const existingRequest = await Request.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (existingRequest.requestStatus !== "Pending") {
      return res
        .status(400)
        .json({ error: "Request cannot be accepted again" });
    }
    const acceptedRequest = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "Accepted" },
      { new: true }
    );
    const notificationId = await requestAccepted(requestId);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.notification.push(notificationId);
    await user.save();
    res.status(200).json(acceptedRequest);
  } catch (error) {
    console.error("Error accepting request:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const declineRequestDueToWeight = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const requestId = req.params.requestId;
    const declinedRequest = await Request.findById(requestId);
    if (!declinedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (declinedRequest.requestStatus === "Rejected") {
      return res
        .status(400)
        .json({ error: "Request has already been rejected." });
    }
    if (declinedRequest.requestStatus !== "Pending") {
      return res.status(400).json({ error: "Unable to reject request." });
    }
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "Rejected" },
      { new: true }
    );
    const notificationId = await requestDeclineDueToWeight(requestId);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.notification.push(notificationId);
    await user.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error declining request:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const declineRequestDueToUnavailability = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const requestId = req.params.requestId;
    const declinedRequest = await Request.findById(requestId);
    if (!declinedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (declinedRequest.requestStatus === "Rejected") {
      return res
        .status(400)
        .json({ error: "Request has already been rejected." });
    }
    if (declinedRequest.requestStatus !== "Pending") {
      return res.status(400).json({ error: "Unable to reject request." });
    }
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "Rejected" },
      { new: true }
    );
    const notificationId = await requestDeclineDueToUnavailabilty(requestId);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.notification.push(notificationId);
    await user.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error("Error declining request:", error.message);
    res.status(500).json({ error: error.message });
  }
};


export const cancelRequest = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const requestId = req.params.requestId;
    const existingRequest = await Request.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (
      existingRequest.requestStatus === "Delivered" ||
      existingRequest.requestStatus === "Rejected"
    ) {
      return res.status(400).json({ error: "Unable to cancel request." });
    }
    if (existingRequest.requestStatus === "Canceled") {
      return res
        .status(400)
        .json({ error: "Request has already been canceled." });
    }
    const canceledRequest = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "Canceled" },
      { new: true }
    );
    res.status(200).json(canceledRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deployDevice = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { requestId } = req.params;
    const { deliveryDevice } = req.body;
    if (!deliveryDevice) {
      return res.status(400).json({ error: "Delivery device is required" });
    }
    const existingRequest = await Request.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (existingRequest.request !== "Accepted") {
      return res.status(400).json({ error: "Request cannot be deployed" });
    }
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      {
        requestStatus: "In Transit",
        deliveryDevice: deliveryDevice,
      },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deliverRequest = async (req, res) => {
  const userId = req.userAuth._id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const requestId  = req.params.requestId;
    const existingRequest = await Request.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (existingRequest.requestStatus === "Delivered") {
      return res
        .status(400)
        .json({ error: "Request has already been delivered." });
    }
    if (existingRequest.requestStatus !== "In Transit") {
      return res.status(400).json({ error: "Request is not in transit." });
    }
    const { deliveryDevice } = existingRequest;
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { requestStatus: "Delivered", deliveredDate: new Date() },
      { new: true }
    );
    const deliveryDeviceUpdate = await Devices.findOneAndUpdate(
      { serialNo: deliveryDevice },
      { $push: { deliveries: requestId } },
      { new: true }
    );  
    const notificationId = await requestDelivered(requestId);
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.notification.push(notificationId);
    await user.save();

    res.status(200).json({ updatedRequest, deliveryDeviceUpdate });
  } catch (error) {
    console.error("Error delivering request:", error.message);
    res.status(500).json({ error: error.message });
  }
};
