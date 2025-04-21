// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import {MenuButtonComponent} from "../menubutton/menubutton.component";
import { IonicModule } from '@ionic/angular';
import {RouterModule} from "@angular/router";
import {SidebarServiceService} from "../../services/sidebar-service.service";

@NgModule({
  declarations: [SideBarComponent,MenuButtonComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [SideBarComponent,MenuButtonComponent],
  providers: [SidebarServiceService]
})
export class SharedModule { }
