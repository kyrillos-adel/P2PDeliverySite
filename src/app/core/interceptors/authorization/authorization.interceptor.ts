import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { AuthService } from '../../../features/User/Services/Login.auth.service'; // Adjust the import path as necessary
import { environment } from '../../../../environments/environment'; 


const isRefreshing = { value: false };
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authorizationInterceptor : HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  const addToken = (request: typeof req, token: string) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const handle401Error = (request: typeof req) => {
    if (!isRefreshing.value) {
      isRefreshing.value = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        switchMap(() => {
          const newToken = authService.getToken(); // get updated token
          if (newToken) {
            refreshTokenSubject.next(newToken);
            return next(addToken(request, newToken));
          }
          authService.logout();
          return throwError(() => new Error('Refresh token failed'));
        }),
        catchError(err => {
          authService.logout();
          return throwError(() => err);
        }),
        finalize(() => {
          isRefreshing.value = false;
        })
      );
    } else {
      
      return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next(addToken(request, token!)))
      );
    }
  };

  const token = authService.getToken();

  
  if (token && req.url.startsWith(environment.apiBaseUrl)) {
    const clonedRequest = addToken(req, token);
    
    return next(clonedRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return handle401Error(req);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req);
      }
      return throwError(() => error);
    })
  );
};
