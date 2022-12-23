import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';
import { Crud } from '../interfaces/crud.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements Crud<Category> {
  url = 'http://localhost:3000/categories';
  constructor(private readonly http: HttpClient) {}

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getOne(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  create(category: FormData | Category): Observable<Category> {
    return this.http.post<Category>(this.url, category);
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/${id}`);
  }

  update(category: Category, categoryId: string): Observable<Category> {
    return this.http.put<Category>(`${this.url}/${categoryId}`, category);
  }
}
