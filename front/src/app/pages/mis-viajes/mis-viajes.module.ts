import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisViajesPageRoutingModule } from './mis-viajes-routing.module';

import { MisViajesPage } from './mis-viajes.page';

import { SharedModule } from '../../components/side-bar/side-bar-shared.module'
import {TarjetaViajeSharedModule} from "../../components/tarjeta-viaje/tarjeta-viaje.shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisViajesPageRoutingModule,
    SharedModule,
    TarjetaViajeSharedModule
  ],
  declarations: [MisViajesPage]
})
export class MisViajesPageModule {}
