
import { AuthService } from '../../features/delivery-request/services/Register_auth.service';

import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function usernameExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null); // don't run validator if field is empty
    }

    return authService.findByName(control.value).pipe(
        map((exists: boolean) => {
            return exists ? { usernameExists: true } : null;
        }),
      catchError(() => of(null)) // ignore backend errors
    );
  };
}

