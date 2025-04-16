import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryRequestUpdateDto } from '../../../models/delivery-request/delivery-request-update.dto';
import { ApiResponse } from '../../../models/api-response';
import { DeliveryRequestDetails } from '../../../models/delivery-request/delivery-request-details';

@Injectable({
  providedIn: 'root'
})
export class DeliveryRequestService {
  private endpoint = 'https://localhost:7176/api/deliveryrequest';
  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<DeliveryRequestUpdateDto>(`${this.endpoint}/${id}`);
  }

  update(id: number, data: DeliveryRequestUpdateDto) {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  // Use this function in the delete button in Delivery request card
  delete(id: number){
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  getRequestDetails(id: number) {
    return this.http.get<ApiResponse<DeliveryRequestDetails>>(`${this.endpoint}/details/${id}`);
  }
}
