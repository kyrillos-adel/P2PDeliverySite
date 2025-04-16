import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import{ LoginDTO } from '../../../models/Login/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'api/Auth';

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => console.log('Login response:', response)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
}