import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductInterface } from '../shared/types/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$!: Observable<ProductInterface>
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productService.getById(params['id'])
      }))
  }

  addProduct(product: ProductInterface) {
    this.productService.addProduct(product)

  }
}
