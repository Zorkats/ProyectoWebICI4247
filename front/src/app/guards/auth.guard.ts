import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators'; // 1. Importa 'filter'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    
    return this.authService.currentUser$.pipe(
      filter(user => user !== undefined && user !== null),
      take(1),
      map(isAuth => {
        if (isAuth) {
          console.log('Usuario autenticado, acceso permitido');
          return true;
        }
        
        console.log('Usuario no autenticado, redirigiendo a login');
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}