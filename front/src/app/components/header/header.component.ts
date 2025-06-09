import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {
  // NUEVO: Exponemos los observables del AuthService a la plantilla.
  public isAuthenticated$ = this.authService.isAuthenticated$;
  public currentUser$ = this.authService.currentUser$;

  constructor(private authService: AuthService) {}

  // NUEVO: Método para cerrar sesión.
  logout(): void {
    this.authService.logout();
  }
}