import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearViajePageRoutingModule } from './crear-viaje-routing.module';

import { CrearViajePage } from './crear-viaje.page';
import { SharedModule } from 'src/app/components/side-bar/side-bar-shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearViajePageRoutingModule,
    SharedModule
  ],
  declarations: [CrearViajePage]
})
export class CrearViajePageModule {}
