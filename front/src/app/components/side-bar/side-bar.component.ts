import { Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { filter } from 'rxjs/operators';

// NUEVO: 1. Importamos el AuthService
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false
})
export class SideBarComponent implements OnInit {

  isOpen = false;
  @ViewChild ('menu') menu!: IonMenu;
  @Input() overlayId = 'sidebar-overlay';
  @Input() menuId: string = 'sideMenu';

  // NUEVO: 3. Exponemos los observables del AuthService a la plantilla HTML.
  public currentUser$ = this.authService.currentUser$;
  public isAuthenticated$ = this.authService.isAuthenticated$;

  // CAMBIO: 2. Inyectamos el AuthService en el constructor.
  constructor(
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    // Esta lógica se mantiene, es correcta.
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeSidebar();
    });
  }

  // TODA LA LÓGICA SIGUIENTE PARA CONTROLAR EL SIDEBAR SE MANTIENE IGUAL.
  // No es necesario cambiarla.

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  openSidebar() {
    if (!this.isOpen) {
      this.toggleSidebar();
    }
  }

  closeSidebar() {
    if (this.isOpen) {
      this.toggleSidebar();
    }
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).id === this.overlayId) {
      this.closeSidebar();
    }
  }

  @HostListener('document:keydown.escape')
  onEscKeyHandler() {
    this.closeSidebar();
  }
}