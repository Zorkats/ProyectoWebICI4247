import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    
    return this.authService.isAuthenticated.pipe(
      take(1),
      map(isAuth => {
        if (isAuth) {
          return true;
        }
        // Redirige a la página de login si no está autenticado
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}