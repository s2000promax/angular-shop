import { ProductInterface } from './product.interface';

export interface OrderInterface {
  name: string;
  phone: string;
  address: string;
  payment: string;
  orders: ProductInterface[];
  price: string;
  date: Date;
}
