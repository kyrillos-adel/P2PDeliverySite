import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import {Subject} from 'rxjs';
import {ChatMessageDto} from '../../../models/chat/chatMessageDto';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection : HubConnection | undefined;
  private newMessageSubject = new Subject<ChatMessageDto>();
  public newMessage$ = this.newMessageSubject.asObservable();

  constructor() { }

  public startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.chatHubUrl}`, {
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
      this.hubConnection.on('ReceiveMessage', (message: ChatMessageDto) => {
        this.newMessageSubject.next(message);
      });
    } else {
      console.error('Hub connection is not established.');
    }
  }

  public sendMessage(message: ChatMessageDto) {
    if (this.hubConnection) {
      this.hubConnection.invoke('SendMessageToUser', message.receiverId, message.message)
        .catch(err => console.error('Error while sending message: ' + err));
    }
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('SignalR connection stopped'))
        .catch(err => console.error('Error while stopping connection: ' + err));
    }
  }
}
