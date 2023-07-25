import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductInterface } from '../../shared/types/product.interface';
import { Subscription } from 'rxjs';
import { ProductService } from '../../shared/product.service';
import { OrderInterface } from '../../shared/types/order.interface';
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy{
  orders!: OrderInterface[];

  private orderSubscription!: Subscription;
  private removeSubscription!: Subscription;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderSubscription = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })
  }

  onRemove(id: string) {
    this.removeSubscription = this.orderService.removeById(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    })
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }

    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }
}
