// src/app/core/interceptors/api-prefix/authorization.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  if (token && req.url.startsWith(environment.apiBaseUrl)) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
