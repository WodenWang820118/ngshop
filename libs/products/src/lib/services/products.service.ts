import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Crud } from '../interfaces/crud.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements Crud<Product> {
  url = 'http://localhost:3000/products';
  constructor(private readonly http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  create(product: FormData | Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }

  update(product: Product, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${productId}`, product);
  }
}
