import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {SharedModule} from "../../components/side-bar/side-bar-shared.module";
import {TarjetaViajeSharedModule} from "../../components/tarjeta-viaje/tarjeta-viaje.shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPageRoutingModule,
        SharedModule,
      TarjetaViajeSharedModule
    ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
