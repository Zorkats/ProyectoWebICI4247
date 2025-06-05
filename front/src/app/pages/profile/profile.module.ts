// src/app/pages/profile/profile.module.ts
import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { IonicModule }          from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage }          from './profile.page';
import { SharedModule } from '../../components/side-bar/side-bar-shared.module'

@NgModule({
  declarations: [ProfilePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    SharedModule
  ],
})
export class ProfilePageModule {}
