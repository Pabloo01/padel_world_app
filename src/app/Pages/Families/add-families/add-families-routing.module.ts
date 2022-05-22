import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFamiliesPage } from './add-families.page';

const routes: Routes = [
  {
    path: '',
    component: AddFamiliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFamiliesPageRoutingModule {}
