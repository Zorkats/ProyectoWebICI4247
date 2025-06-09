import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
// 1. Importa ToastController
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController // 2. Inyéctalo en el constructor
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando cuenta...',
    });
    await loading.present();

    const { name, email, password } = this.registerForm.value;

    this.authService.register({ name, email, password }).subscribe({
      next: () => {
        loading.dismiss();
        
        // --- 3. APLICA LOS CAMBIOS AQUÍ ---
        // Muestra el mensaje de éxito
        this.presentToast('Cuenta creada exitosamente');
        // Redirige a la página de perfil
        this.router.navigateByUrl('/profile', { replaceUrl: true });
        // ---------------------------------
      },
      error: async (err: any) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error de Registro',
          message: err.error.message || 'No se pudo completar el registro.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  // 4. Método auxiliar para mostrar el Toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500, // Duración de 2.5 segundos
      position: 'top', // Aparecerá en la parte superior
      color: 'success', // Con un color verde de éxito
    });
    await toast.present();
  }
}