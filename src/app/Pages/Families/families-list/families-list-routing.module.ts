import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamiliesListPage } from './families-list.page';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: FamiliesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class FamiliesListPageRoutingModule {}
