import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {apiPrefixInterceptor} from './core/interceptors/api-prefix/api-prefix.interceptor';
import {authorizationInterceptor} from './core/interceptors/authorization/authorization.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiPrefixInterceptor, authorizationInterceptor])
    )
  ]
};
