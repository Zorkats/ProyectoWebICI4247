import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    // Inicializamos el formulario con sus campos y validadores
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.invalid) {
      // Si el formulario es inválido, marcamos los campos como 'touched' para mostrar errores
      this.loginForm.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        loading.dismiss();
        // Redirige al dashboard o a 'mis-viajes' después de un login exitoso.
        // `replaceUrl: true` evita que el usuario pueda volver a la página de login con el botón de atrás.
        this.router.navigateByUrl('/mis-viajes', { replaceUrl: true });
      },
      error: async (err: any) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error de Autenticación',
          // Usamos el mensaje de error que viene de la API si existe
          message: err.error.message || 'No se pudo iniciar sesión. Verifica tus credenciales.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}