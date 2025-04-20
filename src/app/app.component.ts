import { Component } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { SharedModule } from "./shared.module"

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule, RouterModule, SharedModule]
})
export class AppComponent {
  constructor() {}
}