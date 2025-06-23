import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinationDetailPage } from './destination-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DestinationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinationDetailPageRoutingModule {}
