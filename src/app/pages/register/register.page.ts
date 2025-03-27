import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  username: string = '';
  rut: string = '';
  email: string = '';
  region: string = '';
  comuna: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;

  constructor() { }

  ngOnInit() {}

  onRegister() {
    console.log('Registrando usuario:', this.username);
    // Lógica para validar y registrar al usuario
  }
}
