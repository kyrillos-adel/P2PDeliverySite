import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../models/Register/register.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = 'api/auth';  
  
  constructor(private http: HttpClient) { }

  register(userData: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  
}

