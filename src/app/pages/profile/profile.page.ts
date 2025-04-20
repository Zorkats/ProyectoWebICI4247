import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ProfilePage implements OnInit {
  passwordForm: FormGroup
  emailNotifications = true
  darkMode = false

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  ngOnInit() {}

  changePassword() {
    if (this.passwordForm.valid) {
      // Here you would implement the password change logic
      alert("Contraseña cambiada con éxito")
      this.passwordForm.reset()
    }
  }

  changeProfilePhoto() {
    // Implement photo change logic
    console.log("Changing profile photo")
  }
}