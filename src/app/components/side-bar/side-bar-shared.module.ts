import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [SideBarComponent]
})
export class SharedModule { }