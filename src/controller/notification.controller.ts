import { Response } from 'express';
import { NotificationService } from '../services/notification.service.ts';
import { UserService } from '../services/user.service.ts';
import { ResponseUtil } from '../util/response.util.ts';

class NotificationController {
  private notificationService = new NotificationService();
  private userService = new UserService();

  public getMyNotifications = async (req: any, res: Response): Promise<Response> => {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return ResponseUtil.unauthorized(res);

      const user = await this.userService.getUserById(userId);
      if (!user) return ResponseUtil.notFound(res, 'User not found');

      return ResponseUtil.success(res, user.notification, 'Notifications fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };

  public getNotificationById = async (req: any, res: Response): Promise<Response> => {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return ResponseUtil.unauthorized(res);

      const notificationId = req.params.notificationId as string;
      const notification = await this.notificationService.getNotificationById(notificationId);
      if (!notification) return ResponseUtil.notFound(res, 'Notification not found');

      await this.notificationService.markAsRead(notificationId);
      return ResponseUtil.success(res, notification, 'Notification fetched successfully');
    } catch (error: any) {
      return ResponseUtil.error(res, error.message);
    }
  };
}

export default new NotificationController();
