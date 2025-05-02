import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatDto} from '../../../../models/chat/chatDto';
import {ChatMessageDto} from '../../../../models/chat/chatMessageDto';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChatService} from '../../services/chat.service';
import {SignalRService} from '../../services/signal-r.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-chat-window',
  imports: [
    NgClass,
    DatePipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  userToken : any = localStorage.getItem('token') || sessionStorage.getItem('token');

  currentUserId!: number;

  activeChat: ChatDto | null = null;
  messages: ChatMessageDto[] = [];
  isWindowVisible = false;
  isMinimized = false;
  messageInput = new FormControl('', Validators.required);

  constructor(
    private chatService: ChatService,
    private signalRService: SignalRService,
  ) { }

  ngOnInit(): void {
    if (this.userToken) {
      const decodedToken: any = jwtDecode(this.userToken);
      this.currentUserId = parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    }

    this.chatService.activeChat$.subscribe(chat => {
      this.activeChat = chat;
      if (chat) {
        this.messages = chat.messages || [];
        this.scrollToBottom();
      }
    });

    this.chatService.chatWindowVisible$.subscribe(isVisible => {
      this.isWindowVisible = isVisible;
      if (isVisible) {
        this.isMinimized = false;
      }
    });

    // Listen for new messages from SignalR
    this.signalRService.newMessage$.subscribe(message => {
      if (this.activeChat && message.chatId === this.activeChat.id) {
        // this.messages.push(message);
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  sendMessage(): void {
    if (this.messageInput.invalid || !this.activeChat) return;

    const content = this.messageInput.value?.trim();
    if (!content) return;

    // Optimistic UI update
    const tempMessage: ChatMessageDto = {
      chatId: this.activeChat.id,
      message: content,
      senderId: this.currentUserId,
      date: new Date()
    };

    this.messages.push(tempMessage);
    this.scrollToBottom();
    this.messageInput.reset();

    this.signalRService.sendMessage(tempMessage, '1');
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
  }

  minimizeWindow(event: Event): void {
    event.stopPropagation();
    this.isMinimized = true;
  }

  closeWindow(event: Event): void {
    event.stopPropagation();
    this.chatService.closeChat();
  }
}
