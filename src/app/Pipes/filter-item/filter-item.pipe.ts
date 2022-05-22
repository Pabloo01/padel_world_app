import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterItem'
})
export class FilterItemPipe implements PipeTransform {

  transform(items: any[], filter: any) {

    if (items) {

      items = items.filter((item) => {
        return item.carpeta.id_tipo === parseInt(filter.type);
      });

      return items;
    }
  }

}
