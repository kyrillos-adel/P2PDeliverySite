import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NotificationDto} from '../../../models/notifacation/notificationDto';
import {ApiResponse} from '../../../models/api-response';
import {HttpClient} from '@angular/common/http';
import {NotificationSignalrService} from './notification-signalr.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'api/notification';

  private notificationsSubject: BehaviorSubject<NotificationDto[]> = new BehaviorSubject<NotificationDto[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private notificationPanelVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public notificationPanelVisible$ = this.notificationPanelVisibleSubject.asObservable();

  private totalUnreadNotificationsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalUnreadNotifications$ = this.totalUnreadNotificationsSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly notificationSignalrService: NotificationSignalrService
  ) {
    this.notificationSignalrService.newNotification$.subscribe(notification => {
      this.addNotification(notification);
    });
  }

  toggleNotificationPanel() {
    this.notificationPanelVisibleSubject.next(!this.notificationPanelVisibleSubject.value);
  }

  loadNotifications(): Observable<NotificationDto[]> {
    this.http.get<ApiResponse<NotificationDto[]>>(`${this.apiUrl}`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            response.data.forEach(notification => {
              this.addNotification(notification);
            });
          } else {
            console.error(`Error loading notifications: ${response.message}`, response.errorCode);
          }
        },
        error: (error) => {
          console.error('Error loading notifications:', error);
        }
      });

    return this.notifications$;
  }

  addNotification(notification: NotificationDto) {
    const currentNotifications = this.notificationsSubject.value;
    const existingNotificationIndex = currentNotifications.findIndex(n => n.id === notification.id);

    if (!notification.isRead) {
      // Increment the unread count
      this.totalUnreadNotificationsSubject.next(this.totalUnreadNotificationsSubject.value + 1);
    }

    if (existingNotificationIndex === -1) {
      currentNotifications.unshift(notification);
      this.notificationsSubject.next(currentNotifications);
    } else {
      // Update the existing notification
      currentNotifications[existingNotificationIndex] = notification;
      this.notificationsSubject.next(currentNotifications);
    }
  }

  markAsRead(ids : number[]) {
    this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/mark-as-read`, ids)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            const currentNotifications = this.notificationsSubject.value;
            ids.forEach(id => {
              const index = currentNotifications.findIndex(notification => notification.id === id);
              if (index !== -1) {
                currentNotifications[index].isRead = true;
                this.totalUnreadNotificationsSubject.next(this.totalUnreadNotificationsSubject.value - 1);
              }
            });
            this.notificationsSubject.next(currentNotifications);
          } else {
            console.error(`Error marking notifications as read: ${response.message}`, response.errorCode);
          }
        },
        error: (error) => {
          console.error('Error marking notifications as read:', error);
        }
      });
  }
}
