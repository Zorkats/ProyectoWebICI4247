import { Component } from "@angular/core"
import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { SidebarComponent } from "./components/sidebar/sidebar.component"

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  standalone: true,
  imports: [IonicModule, RouterModule, SidebarComponent]
})
export class AppComponent {
  constructor() {}
}