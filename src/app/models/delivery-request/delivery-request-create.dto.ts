export interface DeliveryRequestCreateDto {
    title: string;
    description: string;
    totalWeight: number;
    pickUpLocation: string;
    dropOffLocation: string;
    pickUpDate: Date;
    minPrice: number;
    maxPrice: number;
    DRimage:File|null;
  }