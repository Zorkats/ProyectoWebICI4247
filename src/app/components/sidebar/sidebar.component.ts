import { Component, OnInit } from "@angular/core"
import { Router, NavigationEnd, RouterModule } from "@angular/router"
import { filter } from "rxjs/operators"
import { IonicModule } from "@ionic/angular"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  currentPath = ""

  menuItems = [
    { id: "inicio", path: "/", icon: "home-outline", label: "Inicio" },
    { id: "mis-viajes", path: "/mis-viajes", icon: "briefcase-outline", label: "Mis viajes" },
    { id: "explorar", path: "/explorar", icon: "globe-outline", label: "Explorar" },
    { id: "calendario", path: "/calendario", icon: "calendar-outline", label: "Calendario" },
    { id: "mi-perfil", path: "/mi-perfil", icon: "person-outline", label: "Mi perfil" },
    { id: "configuracion", path: "/configuracion", icon: "settings-outline", label: "Configuración" },
  ]

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentPath = this.router.url

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentPath = event.url
    })
  }

  isActive(path: string): boolean {
    if (path === "/" && this.currentPath === "/") {
      return true
    }
    return path !== "/" && this.currentPath.startsWith(path)
  }
}