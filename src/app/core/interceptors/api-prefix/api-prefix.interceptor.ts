import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {inject} from '@angular/core';
import {SpinnerService} from '../../services/spinner.service';
import {finalize} from 'rxjs';


export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(SpinnerService);

  if(req.url.startsWith('api')) {
    // spinner.show();

    const apiUrl = environment.apiBaseUrl;
    const apiRequest = req.clone({ url: `${apiUrl}${req.url}` });
    return next(apiRequest);
  }

  return next(req);
};
