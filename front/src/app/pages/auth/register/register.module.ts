import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // << IMPORTA ESTO

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { SharedModule } from 'src/app/components/side-bar/side-bar-shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}