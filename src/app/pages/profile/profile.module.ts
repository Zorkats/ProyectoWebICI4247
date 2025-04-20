// src/app/pages/profile/profile.module.ts
import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { IonicModule }          from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage }          from './profile.page';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ProfilePage
  ]
})
export class ProfilePageModule {}