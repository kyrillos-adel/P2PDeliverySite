export interface DRApplicationDto {
    id : number;
    deliveryRequestId : number;
    deliveryTitle : string;
    date: Date;
    applicationStatus: string;
    offeredPrice: number;
}