import { Response } from 'express';
import NotificationService from '../services/notification.service.ts';
import UserService from '../services/user.service.ts';

class NotificationController {
  public async getMyNotifications(req: any, res: Response): Promise<Response> {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const user = await UserService.getUserById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user.notification);
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }
  }

  public async getNotificationById(req: any, res: Response): Promise<Response> {
    try {
      const userId = req.userAuth?._id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const notificationId = req.params.notificationId as string;
      const notification = await NotificationService.getNotificationById(notificationId);
      
      if (!notification) return res.status(404).json({ error: "Notification not found" });

      await NotificationService.markAsRead(notificationId);
      return res.status(200).json(notification);
    } catch (error: any) {
      return res.status(500).json({ error: "Failed to fetch notification" });
    }
  }
}

export default new NotificationController();
