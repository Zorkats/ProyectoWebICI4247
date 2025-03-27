import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {}

  onLogin() {
    console.log('Iniciando sesión con:', this.email, this.password);
    // Aquí implementarás la lógica de autenticación (JWT, etc.)
  }
}
