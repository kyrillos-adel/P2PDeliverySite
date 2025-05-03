import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DeliveryRequestUpdateDto } from '../../../models/delivery-request/delivery-request-update.dto';
import { ApiResponse } from '../../../models/api-response';
import { DeliveryRequestDetails } from '../../../models/delivery-request/delivery-request-details';
import { DeliveryRequestCreateDto } from '../../../models/delivery-request/delivery-request-create.dto';
import { DeliveryRequestDto, PaginatedDeliveryRequestDto } from '../../../models/delivery-request/delivery-request.dto';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryRequestService {
  private endpoint = 'api/deliveryrequest';
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


  getallDRs(filters:any, pageNum:number){
    let params = new HttpParams();
if(filters){
  if (filters.title) {
    params = params.set('title', filters.title);
  }

  if (filters.status?.length) {
    filters.status.forEach((val: number) => {
      params = params.append('Status', val.toString());
    });
  }

    if (filters.pickupLocation) {
      params = params.set('PickupLocation', filters.pickupLocation);
    }

    if (filters.dropoffLocation) {
      params = params.set('DropOffLocation', filters.dropoffLocation);
    }

    if (filters.pickupDate) {
      params = params.set('StartPickUpDate', filters.pickupDate);
    }

    if (filters.minPrice != null) {
      params = params.set('StartPrice', filters.minPrice.toString());
    }
  }
  if(pageNum>0){
    params = params.set('pageNumber', pageNum);

  }
    // return this.http.get(`${this.apiUrl}/filter`, { params });

    return this.http.get<ApiResponse<PaginatedDeliveryRequestDto>>(`${this.endpoint}`, { params });
  }




  getMyDeliveryRequests() {
    const headers= this.getAuthHeaders();

    return this.http.get<ApiResponse<DeliveryRequestDto[]>>(`${this.endpoint}/my`, { headers });
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

  changeStatus(id: number, status: string) {
    const headers = this.getAuthHeaders();
    return this.http.put<ApiResponse<boolean>>(
      `${this.endpoint}/updatestatus`,
      { id, status },
      { headers }
    );
  }
}

