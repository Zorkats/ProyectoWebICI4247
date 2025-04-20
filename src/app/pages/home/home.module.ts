// src/app/pages/home/home.module.ts
import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { IonicModule }        from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage }           from './home.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    HomePage
  ]
})
export class HomePageModule {}

