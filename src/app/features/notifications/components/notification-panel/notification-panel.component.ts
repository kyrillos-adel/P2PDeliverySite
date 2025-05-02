import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit {
  isPanelOpen = false;
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notificationPanelVisible$.subscribe(visible => {
      this.isPanelOpen = visible;
      if (visible) {
        this.loadNotifications();
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to real-time notifications
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  private loadNotifications() {
    this.notificationService.loadNotifications();
  }

  closePanel() {
    this.notificationService.toggleNotificationPanel();
    this.markAsRead();
  }

  markAsRead() {
    let notificationsIds: number[] = [];

    this.notifications.forEach(notification => {
      if (!notification.isRead) {
        notificationsIds.push(notification.id);
      }
    });
    if (notificationsIds.length === 0)
      return;

    this.notificationService.markAsRead(notificationsIds);
  }
}
