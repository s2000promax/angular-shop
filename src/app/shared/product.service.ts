import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductInterface } from './types/product.interface';
import { map } from 'rxjs';
import { ProductResponseInterface } from './types/product.response.interface';
import { FbResponseInterface } from './types/fb.response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: ProductInterface) {

    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      // .pipe(map((response: FbResponseInterface) => {
      //   return {
      //     ...product,
      //     id: response.name,
      //     date: product.date,
      //   }
      // }))
  }
}
