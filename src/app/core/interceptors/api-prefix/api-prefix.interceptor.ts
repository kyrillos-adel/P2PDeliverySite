import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.startsWith('api')) {
    const apiUrl = environment.apiBaseUrl;
    const apiRequest = req.clone({ url: `${apiUrl}${req.url}` });
    return next(apiRequest);
  }

  return next(req);
};
