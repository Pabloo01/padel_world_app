import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFamiliesPageRoutingModule } from './add-families-routing.module';

import { AddFamiliesPage } from './add-families.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFamiliesPageRoutingModule
  ],
  declarations: [AddFamiliesPage]
})
export class AddFamiliesPageModule {}
