import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // << IMPORTA ESTO

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { SharedModule } from 'src/app/components/side-bar/side-bar-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}