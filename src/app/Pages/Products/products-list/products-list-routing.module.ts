import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListPage } from './products-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
})
export class ProductsListPageRoutingModule {}
