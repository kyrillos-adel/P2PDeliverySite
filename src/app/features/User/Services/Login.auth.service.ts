import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,catchError, Observable, tap, throwError } from 'rxjs';
import{ LoginDTO } from '../../../models/Login/login-dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  response: any= "";
  private apiUrl = 'api/Auth';

  constructor(private http: HttpClient) {
    

  }


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
    return this.http.get('https://localhost:7176/api/Auth/findbyname', { headers , params }); 
  } 
}