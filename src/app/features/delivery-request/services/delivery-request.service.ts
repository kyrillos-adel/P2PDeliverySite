import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryRequestUpdateDto } from '../../../models/delivery-request/delivery-request-update.dto';
import { ApiResponse } from '../../../models/api-response';
import { DeliveryRequestDetails } from '../../../models/delivery-request/delivery-request-details';
import { DeliveryRequestCreateDto } from '../../../models/delivery-request/delivery-request-create.dto';

@Injectable({
  providedIn: 'root'
})
export class DeliveryRequestService {
  private endpoint = 'api/deliveryrequest';
  constructor(private http: HttpClient) { }
 

  create(data: DeliveryRequestCreateDto) {
    return this.http.post(`${this.endpoint}`, data);
  }


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
