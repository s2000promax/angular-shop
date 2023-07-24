import { ProductInterface } from './product.interface';

export interface ProductResponseInterface {
  [id: string]: Omit<ProductInterface, 'id'>;
}
