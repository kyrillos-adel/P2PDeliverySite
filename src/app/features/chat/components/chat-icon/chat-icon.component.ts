import { Component } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-icon',
  imports: [
    NgIf
  ],
  templateUrl: './chat-icon.component.html',
  styleUrl: './chat-icon.component.css'
})
export class ChatIconComponent {

  totalUnreadMessages: number = 0;

  constructor(private chatService: ChatService) {
    this.chatService.chats$.subscribe(chats => {
      this.totalUnreadMessages = chats.reduce((acc, chat) => {
        return acc + chat.unreadMessagesCount;
      }, 0);
    });
  }

  toggleChatsPanel() {
    this.chatService.toggleChatWindow();
  }
}
