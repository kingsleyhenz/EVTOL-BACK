import { Request, Response } from 'express';
import RequestService from '../services/request.service.js';
import UserService from '../services/user.service.js';
import NotificationService from '../services/notification.service.js';

class RequestController {
  async makeRequest(req: any, res: Response) {
    const userId = req.userAuth?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { parcelWidth, parcelHeight, parcelLength } = req.body;
      const volume = parcelWidth * parcelHeight * parcelLength;
      const parcelWeight = volume * 0.01;

      const newRequest = await RequestService.createRequest({
        ...req.body,
        parcelWeight
      }, userId);

      // Simple implementation of notification call
      const notification = await NotificationService.createNotification({
        title: "Request Created",
        body: `Your request with ID ${newRequest._id} has been successfully created.`
      });

      const user = await UserService.getUserById(userId);
      if (user) {
        user.requests.push(newRequest._id);
        user.notification.push(notification._id);
        await user.save();
      }

      return res.status(201).json(newRequest);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAllRequests(req: Request, res: Response) {
    try {
      const allRequests = await RequestService.getAllRequests();
      return res.status(200).json(allRequests);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMyRequests(req: any, res: Response) {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const user = await UserService.getUserById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      
      return res.status(200).json(user.requests);
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
  }

  async getRequestById(req: Request, res: Response) {
    try {
      const request = await RequestService.getRequestById(req.params.requestId);
      if (!request) return res.status(404).json({ error: "Request not found" });
      return res.status(200).json(request);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async acceptRequest(req: any, res: Response) {
    try {
      const requestId = req.params.requestId;
      const updatedRequest = await RequestService.updateRequestStatus(requestId, "Accepted");
      
      const notification = await NotificationService.createNotification({
        title: "Request Accepted",
        body: `Your request with ID ${requestId} has been accepted.`
      });

      const userId = req.userAuth?._id;
      const user = await UserService.getUserById(userId);
      if (user) {
        user.notification.push(notification._id);
        await user.save();
      }

      return res.status(200).json(updatedRequest);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new RequestController();
