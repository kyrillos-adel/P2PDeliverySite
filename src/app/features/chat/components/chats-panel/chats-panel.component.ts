import {Component, OnInit} from '@angular/core';
import {ChatDto} from '../../../../models/chat/chatDto';
import {ChatService} from '../../services/chat.service';
import {DatePipe, NgForOf, NgIf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-chats-panel',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    SlicePipe
  ],
  templateUrl: './chats-panel.component.html',
  styleUrl: './chats-panel.component.css'
})
export class ChatsPanelComponent implements OnInit {

  chats!: ChatDto[];
  isPanelOpen: boolean = false;

  constructor(private chatService: ChatService) {
    this.chatService.chatsPanelVisible$.subscribe(visible => {
      this.isPanelOpen = visible;
      if (visible) {
        this.loadChats();
      }
    });
  }

  ngOnInit(): void {
    this.chatService.chats$.subscribe(chats => {
      this.chats = chats;
    });
  }

  private loadChats() {
    this.chatService.loadChats();
  }

  openChat(chat: ChatDto) {
    this.chatService.openChat(chat);
  }

  closePanel() {
    this.chatService.toggleChatsPanel();
  }
}
