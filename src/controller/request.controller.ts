import { Request, Response } from 'express';
import { RequestService } from '../services/request.service.ts';
import { UserService } from '../services/user.service.ts';
import { NotificationService } from '../services/notification.service.ts';
import { RequestStatus } from '../typings/enums.ts';
import { ResponseUtil } from '../util/response.util.ts';

class RequestController {
  private requestService = new RequestService();
  private userService = new UserService();
  private notificationService = new NotificationService();

  public makeRequest = async (req: any, res: Response): Promise<Response> => {
    const userId = req.userAuth?._id;
    if (!userId) return ResponseUtil.unauthorized(res);

    try {
      const { parcelWidth, parcelHeight, parcelLength } = req.body;
      const volume = (parcelWidth || 0) * (parcelHeight || 0) * (parcelLength || 0);
      const parcelWeight = volume * 0.01;

      const newRequest = await this.requestService.createRequest({ ...req.body, parcelWeight }, userId);

      const notification = await this.notificationService.createNotification({
        title: 'Request Created',
        body: `Your request has been successfully created.`
      });

      const user = await this.userService.getUserById(userId);
      if (user) {
        user.requests.push(newRequest._id as any);
        user.notification.push(notification._id as any);
        await user.save();
      }

      return ResponseUtil.created(res, newRequest, 'Request created successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getAllRequests = async (req: Request, res: Response): Promise<Response> => {
    try {
      const allRequests = await this.requestService.getAllRequests();
      return ResponseUtil.success(res, allRequests, 'Requests fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getMyRequests = async (req: any, res: Response): Promise<Response> => {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return ResponseUtil.unauthorized(res);

      const user = await this.userService.getUserById(userId);
      if (!user) return ResponseUtil.notFound(res, 'User not found');

      return ResponseUtil.success(res, user.requests, 'My requests fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getRequestById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const request = await this.requestService.getRequestById(req.params.requestId as string);
      if (!request) return ResponseUtil.notFound(res, 'Request not found');
      return ResponseUtil.success(res, request, 'Request fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public acceptRequest = async (req: any, res: Response): Promise<Response> => {
    try {
      const requestId = req.params.requestId as string;
      const updatedRequest = await this.requestService.updateRequestStatus(requestId, RequestStatus.ACCEPTED);

      const notification = await this.notificationService.createNotification({
        title: 'Request Accepted',
        body: `Your request has been accepted.`
      });

      const userId = req.userAuth?._id;
      const user = await this.userService.getUserById(userId);
      if (user) {
        user.notification.push(notification._id as any);
        await user.save();
      }

      return ResponseUtil.success(res, updatedRequest, 'Request accepted successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };
}

export default new RequestController();
