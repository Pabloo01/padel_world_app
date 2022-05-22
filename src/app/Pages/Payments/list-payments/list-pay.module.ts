import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './list-pay-routing.module';
import {ComponentsModule} from '../../../Components/components.module';
import { ListPayPage } from './list-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListPayPage]
})
export class PayPageModule {}
