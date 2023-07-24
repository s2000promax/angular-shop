import { Pipe, PipeTransform } from '@angular/core';
import { ProductInterface } from './types/product.interface';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: ProductInterface[], type: string = ''): ProductInterface[] {

    return products.filter(product => {
      return product.type === type;
    })
  }
}
