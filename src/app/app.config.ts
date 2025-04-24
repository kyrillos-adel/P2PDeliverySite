import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {apiPrefixInterceptor} from './core/interceptors/api-prefix/api-prefix.interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiPrefixInterceptor])
    )
  ]
};
