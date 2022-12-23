import { Observable } from 'rxjs';

export interface Crud<T> {
  get: () => Observable<T[]>;
  getOne: (id: string) => Observable<T>;
  create: (item: T | FormData) => Observable<T>;
  delete: (id: string) => Observable<T>;
  update: (item: T, id: string) => Observable<T>;
}
