import {Component, HostListener, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false
})
export class SideBarComponent implements OnInit {

  isOpen = false;

  @Input() overlayId = 'sidebar-overlay';

  constructor(private router: Router) {}

  ngOnInit() {
    // Cerrar el sidebar al navegar a otra ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeSidebar();
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;

    // Controlar la capacidad de scroll del body cuando el sidebar está abierto
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

  // Cerrar el sidebar si se hace clic en el overlay
  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).id === this.overlayId) {
      this.closeSidebar();
    }
  }

  // Cerrar el sidebar al presionar la tecla ESC
  @HostListener('document:keydown.escape')
  onEscKeyHandler() {
    this.closeSidebar();
  }
}
