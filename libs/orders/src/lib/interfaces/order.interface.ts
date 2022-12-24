import { User } from '@ngshop/users';
import { OrderItem } from './orderItem.interface';

export interface Order {
  orderItems: OrderItem[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice: number;
  user: User;
  dateOrdered: Date;
  _id?: string;
}
