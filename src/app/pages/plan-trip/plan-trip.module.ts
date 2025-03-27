import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanTripPageRoutingModule } from './plan-trip-routing.module';

import { PlanTripPage } from './plan-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanTripPageRoutingModule
  ],
  declarations: [PlanTripPage]
})
export class PlanTripPageModule {}
