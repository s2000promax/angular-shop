import { UserInterface } from './user.interface';
import { ProductInterface } from './product.interface';

export interface ProductResponseInterface extends ProductInterface {
  name: string;
  date: Date;
}
