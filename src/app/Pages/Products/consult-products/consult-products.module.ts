import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ConsultProductsPageRoutingModule} from './consult-products-routing.module';
import {ComponentsModule} from '../../../Components/components.module';

import {ConsultProductsPage} from './consult-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultProductsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConsultProductsPage]
})
export class ConsultProductsPageModule {
}
