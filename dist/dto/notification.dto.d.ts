export interface CreateNotificationDto {
    title: string;
    body: string;
    status?: "Read" | "Unread";
}
export interface NotificationResponseDto {
    id: string;
    title: string;
    body: string;
    status: string;
    createdAt?: string;
}
//# sourceMappingURL=notification.dto.d.ts.map