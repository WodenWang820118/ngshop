import { Product } from '@ngshop/products';

export interface OrderItem {
  _id?: string;
  product: Product;
  quantity: number;
}
