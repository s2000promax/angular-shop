import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../shared/types/form.type';
import { ProductService } from '../shared/product.service';
import { ProductInterface } from '../shared/types/product.interface';
import { OrderService } from '../shared/order.service';
import { OrderInterface } from '../shared/types/order.interface';

export interface DeliveryInterface {
  name: string;
  phone: string;
  address: string;
  payment: string;
}

export interface CartInterface {

};

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: ProductInterface[] = []
  totalPrice: number = 0

  form! : FormGroup<Form<DeliveryInterface>>;
  submitted: boolean = false

  constructor(
    private productService : ProductService,
    private orderService : OrderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price
    }

    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      payment: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order: OrderInterface = {
      ...this.form.getRawValue(),
      orders: this.cartProducts,
      price: this.totalPrice.toString(),
      date: new Date()
    }

    this.orderService.create(order).subscribe( res => {
      this.form.reset()
      this.submitted = false
    })
  }

  delete(product: ProductInterface) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }
}
