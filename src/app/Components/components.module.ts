import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {MenuComponent} from './menu/menu.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PopoverUserComponent} from './popover-user/popover-user.component';
import {PopoverComponent} from './popover/popover.component';
import {EmptyListComponent} from './empty-list/empty-list.component';

const declarationsExports = [
  MenuComponent, PopoverComponent, HeaderComponent, FooterComponent, PopoverUserComponent, EmptyListComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [...declarationsExports],
  exports: [...declarationsExports],
})
export class ComponentsModule {
}
