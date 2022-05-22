import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultProductsPage } from './consult-products.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultProductsPageRoutingModule {}
