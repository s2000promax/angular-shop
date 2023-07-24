import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '../shared/types/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductInterface;

  constructor() {
  }

  ngOnInit() {
  }
}
