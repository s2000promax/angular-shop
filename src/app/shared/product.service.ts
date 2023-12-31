import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductInterface } from './types/product.interface';
import { map, Observable } from 'rxjs';
import { FbResponseInterface } from './types/fb.response.interface';
import { ProductResponseInterface } from './types/product.response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type: string = 'Phone';
  cartProducts: ProductInterface[] = [];

  constructor(private http: HttpClient) {
  }

  create(product: Omit<ProductInterface, 'id'>): Observable<ProductInterface> {
    return this.http.post<FbResponseInterface>(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((response) => {
        return {
          ...product,
          id: response.name,
          date: new Date(product.date)
        }
      }))
  }

  getAll(): Observable<ProductInterface[]> {
    return this.http.get<ProductResponseInterface>(`${environment.fbDbUrl}/products.json`)
      .pipe(map((response) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }))
      }))
  }

  getById(id: string): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((response) => {
        return {
          ...response,
          id,
        }
      }))
  }

  removeById(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.fbDbUrl}/products/${id}.json`)
  }

  update(product: ProductInterface) {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type;
  }

  addProduct (product: ProductInterface) {
    this.cartProducts.push(product)
  }
}
