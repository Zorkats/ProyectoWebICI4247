import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouteReuseStrategy } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

import { IonicModule, IonicRouteStrategy } from "@ionic/angular"

import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"
import { SidebarComponent } from "./components/sidebar/sidebar.component"
import { HomePage } from "./pages/home/home.page"
import { ProfilePage } from "./pages/profile/profile.page"

@NgModule({
  declarations: [AppComponent, SidebarComponent, HomePage, ProfilePage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}