import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FamiliesListPageRoutingModule} from './families-list-routing.module';
import {ComponentsModule} from '../../../Components/components.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {FamiliesListPage} from './families-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamiliesListPageRoutingModule,
    ComponentsModule,
    NgxPaginationModule
  ],
  declarations: [FamiliesListPage]
})
export class FamiliesListPageModule {
}
