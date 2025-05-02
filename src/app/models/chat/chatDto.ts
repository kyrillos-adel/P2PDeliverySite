import {ChatMessageDto} from './chatMessageDto';

export interface ChatDto {
  id : number;
  deliveryRequestId : number;
  userAId : number;
  userBId : number;
  chattingWith : string;
  messages : Array<ChatMessageDto>;
  lastMessage : ChatMessageDto | null;
  lastMessageTime : Date | null;
  unreadMessagesCount : number;
}
