import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
// NUEVO: 1. Importamos nuestro AuthService
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: false
})
export class ProfilePage implements OnInit {
  passwordForm: FormGroup;
  emailNotifications = true;
  darkMode = false;

  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;

  // NUEVO: 3. Exponemos el observable del usuario a la plantilla
  public currentUser$ = this.authService.currentUser$;

  // CAMBIO: 2. Inyectamos el AuthService en el constructor
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService 
  ) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]], // Añadido minLength
    });
  }

  ngOnInit() {}

  changePassword() {
    if (this.passwordForm.valid) {
      // Aquí iría la lógica para llamar a un servicio que cambie la contraseña
      console.log("Formulario de contraseña enviado:", this.passwordForm.value);
      alert("La lógica para cambiar la contraseña aún no está implementada.");
      this.passwordForm.reset();
    }
  }

  changeProfilePhoto() {
    console.log("Cambiando foto de perfil");
    // Lógica futura para subir una nueva imagen de perfil
  }
}