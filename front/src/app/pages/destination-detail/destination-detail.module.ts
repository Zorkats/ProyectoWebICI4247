import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinationDetailPageRoutingModule } from './destination-detail-routing.module';

import { DestinationDetailPage } from './destination-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinationDetailPageRoutingModule
  ],
  declarations: [DestinationDetailPage]
})
export class DestinationDetailPageModule {}
