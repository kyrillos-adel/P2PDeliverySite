export interface DeliveryRequestDetails {
  id:number;
  title: string;
  description: string;
  totalWeight: number;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string; 
  minPrice: number;
  maxPrice: number;
  userId: number;
  IsOwner: boolean;
  userName: string;
  status: string;
  drImageUrl:string;
  profileImageUrl:string;
  applicationDTOs: ApplicationDTO[];
}

export interface ApplicationDTO {
  id :number;
  date: string; 
  offeredPrice: number;
  applicationStatus: string;
  userId: number;
  userName: string;
  userProfileUrl: string;
}
export interface ApplicationstatusDTO {
  deleveryRequestId: number;
  id: number;
  status: number;
  
}
