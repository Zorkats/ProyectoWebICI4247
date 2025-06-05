// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaViajeComponent } from './tarjeta-viaje.component';
import { IonicModule } from '@ionic/angular';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [TarjetaViajeComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [TarjetaViajeComponent],
})
export class TarjetaViajeSharedModule { }
