import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url = 'http://localhost:3000/orders';
  constructor(private readonly http: HttpClient) {}

  get(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  getOne(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}`);
  }

  create(order: FormData | Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

  delete(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.url}/${id}`);
  }

  update(order: Order, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.url}/${orderId}`, order);
  }
}
