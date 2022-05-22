import {NgModule} from '@angular/core';
import {FilterItemPipe} from './filter-item/filter-item.pipe';

const declarationsExports = [
  FilterItemPipe
];

@NgModule({
  imports: [],
  declarations: [...declarationsExports],
  exports: [...declarationsExports],
})
export class PipesModule {
}
