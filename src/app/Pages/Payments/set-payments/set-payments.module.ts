import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetPaymentsPageRoutingModule } from './set-payments-routing.module';

import { SetPaymentsPage } from './set-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetPaymentsPageRoutingModule
  ],
  declarations: [SetPaymentsPage]
})
export class SetPaymentsPageModule {}
