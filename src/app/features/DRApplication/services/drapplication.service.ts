import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../models/api-response';
import { HttpHeaders } from '@angular/common/http';
import { DRApplicationDto } from '../../../models/DRApplication/DR-Application.dto';


@Injectable({
  providedIn: 'root'
})
export class DRApplicationService {
  private endpoint = 'api/drapplication';

  constructor(private http:HttpClient) { }

  private getAuthToken(): string | null{
    return localStorage.getItem('token') || sessionStorage.getItem('token');

  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    if (!token) {
      console.error('No token found');
      throw new Error('No token');
    }
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getMyApplications()
  {
    const headers=this.getAuthHeaders();
    return this.http.get<ApiResponse<DRApplicationDto[]>>(`${this.endpoint}/GetMyApplications`,{headers});
  }


}
