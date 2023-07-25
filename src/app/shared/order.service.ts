import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { FbResponseInterface } from './types/fb.response.interface';
import { OrderInterface } from './types/order.interface';
import { Observable } from 'rxjs';
import { OrdersResponseInterface } from './types/orders.response.interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  http : HttpClient) { }

  create(order: Omit<OrderInterface, 'id'>): Observable<OrderInterface> {
    return this.http.post<FbResponseInterface>(`${environment.fbDbUrl}/orders.json`, order)
    .pipe(map( (res) => {
      return {
        ...order,
        id: res.name,
        date: new Date(order.date)
      }
    }))
  }

  getAll(): Observable<OrderInterface[]> {
    return this.http.get<OrdersResponseInterface>(`${environment.fbDbUrl}/orders.json`)
      .pipe(map(response => {
        return Object.keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  removeById(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.fbDbUrl}/orders/${id}.json`)
  }
}
