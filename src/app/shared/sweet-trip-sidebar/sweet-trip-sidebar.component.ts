import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Home,
  Briefcase,
  Globe,
  Calendar,
  User,
  Settings,
  Camera
} from 'lucide-angular';

@Component({
  selector: 'app-sweet-trip-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    Home,
    Briefcase,
    Globe,
    Calendar,
    User,
    Settings
  ],
  templateUrl: './sweet-trip-sidebar.component.html',
})
export class SweetTripSidebarComponent {
  menuItems = [
    { id: 'inicio', path: '/', icon: 'home', label: 'Inicio' },
    { id: 'mis-viajes', path: '/mis-viajes', icon: 'briefcase', label: 'Mis viajes' },
    { id: 'explorar', path: '/explorar', icon: 'globe', label: 'Explorar' },
    { id: 'calendario', path: '/calendario', icon: 'calendar', label: 'Calendario' },
    { id: 'mi-perfil', path: '/mi-perfil', icon: 'user', label: 'Mi perfil' },
    { id: 'configuracion', path: '/configuracion', icon: 'settings', label: 'Configuración' },
  ];

  constructor(public router: Router) {}
}
