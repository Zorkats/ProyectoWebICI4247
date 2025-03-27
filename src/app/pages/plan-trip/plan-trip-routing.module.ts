import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanTripPage } from './plan-trip.page';

const routes: Routes = [
  {
    path: '',
    component: PlanTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanTripPageRoutingModule {}
