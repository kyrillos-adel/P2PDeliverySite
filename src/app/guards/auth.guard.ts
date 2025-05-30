import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../features/User/Services/Login.auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const isAuthenticated = this.authService.hasToken();
    this.authService.setGuardedRoute(true); 

    if (isAuthenticated) {
      
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
