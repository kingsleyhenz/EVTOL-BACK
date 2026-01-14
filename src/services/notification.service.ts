import Messages from '../models/notification.model.js';

class NotificationService {
  async createNotification(data: { title: string; body: string; status?: string }) {
    return await Messages.create({ ...data, status: data.status || 'Unread' });
  }

  async getAllNotifications() {
    return await Messages.find();
  }

  async getNotificationById(id: string) {
    return await Messages.findById(id);
  }

  async markAsRead(id: string) {
    return await Messages.findByIdAndUpdate(id, { status: 'Read' }, { new: true });
  }
}

export default new NotificationService();
