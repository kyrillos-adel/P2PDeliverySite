import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../models/Register/register.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = 'http://localhost:5153/api/auth';  
  
  constructor(private http: HttpClient) { }

  register(userData: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  
}

