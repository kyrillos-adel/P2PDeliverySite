
export interface ChatMessageDto {
  id? : number;
  date : Date;
  message : string;
  senderId? : number;
  senderName? : string;
  receiverId? : number;
  receiverName? : string;
  isReceived? : boolean;
  chatId : number;
}
