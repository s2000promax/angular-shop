import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs';
import { ProductInterface } from '../shared/types/product.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$!: Observable<ProductInterface[]>;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getAll();
  }
}
