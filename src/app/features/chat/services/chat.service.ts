import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ChatDto} from '../../../models/chat/chatDto';
import {HttpClient} from '@angular/common/http';
import {SignalRService} from './signal-r.service';
import {ChatMessageDto} from '../../../models/chat/chatMessageDto';
import {ApiResponse} from '../../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'api/Chat';

  private chatsSubject : BehaviorSubject<ChatDto[]> = new BehaviorSubject<ChatDto[]>([]);
  public chats$ = this.chatsSubject.asObservable();

  private activeChatSubject : BehaviorSubject<ChatDto | null> = new BehaviorSubject<ChatDto | null>(null);
  public activeChat$ = this.activeChatSubject.asObservable();

  private chatsPanelVisibleSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public chatsPanelVisible$ = this.chatsPanelVisibleSubject.asObservable();

  private chatWindowVisibleSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public chatWindowVisible$ = this.chatWindowVisibleSubject.asObservable();

  constructor(
    private readonly signalRService: SignalRService,
    private readonly http : HttpClient
  ) {
    this.signalRService.newMessage$.subscribe(message => {
      this.addMessageToChat(message);
    });
  }

  toggleChatsPanel() {
    this.chatsPanelVisibleSubject.next(!this.chatsPanelVisibleSubject.value);
  }

  openChat(chat : ChatDto){
    this.activeChatSubject.next(chat);
    this.chatWindowVisibleSubject.next(true);
    this.loadChatHistory(chat.id);
  }

  closeChat(){
    this.chatWindowVisibleSubject.next(false);
  }

  toggleChatWindow() {
    this.chatWindowVisibleSubject.next(!this.chatWindowVisibleSubject.value);
  }

  loadChats(): Observable<ChatDto[]> {
    this.http.get<ApiResponse<ChatDto[]>>(`${this.apiUrl}/user`)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            response.data.forEach(chat => {
              chat.unreadMessagesCount = 0;
              chat.lastMessage = chat.messages?.length > 0 ? chat.messages[chat.messages.length - 1] : null;
              chat.lastMessageTime = chat.lastMessage?.date ?? null;
            })
            this.chatsSubject.next(response.data);
          } else {
            console.error(`Error loading chats: ${response.message}`, response.errorCode);
          }
        },
        error: (error) => {
          console.error('Error loading chats:', error);
        }
    });

    return this.chats$;
  }

  loadChatHistory(chatId : number) : Observable<ApiResponse<ChatDto>> {
    return this.http.get<ApiResponse<ChatDto>>(`api/chat/${chatId}`);
  }


  private addMessageToChat(message: ChatMessageDto): void {
    const currentChats = this.chatsSubject.value;
    const chatIndex = currentChats.findIndex(c => c.id === message.chatId);

    if (chatIndex > -1) {
      const updatedChats = [...currentChats];
      updatedChats[chatIndex] = {
        ...updatedChats[chatIndex],
        lastMessage: message,
        lastMessageTime: message.date,
        unreadMessagesCount: this.activeChatSubject.value?.id === message.chatId ? 0 :
          (updatedChats[chatIndex].unreadMessagesCount || 0) + 1
      };

      // Move chat to top of list
      const chatToMove = updatedChats.splice(chatIndex, 1)[0];
      updatedChats.unshift(chatToMove);

      this.chatsSubject.next(updatedChats);

      // Update active chat messages if this chat is currently open
      if (this.activeChatSubject.value?.id === message.chatId) {
        const currentChat = this.activeChatSubject.value;
        this.activeChatSubject.next({
          ...currentChat,
          messages: [...(currentChat.messages || []), message]
        });
      }
    }
  }
}
