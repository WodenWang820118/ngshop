import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/users.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:3000/users';
  constructor(private readonly http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getOne(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  delete(id: string): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  update(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}`, user);
  }
}
