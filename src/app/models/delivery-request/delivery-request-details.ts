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
  userName: string;
  status: string;
  applicationDTOs: ApplicationDTO[];
}

export interface ApplicationDTO {
  date: string; 
  offeredPrice: number;
  applicationStatus: string;
  userId: number;
  userName: string;
}