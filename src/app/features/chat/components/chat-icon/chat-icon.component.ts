import { Component, Inject } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-icon',
  templateUrl: './chat-icon.component.html',
  styleUrls: ['./chat-icon.component.css']
})
export class ChatIconComponent {
  totalUnreadMessages: number = 0;

  constructor(@Inject(ChatService) private chatService: ChatService) {
    this.chatService.chats$.subscribe(chats => {
      this.totalUnreadMessages = chats.reduce((acc, chat) => {
        return acc + chat.unreadMessagesCount;
      }, 0);
    });
  }

  toggleChatsPanel() {
    this.chatService.toggleChatsPanel();
  }
}
