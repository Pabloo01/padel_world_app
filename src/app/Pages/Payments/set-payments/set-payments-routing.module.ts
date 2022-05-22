import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPaymentsPage } from './set-payments.page';

const routes: Routes = [
  {
    path: '',
    component: SetPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPaymentsPageRoutingModule {}
