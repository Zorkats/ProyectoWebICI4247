import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouteReuseStrategy } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

import { IonicModule, IonicRouteStrategy } from "@ionic/angular"

import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"
import { SideBarComponent } from "./components/side-bar/side-bar.component"
import { ProfilePage } from "./pages/profile/profile.page"

@NgModule({
  declarations: [AppComponent, SideBarComponent, ProfilePage],
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