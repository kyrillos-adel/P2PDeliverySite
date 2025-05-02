export interface NotificationDto {
  id?: number;
  message: string;
  userId: number;
  createdAt: Date;
  isRead?: boolean;
}
