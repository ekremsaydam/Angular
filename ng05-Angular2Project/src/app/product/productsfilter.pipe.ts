import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productsfilter'
})
export class ProductsfilterPipe implements PipeTransform {

  transform(value: Product[], filter: string): Product[] {
    filter = filter ? filter.toLocaleLowerCase() : null;

    return filter ? value.filter((p: Product) => p.productName.toLocaleLowerCase().indexOf(filter) !== -1) : value;
  }

}
