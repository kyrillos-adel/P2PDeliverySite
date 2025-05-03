export interface PaginatedDeliveryRequestDto{
    currentPage: number,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    profileImageUrl: string,
    drImageUrl: string,
    data: DeliveryRequestDto[]
}
export interface DeliveryRequestDto {
    id: number;
    title: string;
    description: string;
    totalWeight: number;
    pickUpLocation: string;
    dropOffLocation: string;
    pickUpDate: Date; 
    minPrice: number;
    maxPrice: number;
    userId: number;
    userName: string;
    status: string;
    profileImageUrl: string;
    drImageUrl: string;
}