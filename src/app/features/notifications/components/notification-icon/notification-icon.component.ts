import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notification-icon',
    imports: [
        NgIf
    ],
  templateUrl: './notification-icon.component.html',
  styleUrl: './notification-icon.component.css'
})
export class NotificationIconComponent {

  totalUnreadNotifications: number = 0;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe(notifications => {
      this.totalUnreadNotifications = notifications.reduce((acc, notification) => {
        return acc + (notification.isRead ? 0 : 1);
      }, 0);
    });
  }

  toggleNotificationsPanel() {
    this.notificationService.toggleNotificationPanel();
  }
}
