import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../shared/types/form.type';
import { ProductInterface } from '../../shared/types/product.interface';
import { ProductService } from '../../shared/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  form!: FormGroup<Form<ProductInterface>>;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.nonNullable.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      photo: ['', Validators.required],
      info: ['', Validators.required],
      price: ['', Validators.required],
    });

  }

  submit() {
     if (this.form.invalid) {
       return;
     }
     this.submitted = true;

   const product: ProductInterface = {
       ...this.form.getRawValue(),
     date: new Date(),
   };
     console.log(product)
    this.productService.create(product).subscribe(response => {
      console.log(response)
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/']);
    })
   }
}
