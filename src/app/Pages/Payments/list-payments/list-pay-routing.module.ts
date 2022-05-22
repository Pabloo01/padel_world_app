import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavParams} from '@ionic/angular';
import { ListPayPage } from './list-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ListPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NavParams]
})
export class PayPageRoutingModule {}
