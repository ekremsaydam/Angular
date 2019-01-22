import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './Product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], filterText?: string): Product[] {
    filterText = filterText ? filterText.toLowerCase() : null;
    return filterText ? value.filter((p: Product) => p.name.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
