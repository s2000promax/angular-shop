import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FbResponseInterface } from './types/fb.response.interface';
import { OrderInterface } from './types/order.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http : HttpClient) { }

  create(order: OrderInterface): Observable<OrderInterface> {
    return this.http.post<FbResponseInterface>(`${environment.fbDbUrl}/orders.json`, order)
    .pipe(map( (res) => {
      return {
        ...order,
        id: res.name,
        date: new Date(order.date)
      }
    }))
  }
}
