import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,catchError, Observable, tap, throwError } from 'rxjs';
import{ LoginDTO } from '../../../models/Login/login-dto';
import { RegisterModel } from '../../../models/Register/register.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private apiUrl = 'api/Auth';

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => { console.log('Login response:', response);
        this.isLoggedInSubject.next(true);}
        ),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found!');
      return throwError(() => new Error('Token missing'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('https://localhost:7176/api/Auth/get-user-profile', { headers });
  }
  
  updateUser(data: any): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found!');
      return throwError(() => new Error('Token missing'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>('https://localhost:7176/api/Auth/update-profile', data, { headers });
  }
  
  
  
}