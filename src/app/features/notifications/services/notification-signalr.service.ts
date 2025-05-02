import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { NotificationDto } from '../../../models/notifacation/notificationDto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationSignalrService {

  private hubConnection : HubConnection | undefined;
  private newNotificationSubject = new Subject<NotificationDto>();
  public newNotification$ = this.newNotificationSubject.asObservable();

  constructor() { }

  public startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.notificationHubUrl}`, {
        accessTokenFactory: () =>
          localStorage.getItem('token') || sessionStorage.getItem('token') || ''
      })
      .withAutomaticReconnect()
      .build();

      this.hubConnection
        .start()
        .then(() => console.log('SignalR connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));

      this.registerSignalREvents();
  }

  public registerSignalREvents() {
    if (this.hubConnection) {
      this.hubConnection.on('ReceiveNotification', (notification: NotificationDto) => {
        this.newNotificationSubject.next(notification);
      });
    } else {
      console.error('Hub connection is not established.');
    }
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('SignalR connection stopped'))
        .catch(err => console.log('Error while stopping connection: ' + err));
    }
  }
}
