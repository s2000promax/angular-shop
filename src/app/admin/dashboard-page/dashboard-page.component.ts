import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';
import { ProductInterface } from '../../shared/types/product.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products!: ProductInterface[];

  private productSubscription!: Subscription;
  private removeSubscription!: Subscription;
  productName!: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productSubscription = this.productService.getAll().subscribe(products => {
      this.products = products;
    })
  }

  onRemove(id: string) {
    this.removeSubscription = this.productService.removeById(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    })
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    if (this.removeSubscription) {
      this.removeSubscription.unsubscribe();
    }
  }
}
