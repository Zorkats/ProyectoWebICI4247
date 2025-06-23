import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { SharedModule } from '../../components/side-bar/side-bar-shared.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    SharedModule,
  ],
  declarations: [ExplorePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExplorePageModule {}
