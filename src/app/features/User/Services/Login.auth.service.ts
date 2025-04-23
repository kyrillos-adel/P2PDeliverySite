import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,catchError, Observable, tap, throwError } from 'rxjs';
import{ LoginDTO } from '../../../models/Login/login-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  response: any= "";
  private apiUrl = 'api/user';
  isAuthRoute: boolean = false;


  constructor(private router:Router, private http: HttpClient) 
  {}
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


  getUser(name: string): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return throwError(() => new Error('No token'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const params = new HttpParams().set('Name', name);
    return this.http.get(`${this.apiUrl}/findbyname`, { headers , params }); 
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
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
  
  updateUser(data: any): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found!');
      return throwError(() => new Error('Token missing'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/update`, data, { headers });
  }
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found!');
      return throwError(() => new Error('Token missing'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/delete`, { headers });
  }
  
  
}