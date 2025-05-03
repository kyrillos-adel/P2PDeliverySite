import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../models/api-response';
import { TrackingDTO } from '../../../models/Tracking/tracking-dto';
import { DRApplicationDto } from '../../../models/DRApplication/DR-Application.dto';
import { AddTrackDTO } from '../../../models/Tracking/add-track-dto';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private endpoint = 'api/Track';
  constructor(private http: HttpClient) { }

  private getAuthToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  

  getLast(deliveryId: number) {
    return this.http.get<ApiResponse<TrackingDTO>>(`${this.endpoint}/${deliveryId}`);
  }

  addUpdate( dto:AddTrackDTO){
    return this.http.post<ApiResponse<boolean>>(`${this.endpoint}`,dto);
  }
}
