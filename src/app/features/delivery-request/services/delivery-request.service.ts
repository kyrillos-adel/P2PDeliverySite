import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryRequestUpdateDto } from '../../../models/delivery-request/delivery-request-update.dto';
import { ApiResponse } from '../../../models/api-response';
import { ApplicationDTO, DeliveryRequestDetails } from '../../../models/delivery-request/delivery-request-details';
import { DeliveryRequestCreateDto } from '../../../models/delivery-request/delivery-request-create.dto';
import { DeliveryRequestDto } from '../../../models/delivery-request/delivery-request.dto';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ApplicationstatusDTO } from '../../../models/delivery-request/delivery-request-details';

@Injectable({
  providedIn: 'root'
})
export class DeliveryRequestService {
  private endpoint = 'api/deliveryrequest';
  private endpoint2 = 'api/DRApplication';
  constructor(private http: HttpClient) { }

  private getAuthToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

 private getAuthHeaders() : HttpHeaders {
    const token = this.getAuthToken();
    if (!token) {
      console.error('No token found');
     throw new Error('No token');
    }
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  create(data: DeliveryRequestCreateDto) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return throwError(() => new Error('No token'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });


    return this.http.post(`${this.endpoint}`, data,{ headers });
   }
 

  getallDRs(){
    return this.http.get<ApiResponse<DeliveryRequestDto[]>>(`${this.endpoint}`);
  }




  getMyDeliveryRequests() {
    const headers= this.getAuthHeaders();
  
    return this.http.get<ApiResponse<DeliveryRequestDto[]>>(`${this.endpoint}/my`, { headers });
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
    //const headers= this.getAuthHeaders();
    return this.http.get<ApiResponse<DeliveryRequestDetails>>(`${this.endpoint}/details/${id}`);
  }

  changeStatus(data: ApplicationstatusDTO) {
    const headers = this.getAuthHeaders();
    return this.http.put<ApiResponse<boolean>>(
      `${this.endpoint2}/updatestatus`,
       data, { headers }
    );
  }
}

