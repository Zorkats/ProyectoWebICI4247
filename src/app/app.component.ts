import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  appPages = [
    { title: 'Mi Perfil', url: '/profile', icon: 'person-circle' },
  ];
  constructor() {}
}

