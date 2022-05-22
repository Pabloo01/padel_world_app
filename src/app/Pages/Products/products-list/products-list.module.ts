import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProductsListPageRoutingModule} from './products-list-routing.module';
import {ComponentsModule} from '../../../Components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductsListPage} from './products-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsListPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [ProductsListPage]
})
export class ProductsListPageModule {
}
