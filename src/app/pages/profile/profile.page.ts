import {Component, OnInit, ViewChild} from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"
import {SideBarComponent} from "../../components/side-bar/side-bar.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
  standalone: false,
})
export class ProfilePage implements OnInit {
  passwordForm: FormGroup
  emailNotifications = true
  darkMode = false

  @ViewChild(SideBarComponent) sidebar!: SideBarComponent;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
    })
  }

  ngOnInit() {}

  changePassword() {
    if (this.passwordForm.valid) {
      alert("Contraseña cambiada con éxito")
      this.passwordForm.reset()
    }
  }

  changeProfilePhoto() {
    console.log("Changing profile photo")
  }
}
