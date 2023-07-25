import { OrderInterface } from './order.interface';

export interface OrdersResponseInterface {
  [id: string]: Omit<OrderInterface, 'id'>;
}
