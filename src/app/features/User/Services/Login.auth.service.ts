import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,catchError, Observable, tap, throwError } from 'rxjs';
import{ LoginDTO } from '../../../models/Login/login-dto';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  response: any= "";
  private apiUrl = 'api/user';
  private refreshTokenTimeout: any;
  isAuthRoute: boolean = false;

  _confirmPassword: string = '';

  constructor(private router:Router, private http: HttpClient) 
  {}

  login(loginData: LoginDTO): Observable<any> {
    this._confirmPassword = loginData.password;
    localStorage.setItem('password', this._confirmPassword);
    
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      switchMap((response: any) => {
        if (response.isSuccess) {
          this.storeTokens(response.data, loginData.rememberMe);
          this.startRefreshTokenTimer();
          this.isLoggedInSubject.next(true);
        }
        return of (response);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  
  recoverAccount(username: string): Observable<any> {
    const params = new HttpParams().set('user', username);
    return this.http.put(`${this.apiUrl}/Recover`, null, { params }).pipe(
      tap(response => console.log('Recover response:', response)),
      catchError(error => {
        console.error('Recover error:', error);
        return throwError(error);
      })
    );
  }

  private guardedRoute = false;

  setGuardedRoute(value: boolean) {
    this.guardedRoute = value;
  }
  
  isGuarded(): boolean {
    return this.guardedRoute;
  }

  //refresh token
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      switchMap((response: any) => {
        if (response.isSuccess) {
          this.storeTokens(response.data, this.isRememberMe());
          this.startRefreshTokenTimer();
        }
        return response;
      }),
      catchError(error => {
        console.error('Refresh token error:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }



  private isRememberMe(): boolean {
    return !!localStorage.getItem('token');
  }

  private storeTokens(data: any, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', data.token);
    storage.setItem('exp', new Date(data.expiration).getTime().toString());
    storage.setItem('refreshToken', data.refreshToken);
    storage.setItem('refreshExp', new Date(data.refreshTokenExpiration).getTime().toString());
  }



  private clearTokens(): void {
    localStorage.clear();
    sessionStorage.clear();
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }


  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  }

  private startRefreshTokenTimer(): void {
    const expStr = localStorage.getItem('exp') || sessionStorage.getItem('exp');
    if (!expStr) return;

    const expires = parseInt(expStr);
    const timeout = expires - Date.now() - 60000; // Refresh 1 minute before expiry
    if (timeout > 0) {
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, timeout);
    }
  }





  logout(): void {
    this.clearTokens();
    this.isLoggedInSubject.next(false);

if (this.isGuarded()) {
    this.router.navigate(['/login']);
  } else {
    window.location.reload();
  }  }

   hasToken(): boolean {
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
    console.log('Fetching user profile...');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found!');
      return throwError(() => new Error('Token missing'));
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
  
  // updateUser(data: any): Observable<any> {
  //   const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  //   if (!token) {
  //     console.error('Token not found!');
  //     return throwError(() => new Error('Token missing'));
  //   }
  
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put<any>(`${this.apiUrl}/update`, data, { headers });
  // }
  updateUser(data: any, imageFile?: File): Observable<any> {
    const token = this.getToken();
    if (!token) return throwError(() => new Error('Token missing'));
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
  
    if (imageFile) {
      formData.append('profileImage', imageFile); // again, must match server-side param
    }
  
    return this.http.put(`${this.apiUrl}/update`, formData, { headers });
  }
  





  deleteUser(password: string): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token )  {
      console.error('Token not found!');
      return throwError(() => new Error('Token missing'));
    }
    else if (password == localStorage.getItem('password')) {
   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/delete`, { headers });
    }
    else {
      console.error('Password does not match!');
      return throwError(() => new Error('Password does not match'));
    }
  }


  uploadUserProfileImage(formData: FormData) {
    return this.http.post<{ imageUrl: string }>(
      'https://localhost:7176/api/Auth/upload-profile-image',
      formData
    );
  }


  
}