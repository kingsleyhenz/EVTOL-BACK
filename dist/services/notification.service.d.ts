declare class NotificationService {
    createNotification(data: {
        title: string;
        body: string;
        status?: string;
    }): Promise<import("../models/notification.model.js").IMessage & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllNotifications(): Promise<(import("../models/notification.model.js").IMessage & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getNotificationById(id: string): Promise<(import("../models/notification.model.js").IMessage & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
    markAsRead(id: string): Promise<(import("../models/notification.model.js").IMessage & {
        _id: import("mongoose").Types.ObjectId;
    }) | null>;
}
declare const _default: NotificationService;
export default _default;
//# sourceMappingURL=notification.service.d.ts.map