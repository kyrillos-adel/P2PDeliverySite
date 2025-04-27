import {ChatMessageDto} from './chatMessageDto';

export interface ChatDto {
  id : number;
  deliveryRequestId : number;
  userAId : number;
  userAName : string;
  userBId : number;
  userBName : string;
  messages : Array<ChatMessageDto>;
  lastMessage : string;
  lastMessageTime : Date;
  unreadMessagesCount : number;
}
