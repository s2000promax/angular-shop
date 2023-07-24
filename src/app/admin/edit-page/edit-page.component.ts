import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/product.service';
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../shared/types/form.type';
import { ProductInterface } from '../../shared/types/product.interface';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup<Form<Omit<ProductInterface, 'id' | 'date'>>>;
  product!: ProductInterface;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(switchMap(params => {
      return this.productService.getById(params['id'])
    })).subscribe(product => {
      this.product = product;
      this.form = this.formBuilder.nonNullable.group({
        type: [this.product.type, Validators.required],
        title: [this.product.title, Validators.required],
        photo: [this.product.photo, Validators.required],
        info: [this.product.info, Validators.required],
        price: [this.product.price, Validators.required],
      })
    })
  }

  onUpdate() {
    const editedProduct: ProductInterface = {
      ...this.form.getRawValue(),
      id: this.product.id,
      date: new Date(),
    }
    this.productService.update(editedProduct).subscribe(() => {
      this.submitted = true;
      this.router.navigate(['/admin', 'dashboard']);

    });
  }

  ngOnDestroy() {
  }

}
