import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[] | undefined;
    const userRole = this.authService.getRole();

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      // Unauthorized access
      alert("You are not authorized to access this page.");
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
