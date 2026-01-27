import { Request, Response } from 'express';
import { RequestService } from '../services/request.service.ts';
import { UserService } from '../services/user.service.ts';
import { NotificationService } from '../services/notification.service.ts';
import { RequestStatus } from '../typings/enums.ts';

class RequestController {
  private requestService = new RequestService();
  private userService = new UserService();
  private notificationService = new NotificationService();

  public async makeRequest(req: any, res: Response): Promise<Response> {
    const userId = req.userAuth?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { parcelWidth, parcelHeight, parcelLength } = req.body;
      const volume = (parcelWidth || 0) * (parcelHeight || 0) * (parcelLength || 0);
      const parcelWeight = volume * 0.01;

      const newRequest = await this.requestService.createRequest({
        ...req.body,
        parcelWeight
      }, userId);

      const notification = await this.notificationService.createNotification({
        title: "Request Created",
        body: `Your request with ID ${newRequest._id} has been successfully created.`
      });

      const user = await this.userService.getUserById(userId);
      if (user) {
        user.requests.push(newRequest._id as any);
        user.notification.push(notification._id as any);
        await user.save();
      }

      return res.status(201).json(newRequest);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getAllRequests(req: Request, res: Response): Promise<Response> {
    try {
      const allRequests = await this.requestService.getAllRequests();
      return res.status(200).json(allRequests);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async getMyRequests(req: any, res: Response): Promise<Response> {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      
      const user = await this.userService.getUserById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      
      return res.status(200).json(user.requests);
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
  }

  public async getRequestById(req: Request, res: Response): Promise<Response> {
    try {
      const request = await this.requestService.getRequestById(req.params.requestId as string);
      if (!request) return res.status(404).json({ error: "Request not found" });
      return res.status(200).json(request);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async acceptRequest(req: any, res: Response): Promise<Response> {
    try {
      const requestId = req.params.requestId as string;
      const updatedRequest = await this.requestService.updateRequestStatus(requestId, RequestStatus.ACCEPTED);
      
      const notification = await this.notificationService.createNotification({
        title: "Request Accepted",
        body: `Your request with ID ${requestId} has been accepted.`
      });

      const userId = req.userAuth?._id;
      const user = await this.userService.getUserById(userId);
      if (user) {
        user.notification.push(notification._id as any);
        await user.save();
      }

      return res.status(200).json(updatedRequest);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new RequestController();


